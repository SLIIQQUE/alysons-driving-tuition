import { Metadata } from "next";

const baseUrl = "https://alysonsdrivingtuition.co.uk";

export const metadata: Metadata = {
  title: "About Alyson Baldwin | Driving Instructor Blackwood",
  description: "Meet Alyson Baldwin, a DVSA Approved Driving Instructor with 20+ years experience. Grade A rated, patient and friendly lessons.",
  keywords: ["Alyson Baldwin", "driving instructor Blackwood", "DVSA approved instructor", "ADI South Wales", "Grade A instructor"],
  alternates: { canonical: `${baseUrl}/about` },
  openGraph: {
    title: "About Alyson Baldwin | Driving Instructor Blackwood",
    description: "Meet Alyson Baldwin, a DVSA Approved Driving Instructor with 20+ years experience.",
    type: "website",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
