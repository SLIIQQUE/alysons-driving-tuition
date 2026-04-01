import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Driving Tips & Advice Blog | Alyson's Driving Tuition South Wales",
  description: "Expert driving tips, test preparation advice, and learner driver guides from Alyson's Driving Tuition in Blackwood, South Wales.",
  keywords: ["driving tips", "driving test advice", "learner driver guide", "how to pass driving test", "driving blog South Wales"],
  openGraph: {
    title: "Driving Tips & Advice Blog | Alyson's Driving Tuition",
    description: "Expert driving tips and advice from a DVSA Approved Driving Instructor.",
    type: "website",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
