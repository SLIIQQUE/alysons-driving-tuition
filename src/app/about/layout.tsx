import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Alyson Baldwin | DVSA Approved Driving Instructor in Blackwood",
  description: "Meet Alyson Baldwin, a DVSA Approved Driving Instructor with 20+ years experience in Blackwood, South Wales. Grade A rated instructor offering patient, friendly driving lessons.",
  keywords: ["Alyson Baldwin", "driving instructor Blackwood", "DVSA approved instructor", "ADI South Wales", "Grade A instructor"],
  openGraph: {
    title: "About Alyson Baldwin | DVSA Approved Driving Instructor",
    description: "Meet Alyson Baldwin, a DVSA Approved Driving Instructor with 20+ years experience in Blackwood, South Wales.",
    type: "website",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
