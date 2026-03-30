"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
}

export function SpotlightCard({ children, className }: SpotlightCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative group overflow-hidden rounded-2xl bg-white/5 border border-white/10",
        className
      )}
    >
      {/* Spotlight effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(30, 64, 175, 0.15), transparent 80%)`,
        }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay?: number;
}

export function FeatureCard({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <SpotlightCard className="p-8 h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
      >
        <div className="w-14 h-14 bg-[#f59e0b]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-7 h-7 text-[#f59e0b]" />
        </div>
        <h3 className="font-heading font-bold text-xl text-white mb-3">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </motion.div>
    </SpotlightCard>
  );
}

interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  price: string;
  cta: string;
  href: string;
  delay?: number;
}

export function ServiceCard({ icon: Icon, title, description, features, price, cta, href, delay = 0 }: ServiceCardProps) {
  return (
    <SpotlightCard className="p-8 h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
      >
        <div className="w-14 h-14 bg-[#1e40af]/10 rounded-xl flex items-center justify-center mb-6">
          <Icon className="w-7 h-7 text-[#1e40af]" />
        </div>
        <h3 className="font-heading font-bold text-2xl text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3 text-gray-600">
              <div className="w-5 h-5 bg-[#10b981]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          <span className="text-2xl font-bold text-[#1e40af]">{price}</span>
          <a
            href={href}
            className="px-6 py-2.5 bg-[#1e40af] text-white font-semibold rounded-xl hover:bg-[#1e40af]/90 transition-all hover:scale-105"
          >
            {cta}
          </a>
        </div>
      </motion.div>
    </SpotlightCard>
  );
}
