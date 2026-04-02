"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";

const blockPackages = [
  {
    name: "5-Lesson Block",
    lessons: "5 lessons",
    price: "£142",
    saving: "Save 5%",
    originalPrice: "£150",
    features: [
      "5 x 1-hour lessons",
      "Flexible scheduling",
      "Consistent progress",
      "Best for regular learners",
    ],
  },
  {
    name: "10-Lesson Block",
    lessons: "10 lessons",
    price: "£270",
    saving: "Save 10%",
    originalPrice: "£300",
    features: [
      "10 x 1-hour lessons",
      "Flexible scheduling",
      "Consistent progress",
      "Great value",
      "Ideal for steady learners",
    ],
  },
  {
    name: "20-Lesson Block",
    lessons: "20 lessons",
    price: "£510",
    saving: "Save 15%",
    originalPrice: "£600",
    features: [
      "20 x 1-hour lessons",
      "Flexible scheduling",
      "Consistent progress",
      "Best value package",
      "Ideal for complete beginners",
      "Test-ready preparation",
    ],
  },
];

export function BlockPricing() {
  return (
    <section className="relative py-32 bg-[#111] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[150px]" />
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
            Block Bookings
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Save with <span className="text-gradient">Block Bookings</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Book multiple lessons in advance and save up to 15%.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blockPackages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-card p-8 border-glow relative"
            >
              {i === 2 && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-amber-500 to-red-500 rounded-full text-xs font-semibold text-black">
                  Best Value
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                <p className="text-white/50 text-sm mb-4">{pkg.lessons}</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-display font-bold text-amber-500">{pkg.price}</span>
                  <span className="text-white/40 text-sm line-through">{pkg.originalPrice}</span>
                </div>
                <div className="inline-block mt-2 px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm font-medium rounded-full">
                  {pkg.saving}
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
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