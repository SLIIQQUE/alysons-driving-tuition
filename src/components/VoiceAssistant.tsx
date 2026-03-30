"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, X, Send, Loader2, Mic, MicOff, Volume2, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

type VoiceState = "idle" | "listening" | "speaking";

export default function VoiceAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey there! I'm Alyson's AI assistant. Ask me anything about lessons, pricing, or book your first session!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [isListening, setIsListening] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

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

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Voice input not supported in this browser. Please type instead." 
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
          content: "Sorry, I didn't catch that. Please try again or type." 
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
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setIsLoading(true);

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
            content: `Oops! Something went wrong: ${data.error}`,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Hmm, I didn't get that. Try again?",
          },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connection error. Please try again!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const speakText = (text: string, onEnd?: () => void) => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.onend = () => {
        setVoiceState("idle");
        if (onEnd) onEnd();
      };
      utterance.onerror = () => {
        setVoiceState("idle");
        if (onEnd) onEnd();
      };
      speechSynthesis.speak(utterance);
    } else {
      if (onEnd) onEnd();
    }
  };

  const speakMessage = (text: string) => {
    setVoiceState("speaking");
    speakText(text);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: messages.slice(-6),
        }),
      });

      const data = await response.json();

      if (data.response) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.response },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Hmm, I didn't get that. Try again?",
          },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connection error. Please try again!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
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

      <div className="relative w-[380px] h-[580px] bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
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
                  "bg-white/30"
                }`} />
              </div>
              
              <div>
                <h3 className="text-white font-semibold text-sm">AI Assistant</h3>
                <p className="text-white/40 text-xs">
                  {voiceState === "listening" && <span className="text-green-400">Listening...</span>}
                  {voiceState === "speaking" && <span className="text-amber-400">Speaking...</span>}
                  {voiceState === "idle" && "Online"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Voice toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={isListening ? stopListening : startListening}
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                  isListening 
                    ? "bg-red-500/20 hover:bg-red-500/30" 
                    : "bg-green-500/20 hover:bg-green-500/30"
                }`}
                aria-label={isListening ? "Stop listening" : "Start voice"}
              >
                {isListening ? (
                  <MicOff className="w-4 h-4 text-red-400" />
                ) : (
                  <Mic className="w-4 h-4 text-green-400" />
                )}
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-white/70" />
              </motion.button>
            </div>
          </div>

          {/* Sound wave visualization */}
          <AnimatePresence>
            {voiceState === "listening" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="flex items-center justify-center gap-1 py-2">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: ["8px", `${16 + Math.random() * 16}px`, "8px"],
                      }}
                      transition={{
                        duration: 0.4 + i * 0.05,
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
        <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10">
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
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-amber-500 to-red-500 text-white rounded-br-sm shadow-lg shadow-amber-500/20"
                      : "bg-white/8 border border-white/10 text-white/90 rounded-bl-sm backdrop-blur-sm"
                  }`}
                >
                  <p>{message.content}</p>
                  {message.role === "assistant" && (
                    <button
                      onClick={() => speakMessage(message.content)}
                      className="mt-2 text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                    >
                      <Volume2 className="w-3 h-3" />
                      Listen
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-white/8 border border-white/10 px-4 py-3 rounded-2xl rounded-bl-sm">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [0.8, 1.2, 0.8] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      className="w-2 h-2 rounded-full bg-amber-500"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="relative z-10 p-4 border-t border-white/5 bg-[#0a0a0a]/50">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-1 py-1">
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={isListening ? stopListening : startListening}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                isListening 
                  ? "bg-red-500 shadow-lg shadow-red-500/30" 
                  : "bg-white/5 hover:bg-white/10"
              }`}
            >
              {isListening ? (
                <MicOff className="w-4 h-4 text-white" />
              ) : (
                <Mic className="w-4 h-4 text-white/70" />
              )}
            </motion.button>
            
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-transparent text-white placeholder:text-white/30 text-sm py-2 focus:outline-none"
              disabled={isLoading}
            />
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-red-500 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-500/20"
            >
              <Send className="w-4 h-4 text-white" />
            </motion.button>
          </div>
          
          {/* Quick suggestions */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
            {["Book a lesson", "Pricing", "Intensive course", "Pass Plus"].map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => {
                  setInput(suggestion);
                }}
                className="flex-shrink-0 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs text-white/60 hover:text-white transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </form>
      </div>
    </motion.div>
  );
}
