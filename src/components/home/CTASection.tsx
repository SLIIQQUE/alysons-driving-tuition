"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Bot, Mic } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-40 overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&h=800&fit=crop"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/60" />

      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, delay: i }}
            className="absolute w-32 h-32 bg-amber-500/20 rounded-full blur-2xl"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 text-amber-400 text-sm font-medium rounded-full mb-6">
            <Bot className="w-4 h-4" />
            AI Powered
          </span>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
            Talk to Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-400">AI Assistant</span>
          </h2>
          <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
            Get instant answers, check pricing, or book your first lesson — 
            just click the button and start talking!
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button
              onClick={() => document.querySelector<HTMLButtonElement>('[data-voice-button]')?.click()}
              className="group px-10 py-5 bg-gradient-to-r from-amber-500 to-red-500 text-black font-bold rounded-full text-lg hover:scale-105 transition-transform flex items-center gap-3"
            >
              <Mic className="w-5 h-5" />
              Try AI Assistant
            </button>
            <button
              onClick={() => document.querySelector<HTMLButtonElement>('[data-voice-button]')?.click()}
              className="px-10 py-5 border-2 border-white/30 text-white font-bold rounded-full text-lg hover:bg-white/10 transition-colors"
            >
              Try AI Assistant
            </button>
          </div>
          <p className="text-white/40 text-sm mt-6">
            Available 24/7 • No booking needed • Free to use
          </p>
        </motion.div>
      </div>
    </section>
  );
}