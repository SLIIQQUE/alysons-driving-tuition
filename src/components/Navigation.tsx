"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Phone } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0a0a]/90 backdrop-blur-2xl border-b border-white/5 py-3"
            : "bg-transparent py-6"
        }`}
      >
        <nav className="mx-auto container" aria-label="Global">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex lg:flex-1">
              <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3 group">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-black font-bold text-xl">A</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-red-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                </div>
                <div className="hidden sm:block">
                  <span className="font-display font-bold text-xl text-white tracking-tight">
                    Alyson&apos;s
                  </span>
                  <span className="font-display font-bold text-xl text-amber-500 tracking-tight ml-1">
                    Driving
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop navigation */}
            <div className="hidden lg:flex lg:gap-x-10">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-white/70 hover:text-amber-500 transition-all duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
              <a
                href="tel:01234567890"
                className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-amber-500 transition-colors"
              >
                <Phone className="w-4 h-4" />
                01234 567890
              </a>
              <Link
                href="/contact"
                className="btn btn-primary text-sm py-2.5 px-5"
              >
                Book Lesson
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-xl p-2.5 text-white"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden"
                role="dialog"
                aria-modal="true"
              >
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl" />
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#0a0a0a] px-6 py-6 sm:max-w-sm border-l border-white/10"
                >
                  <div className="flex items-center justify-between">
                    <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-red-500 rounded-lg flex items-center justify-center">
                        <span className="text-black font-bold text-lg">A</span>
                      </div>
                      <span className="font-display font-bold text-lg text-white">
                        Alyson&apos;s Driving
                      </span>
                    </Link>
                    <button
                      type="button"
                      className="-m-2.5 rounded-xl p-2.5 text-white/70 hover:text-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-8 flow-root">
                    <div className="-my-6 divide-y divide-white/10">
                      <div className="space-y-2 py-6">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="-mx-3 block rounded-xl px-3 py-3 text-base font-semibold leading-7 text-white hover:bg-white/5"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                      <div className="py-6">
                        <Link
                          href="/contact"
                          onClick={() => setMobileMenuOpen(false)}
                          className="-mx-3 block rounded-xl px-3 py-3 text-base font-semibold text-center text-black bg-gradient-to-r from-amber-500 to-red-500 hover:opacity-90"
                        >
                          Book Lesson
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>
      <div className="noise-overlay" />
    </>
  );
}
