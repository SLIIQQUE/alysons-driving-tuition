"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Calendar } from "lucide-react";

const posts = [
  {
    slug: "how-to-prepare-for-driving-test",
    title: "How to Prepare for Your Driving Test",
    excerpt:
      "Everything you need to know before test day — from what to bring to common mistakes.",
    date: "Mar 2026",
    category: "Test Prep",
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=400&fit=crop",
  },
  {
    slug: "how-many-driving-lessons-do-you-need",
    title: "How Many Driving Lessons Do You Need?",
    excerpt:
      "The average is 45 hours, but everyone's different. Here's how to figure out yours.",
    date: "Mar 2026",
    category: "Learning Guide",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop",
  },
  {
    slug: "nervous-about-learning-to-drive",
    title: "Nervous About Learning to Drive?",
    excerpt:
      "80% of learners feel anxious. Here are proven tips to overcome driving nerves.",
    date: "Feb 2026",
    category: "Confidence",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop",
  },
];

export function BlogPreview() {
  return (
    <section className="relative py-32 bg-[#0f0f0f] overflow-hidden">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-amber-500/10 text-amber-500 text-sm font-medium rounded-full mb-6">
            Blog
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            Latest <span className="text-gradient">Articles</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Expert tips and advice from a DVSA Approved Driving Instructor.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-card overflow-hidden border-glow group"
            >
              <Link href={`/blog/${post.slug}`} className="block" aria-label={`Read full article: ${post.title}`}>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110  cursor-pointer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-amber-500/90 rounded-full text-xs font-semibold text-black">
                    {post.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-white/30 text-xs mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-500 transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-amber-500 font-semibold hover:gap-3 transition-all" aria-label={`Read more about ${post.title}`}>
                    Read more <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-amber-500 font-semibold hover:gap-3 transition-all"
          >
            Read all articles <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}