"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { MessageCircle } from "lucide-react";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Background */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&h=1080&fit=crop"
          alt="Driving"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={75}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
      </motion.div>

      {/* Animated circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.5, 1] }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className={`absolute rounded-full blur-3xl ${i % 2 === 0 ? "bg-amber-500/20" : "bg-red-500/20"}`}
            style={{
              width: 200 + i * 100,
              height: 200 + i * 100,
              left: `${10 + i * 20}%`,
              top: `${20 + i * 15}%`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-8"
            >
              <span className="inline-block px-6 py-3 bg-gradient-to-r from-amber-500 to-red-500 rounded-full font-semibold text-black">
                98% Recommend — 33 Reviews
              </span>
            </motion.div>

            <h1 className="sr-only">Driving Lessons in South Wales - Alyson&apos;s Driving Tuition</h1>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mb-8"
            >
              <span className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-white leading-[0.9]">
                Drive with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">
                  Confidence
                </span>
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/70 max-w-xl mb-12"
            >
              20+ years experience teaching people to drive safely. Patient,
              friendly instruction tailored to you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("openVoiceAssistant"))
                }
                className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-red-500 text-black font-bold rounded-full overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Chat with AI Assistant
                </span>
              </button>
              <Link
                href="/contact"
                className="px-8 py-4 border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                Book a Lesson
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-8 h-14 border-2 border-white/30 rounded-full flex justify-center p-2"
        >
          <motion.div className="w-1.5 h-3 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
