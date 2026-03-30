"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="container">
        <nav className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#1e40af] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="font-heading font-bold text-xl text-gray-900">
              Alyson&apos;s <span className="text-[#1e40af]">Driving</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-[#1e40af] font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="/contact"
            className="hidden md:inline-flex btn btn-primary text-sm"
          >
            Book Lesson
          </Link>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-[#1e40af] font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="btn btn-primary text-center mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Lesson
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
