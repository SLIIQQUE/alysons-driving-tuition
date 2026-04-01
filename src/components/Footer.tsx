"use client";

import Link from "next/link";
import { Mail, MapPin, ArrowRight } from "lucide-react";

const navigation = {
  services: [
    { name: "Standard Lessons", href: "/services" },
    { name: "Intensive Courses", href: "/services" },
    { name: "Block Bookings", href: "/pricing" },
    { name: "Pass Plus", href: "/services" },
    { name: "Pricing", href: "/pricing" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Areas Covered", href: "/areas" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "FAQ", href: "/faq" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0a0a] text-white overflow-visible pt-16 lg:pt-24 pb-8">
      {/* Text Underlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-display text-[12vw] font-bold text-white opacity-[0.03] leading-none tracking-tighter whitespace-nowrap"
            style={{
              transform: "scale(1.5)",
              WebkitTextStroke: "1px rgba(245, 158, 11, 0.1)",
            }}
          >
            Alyson's Driving
          </span>
        </div>
      </div>

      {/* Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,#0a0a0a_100%)]" />
      </div>

      <div className="relative z-10 mx-auto px-6 md:px-12 max-w-[1400px]">
        <div className="xl:grid xl:grid-cols-4 xl:gap-16">
          {/* Brand */}
          <div className="xl:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-red-500 rounded-xl flex items-center justify-center">
                  <span className="text-black font-bold text-2xl">A</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-red-500 rounded-xl blur-xl opacity-50" />
              </div>
              <div>
                <span className="font-display font-bold text-2xl text-white tracking-tight">
                  Alyson&apos;s
                </span>
                <span className="font-display font-bold text-2xl text-amber-500 tracking-tight ml-1">
                  Driving
                </span>
              </div>
            </Link>
            <p className="text-sm leading-7 text-white/50 max-w-md mb-8">
              Patient, friendly driving instruction in South Wales. Helping you
              learn to drive with confidence since 2004.
            </p>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:hello@alysonsdriving.co.uk"
                className="flex items-center gap-3 text-white/70 hover:text-amber-500 transition-colors group"
              >
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                hello@alysonsdriving.co.uk
              </a>
              <div className="flex items-center gap-3 text-white/70">
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                Blackwood, South Wales
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="mt-16 xl:mt-0 xl:col-span-2 grid grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                Services
              </h3>
              <ul role="list" className="space-y-3">
                {navigation.services.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/50 hover:text-amber-500 transition-colors flex items-center gap-2 group text-nowrap"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-amber-500" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                Company
              </h3>
              <ul role="list" className="space-y-3">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/50 hover:text-amber-500 transition-colors flex items-center gap-2 group text-nowrap"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-amber-500" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                Legal
              </h3>
              <ul role="list" className="space-y-3">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/50 hover:text-amber-500 transition-colors flex items-center gap-2 group text-nowrap"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-amber-500" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-xs text-white/30 text-center">
            © {new Date().getFullYear()} Alyson&apos;s Driving Tuition. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
