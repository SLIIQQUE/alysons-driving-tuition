"use client";

import { Send, MessageCircle } from "lucide-react";

export function ContactForm() {
  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            id="name"
            className="input bg-white/5 border-white/10 text-white placeholder:text-white/30"
            placeholder="Enter your full name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            className="input bg-white/5 border-white/10 text-white placeholder:text-white/30"
            placeholder="Enter your email"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-white/70 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            className="input bg-white/5 border-white/10 text-white placeholder:text-white/30"
            placeholder="Enter your phone number"
          />
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-white/70 mb-2">
            Service Interested In
          </label>
          <select id="service" className="input bg-white/5 border-white/10 text-white">
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
        <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          rows={5}
          className="input bg-white/5 border-white/10 text-white placeholder:text-white/30 resize-none"
          placeholder="Tell us about your driving experience and what you're looking for..."
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-full group">
        <span>Send Message</span>
        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </form>
  );
}

export function OpenVoiceButton({ className }: { className?: string }) {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent("openVoiceAssistant"))}
      className={className || ""}
    >
      <MessageCircle className="w-5 h-5" />
      <span>Chat with AI</span>
    </button>
  );
}
