"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Car, Clock, Bookmark, Award, BookOpen, RefreshCw, ArrowRight, Check, Phone } from "lucide-react";

const services = [
  {
    icon: Car,
    title: "Standard Driving Lessons",
    description: "One-to-one driving lessons tailored to your ability. Whether you're a complete beginner or nearly test-ready, I'll help you progress at your pace.",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop",
    features: [
      "Beginner friendly",
      "Progress at your pace",
      "Theory test support included",
      "Flexible lesson times",
      "Dual-controlled car",
    ],
    price: "From £30 per hour",
    cta: "Book Standard Lesson",
    link: "/contact",
  },
  {
    icon: Clock,
    title: "Intensive Driving Courses",
    description: "Pass your test in weeks, not months. Intensive courses available for those who want to learn quickly or need their license for work.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop",
    features: [
      "1-2 week courses available",
      "Intensive learning packages",
      "Test booking assistance",
      "Great for urgent license needs",
      "Customised schedule",
    ],
    price: "From £450 (10 hour course)",
    cta: "Get a Quote",
    link: "/contact",
  },
  {
    icon: Bookmark,
    title: "Block Booking Discounts",
    description: "Save money by booking multiple lessons in advance. Block bookings offer great value and help maintain consistent progress.",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
    features: [
      "5% off for 5+ lessons",
      "10% off for 10+ lessons",
      "15% off for 20+ lessons",
      "Consistent learning",
      "Flexible scheduling",
    ],
    price: "Save up to 15%",
    cta: "View Prices",
    link: "/contact",
  },
];

const additionalServices = [
  {
    icon: Award,
    title: "Pass Plus",
    description: "Post-test training to build your confidence and skills after passing your test. Can help reduce insurance premiums.",
  },
  {
    icon: RefreshCw,
    title: "Refresher Lessons",
    description: "For those who've been off the road and want to get back into driving. Perfect for returning drivers.",
  },
  {
    icon: BookOpen,
    title: "Theory Test Support",
    description: "Help and practice with theory test questions. We'll help you prepare to pass both tests first time.",
  },
];

function ServiceHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&h=1080&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        
        {/* Animated glows */}
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
          Our Services
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6"
        >
          Driving Lessons in{" "}
          <span className="text-gradient">South Wales</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl text-white/60 max-w-2xl mx-auto"
        >
          Professional driving instruction tailored to your needs. From complete beginners to intensive courses, we&apos;ve got you covered.
        </motion.p>
      </motion.div>
    </section>
  );
}

function ServiceSection({ service, index }: { service: typeof services[0]; index: number }) {
  return (
    <section className="relative py-24 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0">
        <div className={`absolute top-0 ${index % 2 === 0 ? 'right-0' : 'left-0'} w-96 h-96 bg-amber-500/5 rounded-full blur-[100px]`} />
        <div className={`absolute bottom-0 ${index % 2 === 0 ? 'left-0' : 'right-0'} w-96 h-96 bg-red-500/5 rounded-full blur-[100px]`} />
      </div>

      <div className="container relative z-10">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
          <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={index % 2 === 1 ? "lg:order-2" : ""}
          >
            <div className="relative mb-8">
              <div className="absolute -inset-4 bg-gradient-to-br from-amber-500/20 to-transparent rounded-3xl blur-2xl" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-amber-500 to-red-500 rounded-2xl flex items-center justify-center mb-6">
                <service.icon className="w-10 h-10 text-black" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              {service.title}
            </h2>
            <p className="text-lg text-white/60 mb-8 leading-relaxed">{service.description}</p>
            <ul className="space-y-4 mb-8">
              {service.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-amber-500" />
                  </div>
                  <span className="text-white/70">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-6 border-t border-white/10">
              <span className="text-3xl font-display font-bold text-amber-500">{service.price}</span>
              <Link href={service.link} className="btn btn-primary group">
                <span>{service.cta}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}
          >
            <div className="absolute -inset-6 bg-gradient-to-br from-amber-500/20 via-red-500/10 to-transparent rounded-3xl blur-3xl" />
            <div className="relative rounded-[2rem] overflow-hidden border border-white/10">
              <Image
                src={service.image}
                alt={service.title}
                width={600}
                height={450}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AdditionalServices() {
  return (
    <section className="relative py-32 bg-[#0f0f0f] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[150px]" />
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
            More Services
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Additional Services
          </h2>
          <p className="text-white/50">
            Extra support to help you become a confident driver.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {additionalServices.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-card p-8 border-glow"
            >
              <div className="relative mb-6">
                <div className="absolute -inset-2 bg-gradient-to-br from-amber-500/20 to-transparent rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-500 blur-lg" />
                <div className="relative w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center">
                  <service.icon className="w-7 h-7 text-amber-500" />
                </div>
              </div>
              <h3 className="text-xl font-display font-semibold text-white mb-3">{service.title}</h3>
              <p className="text-white/50">{service.description}</p>
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
            Ready to Book Your{" "}
            <span className="text-gradient">First Lesson?</span>
          </h2>
          <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto">
            Contact us today to discuss your driving lesson requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/contact" className="btn btn-primary group">
              <span>Get in Touch</span>
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

export default function ServicesPage() {
  return (
    <>
      <ServiceHero />
      {services.map((service, i) => (
        <ServiceSection key={i} service={service} index={i} />
      ))}
      <AdditionalServices />
      <CTASection />
    </>
  );
}
