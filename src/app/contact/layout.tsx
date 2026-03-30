import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Alyson's Driving Tuition. Book your first lesson or ask a question. Call 01234 567890 or use our contact form. Serving Blackwood, Tredegar, Risca, Newport.",
  keywords: ["contact driving school", "book driving lesson", "driving instructor contact", "South Wales driving lessons"],
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
