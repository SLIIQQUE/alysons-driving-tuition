import { Metadata } from "next";

const baseUrl = "https://alysonsdrivingtuition.co.uk";

export const metadata: Metadata = {
  title: "Areas We Cover | Driving Lessons Blackwood, Tredegar, Risca",
  description: "Driving lessons across Blackwood, Tredegar, Risca, Newport & surrounding South Wales areas. Find driving lessons near you. Book today.",
  keywords: ["driving lessons Blackwood", "driving lessons Tredegar", "driving lessons Risca", "driving lessons Newport", "driving instructor South Wales", "driving school near me"],
  alternates: { canonical: `${baseUrl}/areas` },
  openGraph: {
    title: "Areas We Cover | Alyson's Driving Tuition",
    description: "Driving lessons across Blackwood, Tredegar, Risca, Newport and surrounding South Wales.",
    type: "website",
  },
};

export default function AreasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
