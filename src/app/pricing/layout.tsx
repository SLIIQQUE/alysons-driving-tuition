import { Metadata } from "next";

const baseUrl = "https://alysonsdrivingtuition.co.uk";

export const metadata: Metadata = {
  title: "Driving Lesson Prices & Packages | Blackwood",
  description: "Transparent pricing for driving lessons. Standard from £30/hr, intensive from £450, block booking discounts up to 15%. No hidden fees.",
  keywords: ["driving lesson prices", "driving lesson cost Blackwood", "cheap driving lessons South Wales", "intensive course price", "block booking discount"],
  alternates: { canonical: `${baseUrl}/pricing` },
  openGraph: {
    title: "Driving Lesson Prices & Packages | Alyson's Driving Tuition",
    description: "Transparent pricing for driving lessons. Standard, intensive, and block booking options.",
    type: "website",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
