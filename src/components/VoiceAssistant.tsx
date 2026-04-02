"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mic, MicOff, Volume2, VolumeX, X, MessageCircle } from "lucide-react";
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