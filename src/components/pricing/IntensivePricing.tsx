"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";

const intensivePackages = [
  {
    name: "1-Week Intensive",
    duration: "7 days",
    hours: "35 hours",
    price: "£650",
    description: "Pass in just one week",
    features: [
      "5 hours daily",
      "Mock test included",
      "Flexible start dates",
      "Test booking included",
      "Intensive prep",
    ],
  },
  {
    name: "2-Week Intensive",
    duration: "14 days",
    hours: "30 hours",
    price: "£550",
    description: "More time to absorb skills",
    features: [
      "3-4 hours daily",
      "Mock test included",
      "Flexible start dates",
      "Test booking included",
      "Relaxed pace",
    ],
  },
  {
    name: "3-Week Intensive",
    duration: "21 days",
    hours: "30 hours",
    price: "£450",
    description: "Best value intensive",
    features: [
      "2-3 hours daily",
      "Mock test included",
      "Flexible start dates",
      "Test booking included",
      "Maximum practice",
    ],
  },
];

export function IntensivePricing() {
  return (
    <section className="relative py-32 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-amber-500/10 text-amber-500 text-sm font-medium rounded-full mb-6">
            Intensive Courses
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Pass <span className="text-gradient">Fast</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Intensive courses for learners who want to pass quickly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {intensivePackages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-card p-8 border-glow relative"
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                <p className="text-white/50 text-sm mb-2">{pkg.duration} • {pkg.hours}</p>
                <p className="text-white/40 text-sm mb-4">{pkg.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-display font-bold text-amber-500">{pkg.price}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-amber-500 shrink-0" />
                    <span className="text-white/70 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => document.querySelector<HTMLButtonElement>('[data-voice-button]')?.click()}
                className="btn btn-primary w-full"
              >
                Book Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}