"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Check } from "lucide-react";

interface Service {
  icon: React.ComponentType<React.ComponentProps<"svg">>;
  title: string;
  description: string;
  image: string;
  features: string[];
  price: string;
  cta: string;
}

const services: Service[] = [
  {
    icon: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v4.5m0-4.5h-2.25" />
      </svg>
    ),
    title: "Standard Driving Lessons",
    description:
      "One-to-one driving lessons tailored to your ability. Whether you're a complete beginner or nearly test-ready, I'll help you progress at your pace.",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop",
    features: [
      "Beginner friendly",
      "Progress at your pace",
      "Theory test support included",
      "Flexible lesson times",
      "Dual-controlled car",
    ],
    price: "From £30 per hour",
    cta: "Book Standard Lesson",
  },
  {
    icon: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Intensive Driving Courses",
    description:
      "Pass your test in weeks, not months. Intensive courses available for those who want to learn quickly or need their license for work.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop",
    features: [
      "1-2 week courses available",
      "Intensive learning packages",
      "Test booking assistance",
      "Great for urgent license needs",
      "Customised schedule",
    ],
    price: "From £450 (10 hour course)",
    cta: "Get a Quote",
  },
  {
    icon: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
    ),
    title: "Block Booking Discounts",
    description:
      "Save money by booking multiple lessons in advance. Block bookings offer great value and help maintain consistent progress.",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
    features: [
      "Save up to 15%",
      "Flexible scheduling",
      "Consistent instructor",
      "Track your progress",
      "Priority booking",
    ],
    price: "From £270 (10 lessons)",
    cta: "View Packages",
  },
  {
    icon: ({ className }: { className?: string }) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    title: "Pass Plus",
    description:
      "A practical driving course for new drivers to build experience and confidence after passing your test.",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop",
    features: [
      "6 modules",
      "Reduce insurance",
      "Build confidence",
      "All weather driving",
      "Night driving",
    ],
    price: "From £200",
    cta: "Learn More",
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className="glass-card overflow-hidden border-glow group"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          loading="lazy"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        <div className="absolute top-6 left-6 w-14 h-14 bg-gradient-to-r from-amber-500 to-red-500 rounded-xl flex items-center justify-center">
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>

      <div className="p-8">
        <h3 className="text-2xl font-display font-bold text-white mb-4">{service.title}</h3>
        <p className="text-white/50 mb-6">{service.description}</p>

        <ul className="space-y-3 mb-6">
          {service.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3">
              <Check className="w-5 h-5 text-amber-500 shrink-0" />
              <span className="text-white/70 text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <span className="text-amber-500 font-bold">{service.price}</span>
          <button
            onClick={() => document.querySelector<HTMLButtonElement>('[data-voice-button]')?.click()}
            className="btn btn-primary"
          >
            {service.cta}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function ServicesList() {
  return (
    <section className="relative py-32 bg-[#0a0a0a]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}