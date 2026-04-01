"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Clock, Calendar, MessageCircle } from "lucide-react";

const blogPosts: Record<string, {
  title: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: { heading: string; paragraphs: string[] }[];
}> = {
  "how-to-prepare-for-driving-test": {
    title: "How to Prepare for Your Driving Test: A Complete Guide",
    date: "March 2026",
    readTime: "8 min read",
    category: "Test Preparation",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&h=600&fit=crop",
    content: [
      {
        heading: "Understanding the Driving Test",
        paragraphs: [
          "The UK driving test consists of several parts: an eyesight check, 'show me, tell me' vehicle safety questions, general driving ability, reversing manoeuvre, and independent driving. Understanding what to expect is the first step to feeling prepared.",
          "The test lasts around 40 minutes and covers a variety of road types including residential streets, dual carriageways, and sometimes country roads. Your examiner will be assessing your overall safety and ability to drive independently.",
        ],
      },
      {
        heading: "What to Bring on Test Day",
        paragraphs: [
          "Make sure you bring your provisional driving licence — both the photocard and the paper counterpart if you have one. Without it, your test will be cancelled and you'll lose your fee.",
          "If you're using your own car for the test, ensure it meets all requirements: L plates on the front and rear, a valid MOT, road tax, insurance that covers the test, no warning lights showing, and enough fuel for the test duration.",
        ],
      },
      {
        heading: "Common Mistakes to Avoid",
        paragraphs: [
          "Observation at junctions is the most common reason for test failure. Always make exaggerated head movements so the examiner can see you're checking properly. Don't just glance in the mirror — look.",
          "Other common faults include poor use of mirrors, incorrect positioning, and not responding correctly to traffic signs and signals. Practice these regularly with your instructor.",
        ],
      },
      {
        heading: "Staying Calm on Test Day",
        paragraphs: [
          "It's completely normal to feel nervous. In fact, a little adrenaline can help you stay sharp. The key is to manage your nerves so they don't affect your driving.",
          "Arrive early, take deep breaths, and remember that your examiner wants you to pass. They're not trying to catch you out — they just want to see that you can drive safely on your own.",
        ],
      },
    ],
  },
  "how-many-driving-lessons-do-you-need": {
    title: "How Many Driving Lessons Do You Actually Need?",
    date: "March 2026",
    readTime: "6 min read",
    category: "Learning Guide",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=600&fit=crop",
    content: [
      {
        heading: "The Official Numbers",
        paragraphs: [
          "According to the DVSA, the average learner driver needs around 45 hours of professional instruction plus 20 hours of private practice to reach test standard. That's roughly 65 hours of total driving experience.",
          "However, these are averages — not rules. Some pupils pass with as few as 20 hours, while others may need 60 or more. It all depends on your individual ability, how quickly you learn, and how much you practice between lessons.",
        ],
      },
      {
        heading: "Factors That Affect How Many Lessons You Need",
        paragraphs: [
          "Your age can make a difference — younger learners often pick things up more quickly, but older learners tend to be more cautious and make fewer errors. Both approaches have their advantages.",
          "How often you have lessons matters too. Weekly lessons are better than fortnightly ones because you retain more between sessions. Intensive courses can work well for some learners who want to learn quickly.",
          "Private practice is invaluable. If you have access to a suitable car and a qualified supervisor (over 21 with 3+ years of experience), practising between lessons will significantly speed up your progress.",
        ],
      },
      {
        heading: "How to Know When You're Ready",
        paragraphs: [
          "Your instructor is the best person to advise you on test readiness. They'll assess your ability against the DVSA standards and let you know when you're at the right level.",
          "A good indicator is when you can drive independently without your instructor needing to intervene. If you're consistently making only minor errors and can handle all road types confidently, you're probably close to being ready.",
        ],
      },
    ],
  },
  "nervous-about-learning-to-drive": {
    title: "Nervous About Learning to Drive? You're Not Alone",
    date: "February 2026",
    readTime: "7 min read",
    category: "Confidence Building",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=600&fit=crop",
    content: [
      {
        heading: "Why Driving Nerves Are Normal",
        paragraphs: [
          "Learning to drive is one of the most nerve-wracking things many people do. You're controlling a heavy machine at speed, navigating complex traffic situations, and being assessed — all at the same time.",
          "Research shows that around 80% of learner drivers experience some form of driving anxiety. You're definitely not alone, and there are proven strategies to help you overcome these feelings.",
        ],
      },
      {
        heading: "Choosing the Right Instructor",
        paragraphs: [
          "The most important factor in overcoming driving nerves is finding an instructor who makes you feel comfortable. Look for someone who is patient, understanding, and adapts their teaching style to your needs.",
          "Don't be afraid to have a trial lesson with an instructor before committing. If you don't feel at ease after the first lesson, it's perfectly okay to try someone else. The right instructor will make all the difference.",
        ],
      },
      {
        heading: "Practical Tips for Managing Anxiety",
        paragraphs: [
          "Start with quiet roads and gradually build up to busier situations. There's no rush — your instructor will progress at a pace that feels comfortable for you.",
          "Practice deep breathing techniques before and during lessons. Focus on what you're doing well rather than what you're struggling with. Progress isn't always linear, and that's okay.",
          "Consider having shorter lessons at first — 1 hour instead of 2 — until you feel more confident. You can always increase the duration as your comfort level grows.",
        ],
      },
      {
        heading: "Building Confidence Over Time",
        paragraphs: [
          "Confidence comes with experience. The more time you spend behind the wheel, the more natural driving will feel. Celebrate small victories — your first successful junction, your first roundabout, your first dual carriageway.",
          "Remember that every confident driver on the road was once a nervous beginner. With the right support and patience, you'll get there too.",
        ],
      },
    ],
  },
  "intensive-vs-regular-driving-lessons": {
    title: "Intensive vs Regular Driving Lessons: Which Is Right for You?",
    date: "February 2026",
    readTime: "5 min read",
    category: "Course Comparison",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&h=600&fit=crop",
    content: [
      {
        heading: "What Are Intensive Driving Courses?",
        paragraphs: [
          "Intensive driving courses (sometimes called 'crash courses') pack your learning into a short period — typically 1-4 weeks. Instead of one lesson per week, you might have 2-4 hours of tuition every day.",
          "These courses are ideal for people who need their licence quickly — perhaps for a new job, university, or relocation. They can also work well for people who learn best through immersion.",
        ],
      },
      {
        heading: "What Are Regular Lessons?",
        paragraphs: [
          "Regular lessons are the traditional approach — typically one or two lessons per week spread over several months. This gives you time to absorb what you've learned and practice between sessions.",
          "This approach works well for most learners, especially those who benefit from time to reflect and consolidate their skills. It's also more flexible around work, school, and other commitments.",
        ],
      },
      {
        heading: "Pros and Cons",
        paragraphs: [
          "Intensive courses offer faster results and momentum — you're driving every day, so skills build quickly. However, they can be intense and overwhelming, and you need to be able to commit full days to learning.",
          "Regular lessons are less pressure and more affordable upfront. You can spread the cost over time and fit lessons around your schedule. The downside is that progress can feel slower, and gaps between lessons can mean some skills need refreshing.",
        ],
      },
      {
        heading: "Which Should You Choose?",
        paragraphs: [
          "Consider your learning style, availability, and urgency. If you learn well under pressure and need your licence fast, an intensive course could be perfect. If you prefer a steadier pace and have other commitments, regular lessons are likely the better choice.",
          "At Alyson's Driving Tuition, we offer both options and can help you decide which approach suits you best. Get in touch for a free consultation.",
        ],
      },
    ],
  },
};

const relatedPosts = [
  { slug: "how-to-prepare-for-driving-test", title: "How to Prepare for Your Driving Test" },
  { slug: "how-many-driving-lessons-do-you-need", title: "How Many Lessons Do You Need?" },
  { slug: "nervous-about-learning-to-drive", title: "Nervous About Learning to Drive?" },
  { slug: "intensive-vs-regular-driving-lessons", title: "Intensive vs Regular Lessons" },
];

export default function BlogPostClient({ slug }: { slug: string }) {
  const post = blogPosts[slug];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-amber-500 hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        </div>

        <motion.div className="container relative z-10 text-center py-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 bg-amber-500/10 text-amber-500 text-sm font-medium rounded-full mb-6"
          >
            {post.category}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 max-w-4xl mx-auto"
          >
            {post.title}
          </motion.h1>
          <div className="flex items-center justify-center gap-6 text-white/40">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
        </motion.div>
      </section>

      <article className="relative py-24 bg-[#0a0a0a]">
        <div className="container max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/50 hover:text-amber-500 transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {post.content.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl font-display font-bold text-white mb-4">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph, j) => (
                <p key={j} className="text-white/60 leading-relaxed mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </motion.div>
          ))}

          <div className="pt-12 border-t border-white/10">
            <h3 className="text-xl font-bold text-white mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedPosts
                .filter((p) => p.slug !== slug)
                .slice(0, 2)
                .map((related, i) => (
                  <Link
                    key={i}
                    href={`/blog/${related.slug}`}
                    className="glass-card p-6 hover:border-amber-500/30 transition-colors group"
                  >
                    <h4 className="text-white font-semibold group-hover:text-amber-500 transition-colors">
                      {related.title}
                    </h4>
                    <span className="text-amber-500 text-sm flex items-center gap-1 mt-2">
                      Read more <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </article>

      <section className="relative py-24 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-red-500/10" />
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
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
    </>
  );
}
