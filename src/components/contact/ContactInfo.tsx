"use client";

import { motion } from "motion/react";
import { Mail, MapPin, Clock, Bot } from "lucide-react";

export function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      <div className="glass-card p-8 md:p-10">
        <h2 className="text-2xl font-display font-bold text-white mb-6">
          Get in Touch
        </h2>
        <p className="text-white/60 mb-6">
          Use our AI assistant to book lessons instantly, or send us a message.
        </p>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">Email</h3>
              <a
                href="mailto:alysonbaldwin1@mail.co.uk"
                className="text-amber-500 hover:underline"
              >
                alysonbaldwin1@mail.co.uk
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">Address</h3>
              <p className="text-white/60">
                Elim Way, Pontllanfraith, Blackwood NP12 2AA, United Kingdom
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">Lesson Times</h3>
              <p className="text-white/60">
                Monday - Saturday: 8am - 8pm
                <br />
                Sunday: By arrangement
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-8 md:p-10 bg-gradient-to-br from-amber-500/20 to-red-500/10 border-amber-500/20">
        <h3 className="text-xl font-display font-bold text-white mb-4">
          Contact Us Directly
        </h3>
        <p className="text-white/60 mb-6">
          Prefer to speak directly? Call us or send us a message anytime.
        </p>
        <div className="space-y-3">
          <button
            onClick={() =>
              document.querySelector<HTMLButtonElement>("[data-voice-button]")?.click()
            }
            className="btn btn-primary w-full group flex items-center justify-center gap-2"
          >
            <Bot className="w-5 h-5" />
            <span>Try AI Assistant</span>
          </button>
          <a
            href="mailto:alysonbaldwin1@mail.co.uk"
            className="btn btn-secondary w-full group flex items-center justify-center gap-2"
          >
            <Mail className="w-5 h-5" />
            <span>Send an Email</span>
          </a>
        </div>
      </div>

      <div className="glass-card overflow-hidden rounded-2xl">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2484.5!2d-3.2167!3d51.6333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x486e1e8b0e0e0e0f%3A0x0!2sElim+Way%2C+Pontllanfraith%2C+Blackwood+NP12+2AA!5e0!3m2!1sen!2suk!4v1"
          width="100%"
          height="250"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Alyson's Driving Tuition - Elim Way, Pontllanfraith, Blackwood NP12 2AA"
          className="w-full"
        />
      </div>
    </motion.div>
  );
}