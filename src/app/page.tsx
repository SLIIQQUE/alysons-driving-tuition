"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  Star,
  Award,
  Shield,
  Users,
  Heart,
  ChevronDown,
  MessageCircle,
} from "lucide-react";

const features = [
  {
    title: "Patient & Friendly",
    description: "Understanding nervous beginners",
    icon: Heart,
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Safety First",
    description: "Creating safe drivers for life",
    icon: Shield,
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "High Pass Rate",
    description: "98% pass rate",
    icon: Award,
    color: "from-emerald-500 to-green-500",
  },
  {
    title: "Local Expert",
    description: "Blackwood & surrounding areas",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
  },
];

const courses = [
  {
    name: "Standard Lessons",
    hours: "1-2 hours",
    price: "From £30",
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop",
  },
  {
    name: "Intensive Course",
    hours: "1-2 weeks",
    price: "From £450",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop",
  },
  {
    name: "Block Booking",
    hours: "5+ lessons",
    price: "Save 15%",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
  },
];

const testimonials = [
  {
    name: "Liza Lewis",
    text: "Fab instructor really patient, definitely recommend.",
    location: "South Wales",
    stars: 4.5,
  },
  {
    name: "Marllah Rose Hoskin",
    text: "Couldn't recommend Alyson enough, thankyou for everything!",
    location: "South Wales",
    stars: 4.5,
  },
  {
    name: "Nicole Adams",
    text: "Thank you so much for your support and helping me pass first time!",
    location: "South Wales",
    stars: 5,
  },
  {
    name: "Blake Liam Carter",
    text: "Passed first time and couldn't be happier. Can't thank Alyson enough!",
    location: "South Wales",
    stars: 5,
  },
  {
    name: "Jennie Powell",
    text: "Alyson was absolutely amazing, great at explaining all the manoeuvres!",
    location: "South Wales",
    stars: 4,
  },
  {
    name: "Sally-Ann Morgan",
    text: "Very patient and provides so much knowledge and support. 100% recommended!",
    location: "South Wales",
    stars: 5,
  },
  {
    name: "Ben Ellaway",
    text: "Professional, patient and thorough instruction. Highly recommend!",
    location: "South Wales",
    stars: 4.5,
  },
  {
    name: "Zac Yearsley",
    text: "Great instructor who's very patient and brought my confidence on loads.",
    location: "South Wales",
    stars: 5,
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const avatarColors = [
  "from-amber-500 to-orange-500",
  "from-pink-500 to-rose-500",
  "from-emerald-500 to-green-500",
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-violet-500",
  "from-red-500 to-orange-500",
];

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Background */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&h=1080&fit=crop"
          alt="Driving"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
      </motion.div>

      {/* Animated circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.5, 1] }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className={`absolute rounded-full blur-3xl ${i % 2 === 0 ? "bg-amber-500/20" : "bg-red-500/20"}`}
            style={{
              width: 200 + i * 100,
              height: 200 + i * 100,
              left: `${10 + i * 20}%`,
              top: `${20 + i * 15}%`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-8"
            >
              <span className="inline-block px-6 py-3 bg-gradient-to-r from-amber-500 to-red-500 rounded-full font-semibold text-black">
                Trusted by 500+ Students
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-white leading-[0.9] mb-8"
            >
              Drive with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">
                Confidence
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/70 max-w-xl mb-12"
            >
              20+ years experience teaching people to drive safely. Patient,
              friendly instruction tailored to you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("openVoiceAssistant"))
                }
                className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-red-500 text-black font-bold rounded-full overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Chat with AI Assistant
                </span>
              </button>
              <Link
                href="/contact"
                className="px-8 py-4 border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                Book a Lesson
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-8 h-14 border-2 border-white/30 rounded-full flex justify-center p-2"
        >
          <motion.div className="w-1.5 h-3 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function FeatureStrip() {
  return (
    <section className="relative py-24 bg-[#0a0a0a] overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-[#0a0a0a]" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
            Why Choose <span className="text-amber-500">Alyson&apos;s</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.1,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 lg:p-8 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-500"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-white/50 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoursesSection() {
  return (
    <section className="relative py-40 bg-[#0a0a0a]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.1),transparent_50%)]" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
            Our <span className="text-gradient">Courses</span>
          </h2>
          <p className="text-white/50 text-xl max-w-2xl mx-auto">
            Flexible options to fit your schedule and learning style
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative h-[450px] rounded-[2.5rem] overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />

                {/* Floating badge */}
                <div className="absolute top-6 right-6 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/20">
                  <span className="text-white font-bold">{course.price}</span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-3xl font-display font-bold text-white mb-2">
                    {course.name}
                  </h3>
                  <p className="text-white/70 mb-4">{course.hours}</p>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-amber-400 font-semibold hover:gap-3 transition-all"
                  >
                    Learn more{" "}
                    <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutPreview() {
  return (
    <section className="relative py-40 bg-[#111] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-amber-500/10 to-transparent" />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 bg-amber-500/20 text-amber-500 rounded-full font-medium mb-6">
              Meet Your Instructor
            </span>
            <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-8">
              Hi, I&apos;m{" "}
              <span className="text-amber-500">Alyson Baldwin</span>
            </h2>
            <p className="text-white/60 text-lg mb-6 leading-relaxed">
              With over 20 years of experience as a DVSA Approved Driving
              Instructor, I&apos;ve helped hundreds of learners become safe,
              confident drivers.
            </p>
            <p className="text-white/60 text-lg mb-8 leading-relaxed">
              I believe everyone can learn to drive with the right patience and
              guidance. Whether you&apos;re a complete beginner or returning to
              driving, I&apos;ll tailor my teaching to your unique needs.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-amber-500 font-bold text-lg hover:gap-3 transition-all"
            >
              More about me <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full aspect-[4/5] rounded-[3rem] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop&crop=face"
                alt="Alyson Baldwin"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              viewport={{ once: true }}
              className="absolute -bottom-8 -left-8 bg-white rounded-3xl p-6 shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-red-500 rounded-2xl flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-black">Grade A</div>
                  <div className="text-gray-500">Instructor Rating</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsMarquee() {
  const duplicatedTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  return (
    <section className="relative py-20 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#111] to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#111] to-transparent z-10" />

      <motion.div
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex gap-8"
      >
        {duplicatedTestimonials.map((t, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[400px] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center flex-shrink-0`}>
                <span className="text-black font-bold text-sm">{getInitials(t.name)}</span>
              </div>
              <div>
                <div className="font-bold text-white">{t.name}</div>
                <div className="text-white/50 text-sm">{t.location}</div>
              </div>
            </div>
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, j) => (
                <Star
                  key={j}
                  className={`w-4 h-4 ${j < Math.floor(t.stars) ? 'fill-amber-500 text-amber-500' : j < t.stars ? 'fill-amber-500/50 text-amber-500' : 'text-white/20'}`}
                />
              ))}
            </div>
            <p className="text-white/70">&ldquo;{t.text}&rdquo;</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-40 overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&h=800&fit=crop"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/60" />

      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, delay: i }}
            className="absolute w-32 h-32 bg-amber-500/20 rounded-full blur-2xl"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-8">
            Start Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-400">
              Journey
            </span>{" "}
            Today
          </h2>
          <p className="text-xl text-white/60 mb-12">
            Book your first lesson and discover why we&apos;re South Wales&apos;
            most trusted driving school
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button
              onClick={() =>
                window.dispatchEvent(new CustomEvent("openVoiceAssistant"))
              }
              className="group px-10 py-5 bg-gradient-to-r from-amber-500 to-red-500 text-black font-bold rounded-full text-lg hover:scale-105 transition-transform flex items-center gap-3"
            >
              <MessageCircle className="w-5 h-5" />
              Chat with AI Assistant
            </button>
            <Link
              href="/contact"
              className="px-10 py-5 border-2 border-white/30 text-white font-bold rounded-full text-lg hover:bg-white/10 transition-colors"
            >
              Book Your First Lesson
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureStrip />
      <CoursesSection />
      <AboutPreview />
      <TestimonialsMarquee />
      <CTASection />
    </>
  );
}
