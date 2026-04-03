"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Bot } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "Areas", href: "/areas" },
  { name: "About", href: "/about" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
        <nav className="container relative" aria-label="Global">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex xl:flex-1">
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
            <div className="hidden xl:flex xl:gap-x-10">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-sm font-medium transition-all duration-300 relative group ${
                      isActive ? "text-amber-500" : "text-white/70 hover:text-amber-500"
                    }`}
                  >
                    {item.name}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-amber-500 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`} />
                  </Link>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="hidden xl:flex xl:flex-1 xl:justify-end">
              <button
                onClick={() => document.querySelector<HTMLButtonElement>('[data-voice-button]')?.click()}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-red-500 text-black font-semibold rounded-full hover:shadow-lg hover:shadow-amber-500/25 transition-all group"
                aria-label="Open AI Assistant"
              >
                <Bot className="w-4 h-4" />
                <span className="text-sm">AI Assistant</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex xl:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-xl p-2.5 text-white"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open main menu"
              >
                <span className="sr-only">Open main menu</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>

        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 xl:hidden"
            role="dialog"
            aria-modal="true"
          >
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/80 backdrop-blur-xl" 
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Sidebar drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full overflow-y-auto bg-[#0a0a0a] px-6 py-6 sm:max-w-sm border-l border-white/10 shadow-2xl"
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
                  aria-label="Close menu"
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-8 flow-root">
                <div className="-my-6 divide-y divide-white/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`-mx-3 block rounded-xl px-3 py-3 text-base font-semibold leading-7 ${
                            isActive 
                              ? "text-amber-500 bg-amber-500/10" 
                              : "text-white hover:bg-white/5"
                          }`}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                  <div className="py-6">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        document.querySelector<HTMLButtonElement>('[data-voice-button]')?.click();
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-red-500 text-black font-bold rounded-xl"
                      aria-label="Open AI Assistant"
                    >
                      <Bot className="w-5 h-5" />
                      AI Assistant
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    
      <div className="noise-overlay" />
    </>
  );
}
