import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Driving Lessons & Intensive Courses in South Wales | Services",
  description: "Professional driving lessons in South Wales. Standard lessons from £30/hr, intensive courses from £450, block bookings with up to 15% discount. Pass Plus, refresher lessons & more.",
  keywords: ["driving lessons South Wales", "intensive driving course Blackwood", "driving lesson prices", "Pass Plus South Wales", "block booking driving lessons", "refresher lessons"],
  openGraph: {
    title: "Driving Lessons & Courses | Alyson's Driving Tuition",
    description: "Professional driving lessons in South Wales. Standard, intensive, and block booking options available.",
    type: "website",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
