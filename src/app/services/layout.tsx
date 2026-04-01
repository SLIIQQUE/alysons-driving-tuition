import { Metadata } from "next";

const baseUrl = "https://alysonsdrivingtuition.co.uk";

export const metadata: Metadata = {
  title: "Driving Lessons & Intensive Courses | Blackwood",
  description: "Professional driving lessons from £30/hr. Intensive courses, block bookings with 15% discount, Pass Plus & refresher lessons. Book today.",
  keywords: ["driving lessons South Wales", "intensive driving course Blackwood", "driving lesson prices", "Pass Plus South Wales", "block booking driving lessons", "refresher lessons"],
  alternates: { canonical: `${baseUrl}/services` },
  openGraph: {
    title: "Driving Lessons & Courses | Alyson's Driving Tuition",
    description: "Professional driving lessons from £30/hr. Intensive courses, block bookings & more.",
    type: "website",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
