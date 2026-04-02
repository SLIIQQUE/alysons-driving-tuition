"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Send, CheckCircle } from "lucide-react";

export function ContactForm() {
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
            <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
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
                  <option value="standard">Standard Driving Lessons</option>
                  <option value="intensive">Intensive Driving Course</option>
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
  );
}