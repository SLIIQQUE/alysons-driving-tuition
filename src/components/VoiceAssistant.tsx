"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Mic, Volume2, Phone, MessageSquare, Send, Keyboard } from "lucide-react";
import { GoogleGenAI, Modality } from "@google/genai";

interface Message {
  role: "user" | "assistant";
  content: string;
}

type VoiceState = "idle" | "listening" | "speaking" | "connecting";
type Mode = "voice" | "chat";

const SYSTEM_INSTRUCTION = `You are the friendly, professional receptionist for Alyson's Driving Tuition in South Wales.

KEY INFORMATION:
- Instructor: Alyson Baldwin, DVSA Approved, Grade A, 20+ years experience
- Location: Blackwood, NP12, South Wales
- Phone: 07791 489244
- Email: alysonbaldwin1@mail.co.uk
- Services: Standard lessons, Block bookings (5+ hrs save 5-15%), Intensive courses, Pass Plus, Refresher lessons
- Areas: Blackwood, Tredegar, Risca, Newport and surrounding South Wales
- Hours: Monday-Saturday 8am-8pm, Sunday by arrangement
- Reviews: 98% recommend (33 reviews on Facebook)

RESPONSE STYLE:
- Warm, conversational, professional
- Keep answers concise for voice (15-25 words)
- Always offer to book a lesson

If asked something you don't know: "That's a great question - let me transfer you to Alyson directly at 07791 489244."`;

export default function VoiceAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("voice");
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm here to help you with driving lessons. Ask me anything or type a message!" }
  ]);
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [connectionStatus, setConnectionStatus] = useState("");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasStartedRef = useRef(false);
  
  const sessionRef = useRef<any>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const recordContextRef = useRef<AudioContext | null>(null);
  const nextPlayTimeRef = useRef<number>(0);
  const activeSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openVoiceAssistant', handleOpen);
    return () => window.removeEventListener('openVoiceAssistant', handleOpen);
  }, []);

  useEffect(() => {
    return () => { cleanup(); };
  }, []);

  useEffect(() => {
    if (isOpen && mode === "voice" && !hasStartedRef.current) {
      hasStartedRef.current = true;
      setTimeout(() => startVoiceSession(), 800);
    }
  }, [isOpen, mode]);

  useEffect(() => {
    if (mode === "chat" && isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [mode, isOpen]);

  const cleanup = useCallback(() => {
    if (sessionRef.current) {
      try {
        sessionRef.current.close?.();
      } catch (e) {
        // Ignore edge cases
      }
      sessionRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (recordContextRef.current) {
      recordContextRef.current.close();
      recordContextRef.current = null;
    }
    setVoiceState("idle");
  }, []);

  const playAudio = useCallback((base64Data: string) => {
    try {
      if (!audioContextRef.current || audioContextRef.current.state === "closed") {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioCtx({ sampleRate: 24000 });
        nextPlayTimeRef.current = 0;
      }
      
      const audioContext = audioContextRef.current;
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }

      const binary = atob(base64Data);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      
      const float32Data = new Float32Array(bytes.length / 2);
      const view = new DataView(bytes.buffer);
      for (let i = 0; i < float32Data.length; i++) {
        const s = view.getInt16(i * 2, true);
        float32Data[i] = s / 32768.0;
      }
      
      const audioBuffer = audioContext.createBuffer(1, float32Data.length, 24000);
      audioBuffer.getChannelData(0).set(float32Data);
      
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      
      const now = audioContext.currentTime;
      const playAt = Math.max(now, nextPlayTimeRef.current);
      
      // Track source for interruption
      activeSourcesRef.current.add(source);
      source.onended = () => {
        activeSourcesRef.current.delete(source);
      };

      source.start(playAt);
      nextPlayTimeRef.current = playAt + audioBuffer.duration;
      
    } catch (err) {
      console.error("Audio playback error:", err);
    }
  }, []);

  const startVoiceSession = useCallback(async () => {
    try {
      setVoiceState("connecting");
      setConnectionStatus("Getting secure token...");
      
      // Request ephemeral token from backend
      const res = await fetch("/api/gemini/token", { method: "POST" });
      const data = await res.json();
      
      if (!res.ok || !data.token) {
        throw new Error(data.error || "Failed to get token");
      }

      setConnectionStatus("Connecting to Gemini...");

      // Initialize with the ephemeral token
      const ai = new GoogleGenAI({ apiKey: data.token, httpOptions: { apiVersion: "v1alpha" } });
      
      const startAudioCapture = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            audio: { sampleRate: 16000, channelCount: 1, echoCancellation: true, noiseSuppression: true }
          });
          mediaStreamRef.current = stream;
          
          const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
          const audioCtx = new AudioCtx({ sampleRate: 16000 });
          recordContextRef.current = audioCtx;
          
          const source = audioCtx.createMediaStreamSource(stream);
          // Use smallest buffer (256) for lowest input latency (~16ms at 16kHz)
          const processor = audioCtx.createScriptProcessor(256, 1, 1);
          
          processor.onaudioprocess = (e) => {
            if (!sessionRef.current) return;
            const inputData = e.inputBuffer.getChannelData(0);
            const pcm16 = new Int16Array(inputData.length);
            for (let i = 0; i < inputData.length; i++) {
              const s = Math.max(-1, Math.min(1, inputData[i]));
              pcm16[i] = (s * 32767) | 0;
            }
            // Fast base64 via binary string
            const bytes = new Uint8Array(pcm16.buffer);
            let binary = '';
            for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
            try {
              sessionRef.current.sendRealtimeInput({
                audio: { data: btoa(binary), mimeType: "audio/pcm;rate=16000" }
              });
            } catch (err) {}
          };
          
          source.connect(processor);
          processor.connect(audioCtx.destination);
          
        } catch (e) { 
           console.error(e);
           setConnectionStatus("Microphone error");
           setVoiceState("idle");
        }
      };
      
      const session = await ai.live.connect({
        model: 'gemini-3.1-flash-live-preview',
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
        },
        callbacks: {
          onopen: () => {
             setConnectionStatus("Connected");
             setVoiceState("listening");
             startAudioCapture();
          },
          onmessage: async (response: any) => {
            const content = response.serverContent;
            
            if (content?.modelTurn?.parts) {
               for (const part of content.modelTurn.parts) {
                 if (part.inlineData?.data) {
                    setVoiceState("speaking");
                    await playAudio(part.inlineData.data);
                 }
               }
            }
            
            if (content?.inputTranscription?.text) {
               setMessages(prev => [...prev, { role: "user", content: content.inputTranscription.text }]);
            }
            if (content?.outputTranscription?.text) {
               setMessages(prev => [...prev, { role: "assistant", content: content.outputTranscription.text }]);
            }
             if (content?.interrupted) {
               // Stop all active audio immediately
               activeSourcesRef.current.forEach(source => {
                 try { source.stop(); } catch (e) {}
               });
               activeSourcesRef.current.clear();
               nextPlayTimeRef.current = 0;
               setVoiceState("listening");
            }
            if (content?.turnComplete) {
               setVoiceState("listening");
            }
          },
          onerror: (error: any) => {
            console.error("Gemini API Error Event:", error);
            if (error instanceof Error) console.error("Message:", error.message);
            setConnectionStatus("Connection error (check console)");
            setVoiceState("idle");
          },
          onclose: () => {
            setVoiceState("idle");
            setConnectionStatus("");
          }
        }
      });
      
      sessionRef.current = session;
      
    } catch (error: unknown) {
      setConnectionStatus(`Error: ${error instanceof Error ? error.message : "Unknown"}`);
      setVoiceState("idle");
    }
  }, [playAudio]);

  const stopVoiceSession = useCallback(() => {
    cleanup();
    setConnectionStatus("");
  }, [cleanup]);

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;

    setInputText("");
    setVoiceState("connecting");
    setMessages((prev) => [...prev, { role: "user", content: messageText }]);

    try {
      const chatMessages = [...messages, { role: "user", content: messageText }];
      
      const response = await fetch("/api/gemini/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
             messages: chatMessages, 
             systemInstruction: SYSTEM_INSTRUCTION
          })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API error: ${response.status}`);
      }

      const data = await response.json();
      const responseText = data.text;
      
      if (responseText) {
        setMessages((prev) => [...prev, { role: "assistant", content: responseText }]);
        if (mode === "voice") {
          setVoiceState("speaking");
          speakText(responseText);
        } else {
          setVoiceState("idle");
        }
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: "Something went wrong!" }]);
        setVoiceState("idle");
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Unknown error";
      setMessages((prev) => [...prev, { role: "assistant", content: `Error: ${errorMsg}` }]);
      setVoiceState("idle");
    }
  };

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.onend = () => setVoiceState("idle");
      utterance.onerror = () => setVoiceState("idle");
      speechSynthesis.speak(utterance);
    } else {
      setVoiceState("idle");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const closeAndStop = () => {
    stopVoiceSession();
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    setIsOpen(false);
    hasStartedRef.current = false;
  };

  const switchToVoice = () => {
    if (mode === "chat") {
       setMode("voice");
       hasStartedRef.current = false;
       setIsOpen(true);
       setTimeout(() => startVoiceSession(), 800);
    }
  };

  if (!isOpen) {
    return (
      <motion.button
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Open chat"
      >
        <div className="absolute -inset-3 bg-gradient-to-r from-amber-500 via-orange-400 to-red-500 rounded-full opacity-40 blur-xl animate-pulse" />
        <div className="relative w-16 h-16 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl border border-white/20 overflow-hidden">
          <MessageSquare className="w-7 h-7 text-white drop-shadow-lg" />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full"
          />
        </div>
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 30 }}
      transition={{ type: "spring", damping: 22, stiffness: 250 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="relative w-[360px] bg-[#0d0d0d]/95 backdrop-blur-xl border border-white/[0.08] rounded-[28px] shadow-2xl overflow-hidden">
        <div className="relative px-4 py-3 bg-gradient-to-br from-amber-500/[0.15] via-orange-500/[0.08] to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  {mode === "voice" ? <Phone className="w-5 h-5 text-white" /> : <MessageSquare className="w-5 h-5 text-white" />}
                </div>
                <motion.div
                  animate={{ 
                    scale: voiceState === "listening" ? [1, 1.3, 1] : 1,
                    opacity: voiceState === "listening" ? [1, 0.5, 1] : 1
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#0d0d0d] ${
                    voiceState === "listening" ? "bg-green-400" :
                    voiceState === "speaking" ? "bg-orange-400" :
                    voiceState === "connecting" ? "bg-blue-400" :
                    "bg-white/40"
                  }`}
                />
              </div>
              <div>
                <h3 className="text-white font-semibold text-[15px]">{mode === "voice" ? "Voice Chat" : "Chat"}</h3>
                <p className="text-white/35 text-[11px]">
                  {voiceState === "listening" && "Listening..."}
                  {voiceState === "speaking" && "Speaking..."}
                  {voiceState === "connecting" && (connectionStatus || "Connecting...")}
                  {voiceState === "idle" && (mode === "voice" ? "Tap mic to talk" : "Type a message")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  if (mode === "voice") { stopVoiceSession(); setMode("chat"); setVoiceState("idle"); }
                  else { setMode("voice"); }
                }}
                className="w-8 h-8 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] flex items-center justify-center transition-colors"
               aria-label="Toggle mode"
              >
                {mode === "voice" ? <Keyboard className="w-4 h-4 text-white/50" /> : <Mic className="w-4 h-4 text-white/50" />}
              </motion.button>
              <motion.button aria-label="Close chat" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={closeAndStop} className="w-8 h-8 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] flex items-center justify-center transition-colors">
                <X className="w-4 h-4 text-white/50" />
              </motion.button>
            </div>
          </div>
        </div>

        <div className="h-[320px] overflow-y-auto p-4 space-y-3">
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[88%] px-4 py-3 rounded-[20px] text-[13px] leading-relaxed ${
                  message.role === "user"
                    ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-tr-sm shadow-lg shadow-amber-500/20"
                    : "bg-white/[0.06] text-white/80 rounded-tl-sm border border-white/[0.05]"
                }`}>
                  {message.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {voiceState === "connecting" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-white/[0.06] border border-white/[0.05] px-4 py-3 rounded-[20px] rounded-tl-sm">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div key={i} animate={{ scale: [0.6, 1.2, 0.6], opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }} className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-white/[0.05] bg-gradient-to-t from-black/20 to-transparent">
          {mode === "voice" ? (
            <div className="flex flex-col items-center gap-3">
              <motion.button
                aria-label="Toggle voice"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                onClick={voiceState === "idle" ? startVoiceSession : stopVoiceSession}
                className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                  voiceState === "listening" || voiceState === "speaking"
                    ? "bg-gradient-to-br from-red-400 to-red-600 shadow-xl shadow-red-500/30" 
                    : "bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 shadow-xl shadow-amber-500/25"
                }`}
              >
                {voiceState === "listening" && (
                  <>
                    <motion.div animate={{ scale: [1, 2], opacity: [0.4, 0] }} transition={{ duration: 1.2, repeat: Infinity }} className="absolute inset-0 rounded-full bg-red-400" />
                    <motion.div animate={{ scale: [1, 1.7], opacity: [0.3, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }} className="absolute inset-0 rounded-full bg-red-400" />
                  </>
                )}
                {voiceState === "speaking" && <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.8, repeat: Infinity }}><Volume2 className="w-7 h-7 text-white" /></motion.div>}
                {voiceState === "idle" && <Mic className="w-7 h-7 text-white" />}
                {voiceState === "connecting" && <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><Phone className="w-6 h-6 text-white" /></motion.div>}
              </motion.button>
              <p className="text-white/30 text-[11px]">
                {voiceState === "listening" ? "Tap to stop" : voiceState === "speaking" ? "Speaking..." : "Tap to start voice chat"}
              </p>
              <button onClick={() => { stopVoiceSession(); setMode("chat"); }} className="text-white/30 text-xs hover:text-white/50 transition-colors flex items-center gap-1">
                <Keyboard className="w-3 h-3" /> Or type a message
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  placeholder="Type your message..."
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-white/[0.06] border border-white/[0.1] rounded-2xl px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                />
                <motion.button
                  aria-label="Send message"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim() || voiceState === "connecting"}
                  className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5 text-white" />
                </motion.button>
              </div>
              <button onClick={switchToVoice} className="text-white/30 text-xs hover:text-white/50 transition-colors flex items-center justify-center gap-1">
                <Mic className="w-3 h-3" /> Or talk with voice
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
