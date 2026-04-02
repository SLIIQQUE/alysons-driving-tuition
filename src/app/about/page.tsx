"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Award,
  Clock,
  CheckCircle,
  Heart,
  Shield,
  Target,
  Users,
  ArrowRight,
} from "lucide-react";

const qualifications = [
  {
    icon: Award,
    title: "DVSA Approved",
    subtitle: "Licensed ADI",
    description:
      "Fully licensed and regulated by the Driving and Vehicle Standards Agency",
  },
  {
    icon: CheckCircle,
    title: "Grade A",
    subtitle: "Instructor Rating",
    description: "Highest possible DVSA rating for driving instructors",
  },
  {
    icon: Clock,
    title: "20+ Years",
    subtitle: "Experience",
    description: "Teaching safe driving since 2004",
  },
];

const values = [
  {
    icon: Heart,
    title: "Patience & Understanding",
    description:
      "Every learner is different. I take time to understand your needs and adapt my teaching style accordingly.",
  },
  {
    icon: Shield,
    title: "Safety First",
    description:
      "Creating safe drivers is my top priority. Good driving habits last a lifetime.",
  },
  {
    icon: Target,
    title: "Learner-Centred Approach",
    description:
      "Lessons tailored to you, not a one-size-fits-all curriculum. Your goals matter.",
  },
  {
    icon: Users,
    title: "Professional & Reliable",
    description:
      "Always on time, always prepared, always focused on your success.",
  },
];

function AboutHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1920&h=1080&fit=crop&crop=face')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]" />

        {/* Animated glows */}
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-red-500/15 rounded-full blur-[120px]"
        />
      </div>

      <motion.div className="container relative z-10 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block px-4 py-1.5 bg-amber-500/10 text-amber-500 text-sm font-medium rounded-full mb-6"
        >
          About Us
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6"
        >
          Meet <span className="text-gradient">Alyson Baldwin</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl text-white/60 max-w-2xl mx-auto"
        >
          Your Local Approved Driving Instructor
        </motion.p>
      </motion.div>
    </section>
  );
}

function AboutContent() {
  return (
    <section className="relative py-32 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-gradient-to-br from-amber-500/20 via-red-500/10 to-transparent rounded-3xl blur-3xl" />
            <div className="relative rounded-[2rem] overflow-hidden border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop&crop=face"
                alt="Alyson Baldwin - Driving Instructor"
                width={500}
                height={650}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -right-4 glass-card px-6 py-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-red-500 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-black" />
                </div>
                <div>
                  <div className="text-white font-semibold">Grade A</div>
                  <div className="text-white/50 text-sm">Instructor</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8">
              Hello! I&apos;m Alyson Baldwin
            </h2>
            <div className="space-y-6 text-white/60 leading-relaxed">
              <p>
                I started teaching driving over 20 years ago because I love
                helping people gain the confidence and skills to drive safely
                for life.
              </p>
              <p>
                Every pupil is different, and I take pride in adapting my
                teaching style to suit each individual&apos;s needs. Whether
                you&apos;re nervous about getting behind the wheel or just need
                a bit more practice before your test, I&apos;m here to help.
              </p>
              <p>
                As a local instructor based in Blackwood, I know the area well
                and can help you practice on the roads you&apos;ll be tested on.
                My goal is to not just help you pass your test, but to give you
                the skills and confidence to drive safely for life.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Qualifications() {
  return (
    <section className="relative py-32 bg-[#0f0f0f] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-amber-500/10 text-amber-500 text-sm font-medium rounded-full mb-6">
            Credentials
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            My Qualifications
          </h2>
          <p className="text-white/50">
            Fully qualified and regulated to teach you to drive.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {qualifications.map((qual, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-card p-8 text-center border-glow"
            >
              <div className="relative inline-block mb-6">
                <div className="absolute -inset-2 bg-gradient-to-br from-amber-500/30 to-transparent rounded-xl blur-lg" />
                <div className="relative w-16 h-16 bg-gradient-to-br from-amber-500/20 to-white/5 rounded-full flex items-center justify-center">
                  <qual.icon className="w-8 h-8 text-amber-500" />
                </div>
              </div>
              <h3 className="text-xl font-display font-semibold text-white mb-1">
                {qual.title}
              </h3>
              <p className="text-amber-500 font-medium mb-3">{qual.subtitle}</p>
              <p className="text-white/50 text-sm">{qual.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="relative py-32 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-amber-500/10 text-amber-500 text-sm font-medium rounded-full mb-6">
            What I Stand For
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            My Values
          </h2>
          <p className="text-white/50">
            My mission is to provide friendly, patient instruction that builds
            confidence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-card p-8 flex flex-col md:flex-row gap-6 border-glow"
            >
              <div className="relative flex-shrink-0">
                <div className="absolute -inset-2 bg-gradient-to-br from-amber-500/20 to-transparent rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-500 blur-lg" />
                <div className="relative w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center">
                  <value.icon className="w-7 h-7 text-amber-500" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-display font-semibold text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-white/50">{value.description}</p>
              </div>
            </motion.div>
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
            Ready to Start Your <span className="text-gradient">Journey?</span>
          </h2>
          <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto">
            Book your first lesson today and see why so many pupils recommend
            Alyson&apos;s Driving Tuition.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/contact" className="btn btn-primary group">
              <span>Book a Lesson</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutContent />
      <Qualifications />
      <Values />
      <CTASection />
    </>
  );
}
