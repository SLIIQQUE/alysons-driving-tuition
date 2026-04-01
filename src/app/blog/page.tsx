"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, Clock, Calendar, MessageCircle } from "lucide-react";

const posts = [
  {
    slug: "how-to-prepare-for-driving-test",
    title: "How to Prepare for Your Driving Test: A Complete Guide",
    excerpt: "Everything you need to know before your driving test. From what to bring to common mistakes and how to stay calm on test day.",
    date: "March 2026",
    readTime: "8 min read",
    category: "Test Preparation",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=500&fit=crop",
  },
  {
    slug: "how-many-driving-lessons-do-you-need",
    title: "How Many Driving Lessons Do You Actually Need?",
    excerpt: "The average learner needs 45 hours of professional instruction. But everyone is different. Here's how to figure out what's right for you.",
    date: "March 2026",
    readTime: "6 min read",
    category: "Learning Guide",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=500&fit=crop",
  },
  {
    slug: "nervous-about-learning-to-drive",
    title: "Nervous About Learning to Drive? You're Not Alone",
    excerpt: "Feeling anxious about getting behind the wheel is completely normal. Here are practical tips to overcome driving anxiety and build confidence.",
    date: "February 2026",
    readTime: "7 min read",
    category: "Confidence Building",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=500&fit=crop",
  },
  {
    slug: "intensive-vs-regular-driving-lessons",
    title: "Intensive vs Regular Driving Lessons: Which Is Right for You?",
    excerpt: "Should you cram your lessons or spread them out? We compare intensive courses with regular lessons to help you decide.",
    date: "February 2026",
    readTime: "5 min read",
    category: "Course Comparison",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&h=500&fit=crop",
  },
];

function BlogHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=1080&fit=crop')] bg-cover bg-center" />
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
          Blog
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6"
        >
          Driving Tips & <span className="text-gradient">Advice</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl text-white/60 max-w-2xl mx-auto"
        >
          Expert advice from a DVSA Approved Driving Instructor to help you learn, prepare, and pass.
        </motion.p>
      </motion.div>
    </section>
  );
}

function BlogGrid() {
  return (
    <section className="relative py-32 bg-[#0a0a0a] overflow-hidden">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-card overflow-hidden border-glow group"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-amber-500/90 rounded-full text-xs font-semibold text-black">
                  {post.category}
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 text-white/40 text-sm mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-xl font-display font-bold text-white mb-3 group-hover:text-amber-500 transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-white/50 text-sm mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-amber-500 font-semibold hover:gap-3 transition-all"
                >
                  Read more <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
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
            Ready to Put These Tips <span className="text-gradient">Into Practice?</span>
          </h2>
          <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto">
            Book your first lesson with Alyson and start your journey to passing your driving test.
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

export default function BlogPage() {
  return (
    <>
      <BlogHero />
      <BlogGrid />
      <CTASection />
    </>
  );
}
