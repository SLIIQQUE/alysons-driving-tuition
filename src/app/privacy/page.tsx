"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function PrivacyHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="relative min-h-[60vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1920&h=1080&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-500/20 rounded-full blur-[150px]"
        />
      </div>

      <motion.div style={{ y }} className="container relative z-10 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block px-4 py-1.5 bg-amber-500/10 text-amber-500 text-sm font-medium rounded-full mb-6"
        >
          Legal
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6"
        >
          Privacy <span className="text-gradient">Policy</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl text-white/60 max-w-2xl mx-auto"
        >
          How we handle and protect your personal information.
        </motion.p>
      </motion.div>
    </section>
  );
}

function PrivacyContent() {
  const sections = [
    {
      title: "1. Introduction",
      content: "Alyson's Driving Tuition is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or book driving lessons with us."
    },
    {
      title: "2. Information We Collect",
      content: "We collect personal information that you provide to us, including: name, email address, phone number, postal address, date of birth, driving licence details, and payment information. We also collect information about your driving progress and lesson history."
    },
    {
      title: "3. How We Use Your Information",
      content: "We use your information to: process lesson bookings and payments, communicate with you about lessons and schedules, provide driving instruction services, comply with legal obligations (including DVSA requirements), and send you marketing communications about our services (with your consent)."
    },
    {
      title: "4. Information Sharing",
      content: "We may share your information with: payment processors (for booking transactions), DVSA (for test bookings and compliance), and legal authorities when required by law. We do not sell your personal information to third parties."
    },
    {
      title: "5. Data Security",
      content: "We implement appropriate technical and organisational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All payment transactions are encrypted using industry-standard security protocols."
    },
    {
      title: "6. Data Retention",
      content: "We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Lesson records may be retained for DVSA compliance purposes. You can request deletion of your data at any time, subject to legal retention requirements."
    },
    {
      title: "7. Your Rights",
      content: "Under UK data protection law (UK GDPR), you have the right to: access your personal information, rectify inaccurate data, request erasure of your data, object to processing, request data portability, and withdraw consent. To exercise these rights, contact us at hello@alysonsdriving.co.uk."
    },
    {
      title: "8. Cookies",
      content: "Our website uses cookies to enhance your browsing experience. Cookies are small files stored on your device that help us understand how you use our site. You can disable cookies in your browser settings, though this may affect website functionality."
    },
    {
      title: "9. Changes to This Policy",
      content: "We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the 'last modified' date. Your continued use of our services after any changes constitutes acceptance of the new terms."
    },
    {
      title: "10. Contact Us",
      content: "If you have any questions about this Privacy Policy or how we handle your data, please contact us at hello@alysonsdriving.co.uk, call 01234 567890, or write to us at Blackwood, South Wales."
    }
  ];

  return (
    <section className="relative py-32 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10 max-w-4xl">
        <div className="space-y-8">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <h2 className="text-xl font-display font-semibold text-white mb-4">{section.title}</h2>
              <p className="text-white/60 leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 p-8 glass-card border-amber-500/20"
        >
          <h3 className="text-lg font-display font-semibold text-white mb-4">Questions About Privacy?</h3>
          <p className="text-white/60 mb-6">
            We're here to help with any questions about how we protect your data.
          </p>
          <Link href="/contact" className="btn btn-primary group inline-flex">
            <span>Contact Us</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <PrivacyHero />
      <PrivacyContent />
    </>
  );
}
