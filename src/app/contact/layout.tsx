import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Alyson's Driving Tuition | Book Driving Lessons in Blackwood",
  description: "Contact Alyson's Driving Tuition to book your first driving lesson. Serving Blackwood, Tredegar, Risca, Newport & South Wales. Call 07700 900000 or use our contact form.",
  keywords: ["book driving lesson Blackwood", "contact driving instructor", "driving lessons South Wales", "driving school contact"],
  openGraph: {
    title: "Contact Alyson's Driving Tuition | Book Driving Lessons",
    description: "Contact us to book your first driving lesson in Blackwood, South Wales.",
    type: "website",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
