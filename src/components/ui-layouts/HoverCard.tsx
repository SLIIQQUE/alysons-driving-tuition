"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
}

export function HoverCard({ children, className }: HoverCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const rotateX = useSpring(y, springConfig);
  const rotateY = useSpring(x, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((e.clientX - centerX) / 20);
    y.set((e.clientY - centerY) / 20);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn("transition-all duration-300", className)}
    >
      {children}
    </motion.div>
  );
}

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowCard({ children, className, glowColor = "#7c3aed" }: GlowCardProps) {
  return (
    <div className={cn("relative group", className)}>
      {/* Glow effect */}
      <div
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"
        style={{
          background: `linear-gradient(135deg, ${glowColor}, #ec4899)`,
        }}
      />
      <div className="relative bg-[#1a1a1a] border border-[#333] rounded-2xl p-8 group-hover:border-transparent transition-all duration-300">
        {children}
      </div>
    </div>
  );
}

interface GradientBorderProps {
  children: React.ReactNode;
  className?: string;
}

export function GradientBorder({ children, className }: GradientBorderProps) {
  return (
    <div className={cn("relative rounded-2xl p-[2px]", className)}>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#7c3aed] via-[#ec4899] to-[#f59e0b] animate-gradient" />
      <div className="relative bg-[#0f0f0f] rounded-2xl">
        {children}
      </div>
    </div>
  );
}
