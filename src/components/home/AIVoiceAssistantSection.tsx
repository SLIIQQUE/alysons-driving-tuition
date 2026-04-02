"use client";

import { motion } from "motion/react";
import { Bot, Mic, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Voice Activated",
    description: "Simply tap and speak — no typing needed",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Bot,
    title: "Instant Answers",
    description: "Get immediate responses about pricing, courses & availability",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Calendar,
    title: "Easy Booking",
    description: "Book your lesson directly through conversation",
    color: "from-emerald-500 to-green-500",
  },
  {
    icon: Clock,
    title: "Available 24/7",
    description: "Get help anytime — day or night",
    color: "from-blue-500 to-cyan-500",
  },
];

export function AIVoiceAssistantSection() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-[#0a0a0a] to-[#111] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-amber-500/10 rounded-full blur-[80px] md:blur-[150px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-500 text-sm font-medium rounded-full mb-6">
            <Bot className="w-4 h-4" />
            AI Powered
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Talk to <span className="text-gradient">Alyson&apos;s AI</span>
          </h2>
          <p className="text-white/50 text-xl max-w-2xl mx-auto">
            Our intelligent voice assistant is available 24/7 to help you book lessons, 
            answer questions, and guide you through your driving journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-card p-6 border-glow group hover:border-amber-500/30"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-white/50 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-amber-500 font-semibold mb-4">
            Try it now — look for the voice button in the corner!
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 btn btn-primary"
          >
            Or book a lesson <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}