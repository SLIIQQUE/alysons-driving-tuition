"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { MapPin, ArrowRight, Car, Users, Clock } from "lucide-react";

const areas = [
  {
    name: "Blackwood",
    description: "Our home base. We know every road, junction, and test route in Blackwood. Perfect for local learners.",
    routes: ["High Street", "Penallta Road", "Heolddu Roundabout", "A468 Newport Road"],
    testCentre: "Blackwood Test Centre nearby",
  },
  {
    name: "Tredegar",
    description: "Serving Tredegar and the surrounding valleys. We cover all local roads and test routes.",
    routes: ["High Street Tredegar", "A4046", "Bedwellty Road", "Brynmawr Road"],
    testCentre: "Ebbw Vale Test Centre nearby",
  },
  {
    name: "Risca",
    description: "Covering Risca and the surrounding areas with patient, friendly instruction.",
    routes: ["Pontymister Lane", "Cross Keys Road", "A467", "Risca Town Centre"],
    testCentre: "Newport Test Centre nearby",
  },
  {
    name: "Newport",
    description: "Driving lessons across Newport and the surrounding South Wales area.",
    routes: ["A48", "M4 Corridor", "Newport City Centre", "Caerleon Road"],
    testCentre: "Newport Test Centre",
  },
  {
    name: "Bargoed",
    description: "Serving Bargoed and the Gilfach Goch area with flexible lesson times.",
    routes: ["Cardiff Road", "A469", "Bargoed Town Centre", "Pengam Road"],
    testCentre: "Blackwood Test Centre nearby",
  },
  {
    name: "Ystrad Mynach",
    description: "Covering Ystrad Mynach and the surrounding Hengoed area.",
    routes: ["A469", "Ystrad Mynach Town Centre", "Hengoed Road", "Penallta Road"],
    testCentre: "Blackwood Test Centre nearby",
  },
];

function AreasHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=1080&fit=crop')] bg-cover bg-center" />
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

      <motion.div className="container relative z-10 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block px-4 py-1.5 bg-amber-500/10 text-amber-500 text-sm font-medium rounded-full mb-6"
        >
          Areas Covered
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6"
        >
          Driving Lessons <span className="text-gradient">Near You</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl text-white/60 max-w-2xl mx-auto"
        >
          Serving Blackwood, Tredegar, Risca, Newport and surrounding South Wales areas.
        </motion.p>
      </motion.div>
    </section>
  );
}

function AreasGrid() {
  return (
    <section className="relative py-32 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Where We <span className="text-gradient">Teach</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            We cover a wide area across South Wales. Not sure if we cover your area? Get in touch!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map((area, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-card p-8 border-glow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-white">{area.name}</h3>
              </div>
              <p className="text-white/60 mb-6 text-sm">{area.description}</p>
              <div className="space-y-3">
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Key Routes</p>
                  <div className="flex flex-wrap gap-2">
                    {area.routes.map((route, j) => (
                      <span key={j} className="px-2 py-1 bg-white/5 rounded-full text-xs text-white/60">
                        {route}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <p className="text-amber-500 text-sm">{area.testCentre}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyLocalMatters() {
  const reasons = [
    {
      icon: Car,
      title: "Know the Test Routes",
      description: "We practice on the exact roads you'll be tested on, giving you confidence on test day.",
    },
    {
      icon: Users,
      title: "Local Knowledge",
      description: "Familiar with local traffic patterns, tricky junctions, and common test hazards.",
    },
    {
      icon: Clock,
      title: "Flexible Pick-up",
      description: "We'll pick you up from home, work, or school within our coverage area.",
    },
  ];

  return (
    <section className="relative py-32 bg-[#0f0f0f] overflow-hidden">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Why a <span className="text-gradient">Local Instructor</span> Matters
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-card p-8 text-center border-glow"
            >
              <div className="w-14 h-14 bg-amber-500/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                <reason.icon className="w-7 h-7 text-amber-500" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{reason.title}</h3>
              <p className="text-white/50 text-sm">{reason.description}</p>
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
            Not Sure If We Cover <span className="text-gradient">Your Area?</span>
          </h2>
          <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto">
            Get in touch and we'll let you know. We're happy to travel across South Wales.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/contact" className="btn btn-primary group">
              <span>Contact Us</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function AreasPage() {
  return (
    <>
      <AreasHero />
      <AreasGrid />
      <WhyLocalMatters />
      <CTASection />
    </>
  );
}
