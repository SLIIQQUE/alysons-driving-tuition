import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Reviews & Testimonials | Alyson's Driving Tuition South Wales",
  description: "Read real reviews from pupils who passed their driving test with Alyson's Driving Tuition. 98% recommend rate. See why learners choose us in Blackwood, South Wales.",
  keywords: ["driving school reviews", "driving instructor testimonials", "pupil reviews Blackwood", "driving test pass stories", "South Wales driving school reviews"],
  openGraph: {
    title: "Student Reviews & Testimonials | Alyson's Driving Tuition",
    description: "Read real reviews from pupils who passed with Alyson's Driving Tuition.",
    type: "website",
  },
};

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
