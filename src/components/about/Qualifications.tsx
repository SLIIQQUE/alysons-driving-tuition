"use client";

import { motion } from "motion/react";
import { Award, CheckCircle, Clock } from "lucide-react";

const qualifications = [
  {
    icon: Award,
    title: "DVSA Approved",
    subtitle: "Licensed ADI",
    description:
      "Fully licensed and regulated by the Driving and Vehicle Standards Agency",
  },
  {
    icon: CheckCircle,
    title: "Grade A",
    subtitle: "Instructor Rating",
    description: "Highest possible DVSA rating for driving instructors",
  },
  {
    icon: Clock,
    title: "20+ Years",
    subtitle: "Experience",
    description: "Teaching safe driving since 2004",
  },
];

export function Qualifications() {
  return (
    <section className="relative py-24 bg-[#0a0a0a]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {qualifications.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-card p-8 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <q.icon className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{q.title}</h3>
              <p className="text-amber-500 text-sm font-medium mb-4">{q.subtitle}</p>
              <p className="text-white/50 text-sm">{q.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}