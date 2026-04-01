"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Marllah Rose Hoskin",
    text: "Couldn't recommend Alyson enough, Thankyou for everything!",
    location: "South Wales",
  },
  {
    name: "Nicole Adams",
    text: "Thank you so much for your support and helping me pass first time!",
    location: "South Wales",
  },
  {
    name: "Blake Liam Carter",
    text: "Passed first time and couldn't be happier. Can't thank Alyson enough!",
    location: "South Wales",
  },
  {
    name: "Jennie Powell",
    text: "Alyson was absolutely amazing, great at explaining all the manoeuvres!",
    location: "South Wales",
  },
  {
    name: "Sally-Ann Morgan",
    text: "Very patient and provides so much knowledge and support. 100% recommended!",
    location: "South Wales",
  },
  {
    name: "Ben Ellaway",
    text: "Professional, patient and thorough instruction. Highly recommend!",
    location: "South Wales",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const avatarColors = [
  "from-amber-500 to-orange-500",
  "from-pink-500 to-rose-500",
  "from-emerald-500 to-green-500",
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-violet-500",
  "from-red-500 to-orange-500",
];

export default function TestimonialsMarqueeSection() {
  const duplicatedTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  return (
    <section className="relative py-20 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#111] to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#111] to-transparent z-10" />

      <motion.div
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex gap-8"
      >
        {duplicatedTestimonials.map((t, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[400px] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center flex-shrink-0`}>
                <span className="text-black font-bold text-lg">{getInitials(t.name)}</span>
              </div>
              <div>
                <div className="font-bold text-white">{t.name}</div>
                <div className="text-white/50 text-sm">{t.location}</div>
              </div>
            </div>
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, j) => (
                <Star
                  key={j}
                  className="w-4 h-4 fill-amber-500 text-amber-500"
                />
              ))}
            </div>
            <p className="text-white/70">&ldquo;{t.text}&rdquo;</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
