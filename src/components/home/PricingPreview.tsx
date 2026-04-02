"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Clock, Bookmark, Award } from "lucide-react";

const packages = [
  {
    icon: Clock,
    name: "Standard Lessons",
    price: "£30",
    unit: "/hour",
    description: "Flexible 1-2 hour lessons at your pace",
  },
  {
    icon: Bookmark,
    name: "Block Bookings",
    price: "Save 15%",
    unit: "on 20+ lessons",
    description: "Book in advance and save on every lesson",
    popular: true,
  },
  {
    icon: Award,
    name: "Intensive Courses",
    price: "From £450",
    unit: "full course",
    description: "Pass in weeks, not months",
  },
];

export function PricingPreview() {
  return (
    <section className="relative py-32 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-amber-500/5 rounded-full blur-[80px] md:blur-[150px]" />
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
            Pricing
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            Transparent <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            No hidden fees. Choose the option that works for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className={`glass-card p-8 border-glow relative ${pkg.popular ? "border-amber-500/30" : ""}`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-amber-500 to-red-500 rounded-full text-xs font-semibold text-black">
                  Best Value
                </div>
              )}
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <pkg.icon className="w-6 h-6 text-amber-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {pkg.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-display font-bold text-amber-500">
                    {pkg.price}
                  </span>
                  <span className="text-white/40 text-sm">{pkg.unit}</span>
                </div>
                <p className="text-white/40 text-sm mt-2">{pkg.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-amber-500 font-semibold hover:gap-3 transition-all"
          >
            View full pricing <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}