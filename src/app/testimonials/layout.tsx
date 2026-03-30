import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Read reviews from hundreds of satisfied pupils who passed their driving test with Alyson's Driving Tuition. 98% pass rate. Book your first lesson today.",
  keywords: ["driving school reviews", "testimonials", "pupil reviews", "driving test pass", "Blackwood driving instructor"],
};

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
