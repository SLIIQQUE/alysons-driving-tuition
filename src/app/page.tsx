"use client";

import {
  Hero,
  FeatureStrip,
  CoursesSection,
  AboutPreview,
  TestimonialsMarquee,
  PricingPreview,
  BlogPreview,
  CTASection,
  AIVoiceAssistantSection,
} from "@/components/home";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureStrip />
      <CoursesSection />
      <AboutPreview />
      <TestimonialsMarquee />
      <PricingPreview />
      <BlogPreview />
      <CTASection />
      <AIVoiceAssistantSection />
    </>
  );
}