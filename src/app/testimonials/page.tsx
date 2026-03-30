"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { Star, ArrowRight, Phone } from "lucide-react";

const testimonials = [
  {
    name: "Sarah J.",
    location: "Blackwood",
    text: "Alyson was so patient and friendly. I was really nervous about learning to drive but she made me feel at ease from the first lesson. Passed first time with only 2 minors!",
    stars: 5,
  },
  {
    name: "James T.",
    location: "Tredegar",
    text: "Excellent instructor! Very professional and knowledgeable. Helped me pass my test with only 3 minors. Would highly recommend to anyone looking for driving lessons.",
    stars: 5,
  },
  {
    name: "Emma L.",
    location: "Newport",
    text: "After failing twice with another instructor, Alyson helped me pass first time. Her patience is amazing and she explains everything clearly. Highly recommend!",
    stars: 5,
  },
  {
    name: "Michael R.",
    location: "Risca",
    text: "Best driving instructor in the area! Very calm and patient, never made me feel rushed. Passed first time thanks to Alyson's excellent teaching.",
    stars: 5,
  },
  {
    name: "Sophie K.",
    location: "Blackwood",
    text: "I was so nervous about learning to drive but Alyson made the whole experience enjoyable. She helped me build confidence and I passed with just 1 minor!",
    stars: 5,
  },
  {
    name: "David H.",
    location: "Tredegar",
    text: "Great instructor! Very thorough and always prepared for each lesson. Helped me pass my test after I'd been off the road for a few years. Highly recommend!",
    stars: 5,
  },
  {
    name: "Olivia M.",
    location: "Newport",
    text: "Alyson is brilliant with nervous beginners. She never made me feel silly for making mistakes and always encouraged me. Passed first time!",
    stars: 5,
  },
  {
    name: "Tom W.",
    location: "Blackwood",
    text: "Fantastic instructor! Made learning to drive enjoyable and stress-free. Passed first time with 0 minors - couldn't recommend more highly!",
    stars: 5,
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function TestimonialsHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&h=1080&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-red-500/15 rounded-full blur-[120px]"
        />
      </div>

      <motion.div style={{ y }} className="container relative z-10 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block px-4 py-1.5 bg-amber-500/10 text-amber-500 text-sm font-medium rounded-full mb-6"
        >
          Testimonials
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6"
        >
          What Our{" "}
          <span className="text-gradient">Pupils Say</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl text-white/60 max-w-2xl mx-auto"
        >
          Join hundreds of satisfied pupils who passed with Alyson&apos;s Driving Tuition.
        </motion.p>
      </motion.div>
    </section>
  );
}

function TestimonialsGrid() {
  return (
    <section className="relative py-32 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-card p-8 border-glow"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.stars)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-white/70 mb-6 leading-relaxed">&ldquo;{testimonial.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-red-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-black font-bold text-sm">{getInitials(testimonial.name)}</span>
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-white/40">{testimonial.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-32 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-red-500/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Ready to Become One of Our{" "}
            <span className="text-gradient">Success Stories?</span>
          </h2>
          <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto">
            Book your first lesson today and start your journey to passing your driving test.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/contact" className="btn btn-primary group">
              <span>Book Your First Lesson</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="tel:01234567890" className="btn btn-secondary group">
              <Phone className="w-5 h-5" />
              <span>Call Now</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function TestimonialsPage() {
  return (
    <>
      <TestimonialsHero />
      <TestimonialsGrid />
      <CTASection />
    </>
  );
}
