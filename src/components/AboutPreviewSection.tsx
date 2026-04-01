import Link from "next/link";
import Image from "next/image";
import { Award, ArrowRight } from "lucide-react";
import { AnimateOnScroll } from "./AnimateOnScroll";

export default function AboutPreviewSection() {
  return (
    <section className="relative py-40 bg-[#111] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-amber-500/10 to-transparent" />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimateOnScroll>
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
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.2}>
            <div className="relative w-full aspect-[4/5] rounded-[3rem] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop&crop=face"
                alt="Alyson Baldwin"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={70}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            <AnimateOnScroll delay={0.5}>
              <div className="absolute -bottom-8 -left-8 bg-white rounded-3xl p-6 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-red-500 rounded-2xl flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-black">Grade A</div>
                    <div className="text-gray-500">Instructor Rating</div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
