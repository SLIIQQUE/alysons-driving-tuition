"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThumbnailCarouselProps {
  images: { src: string; alt: string; title?: string; description?: string }[];
  className?: string;
}

export function ThumbnailCarousel({ images, className }: ThumbnailCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true });
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    loop: true,
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const scrollPrev = useCallback(() => {
    emblaMainApi?.scrollPrev();
  }, [emblaMainApi]);

  const scrollNext = useCallback(() => {
    emblaMainApi?.scrollNext();
  }, [emblaMainApi]);

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi]);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main carousel */}
      <div className="relative overflow-hidden rounded-2xl aspect-video" ref={emblaMainRef}>
        <div className="flex h-full">
          {images.map((image, i) => (
            <div key={i} className="flex-[0_0_100%] min-w-0 relative">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              {(image.title || image.description) && (
                <div className="absolute bottom-8 left-8 right-8">
                  {image.title && (
                    <h3 className="text-2xl font-heading font-bold text-white mb-2">
                      {image.title}
                    </h3>
                  )}
                  {image.description && (
                    <p className="text-white/80">{image.description}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={scrollPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                emblaMainApi?.scrollTo(i);
                setSelectedIndex(i);
              }}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                i === selectedIndex ? "bg-white w-6" : "bg-white/40"
              )}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="overflow-hidden" ref={emblaThumbsRef}>
        <div className="flex gap-2 p-1">
          {images.map((image, i) => (
            <button
              key={i}
              onClick={() => {
                emblaMainApi?.scrollTo(i);
                setSelectedIndex(i);
              }}
              className={cn(
                "flex-[0_0_80px] h-16 rounded-lg overflow-hidden transition-all",
                i === selectedIndex ? "ring-2 ring-[#7c3aed] opacity-100" : "opacity-50 hover:opacity-80"
              )}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

interface GalleryCarouselProps {
  images: { src: string; alt: string }[];
  className?: string;
}

export function GalleryCarousel({ images, className }: GalleryCarouselProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  return (
    <div className={cn("relative", className)}>
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex">
          {images.map((image, i) => (
            <div key={i} className="flex-[0_0_100%] min-w-0">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full aspect-[16/9] object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
      >
        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </button>
    </div>
  );
}
