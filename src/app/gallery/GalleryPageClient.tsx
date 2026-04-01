"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { ImageCursorTrail } from "@/components/ui/ImageCursorTrail";

const galleryImages = [
  "/images/591893248_1541215087502009_5797804274424608075_n.jpg",
  "/images/597531388_1548832826740235_5407246884671237047_n.jpg",
  "/images/599949982_1552116263078558_5665254307255416114_n.jpg",
  "/images/608170247_1563095581980626_416286650069626209_n.jpg",
  "/images/615925545_1576939500596234_262065853199998538_n.jpg",
  "/images/641333683_1611273163829534_6636370326147936327_n.jpg",
  "/images/646850877_1618580426432141_2500271091644643115_n.jpg",
  "/images/641462288_1612133350410182_8019026569665912712_n.jpg",
  "/images/656008214_1631416785148505_9113569755809809811_n.jpg",
  "/images/657264609_1638302024459981_2963671567164602229_n.jpg",
  "/images/506639864_10010176822400709_5506235592895454315_n.jpg",
];

function GalleryHero() {
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
          Gallery
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6"
        >
          Driving Lessons in <span className="text-gradient">Action</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl text-white/60 max-w-2xl mx-auto"
        >
          Browse photos from driving lessons across Blackwood, Tredegar, and South Wales.
        </motion.p>
      </motion.div>
    </section>
  );
}

function GalleryGrid() {
  return (
    <section className="relative py-32 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Our <span className="text-gradient">Gallery</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Move your cursor over the gallery to reveal photos from our driving lessons.
          </p>
        </motion.div>

        <ImageCursorTrail
          distance={20}
          maxNumberOfImages={6}
          items={galleryImages}
          className="h-[600px] w-full rounded-3xl"
          imgClass="w-64 h-74 rounded-2xl"
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-8 text-center border-glow"
          >
            <h3 className="text-xl font-display font-semibold text-white mb-3">
              Dual-Controlled Car
            </h3>
            <p className="text-white/50">
              Learn in our fully equipped dual-controlled vehicle for maximum safety and confidence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-8 text-center border-glow"
          >
            <h3 className="text-xl font-display font-semibold text-white mb-3">
              Successful Pupils
            </h3>
            <p className="text-white/50">
              Celebrating the achievements of our pupils who passed their driving tests.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-8 text-center border-glow"
          >
            <h3 className="text-xl font-display font-semibold text-white mb-3">
              South Wales Roads
            </h3>
            <p className="text-white/50">
              Practice on the same roads you&apos;ll be tested on in Blackwood and surrounding areas.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-32 bg-[#0a0a0a] overflow-hidden">
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
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Ready to Start Your{" "}
            <span className="text-gradient">Journey?</span>
          </h2>
          <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto">
            Book your first lesson today and become one of our success stories.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/contact" className="btn btn-primary group">
              <span>Book Your First Lesson</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={() =>
                window.dispatchEvent(new CustomEvent("openVoiceAssistant"))
              }
              className="btn btn-secondary group"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat with AI</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function GalleryPageClient() {
  return (
    <>
      <GalleryHero />
      <GalleryGrid />
      <CTASection />
    </>
  );
}
