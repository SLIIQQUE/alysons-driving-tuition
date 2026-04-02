"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";

const blogPosts: Record<string, {
  title: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: { heading: string; paragraphs: string[]; list?: string[] }[];
}> = {
  "how-to-prepare-for-driving-test": {
    title: "How to Prepare for Your Driving Test: A Complete Guide",
    date: "March 2026",
    readTime: "8 min read",
    category: "Test Preparation",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&h=600&fit=crop",
    content: [
      {
        heading: "Understanding the UK Driving Test",
        paragraphs: [
          "The UK practical driving test is designed to assess whether you can drive safely and independently on real roads. Understanding exactly what's involved is the first step to feeling confident and prepared on test day.",
          "The test lasts approximately 40 minutes and is divided into several key sections. Your examiner will assess your overall ability to drive safely, follow road signs, and make independent decisions behind the wheel.",
        ],
        list: [
          "Eyesight check — read a number plate from 20 metres",
          "'Show me, tell me' vehicle safety questions (2 questions)",
          "General driving ability on various road types",
          "One reversing manoeuvre (parallel park, bay park, or pull up on the right)",
          "Independent driving for about 20 minutes following signs or a sat nav",
        ],
      },
      {
        heading: "What to Bring on Test Day",
        paragraphs: [
          "Being unprepared on test day is the easiest way to fail before you even start. Make sure you have everything you need the night before.",
        ],
        list: [
          "Your provisional driving licence (photocard required)",
          "Theory test pass certificate (if you have one)",
          "Appointment confirmation (printed or on your phone)",
          "Glasses or contact lenses if you need them for driving",
          "Comfortable shoes — you'll be using the pedals for 40 minutes",
        ],
      },
      {
        heading: "Common Mistakes That Cause Test Failure",
        paragraphs: [
          "Knowing what examiners look for — and what causes failures — is one of the best ways to prepare. Here are the most common reasons learners fail their test:",
        ],
        list: [
          "Poor observation at junctions — the number one cause of failure",
          "Not checking mirrors before signalling or changing speed",
          "Incorrect positioning when turning or at roundabouts",
          "Not responding correctly to traffic lights and signs",
          "Stalling the engine (occasional stalls are minor, but repeated stalls are serious)",
          "Moving off unsafely without checking blind spots",
          "Lack of control when reversing or parking",
        ],
      },
      {
        heading: "How to Practise Effectively Before Your Test",
        paragraphs: [
          "Practice doesn't make perfect — perfect practice makes perfect. Focus on quality over quantity. Work with your instructor to identify your weak areas and target them specifically.",
          "Try to practise on the same roads you'll be tested on. At Alyson's Driving Tuition, we always include test route practice in the lessons leading up to your test so you're familiar with every junction, roundabout, and tricky section.",
          "Mock tests are incredibly valuable. Ask your instructor to conduct a full mock test under real exam conditions. This will help you get used to the format and identify any last-minute areas for improvement.",
        ],
      },
      {
        heading: "Staying Calm on Test Day",
        paragraphs: [
          "Nerves are completely normal — even experienced drivers feel them before a test. The key is managing them so they don't affect your performance.",
          "Arrive at the test centre 10 minutes early. Take slow, deep breaths while you wait. Remember that your examiner is not trying to catch you out — they simply want to see that you can drive safely on your own.",
          "If you make a mistake during the test, don't panic. One minor fault won't fail you. Keep driving safely and focus on the rest of the test. Many pupils who make small errors still pass.",
        ],
      },
      {
        heading: "After the Test",
        paragraphs: [
          "Whether you pass or not, your examiner will give you feedback. If you pass, congratulations — you're now a qualified driver! If not, don't be discouraged. Use the feedback to improve and book your next test.",
          "At Alyson's Driving Tuition, we support every pupil through this process. If you don't pass first time, we'll work together on the areas that need improvement and get you ready for your next attempt.",
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
        heading: "The Official DVSA Numbers",
        paragraphs: [
          "According to the Driver and Vehicle Standards Agency (DVSA), the average learner needs around 45 hours of professional instruction plus 20 hours of private practice to reach test standard. That's roughly 65 hours of total driving experience.",
          "However, these are averages — not rules. Every learner is different, and the number of hours you need depends on many factors including your natural ability, how often you practise, and your confidence level.",
        ],
      },
      {
        heading: "Factors That Affect Your Learning Speed",
        paragraphs: [
          "Several key factors influence how quickly you'll progress from your first lesson to passing your test:",
        ],
        list: [
          "Lesson frequency — weekly lessons are far better than fortnightly ones because you retain more between sessions",
          "Private practice — learners who practise between lessons with a qualified supervisor progress significantly faster",
          "Age — younger learners often pick things up quickly, but older learners tend to be more cautious and make fewer errors",
          "Nervousness — anxious learners may need more time to build confidence, but this doesn't mean they can't become excellent drivers",
          "Learning style — some people learn best through repetition, others through understanding the 'why' behind each action",
          "Intensive vs. spread-out — intensive courses compress learning into a short period, which works well for some but not all",
        ],
      },
      {
        heading: "Typical Lesson Breakdown",
        paragraphs: [
          "While every learner's journey is different, here's a rough guide to how your lessons might be structured:",
        ],
        list: [
          "Hours 1-10: Basic controls, moving off and stopping, junctions, left and right turns",
          "Hours 10-20: Roundabouts, meeting traffic, emerging, more complex junctions",
          "Hours 20-30: Dual carriageways, independent driving, manoeuvres",
          "Hours 30-40: Test route practice, mock tests, refining skills",
          "Hours 40+: Final preparation and test readiness",
        ],
      },
      {
        heading: "How to Know When You're Ready",
        paragraphs: [
          "Your instructor is the best person to advise you on test readiness. They'll assess your ability against the DVSA standards and let you know when you're at the right level.",
          "Good signs you're approaching test standard include: consistently driving without instructor intervention, handling all road types confidently, making safe independent decisions, and only making minor errors occasionally.",
          "Don't rush to book your test before you're ready. It's better to have a few extra lessons and pass first time than to rush and fail — which costs more in the long run.",
        ],
      },
      {
        heading: "How Block Bookings Can Help",
        paragraphs: [
          "Booking lessons in blocks can save you money and help you maintain consistent progress. At Alyson's Driving Tuition, we offer 5% off for 5+ lessons, 10% off for 10+ lessons, and 15% off for 20+ lessons.",
          "Block bookings also help you establish a regular routine, which is one of the best ways to learn efficiently. Your instructor can plan a structured programme that builds your skills progressively towards test readiness.",
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
        heading: "Why Driving Nerves Are Completely Normal",
        paragraphs: [
          "Learning to drive is one of the most nerve-wracking experiences many people go through. You're controlling a heavy machine at speed, navigating complex traffic situations, and being assessed — all at the same time.",
          "Research shows that around 80% of learner drivers experience some form of driving anxiety. Whether you're nervous about stalling, making mistakes, or simply being in control of a car, these feelings are entirely normal and shared by the vast majority of learners.",
        ],
      },
      {
        heading: "Choosing the Right Instructor Makes All the Difference",
        paragraphs: [
          "The single most important factor in overcoming driving nerves is finding an instructor who makes you feel safe and comfortable. Look for someone who is patient, understanding, and adapts their teaching style to your needs.",
          "Don't be afraid to have a trial lesson before committing to a block of lessons. If you don't feel at ease after the first session, it's perfectly okay to try someone else. The right instructor will make you feel supported from day one.",
          "At Alyson's Driving Tuition, we specialise in working with nervous learners. With over 20 years of experience, Alyson has helped hundreds of anxious beginners become confident, safe drivers.",
        ],
      },
      {
        heading: "Practical Tips for Managing Driving Anxiety",
        paragraphs: [
          "Here are proven strategies that work for nervous learners:",
        ],
        list: [
          "Start on quiet roads — there's no rule that says you need to tackle busy streets on day one",
          "Practice deep breathing — take slow, deep breaths before and during lessons to calm your nervous system",
          "Focus on progress, not perfection — celebrate small wins like a smooth gear change or a successful junction",
          "Have shorter lessons at first — 1-hour sessions are less overwhelming than 2-hour ones when you're starting out",
          "Talk to your instructor — let them know you're nervous so they can adjust their teaching approach",
          "Avoid comparing yourself to others — everyone learns at their own pace",
          "Visualise success — imagine yourself driving confidently before each lesson",
        ],
      },
      {
        heading: "Understanding the Learning Curve",
        paragraphs: [
          "Learning to drive isn't linear. You'll have great lessons where everything clicks, and others where you feel like you've gone backwards. This is completely normal and happens to every learner.",
          "The key is to trust the process. Your instructor has a plan and knows where you need to get to. Even on difficult days, you're still learning — sometimes the lessons that feel hardest are the ones where you learn the most.",
        ],
      },
      {
        heading: "Building Confidence Over Time",
        paragraphs: [
          "Confidence comes from experience. The more time you spend behind the wheel, the more natural driving becomes. What feels overwhelming in lesson one will feel routine by lesson ten.",
          "Set small, achievable goals for each lesson. Maybe today you want to master a particular junction, or maybe you want to work on your mirror checks. Achieving these mini-goals builds momentum and confidence.",
          "Remember that every confident driver on the road was once a nervous beginner. With patience, the right instructor, and a willingness to learn, you will get there.",
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
          "Intensive driving courses — sometimes called 'crash courses' — pack your entire learning programme into a short, concentrated period. Instead of one lesson per week spread over months, you might have 2-4 hours of tuition every day for 1-4 weeks.",
          "These courses are designed for people who need their licence quickly, whether for a new job, university, or relocation. They can also work brilliantly for people who learn best through immersion and repetition.",
        ],
      },
      {
        heading: "What Are Regular Lessons?",
        paragraphs: [
          "Regular lessons are the traditional approach to learning to drive. Typically, you'll have one or two lessons per week spread over several months. This gives you time to absorb what you've learned, reflect on your progress, and practise between sessions.",
          "This approach works well for most learners, especially those who benefit from time to consolidate their skills. It's also more flexible around work, school, family, and other commitments.",
        ],
      },
      {
        heading: "Intensive Courses: Pros and Cons",
        paragraphs: [],
        list: [
          "Faster results — you can go from zero to test-ready in just 1-4 weeks",
          "Momentum — daily practice means skills build quickly and you don't forget between lessons",
          "Cost-effective overall — fewer total hours may be needed due to concentrated learning",
          "Can be intense and overwhelming, especially for nervous learners",
          "Requires full-day availability for the course duration",
          "Less time to process and reflect between sessions",
        ],
      },
      {
        heading: "Regular Lessons: Pros and Cons",
        paragraphs: [],
        list: [
          "Less pressure — you learn at a comfortable, manageable pace",
          "Flexible scheduling — fit lessons around work, school, and other commitments",
          "More affordable upfront — pay per lesson rather than a large upfront sum",
          "Time to practise between sessions with a qualified supervisor",
          "Progress can feel slower, especially with gaps between lessons",
          "Skills may need refreshing if too much time passes between lessons",
        ],
      },
      {
        heading: "Which Approach Is Right for You?",
        paragraphs: [
          "Consider your learning style, availability, and urgency. If you learn well under pressure, have the time to commit, and need your licence fast, an intensive course could be perfect. If you prefer a steadier pace, have other commitments, or feel nervous about driving, regular lessons are likely the better choice.",
          "At Alyson's Driving Tuition, we offer both options and can help you decide which approach suits you best. Get in touch for a free consultation and we'll create a learning plan tailored to your needs.",
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
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
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
              {section.list && (
                <ul className="space-y-3 mt-4 mb-6">
                  {section.list.map((item, k) => (
                    <li key={k} className="flex items-start gap-3 text-white/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
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
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
