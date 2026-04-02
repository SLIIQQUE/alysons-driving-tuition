"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";

const standardPackages = [
  {
    name: "Single Lesson",
    duration: "1 hour",
    price: "£30",
    description: "Perfect for trying us out or topping up skills",
    features: [
      "1-hour driving lesson",
      "Pick-up & drop-off",
      "Dual-controlled car",
      "Tailored to your level",
    ],
    cta: "Book Now",
    popular: false,
  },
  {
    name: "2-Hour Lesson",
    duration: "2 hours",
    price: "£55",
    description: "Our most popular option — more progress per lesson",
    features: [
      "2-hour driving lesson",
      "Pick-up & drop-off",
      "Dual-controlled car",
      "Tailored to your level",
      "More time to practice skills",
      "Better value per hour",
    ],
    cta: "Book Now",
    popular: true,
  },
];

export function StandardPricing() {
  return (
    <section className="relative py-32 bg-[#0a0a0a] overflow-hidden">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-amber-500/10 text-amber-500 text-sm font-medium rounded-full mb-6">
            Standard Lessons
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Individual <span className="text-gradient">Lessons</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Pay-as-you-go driving lessons with no commitment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {standardPackages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className={`glass-card p-8 border-glow relative ${pkg.popular ? "border-amber-500/30" : ""}`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-amber-500 to-red-500 rounded-full text-sm font-semibold text-black">
                  Most Popular
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                <p className="text-white/50 text-sm mb-4">{pkg.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-display font-bold text-amber-500">{pkg.price}</span>
                  <span className="text-white/40">/{pkg.duration}</span>
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
                {pkg.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}