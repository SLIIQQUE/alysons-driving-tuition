import { Metadata } from "next";

const baseUrl = "https://alysonsdrivingtuition.co.uk";

export const metadata: Metadata = {
  title: "Driving Tips & Advice Blog | Alyson's Driving Tuition",
  description: "Expert driving tips, test prep advice & learner guides from a DVSA Approved Driving Instructor in Blackwood, South Wales.",
  keywords: ["driving tips", "driving test advice", "learner driver guide", "how to pass driving test", "driving blog South Wales"],
  alternates: { canonical: `${baseUrl}/blog` },
  openGraph: {
    title: "Driving Tips & Advice Blog | Alyson's Driving Tuition",
    description: "Expert driving tips and advice from a DVSA Approved Driving Instructor.",
    type: "website",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
