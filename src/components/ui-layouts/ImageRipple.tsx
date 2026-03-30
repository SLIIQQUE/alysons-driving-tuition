"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface ImageRippleProps {
  src: string;
  alt: string;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

export function ImageRipple({ src, alt, className }: ImageRippleProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const idCounter = useRef(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovering) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Add ripple
    setRipples((prev) => [...prev, { x, y, id: idCounter.current++ }]);
    
    // Remove old ripples
    setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 1000);
  };

  return (
    <div
      className={cn("relative overflow-hidden rounded-2xl", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
      
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 1,
            height: 1,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, transparent 70%)",
          }}
          initial={{ 
            scale: 0,
            opacity: 0.8,
          }}
          animate={{ 
            scale: 300,
            opacity: 0,
          }}
          transition={{ 
            duration: 1,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

export function ImageReveal({ src, alt, className, direction = "up" }: ImageRippleProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  const getInitialPosition = () => {
    switch (direction) {
      case "up": return { y: "100%" };
      case "down": return { y: "-100%" };
      case "left": return { x: "100%" };
      case "right": return { x: "-100%" };
    }
  };

  return (
    <div 
      className={cn("relative overflow-hidden rounded-2xl", className)}
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
    >
      {/* Cover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#7c3aed] to-[#ec4899] z-10"
        initial={{ x: "0%" }}
        animate={isRevealed ? { x: "-100%" } : { x: "0%" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
      
      {/* Image */}
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        initial={getInitialPosition()}
        animate={isRevealed ? { x: 0, y: 0 } : getInitialPosition()}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
