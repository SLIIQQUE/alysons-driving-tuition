import { Metadata } from "next";

const baseUrl = "https://alysonsdrivingtuition.co.uk";

export const metadata: Metadata = {
  title: "Reviews & Testimonials | Alyson's Driving Tuition",
  description: "Read real reviews from pupils who passed with Alyson's Driving Tuition. 98% recommend rate. See why learners choose us in Blackwood.",
  keywords: ["driving school reviews", "driving instructor testimonials", "pupil reviews Blackwood", "driving test pass stories", "South Wales driving school reviews"],
  alternates: { canonical: `${baseUrl}/testimonials` },
  openGraph: {
    title: "Reviews & Testimonials | Alyson's Driving Tuition",
    description: "Read real reviews from pupils who passed with Alyson's Driving Tuition.",
    type: "website",
  },
};

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
