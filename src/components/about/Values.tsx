"use client";

import { motion } from "motion/react";
import { Heart, Shield, Target, Users } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Patience & Understanding",
    description:
      "Every learner is different. I take time to understand your needs and adapt my teaching style accordingly.",
  },
  {
    icon: Shield,
    title: "Safety First",
    description:
      "Creating safe drivers is my top priority. Good driving habits last a lifetime.",
  },
  {
    icon: Target,
    title: "Learner-Centred Approach",
    description:
      "Lessons tailored to you, not a one-size-fits-all curriculum. Your goals matter.",
  },
  {
    icon: Users,
    title: "Professional & Reliable",
    description:
      "Always on time, always prepared, always focused on your success.",
  },
];

export function Values() {
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
            My Values
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            What I <span className="text-gradient">Stand For</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            These principles guide every lesson I teach.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-card p-8 border-glow group hover:border-amber-500/30"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <value.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}