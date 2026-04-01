import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Areas We Cover | Driving Lessons Blackwood, Tredegar, Risca, Newport",
  description: "Alyson's Driving Tuition covers Blackwood, Tredegar, Risca, Newport and surrounding South Wales areas. Find driving lessons near you.",
  keywords: ["driving lessons Blackwood", "driving lessons Tredegar", "driving lessons Risca", "driving lessons Newport", "driving instructor South Wales", "driving school near me"],
  openGraph: {
    title: "Areas We Cover | Alyson's Driving Tuition",
    description: "Driving lessons across Blackwood, Tredegar, Risca, Newport and surrounding South Wales areas.",
    type: "website",
  },
};

export default function AreasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
