import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { AnimateOnScroll } from "./AnimateOnScroll";

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

export default function CoursesSection() {
  return (
    <section className="relative py-40 bg-[#0a0a0a]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.1),transparent_50%)]" />

      <div className="container relative z-10">
        <AnimateOnScroll className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
            Our <span className="text-gradient">Courses</span>
          </h2>
          <p className="text-white/50 text-xl max-w-2xl mx-auto">
            Flexible options to fit your schedule and learning style
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <AnimateOnScroll key={i} delay={i * 0.15}>
              <div className="group relative">
                <div className="relative h-[450px] rounded-[2.5rem] overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={70}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <div className="absolute top-6 right-6 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full">
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
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
