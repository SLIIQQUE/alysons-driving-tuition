"use client";

import { PricingHero, StandardPricing, BlockPricing, IntensivePricing } from "@/components/pricing";

export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <StandardPricing />
      <BlockPricing />
      <IntensivePricing />
    </>
  );
}