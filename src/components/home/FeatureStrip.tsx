"use client";

import { motion } from "motion/react";
import { Heart, Shield, Award, Users } from "lucide-react";

const features = [
  {
    title: "Patient & Friendly",
    description: "Understanding nervous beginners",
    icon: Heart,
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Safety First",
    description: "Creating safe drivers for life",
    icon: Shield,
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "High Pass Rate",
    description: "98% pass rate",
    icon: Award,
    color: "from-emerald-500 to-green-500",
  },
  {
    title: "Local Expert",
    description: "Blackwood & surrounding areas",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
  },
];

export function FeatureStrip() {
  return (
    <section className="relative py-24 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-[#0a0a0a]" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
            Why Choose <span className="text-amber-500">Alyson&apos;s</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.1,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 lg:p-8 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-500"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-white/50 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
