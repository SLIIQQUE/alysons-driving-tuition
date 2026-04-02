"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Bot, Mic } from "lucide-react";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&h=1080&fit=crop"
          alt="Driving"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
      </motion.div>

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
              width: `${(150 + i * 75) / 16}rem`,
              height: `${(150 + i * 75) / 16}rem`,
              left: `${10 + i * 20}%`,
              top: `${20 + i * 15}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="container">
          <div className="max-w-5xl">
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-white leading-[0.9] mb-8"
            >
              Driving <br /> Lessons in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">
                Blackwood
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35 }}
              className="text-lg md:text-xl text-white/50 max-w-lg mb-12"
            >
              Professional driving lessons in Blackwood, Tredegar, Risca &amp;
              across South Wales
            </motion.p>

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
                  document
                    .querySelector<HTMLButtonElement>("[data-voice-button]")
                    ?.click()
                }
                className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-red-500 text-black font-bold rounded-full overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  Try AI Assistant
                </span>
              </button>
              <button
                onClick={() =>
                  document
                    .querySelector<HTMLButtonElement>("[data-voice-button]")
                    ?.click()
                }
                className="px-8 py-4 border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <Mic className="w-5 h-5" />
                Talk to AI
              </button>
            </motion.div>
          </div>
        </div>
      </div>

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
