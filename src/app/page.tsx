"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { Phone, Clock, Award, Heart, Car, BookOpen, Shield, Users, ArrowRight, Star, Check, ChevronRight } from "lucide-react";

const testimonials = [
  { name: "Sarah J.", location: "Blackwood", text: "Alyson was so patient and friendly. Passed first time!", stars: 5 },
  { name: "James T.", location: "Tredegar", text: "Excellent instructor! Helped me pass with only 3 minors.", stars: 5 },
  { name: "Emma L.", location: "Newport", text: "After failing twice, Alyson helped me pass first time.", stars: 5 },
  { name: "Michael R.", location: "Risca", text: "Best instructor in the area! Very calm and patient.", stars: 5 },
];

const features = [
  { icon: Heart, title: "Patient & Friendly", description: "We understand nervous beginners and teach at your pace." },
  { icon: Shield, title: "Safety First", description: "Creating safe drivers is our top priority." },
  { icon: Users, title: "Learner-Centred", description: "Lessons tailored to you, not a one-size-fits-all." },
  { icon: Award, title: "High Pass Rate", description: "Expert guidance from a Grade A instructor." },
];

const services = [
  { icon: Car, title: "Standard Lessons", description: "One-to-one tailored to your ability.", price: "From £30/hr" },
  { icon: Clock, title: "Intensive Courses", description: "Pass your test in weeks, not months.", price: "From £450" },
  { icon: BookOpen, title: "Block Bookings", description: "Save money with discounts.", price: "Up to 15% off" },
  { icon: Award, title: "Pass Plus", description: "Post-test training for confidence.", price: "Available" },
];

function ParallaxBackground() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "70%"]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div
        style={{ y: y1 }}
        className="absolute top-0 left-0 w-[600px] h-[600px] bg-amber-500/20 rounded-full blur-[200px]"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-red-500/15 rounded-full blur-[180px]"
      />
      <motion.div
        style={{ y: y3 }}
        className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[150px]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,transparent_0%,#0a0a0a_60%)]" />
    </div>
  );
}

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      <ParallaxBackground />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="text-sm text-white/70 font-medium">South Wales Premier Driving School</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight"
            >
              Learn to Drive with{" "}
              <span className="text-gradient">Confidence</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-white/60 mb-10 max-w-lg leading-relaxed"
            >
              Patient, friendly instruction from an experienced Approved Driving Instructor with 20+ years of teaching experience.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-5"
            >
              <Link href="/contact" className="btn btn-primary group">
                <span>Book Your First Lesson</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="tel:01234567890" className="btn btn-secondary group">
                <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Call Now</span>
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-10 mt-14 pt-10 border-t border-white/10"
            >
              {[
                { value: "20+", label: "Years Experience", accent: "amber" },
                { value: "98%", label: "Pass Rate", accent: "red" },
                { value: "500+", label: "Pupils Passed", accent: "blue" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className={`text-4xl font-display font-bold text-${stat.accent}-500`}>{stat.value}</div>
                  <div className="text-sm text-white/40">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image with 3D Effect */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
            style={{ y, opacity, scale }}
            className="hidden lg:block relative"
          >
            <div className="relative">
              {/* Glow behind */}
              <div className="absolute -inset-8 bg-gradient-to-br from-amber-500/30 via-red-500/20 to-blue-500/30 rounded-[3rem] blur-3xl" />
              
              {/* Main image container */}
              <div className="relative perspective-1000">
                <div className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm">
                  <Image
                    src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=1000&fit=crop"
                    alt="Driving instructor"
                    width={600}
                    height={750}
                    className="w-full h-auto object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                </div>
                
                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -bottom-6 -left-6 glass-card px-6 py-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-red-500 rounded-xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Grade A</div>
                      <div className="text-white/50 text-sm">DVSA Instructor</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className="glass-card p-8 group border-glow"
    >
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-br from-amber-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
        <div className="relative w-16 h-16 bg-gradient-to-br from-amber-500/20 to-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <feature.icon className="w-8 h-8 text-amber-500" />
        </div>
      </div>
      <h3 className="text-xl font-display font-semibold text-white mb-3">{feature.title}</h3>
      <p className="text-white/50 leading-relaxed">{feature.description}</p>
    </motion.div>
  );
}

function FeaturesSection() {
  return (
    <section className="relative py-32 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px]" />
      </div>
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 bg-amber-500/10 text-amber-500 text-sm font-medium rounded-full mb-6">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Learn from the{" "}
            <span className="text-gradient">Best</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            We&apos;re committed to helping you become a safe, confident driver with personalized instruction.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="glass-card p-8 h-full border-glow hover:border-amber-500/30 transition-colors">
        <div className="relative mb-6">
          <div className="absolute -inset-2 bg-gradient-to-br from-amber-500/30 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
          <div className="relative w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <service.icon className="w-7 h-7 text-amber-500" />
          </div>
        </div>
        <h3 className="text-xl font-display font-semibold text-white mb-2">{service.title}</h3>
        <p className="text-white/50 mb-4">{service.description}</p>
        <span className="inline-block text-amber-500 font-semibold">{service.price}</span>
      </div>
    </motion.div>
  );
}

function ServicesSection() {
  return (
    <section className="relative py-32 bg-[#0f0f0f] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px]" />
      </div>
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 bg-amber-500/10 text-amber-500 text-sm font-medium rounded-full mb-6">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Driving Lessons for{" "}
            <span className="text-gradient">Everyone</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Flexible driving lessons tailored to your needs and schedule.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/services" className="btn btn-secondary group">
            <span>View All Services</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className="glass-card p-8"
    >
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.stars)].map((_, j) => (
          <Star key={j} className="w-4 h-4 fill-amber-500 text-amber-500" />
        ))}
      </div>
      <p className="text-white/70 mb-6 leading-relaxed">&ldquo;{testimonial.text}&rdquo;</p>
      <div>
        <div className="font-semibold text-white">{testimonial.name}</div>
        <div className="text-sm text-white/40">{testimonial.location}</div>
      </div>
    </motion.div>
  );
}

function TestimonialsSection() {
  return (
    <section className="relative py-32 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-[100px]" />
      </div>
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 bg-amber-500/10 text-amber-500 text-sm font-medium rounded-full mb-6">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            What Our{" "}
            <span className="text-gradient">Pupils Say</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Join hundreds of satisfied pupils who passed with Alyson&apos;s Driving Tuition.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={i} testimonial={testimonial} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/testimonials" className="btn btn-secondary group">
            <span>Read More Reviews</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-32 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-red-500/10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[150px]" />
      </div>
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Ready to Start Your{" "}
            <span className="text-gradient">Journey?</span>
          </h2>
          <p className="text-xl text-white/50 mb-10 max-w-2xl mx-auto">
            Book your first lesson today and get on the road to passing your test.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/contact" className="btn btn-primary group">
              <span>Book Your First Lesson</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="tel:01234567890" className="btn btn-secondary group">
              <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Call Now</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ServicesSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
