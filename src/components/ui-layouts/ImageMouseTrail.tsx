"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface ImageMouseTrailProps {
  children: React.ReactNode;
  className?: string;
}

export function ImageMouseTrail({ children, className }: ImageMouseTrailProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const idCounter = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });

      // Add to trail
      const newTrailPoint = { x, y, id: idCounter.current++ };
      setTrail((prev) => [...prev.slice(-20), newTrailPoint]);
    };

    const element = ref.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      {children}
      
      {/* Trail effect */}
      <svg className="absolute inset-0 pointer-events-none" style={{ mixBlendMode: "screen" }}>
        {trail.map((point, i) => (
          <motion.circle
            key={point.id}
            cx={point.x}
            cy={point.y}
            r={Math.max(0, 30 - i * 1.5)}
            fill="url(#gradient)"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        ))}
        <defs>
          <radialGradient id="gradient">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* Mouse follower */}
      <motion.div
        className="absolute w-8 h-8 rounded-full pointer-events-none"
        style={{
          background: "linear-gradient(135deg, #7c3aed, #ec4899)",
        }}
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
    </div>
  );
}

interface SpotlightProps {
  children: React.ReactNode;
  className?: string;
}

export function Spotlight({ children, className }: SpotlightProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    };

    const element = ref.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
    >
      {children}
      
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(124, 58, 237, 0.15) 0%, transparent 50%)`,
        }}
      />
    </div>
  );
}
