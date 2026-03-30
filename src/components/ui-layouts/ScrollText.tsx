"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

interface ScrollTextProps {
  text: string;
  className?: string;
  direction?: "left" | "right";
  speed?: number;
}

export function ScrollTextMarquee({ text, className, direction = "left", speed = 30 }: ScrollTextProps) {
  return (
    <div className={cn("overflow-hidden py-8 bg-gradient-to-r from-[#7c3aed] to-[#ec4899]", className)}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <span className="text-4xl md:text-6xl font-heading font-bold text-white px-8">
          {text}
        </span>
        <span className="text-4xl md:text-6xl font-heading font-bold text-white px-8">
          {text}
        </span>
        <span className="text-4xl md:text-6xl font-heading font-bold text-white px-8">
          {text}
        </span>
        <span className="text-4xl md:text-6xl font-heading font-bold text-white px-8">
          {text}
        </span>
      </motion.div>
    </div>
  );
}

interface ScrollTextProps {
  text: string;
  className?: string;
}

export function TextReveal({ text, className }: ScrollTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-4xl md:text-6xl font-heading font-bold"
      >
        {text}
      </motion.div>
    </div>
  );
}

interface WordRevealProps {
  text: string;
  className?: string;
}

export function WordReveal({ text, className }: WordRevealProps) {
  const words = text.split(" ");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className={cn("flex flex-wrap gap-2", className)}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="inline-block"
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </div>
  );
}

interface CharRevealProps {
  text: string;
  className?: string;
}

export function CharReveal({ text, className }: CharRevealProps) {
  const chars = text.split("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className={cn("flex", className)}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -90 }}
          transition={{ duration: 0.5, delay: i * 0.03 }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}
