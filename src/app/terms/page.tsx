"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function TermsHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="relative min-h-[60vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&h=1080&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[150px]"
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
          Terms of <span className="text-gradient">Service</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl text-white/60 max-w-2xl mx-auto"
        >
          Please read our terms and conditions carefully before booking lessons.
        </motion.p>
      </motion.div>
    </section>
  );
}

function TermsContent() {
  const sections = [
    {
      title: "1. Introduction",
      content: "Welcome to Alyson's Driving Tuition. By booking and taking driving lessons with us, you agree to be bound by these Terms of Service. Please read them carefully before making a booking."
    },
    {
      title: "2. Booking and Cancellations",
      content: "Lessons must be booked in advance. We require at least 48 hours notice for cancellations or rescheduling. Cancellations made with less than 48 hours notice will be charged in full. Please arrive on time for your lesson – late arrivals will result in reduced lesson time."
    },
    {
      title: "3. Payment Terms",
      content: "Payment is required at the time of booking unless otherwise agreed. Block bookings must be paid in advance. Intensive course fees must be paid in full at least 7 days before the course start date. Test fees (including DVSA test fees) are non-refundable."
    },
    {
      title: "4. Lesson Conduct",
      content: "Students must hold a valid UK provisional driving licence. All lessons are conducted in accordance with DVSA guidelines and road traffic laws. The instructor reserves the right to terminate a lesson if the student is deemed unfit to drive (e.g., under the influence of alcohol or drugs)."
    },
    {
      title: "5. Safety Requirements",
      content: "Students must wear suitable footwear for driving. If corrective glasses or lenses are required by law, they must be worn during lessons. The instructor may refuse to continue a lesson if safety concerns arise."
    },
    {
      title: "6. Test Arrangements",
      content: "Driving test bookings are subject to availability. We cannot guarantee specific test dates or times. The instructor will advise when they believe the student is ready for test. The student is responsible for any test fees charged by the DVSA."
    },
    {
      title: "7. Vehicle Care",
      content: "Students are expected to treat the tuition vehicle with care and respect. Any damage caused intentionally or through negligence may result in repair costs being charged to the student."
    },
    {
      title: "8. Liability",
      content: "Alyson's Driving Tuition accepts no liability for any loss, damage, or injury arising from lessons, except where caused by our negligence. Students are responsible for their own personal belongings during lessons."
    },
    {
      title: "9. Contact Information",
      content: "If you have any questions about these Terms of Service, please contact us at hello@alysonsdriving.co.uk or call 01234 567890."
    }
  ];

  return (
    <section className="relative py-32 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-[100px]" />
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
          <h3 className="text-lg font-display font-semibold text-white mb-4">Questions?</h3>
          <p className="text-white/60 mb-6">
            If you have any questions about these terms, please get in touch.
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

export default function TermsPage() {
  return (
    <>
      <TermsHero />
      <TermsContent />
    </>
  );
}
