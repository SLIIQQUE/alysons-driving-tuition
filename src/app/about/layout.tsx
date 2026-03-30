import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Meet Alyson Baldwin - DVSA Approved Driving Instructor with 20+ years experience. Learn about my teaching approach and qualifications. Book your first lesson today.",
  keywords: ["driving instructor", "ADI", "Alyson Baldwin", "about driving instructor", "Grade A instructor", "Blackwood"],
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
