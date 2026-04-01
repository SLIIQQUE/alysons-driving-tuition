"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { AnimateOnScroll } from "./AnimateOnScroll";

export default function CTASection() {
  return (
    <section className="relative py-40 overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&h=800&fit=crop"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        quality={60}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/60" />

      <div className="absolute inset-0 pointer-events-none">
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
        <AnimateOnScroll>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-8">
              Start Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-400">
                Journey
              </span>{" "}
              Today
            </h2>
            <p className="text-xl text-white/60 mb-12">
              Book your first lesson and discover why we&apos;re South Wales&apos;
              most trusted driving school
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("openVoiceAssistant"))
                }
                className="group px-10 py-5 bg-gradient-to-r from-amber-500 to-red-500 text-black font-bold rounded-full text-lg hover:scale-105 transition-transform flex items-center gap-3"
              >
                <MessageCircle className="w-5 h-5" />
                Chat with AI Assistant
              </button>
              <Link
                href="/contact"
                className="px-10 py-5 border-2 border-white/30 text-white font-bold rounded-full text-lg hover:bg-white/10 transition-colors"
              >
                Book Your First Lesson
              </Link>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
