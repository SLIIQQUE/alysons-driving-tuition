"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
}

export function HorizontalScroll({ children, className }: HorizontalScrollProps) {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className={cn("relative h-[300vh]", className)}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8 px-8">
          {children}
        </motion.div>
      </div>
    </section>
  );
}

interface HorizontalScrollCardsProps {
  cards: {
    title: string;
    description: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}

export function HorizontalScrollCards({ cards, className }: HorizontalScrollCardsProps) {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-85%"]);

  return (
    <section ref={targetRef} className={cn("relative h-[300vh]", className)}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-6 px-4">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex-shrink-0 w-[400px] bg-[#1a1a1a] border border-[#333] rounded-2xl p-8 hover:border-[#7c3aed] transition-colors"
            >
              {card.icon && (
                <div className="w-14 h-14 bg-gradient-to-br from-[#7c3aed] to-[#ec4899] rounded-xl flex items-center justify-center mb-6">
                  {card.icon}
                </div>
              )}
              <h3 className="text-2xl font-heading font-bold text-white mb-3">{card.title}</h3>
              <p className="text-[#a3a3a3]">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
