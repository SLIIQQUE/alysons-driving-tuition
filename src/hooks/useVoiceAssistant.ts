"use client";

import { useState, useCallback, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── SpeechRecognition type declarations ─────────────────────────────────────
// NOTE: event.results[i] is a SpeechRecognitionResult (array-like of alternatives)
// The actual transcript lives at event.results[i][0].transcript — NOT event.results[i].transcript

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useVoiceAssistant() {
  const [state, setState] = useState<VoiceState>({
    isListening: false,
    isSpeaking: false,
    isLoading: false,
    messages: [],
    error: null,
  });

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const messagesRef = useRef<VoiceMessage[]>([]);

  // ─── Speak ──────────────────────────────────────────────────────────────────

  const speak = useCallback((text: string) => {
    if (!("speechSynthesis" in window)) {
      setState((s) => ({
        ...s,
        error: "Text-to-speech not supported in this browser",
      }));
      return;
    }

    const synth = window.speechSynthesis;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-GB";
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onstart = () => setState((s) => ({ ...s, isSpeaking: true }));
    utterance.onend = () => setState((s) => ({ ...s, isSpeaking: false }));
    utterance.onerror = () => setState((s) => ({ ...s, isSpeaking: false }));

    synth.speak(utterance);
    synthRef.current = synth;
  }, []);

  // ─── Stop Speaking ──────────────────────────────────────────────────────────

  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setState((s) => ({ ...s, isSpeaking: false }));
    }
  }, []);

  // ─── Handle Booking Tool Call ────────────────────────────────────────────────

  const handleBooking = useCallback(
    async (bookingData: Record<string, unknown>) => {
      try {
        const response = await fetch("/api/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        });

        if (!response.ok) {
          const error = await response.text();
          console.error("[voice] Booking API error:", error);
          throw new Error("Booking failed");
        }

        console.log("[voice] Booking successful");
      } catch (error) {
        console.error("[voice] handleBooking error:", error);
      }
    },
    [],
  );

  // ─── Handle User Message ─────────────────────────────────────────────────────

  const handleUserMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) {
        console.warn("[voice] Empty transcript received, skipping");
        return;
      }

      console.log("[voice] Sending to API:", text);

      const userMessage: VoiceMessage = {
        id: Date.now().toString(),
        role: "user",
        content: text.trim(),
        timestamp: Date.now(),
      };

      messagesRef.current = [...messagesRef.current, userMessage];
      setState((s) => ({
        ...s,
        messages: [...messagesRef.current],
        isLoading: true,
        error: null,
      }));

      try {
        // Strip id + timestamp — Groq only accepts role + content
        const payload = messagesRef.current.map(({ role, content }) => ({
          role,
          content,
        }));

        const response = await fetch("/api/voice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: payload }),
        });

        console.log("[voice] /api/voice response status:", response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("[voice] API error:", response.status, errorText);
          throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        console.log("[voice] API response:", data);

        if (Array.isArray(data.toolCalls) && data.toolCalls.length > 0) {
          for (const toolCall of data.toolCalls) {
            if (toolCall?.function?.name === "book_lesson") {
              try {
                const args = JSON.parse(toolCall.function.arguments);
                await handleBooking(args);
              } catch (parseError) {
                console.error(
                  "[voice] Failed to parse tool call args:",
                  parseError,
                );
              }
            }
          }
        }

        const assistantMessage: VoiceMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.content || "I can help you with that!",
          timestamp: Date.now(),
        };

        messagesRef.current = [...messagesRef.current, assistantMessage];
        setState((s) => ({
          ...s,
          messages: [...messagesRef.current],
          isLoading: false,
        }));

        if (data.content) {
          speak(data.content);
        }
      } catch (error) {
        console.error("[voice] handleUserMessage error:", error);
        setState((s) => ({
          ...s,
          isLoading: false,
          error: "Failed to get response",
        }));
      }
    },
    [handleBooking, speak],
  );

  // ─── Start Listening ─────────────────────────────────────────────────────────

  const startListening = useCallback(() => {
    const SpeechRecognitionAPI =
      typeof window !== "undefined"
        ? window.SpeechRecognition || window.webkitSpeechRecognition
        : null;

    if (!SpeechRecognitionAPI) {
      console.error("[speech] SpeechRecognition not available");
      setState((s) => ({
        ...s,
        error: "Speech recognition not supported. Please use Chrome or Edge.",
      }));
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const recognition =
      new SpeechRecognitionAPI() as unknown as SpeechRecognition;
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-GB";

    recognition.onstart = () => {
      console.log("[speech] Started listening");
      setState((s) => ({ ...s, isListening: true, error: null }));
    };

    recognition.onresult = async (event: SpeechRecognitionEvent) => {
      // ✅ CORRECT: event.results[i][0].transcript — NOT event.results[i].transcript
      // event.results[i] is a SpeechRecognitionResult (array of alternatives)
      // [0] selects the highest-confidence alternative
      const transcript = Array.from({ length: event.results.length })
        .map((_, i) => event.results[i][0].transcript)
        .join("");

      const isFinal = event.results[event.results.length - 1]?.isFinal;

      console.log("[speech] transcript:", transcript);
      console.log("[speech] isFinal:", isFinal);

      if (isFinal) {
        console.log("[speech] Final transcript — sending to API");
        await handleUserMessage(transcript);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("[speech] Error:", event.error);
      setState((s) => ({
        ...s,
        isListening: false,
        error: `Microphone error: ${event.error}`,
      }));
    };

    recognition.onend = () => {
      console.log("[speech] Recognition ended");
      setState((s) => ({ ...s, isListening: false }));
    };

    recognition.start();
    recognitionRef.current = recognition;
  }, [handleUserMessage]);

  // ─── Toggle Listening ────────────────────────────────────────────────────────

  const toggleListening = useCallback(() => {
    if (state.isListening && recognitionRef.current) {
      recognitionRef.current.stop();
    } else {
      startListening();
    }
  }, [state.isListening, startListening]);

  // ─── Clear Messages ──────────────────────────────────────────────────────────

  const clearMessages = useCallback(() => {
    messagesRef.current = [];
    setState((s) => ({ ...s, messages: [], error: null }));
  }, []);

  return {
    state,
    startListening,
    toggleListening,
    speak,
    stopSpeaking,
    clearMessages,
  };
}
