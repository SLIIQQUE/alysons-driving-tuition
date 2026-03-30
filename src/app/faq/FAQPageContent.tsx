"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Phone, ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "How long does it take to learn to drive?",
    answer: "Everyone learns at different speeds. On average, it takes around 40-50 hours of professional training plus private practice to reach test standard. However, this varies depending on your individual ability and how often you have lessons. Some pupils pass in as little as 20 hours, while others may need more.",
  },
  {
    question: "Do you offer automatic driving lessons?",
    answer: "Yes! I offer both manual and automatic driving lessons. Please contact me to discuss your preference and find the best option for you.",
  },
  {
    question: "What cars do you use for lessons?",
    answer: "I use a modern, dual-controlled Ford Fiesta (manual) for lessons. It's safe, reliable, air-conditioned, and regularly serviced for your comfort and safety during lessons.",
  },
  {
    question: "How much do driving lessons cost?",
    answer: "Standard lessons start from £30 per hour. Block bookings offer discounts - 5% off for 5+ lessons, 10% off for 10+ lessons, and 15% off for 20+ lessons. Intensive course prices vary depending on your needs.",
  },
  {
    question: "Do you offer intensive driving courses?",
    answer: "Yes! I offer intensive courses where you can pass your test in just 1-2 weeks. These are perfect for those who need their license quickly for work or have a deadline. Contact me for a quote based on your specific needs.",
  },
  {
    question: "What is Pass Plus?",
    answer: "Pass Plus is a post-test course that helps new drivers gain more experience after passing their test. It covers various driving conditions and can sometimes help reduce insurance premiums. It's a great way to build confidence on the road.",
  },
  {
    question: "Do you help with the theory test?",
    answer: "Yes! I provide support with theory test preparation. I can help you practice questions and ensure you're confident before booking your theory test. Both tests work together, so being prepared for both is important.",
  },
  {
    question: "Can I have lessons in my own car?",
    answer: "For safety reasons, I recommend learning in my dual-controlled car initially. Once you reach a certain level and if your car is suitable and insured, we can discuss this. Safety is always my top priority.",
  },
  {
    question: "What happens if I need to cancel a lesson?",
    answer: "I understand that life happens! I ask for 48 hours notice for cancellations. Cancellations with less than 48 hours notice may be charged. Please contact me as soon as possible if you need to reschedule.",
  },
  {
    question: "At what age can I start learning to drive?",
    answer: "You can start learning to drive at 17. However, you can apply for your provisional driving licence from age 15 years and 9 months. Many pupils start taking lessons before they're 17 to be ready for their test as soon as they turn 17.",
  },
  {
    question: "Do you teach nervous beginners?",
    answer: "Absolutely! I have extensive experience teaching nervous beginners. I pride myself on being patient and understanding. Everyone learns at their own pace, and I'll never rush you. We'll work together to build your confidence gradually.",
  },
  {
    question: "What areas do you cover?",
    answer: "I cover Blackwood, Tredegar, Risca, Newport, and surrounding South Wales areas. If you're not sure if I cover your area, please get in touch and I'll let you know.",
  },
];

function FAQHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="relative min-h-[50vh] flex items-center overflow-hidden">
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
          FAQ
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6"
        >
          Frequently Asked{" "}
          <span className="text-gradient">Questions</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl text-white/60 max-w-2xl mx-auto"
        >
          Everything you need to know about learning to drive with Alyson&apos;s Driving Tuition.
        </motion.p>
      </motion.div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className="font-display font-semibold text-white group-hover:text-amber-500 transition-colors pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-white/40 group-hover:text-amber-500 transition-all duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-48 pb-6" : "max-h-0"
        }`}
      >
        <p className="text-white/50 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

function FAQContent() {
  return (
    <section className="relative py-24 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-card p-8 md:p-10">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-24 bg-[#0a0a0a] overflow-hidden">
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
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-white/50 mb-8 max-w-xl mx-auto">
            Can&apos;t find the answer you&apos;re looking for? Get in touch and we&apos;ll be happy to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a href="tel:01234567890" className="btn btn-secondary group">
              <Phone className="w-5 h-5" />
              <span>Call Now</span>
            </a>
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

export default function FAQPageContent() {
  return (
    <>
      <FAQHero />
      <FAQContent />
      <CTASection />
    </>
  );
}
