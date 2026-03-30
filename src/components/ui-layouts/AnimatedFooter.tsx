"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = {
  services: [
    { name: "Standard Lessons", href: "/services" },
    { name: "Intensive Courses", href: "/services" },
    { name: "Block Bookings", href: "/services" },
    { name: "Pass Plus", href: "/services" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ],
};

function AnimatedLogo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; vx: number; vy: number; size: number; color: string }[] = [];
    const colors = ["#7c3aed", "#ec4899", "#f59e0b", "#10b981"];

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    });

    for (let i = 0; i < 50; i++) {
      particles.push(createParticle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Mouse interaction
        const dx = mousePos.x - p.x;
        const dy = mousePos.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          p.x -= dx * 0.02;
          p.y -= dy * 0.02;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Connect nearby particles
        particles.slice(i + 1).forEach((p2) => {
          const dx2 = p2.x - p.x;
          const dy2 = p2.y - p.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (dist2 < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color + "30";
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={80}
      className="absolute inset-0"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }}
    />
  );
}

export function AnimatedFooter() {
  return (
    <footer className="relative bg-[#0a0a0a] text-white overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#7c3aed]/10 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#7c3aed]/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand with animated logo */}
          <div className="lg:col-span-2">
            <div className="relative h-20 w-48 mb-6">
              <AnimatedLogo />
              <Link href="/" className="relative z-10 flex items-center gap-2">
                <div className="w-12 h-12 bg-gradient-to-br from-[#7c3aed] to-[#ec4899] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <span className="font-heading font-bold text-2xl">
                  Alyson&apos;s <span className="text-gradient">Driving</span>
                </span>
              </Link>
            </div>
            <p className="text-[#a3a3a3] mb-6 max-w-md">
              Patient, friendly driving instruction in South Wales. Helping you learn to drive with confidence since 2004.
            </p>
            <div className="flex gap-4">
              {["facebook", "instagram", "twitter"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center hover:bg-[#7c3aed] transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6">Services</h3>
            <ul className="space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-[#a3a3a3] hover:text-white transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#7c3aed]" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-[#a3a3a3] hover:text-white transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#7c3aed]" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-[#a3a3a3]">
                <Phone className="w-5 h-5 text-[#7c3aed]" />
                <a href="tel:01234567890" className="hover:text-white transition-colors">01234 567890</a>
              </li>
              <li className="flex items-center gap-3 text-[#a3a3a3]">
                <Mail className="w-5 h-5 text-[#7c3aed]" />
                <a href="mailto:info@alysonsdriving.co.uk" className="hover:text-white transition-colors">info@alysonsdriving.co.uk</a>
              </li>
              <li className="flex items-center gap-3 text-[#a3a3a3]">
                <MapPin className="w-5 h-5 text-[#7c3aed]" />
                <span>Blackwood, South Wales</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[#333] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#666] text-sm">
            &copy; {new Date().getFullYear()} Alyson&apos;s Driving Tuition. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[#666] hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-[#666] hover:text-white text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
