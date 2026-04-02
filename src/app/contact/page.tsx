"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Bot,
} from "lucide-react";

function ContactHero() {
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
          Contact Us
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6"
        >
          Contact{" "}
          <span className="text-gradient">Alyson&apos;s Driving Tuition</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl text-white/60 max-w-2xl mx-auto"
        >
          Book your first lesson or ask a question. We&apos;re here to help!
        </motion.p>
      </motion.div>
    </section>
  );
}

function ContactContent() {
  const [formState, setFormState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("submitting");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormState("success");
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  return (
    <section className="relative py-24 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="glass-card p-8 md:p-10">
              <h2 className="text-2xl font-display font-bold text-white mb-6">
                Send us a Message
              </h2>

              {formState === "success" ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-white/60">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setFormState("idle")}
                    className="mt-6 text-amber-500 hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : formState === "error" ? (
                <div className="text-center py-12">
                  <p className="text-red-400 mb-4">
                    Something went wrong. Please try again or email us directly.
                  </p>
                  <button
                    onClick={() => setFormState("idle")}
                    className="text-amber-500 hover:underline"
                  >
                    Try again
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-white/70 mb-2"
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="input bg-white/5 border-white/10 text-white placeholder:text-white/30"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-white/70 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="input bg-white/5 border-white/10 text-white placeholder:text-white/30"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-white/70 mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="input bg-white/5 border-white/10 text-white placeholder:text-white/30"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="service"
                        className="block text-sm font-medium text-white/70 mb-2"
                      >
                        Service Interested In
                      </label>
                      <select
                        id="service"
                        name="service"
                        className="input bg-white/5 border-white/10 text-white"
                      >
                        <option value="">Select a service</option>
                        <option value="standard">
                          Standard Driving Lessons
                        </option>
                        <option value="intensive">
                          Intensive Driving Course
                        </option>
                        <option value="block">Block Booking</option>
                        <option value="pass-plus">Pass Plus</option>
                        <option value="refresher">Refresher Lessons</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-white/70 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="input bg-white/5 border-white/10 text-white placeholder:text-white/30 resize-none"
                      placeholder="Tell us about your driving experience and what you're looking for..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="btn btn-primary w-full group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formState === "submitting" ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Info */}
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
                      Elim Way, Pontllanfraith, Blackwood NP12 2AA, United
                      Kingdom
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">
                      Lesson Times
                    </h3>
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
                  onClick={() => document.querySelector<HTMLButtonElement>('[data-voice-button]')?.click()}
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

            {/* Google Map Embed */}
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
        </div>
      </div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactContent />
    </>
  );
}
