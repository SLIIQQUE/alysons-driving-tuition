"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Mic, MicOff, Volume2, Sparkles, Phone } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

type VoiceState = "idle" | "listening" | "speaking" | "connecting";

export default function VoiceAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey there! I'm Alyson's AI assistant. Ask me anything about lessons, pricing, or book your first session!",
    },
  ]);
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [isListening, setIsListening] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const hasStartedRef = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if ("speechSynthesis" in window) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  // Auto-start listening when opened
  useEffect(() => {
    if (isOpen && !hasStartedRef.current) {
      hasStartedRef.current = true;
      // Small delay then start listening
      setTimeout(() => {
        startListening();
      }, 500);
    }
  }, [isOpen]);

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Voice input not supported in this browser." 
      }]);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-GB";

    recognition.onstart = () => {
      setIsListening(true);
      setVoiceState("listening");
    };

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results as any[])
        .map((result: any) => result[0].transcript)
        .join("");

      if (event.results[0].isFinal) {
        if (transcript.trim()) {
          handleVoiceInput(transcript.trim());
        }
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      setVoiceState("idle");
      
      if (event.error !== "no-speech") {
        setMessages(prev => [...prev, { 
          role: "assistant", 
          content: "Sorry, I didn't catch that. Try again!" 
        }]);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      setVoiceState("idle");
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    setVoiceState("idle");
  };

  const handleVoiceInput = async (text: string) => {
    setVoiceState("connecting");
    setMessages((prev) => [...prev, { role: "user", content: text }]);

    try {
      const response = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-6),
        }),
      });

      const data = await response.json();

      if (data.response) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.response },
        ]);
        setVoiceState("speaking");
        speakText(data.response);
      } else if (data.error) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Oops! Something went wrong. Try again?`,
          },
        ]);
        setVoiceState("idle");
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Hmm, I didn't get that. Try again?",
          },
        ]);
        setVoiceState("idle");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connection error. Try again!",
        },
      ]);
      setVoiceState("idle");
    }
  };

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.onend = () => {
        setVoiceState("idle");
        // Auto-listen again after speaking
        setTimeout(() => {
          if (isOpen) startListening();
        }, 500);
      };
      utterance.onerror = () => {
        setVoiceState("idle");
        setTimeout(() => {
          if (isOpen) startListening();
        }, 500);
      };
      speechSynthesis.speak(utterance);
    } else {
      setVoiceState("idle");
      setTimeout(() => {
        if (isOpen) startListening();
      }, 500);
    }
  };

  const closeAndStop = () => {
    stopListening();
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
    }
    setIsOpen(false);
    hasStartedRef.current = false;
  };

  if (!isOpen) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Open voice assistant"
      >
        {/* Pulsing rings */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-500 to-red-500 opacity-30 animate-ping" />
        <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-amber-500/20 to-red-500/20 animate-pulse" />
        
        {/* Main button */}
        <div className="relative w-16 h-16 bg-gradient-to-br from-amber-500 via-amber-400 to-red-500 rounded-full flex items-center justify-center shadow-2xl shadow-amber-500/30 border border-white/10">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
          <Phone className="w-7 h-7 text-white drop-shadow-lg relative z-10" />
          
          {/* Sparkle effect */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1 -right-1"
          >
            <Sparkles className="w-4 h-4 text-white/80" />
          </motion.div>
        </div>
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="fixed bottom-6 right-6 z-50"
    >
      {/* Ambient glow */}
      <div className="absolute -inset-4 bg-gradient-to-br from-amber-500/20 via-red-500/10 to-transparent rounded-3xl blur-2xl" />

      <div className="relative w-[360px] h-[500px] bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }} />
        </div>

        {/* Header */}
        <div className="relative z-10 px-5 py-4 bg-gradient-to-r from-amber-500/10 via-red-500/5 to-transparent border-b border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="relative">
                <div className="w-11 h-11 bg-gradient-to-br from-amber-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                {/* Status indicator */}
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#0a0a0a] ${
                  voiceState === "listening" ? "bg-green-500 animate-pulse" :
                  voiceState === "speaking" ? "bg-amber-500 animate-pulse" :
                  voiceState === "connecting" ? "bg-blue-500 animate-pulse" :
                  "bg-white/30"
                }`} />
              </div>
              
              <div>
                <h3 className="text-white font-semibold text-sm">AI Assistant</h3>
                <p className="text-white/40 text-xs">
                  {voiceState === "listening" && <span className="text-green-400">Listening...</span>}
                  {voiceState === "speaking" && <span className="text-amber-400">Speaking...</span>}
                  {voiceState === "connecting" && <span className="text-blue-400">Thinking...</span>}
                  {voiceState === "idle" && <span className="text-white/50">Tap mic to talk</span>}
                </p>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={closeAndStop}
              className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-white/70" />
            </motion.button>
          </div>

          {/* Sound wave visualization */}
          <AnimatePresence>
            {(voiceState === "listening" || voiceState === "speaking") && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="flex items-center justify-center gap-1 py-3">
                  {[...Array(16)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: voiceState === "listening" 
                          ? ["6px", `${12 + Math.random() * 20}px`, "6px"]
                          : ["6px", `${8 + Math.sin(i * 0.5) * 12}px`, "6px"],
                      }}
                      transition={{
                        duration: voiceState === "listening" ? 0.3 + i * 0.03 : 0.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-1 rounded-full bg-gradient-to-t from-amber-500 to-red-500"
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 relative z-10">
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[90%] px-4 py-3 rounded-2xl text-sm ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-amber-500 to-red-500 text-white rounded-br-sm shadow-lg shadow-amber-500/20"
                      : "bg-white/8 border border-white/10 text-white/90 rounded-bl-sm backdrop-blur-sm"
                  }`}
                >
                  <p>{message.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          <div ref={messagesEndRef} />
        </div>

        {/* Voice controls */}
        <div className="relative z-10 p-5 border-t border-white/5 bg-[#0a0a0a]/50">
          <div className="flex flex-col items-center gap-4">
            {/* Mic button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={isListening ? stopListening : startListening}
              className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                isListening 
                  ? "bg-red-500 shadow-2xl shadow-red-500/40" 
                  : voiceState === "speaking"
                  ? "bg-amber-500 shadow-2xl shadow-amber-500/40"
                  : "bg-gradient-to-br from-amber-500 to-red-500 shadow-2xl shadow-amber-500/30"
              }`}
            >
              {/* Pulsing ring when listening */}
              {isListening && (
                <motion.div
                  animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-red-500"
                />
              )}
              
              {isListening ? (
                <MicOff className="w-8 h-8 text-white" />
              ) : voiceState === "speaking" ? (
                <Volume2 className="w-8 h-8 text-white animate-pulse" />
              ) : (
                <Mic className="w-8 h-8 text-white" />
              )}
            </motion.button>

            {/* Status text */}
            <p className="text-white/40 text-xs text-center">
              {isListening 
                ? "Tap to stop" 
                : voiceState === "speaking"
                ? "Listening..."
                : "Tap to talk"
              }
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
