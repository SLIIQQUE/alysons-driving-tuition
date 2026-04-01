"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Check, ArrowRight, MessageCircle, Clock, Car, Bookmark, Award } from "lucide-react";

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
    popular: true,
  },
];

const intensivePackages = [
  {
    name: "Fast Track",
    duration: "1 week",
    hours: "20 hours",
    price: "£450",
    description: "Intensive course for quick learners",
    features: [
      "20 hours of tuition",
      "5 days of lessons",
      "Test booking assistance",
      "Ideal for quick learners",
    ],
  },
  {
    name: "Comprehensive",
    duration: "2 weeks",
    hours: "30 hours",
    price: "£675",
    description: "Balanced intensive course",
    features: [
      "30 hours of tuition",
      "10 days of lessons",
      "Test booking assistance",
      "More time to absorb skills",
      "Great for nervous learners",
    ],
    popular: true,
  },
  {
    name: "Full Course",
    duration: "3-4 weeks",
    hours: "40+ hours",
    price: "From £900",
    description: "Complete beginner to test-ready",
    features: [
      "40+ hours of tuition",
      "Flexible schedule",
      "Test booking assistance",
      "Complete beginner friendly",
      "Theory test support",
      "Mock test included",
    ],
  },
];

function PricingHero() {
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

      <motion.div className="container relative z-10 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block px-4 py-1.5 bg-amber-500/10 text-amber-500 text-sm font-medium rounded-full mb-6"
        >
          Pricing
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6"
        >
          Transparent <span className="text-gradient">Pricing</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl text-white/60 max-w-2xl mx-auto"
        >
          No hidden fees. Choose the package that works for you.
        </motion.p>
      </motion.div>
    </section>
  );
}

function StandardPricing() {
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
              className={`glass-card p-8 border-glow relative ${pkg.popular ? 'border-amber-500/30' : ''}`}
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
                    <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span className="text-white/70 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn btn-primary w-full group">
                <span>{pkg.cta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlockPricing() {
  return (
    <section className="relative py-32 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px]" />
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
            Block Booking
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
              className={`glass-card p-8 border-glow relative ${pkg.popular ? 'border-amber-500/30' : ''}`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-amber-500 to-red-500 rounded-full text-sm font-semibold text-black">
                  Best Value
                </div>
              )}
              <div className="text-center mb-6">
                <Bookmark className="w-8 h-8 text-amber-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-3xl font-display font-bold text-amber-500">{pkg.price}</span>
                </div>
                <p className="text-green-400 text-sm font-medium">{pkg.saving}</p>
                <p className="text-white/30 text-sm line-through">{pkg.originalPrice}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span className="text-white/70 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn btn-primary w-full group">
                <span>Book Block</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IntensivePricing() {
  return (
    <section className="relative py-32 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-[100px]" />
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
            Intensive Courses
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Pass in <span className="text-gradient">Weeks, Not Months</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Fast-track your learning with our intensive driving courses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {intensivePackages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className={`glass-card p-8 border-glow relative ${pkg.popular ? 'border-amber-500/30' : ''}`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-amber-500 to-red-500 rounded-full text-sm font-semibold text-black">
                  Most Popular
                </div>
              )}
              <div className="text-center mb-6">
                <Clock className="w-8 h-8 text-amber-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                <p className="text-white/40 text-sm mb-4">{pkg.description}</p>
                <div className="flex items-baseline justify-center gap-1 mb-1">
                  <span className="text-3xl font-display font-bold text-amber-500">{pkg.price}</span>
                </div>
                <p className="text-white/40 text-sm">{pkg.hours} over {pkg.duration}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span className="text-white/70 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn btn-primary w-full group">
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AdditionalServices() {
  const services = [
    { icon: Award, name: "Pass Plus", price: "From £150", desc: "Post-test confidence building" },
    { icon: Car, name: "Refresher Lessons", price: "From £30/hr", desc: "Get back behind the wheel" },
  ];

  return (
    <section className="relative py-24 bg-[#0f0f0f] overflow-hidden">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
            Additional <span className="text-gradient">Services</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-card p-6 flex items-center gap-4 border-glow"
            >
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <service.icon className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h3 className="font-bold text-white">{service.name}</h3>
                <p className="text-white/50 text-sm">{service.desc}</p>
              </div>
              <div className="ml-auto text-amber-500 font-bold">{service.price}</div>
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
            Ready to <span className="text-gradient">Get Started?</span>
          </h2>
          <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto">
            Book your first lesson today and start your journey to passing your driving test.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/contact" className="btn btn-primary group">
              <span>Book Your First Lesson</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={() =>
                window.dispatchEvent(new CustomEvent("openVoiceAssistant"))
              }
              className="btn btn-secondary group"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat with AI</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <StandardPricing />
      <BlockPricing />
      <IntensivePricing />
      <AdditionalServices />
      <CTASection />
    </>
  );
}
