"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";

export function MyStory() {
  return (
    <section className="relative py-32 bg-[#111] overflow-hidden">
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
              My Story
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">
              Teaching to <span className="text-amber-500">Drive Safe</span> for Over 20 Years
            </h2>
            <div className="space-y-6 text-white/60 text-lg leading-relaxed">
              <p>
                I became a driving instructor because I genuinely love helping people 
                develop a skill that changes their lives. There&apos;s nothing quite 
                like seeing a nervous beginner transform into a confident driver.
              </p>
              <p>
                Over the years, I&apos;ve helped hundreds of learners in South Wales pass 
                their driving test. But it&apos;s not just about passing — it&apos;s about 
                creating safe, confident drivers who&apos;ll be safe on the roads for life.
              </p>
              <p>
                I believe patience is the key. Everyone learns at their own pace, and 
                I tailor my teaching to your individual needs. Whether you&apos;re a 
                complete beginner or returning to driving after a break, I&apos;ll help 
                you reach your goals.
              </p>
            </div>
            <Link
              href="/contact"
              className="btn btn-primary group mt-8 inline-flex items-center gap-2"
            >
              Book a Lesson
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              viewport={{ once: true }}
              className="absolute -bottom-8 -left-8 bg-white rounded-3xl p-6 shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-red-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-black">98%</div>
                  <div className="text-gray-500">Pass Rate</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ArrowRight(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}