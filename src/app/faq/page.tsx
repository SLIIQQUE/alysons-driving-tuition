import { Metadata } from "next";
import FAQPageContent from "./FAQPageContent";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about driving lessons, intensive courses, pricing, and more. Find answers to common questions about learning to drive.",
};

export default function FAQPage() {
  return <FAQPageContent />;
}
