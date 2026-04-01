import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Driving Lesson Prices & Packages | Alyson's Driving Tuition South Wales",
  description: "Transparent pricing for driving lessons in South Wales. Standard lessons from £30/hr, intensive courses from £450, block booking discounts up to 15%. No hidden fees.",
  keywords: ["driving lesson prices", "driving lesson cost Blackwood", "cheap driving lessons South Wales", "intensive course price", "block booking discount"],
  openGraph: {
    title: "Driving Lesson Prices & Packages | Alyson's Driving Tuition",
    description: "Transparent pricing for driving lessons in South Wales. Standard, intensive, and block booking options.",
    type: "website",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
