"use client";

import { useCallback } from "react";
import { motion } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  name: string;
  location: string;
  text: string;
  stars: number;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  className?: string;
}

export function TestimonialsCarousel({ testimonials, className }: TestimonialsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className={cn("relative", className)}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl p-8 mx-2 shadow-lg shadow-gray-100 border border-gray-100 h-full">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#f59e0b] text-[#f59e0b]" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">&quot;{testimonial.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1e40af] to-[#3b82f6] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
        aria-label="Previous testimonial"
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
        aria-label="Next testimonial"
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
