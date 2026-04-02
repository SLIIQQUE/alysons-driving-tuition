# AI Voice Assistant Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use `executing-plans` to implement this plan task-by-task.

**Goal:** Add a floating voice assistant to Alyson's Driving Tuition website that uses browser-native speech recognition (STT), Groq API for AI responses, and browser-native TTS for speaking responses. Supports function calling to create bookings directly.

**Architecture:** Client-side voice assistant using Web Speech API for STT/TTS, communicating with Groq API via a Next.js API route. Function calling enables the AI to trigger booking operations when users request lessons.

**Tech Stack:** Web Speech API (STT/TTS), Groq API (llama-3.1-70b-versatile), Next.js 16 App Router, React hooks

---

## Task 1: Add Environment Variables

**Files:**
- Modify: `.env.local`

**Step 1: Verify Groq API key is set**

Run: `cat .env.local | grep GROQ`
Expected: `GROQ_API_KEY=gsk_...` ✓

---

## Task 2: Create TypeScript Types for Voice Assistant

**Files:**
- Create: `src/types/voice.ts`

**Step 1: Write the types file**

```typescript
export interface VoiceMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface VoiceState {
  isListening: boolean;
  isSpeaking: boolean;
  isLoading: boolean;
  messages: VoiceMessage[];
  error: string | null;
}

export interface AIFunctionCall {
  name: string;
  arguments: Record<string, unknown>;
}

export interface GroqMessage {
  role: "system" | "user" | "assistant";
  content: string;
  tool_calls?: Array<{
    id: string;
    type: "function";
    function: {
      name: string;
      arguments: string;
    };
  }>;
}

export interface ToolDefinition {
  type: "function";
  function: {
    name: string;
    description: string;
    parameters: {
      type: "object";
      properties: Record<string, unknown>;
      required: string[];
    };
  };
}
```

---

## Task 3: Create System Prompt Constants

**Files:**
- Create: `src/lib/voice-prompt.ts`

**Step 1: Write the system prompt file**

```typescript
export const VOICE_SYSTEM_PROMPT = `You are a friendly voice assistant for Alyson's Driving Tuition, a driving school in Blackwood, South Wales run by Alyson Baldwin, a DVSA Approved Driving Instructor with over 20 years experience.

IMPORTANT: You must respond as if you're speaking to the customer verbally. Keep responses concise and conversational (1-2 sentences max).

KEY INFORMATION:
- Location: Blackwood, Tredegar, Risca & across South Wales
- Phone: 07791 489244
- Services: Standard lessons (£30/hr), Block bookings (save 15%), Intensive courses (from £450), Pass Plus, Refresher lessons
- Hours: Monday-Saturday 8am-8pm, Sunday by arrangement
- Specialty: Patient with nervous beginners, 98% pass rate

If the customer wants to book a lesson, use the book_lesson function with their details (name, phone, email, preferred date/time, service type). Extract this information from the conversation. If any required fields are missing, ask the customer.

If they ask about pricing, services, or general questions, answer helpfully. If you need more info to complete a booking, ask follow-up questions one at a time.`;

export const VOICE_TOOLS: ToolDefinition[] = [
  {
    type: "function",
    function: {
      name: "book_lesson",
      description: "Book a driving lesson for the customer. Use when they explicitly want to book or express interest in lessons.",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string", description: "Customer's full name" },
          phone: { type: "string", description: "Customer's phone number" },
          email: { type: "string", description: "Customer's email address" },
          serviceType: {
            type: "string",
            enum: ["standard", "block", "intensive", "pass-plus", "refresher"],
            description: "Type of lesson they want"
          },
          preferredDate: { type: "string", description: "Preferred date (YYYY-MM-DD)" },
          preferredTime: { type: "string", description: "Preferred time slot" },
          notes: { type: "string", description: "Any additional notes" }
        },
        required: ["name", "phone", "serviceType"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_pricing",
      description: "Get pricing information for driving lessons",
      parameters: {
        type: "object",
        properties: {
          serviceType: {
            type: "string",
            enum: ["standard", "block", "intensive", "pass-plus", "refresher"],
            description: "Which service to get pricing for"
          }
        },
        required: []
      }
    }
  }
];
```

---

## Task 4: Create Groq API Route

**Files:**
- Create: `src/app/api/voice/route.ts`

**Step 1: Write the API route**

```typescript
import { NextRequest, NextResponse } from "next/server";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const SYSTEM_PROMPT = `You are a friendly voice assistant for Alyson's Driving Tuition, a driving school in Blackwood, South Wales run by Alyson Baldwin, a DVSA Approved Driving Instructor with over 20 years experience.

IMPORTANT: You must respond as if you're speaking to the customer verbally. Keep responses concise and conversational (1-2 sentences max).

KEY INFORMATION:
- Location: Blackwood, Tredegar, Risca & across South Wales
- Phone: 07791 489244
- Services: Standard lessons (£30/hr), Block bookings (save 15%), Intensive courses (from £450), Pass Plus, Refresher lessons
- Hours: Monday-Saturday 8am-8pm, Sunday by arrangement
- Specialty: Patient with nervous beginners, 98% pass rate

If the customer wants to book a lesson, use the book_lesson function with their details (name, phone, email, preferred date/time, service type). Extract this information from the conversation. If any required fields are missing, ask the customer.

If they ask about pricing, services, or general questions, answer helpfully. If you need more info to complete a booking, ask follow-up questions one at a time.`;

const TOOLS = [
  {
    type: "function",
    function: {
      name: "book_lesson",
      description: "Book a driving lesson for the customer. Use when they explicitly want to book or express interest in lessons.",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string", description: "Customer's full name" },
          phone: { type: "string", description: "Customer's phone number" },
          email: { type: "string", description: "Customer's email address" },
          serviceType: { type: "string", enum: ["standard", "block", "intensive", "pass-plus", "refresher"], description: "Type of lesson" },
          preferredDate: { type: "string", description: "Preferred date YYYY-MM-DD" },
          preferredTime: { type: "string", description: "Preferred time slot" },
          notes: { type: "string", description: "Additional notes" }
        },
        required: ["name", "phone", "serviceType"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_pricing",
      description: "Get pricing information",
      parameters: {
        type: "object",
        properties: {
          serviceType: { type: "string", enum: ["standard", "block", "intensive", "pass-plus", "refresher"] }
        },
        required: []
      }
    }
  }
];

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const groqMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages
    ];

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-70b-versatile",
        messages: groqMessages,
        tools: TOOLS,
        tool_choice: "auto",
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error: `Groq API error: ${error}` }, { status: response.status });
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message;

    if (!assistantMessage) {
      return NextResponse.json({ error: "No response from AI" }, { status: 500 });
    }

    const result = {
      content: assistantMessage.content || "",
      toolCalls: assistantMessage.tool_calls || []
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Voice API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
```

---

## Task 5: Create Voice Assistant Hook

**Files:**
- Create: `src/hooks/useVoiceAssistant.ts`

**Step 1: Write the custom hook**

```typescript
"use client";

import { useState, useCallback, useRef } from "react";
import { VoiceState, VoiceMessage } from "@/types/voice";

export function useVoiceAssistant() {
  const [state, setState] = useState<VoiceState>({
    isListening: false,
    isSpeaking: false,
    isLoading: false,
    messages: [],
    error: null
  });

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const messagesRef = useRef<VoiceMessage[]>([]);

  const startListening = useCallback(() => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setState(s => ({ ...s, error: "Speech recognition not supported in this browser" }));
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-GB";

    recognition.onstart = () => {
      setState(s => ({ ...s, isListening: true, error: null }));
    };

    recognition.onresult = async (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map(r => r.transcript)
        .join("");

      if (event.results[0].isFinal) {
        await handleUserMessage(transcript);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setState(s => ({ ...s, isListening: false, error: `Speech error: ${event.error}` }));
    };

    recognition.onend = () => {
      setState(s => ({ ...s, isListening: false }));
    };

    recognition.start();
    recognitionRef.current = recognition;
  }, []);

  const handleUserMessage = async (text: string) => {
    const userMessage: VoiceMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: Date.now()
    };

    messagesRef.current.push(userMessage);
    setState(s => ({ ...s, messages: [...messagesRef.current], isLoading: true }));

    try {
      const response = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messagesRef.current })
      });

      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();

      if (data.toolCalls?.length > 0) {
        for (const toolCall of data.toolCalls) {
          if (toolCall.function.name === "book_lesson") {
            const args = JSON.parse(toolCall.function.arguments);
            await handleBooking(args);
          }
        }
      }

      const assistantMessage: VoiceMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.content || "I can help you with that!",
        timestamp: Date.now()
      };

      messagesRef.current.push(assistantMessage);
      setState(s => ({ ...s, messages: [...messagesRef.current], isLoading: false }));

      if (data.content) {
        await speak(data.content);
      }
    } catch (error) {
      setState(s => ({ ...s, isLoading: false, error: "Failed to get response" }));
    }
  };

  const handleBooking = async (bookingData: Record<string, unknown>) => {
    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) throw new Error("Booking failed");
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  const speak = useCallback((text: string) => {
    if (!("speechSynthesis" in window)) {
      setState(s => ({ ...s, error: "Text-to-speech not supported" }));
      return;
    }

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-GB";
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onstart = () => setState(s => ({ ...s, isSpeaking: true }));
    utterance.onend = () => setState(s => ({ ...s, isSpeaking: false }));
    utterance.onerror = () => setState(s => ({ ...s, isSpeaking: false }));

    synth.cancel();
    synth.speak(utterance);
    synthRef.current = synth;
  }, []);

  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setState(s => ({ ...s, isSpeaking: false }));
    }
  }, []);

  const clearMessages = useCallback(() => {
    messagesRef.current = [];
    setState(s => ({ ...s, messages: [] }));
  }, []);

  const toggleListening = useCallback(() => {
    if (state.isListening && recognitionRef.current) {
      recognitionRef.current.stop();
    } else {
      startListening();
    }
  }, [state.isListening, startListening]);

  return {
    state,
    startListening,
    toggleListening,
    speak,
    stopSpeaking,
    clearMessages
  };
}

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}
```

---

## Task 6: Create Voice Assistant UI Component

**Files:**
- Create: `src/components/VoiceAssistant.tsx`

**Step 1: Write the component**

```typescript
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mic, MicOff, Volume2, VolumeX, X, MessageCircle, Send } from "lucide-react";
import { useVoiceAssistant } from "@/hooks/useVoiceAssistant";

export function VoiceAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const { state, toggleListening, speak, stopSpeaking, clearMessages } = useVoiceAssistant();

  useEffect(() => {
    if (state.messages.length > 0) {
      const lastMessage = state.messages[state.messages.length - 1];
      if (lastMessage.role === "assistant" && isOpen) {
        speak(lastMessage.content);
      }
    }
  }, [state.messages, isOpen, speak]);

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-amber-500 to-red-500 rounded-full shadow-lg flex items-center justify-center"
      >
        <MessageCircle className="w-7 h-7 text-black" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-amber-500/20 to-red-500/20 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-red-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Voice Assistant</h3>
                  <p className="text-xs text-white/50">Alyson&apos;s Driving</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {state.messages.length === 0 && (
                <div className="text-center text-white/40 py-8">
                  <p className="text-sm">Tap the microphone to start talking!</p>
                  <p className="text-xs mt-2">I can help you book lessons or answer questions.</p>
                </div>
              )}
              
              {state.messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === "user"
                      ? "bg-amber-500 text-black rounded-br-md"
                      : "bg-white/10 text-white rounded-bl-md"
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {state.isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 text-white/50 p-3 rounded-2xl rounded-bl-md text-sm">
                    Thinking...
                  </div>
                </div>
              )}

              {state.error && (
                <div className="text-red-400 text-sm text-center p-2 bg-red-500/10 rounded-lg">
                  {state.error}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/10 flex items-center gap-3">
              <button
                onClick={toggleListening}
                disabled={state.isLoading}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  state.isListening
                    ? "bg-red-500 animate-pulse"
                    : "bg-gradient-to-r from-amber-500 to-red-500"
                } disabled:opacity-50`}
              >
                {state.isListening ? (
                  <MicOff className="w-5 h-5 text-white" />
                ) : (
                  <Mic className="w-5 h-5 text-black" />
                )}
              </button>

              <button
                onClick={() => state.isSpeaking ? stopSpeaking() : null}
                disabled={!state.isSpeaking && state.messages.length === 0}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center disabled:opacity-30"
              >
                {state.isSpeaking ? (
                  <VolumeX className="w-4 h-4 text-white" />
                ) : (
                  <Volume2 className="w-4 h-4 text-white/50" />
                )}
              </button>

              <button
                onClick={clearMessages}
                className="text-xs text-white/50 hover:text-white"
              >
                Clear
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

---

## Task 7: Add Voice Assistant to Layout

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Read current layout**

Run: `cat src/app/layout.tsx`

**Step 2: Add import and component**

Add after imports:
```typescript
import { VoiceAssistant } from "@/components/VoiceAssistant";
```

Add inside `<body>` (at the end, before closing tag):
```typescript
<VoiceAssistant />
```

---

## Task 8: Test the Voice Assistant

**Step 1: Start the dev server**

Run: `npm run dev`
Expected: Server starts on http://localhost:3000

**Step 2: Open browser console**

Navigate to http://localhost:3000, open DevTools console

**Step 3: Click the FAB button**

Click the message circle button in bottom-right

**Step 4: Test speech recognition**

Allow microphone permission when prompted. Say "Hello" and wait for response.

**Step 5: Verify TTS**

The assistant should speak its response automatically.

**Step 6: Test booking flow**

Say "I want to book a lesson" and provide details when asked.

---

## Task 9: Lint and Typecheck

**Step 1: Run ESLint**

Run: `npm run lint`
Expected: No errors (or only pre-existing errors)

**Step 2: Run TypeScript check**

Run: `npx tsc --noEmit`
Expected: No errors

---

## Task 10: Commit Changes

**Step 1: Stage files**

Run: `git add -A`

**Step 2: Commit**

Run: `git commit -m "feat: add AI voice assistant with speech recognition and Groq API

- Add Web Speech API for STT/TTS
- Add Groq API integration (llama-3.1-70b-versatile)
- Create voice assistant UI (floating FAB)
- Add function calling for booking system
- Add voice system prompt for driving school context
- Add error handling and loading states"`

---

## Summary

The voice assistant will:
1. Be accessible via floating button on all pages
2. Use browser-native speech recognition (Chrome/Edge)
3. Send transcriptions to Groq API with driving school context
4. Use browser-native TTS to speak responses
5. Support booking via function calling when users express interest

**Note:** Web Speech API requires HTTPS in production (or localhost for development).