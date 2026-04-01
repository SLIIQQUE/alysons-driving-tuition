import { Metadata } from "next";

const baseUrl = "https://alysonsdrivingtuition.co.uk";

export const metadata: Metadata = {
  title: "Contact | Book Driving Lessons Blackwood",
  description: "Book your first driving lesson with Alyson's Driving Tuition. Call 07791 489244 or use our contact form. Serving Blackwood & South Wales.",
  keywords: ["book driving lesson Blackwood", "contact driving instructor", "driving lessons South Wales", "driving school contact"],
  alternates: { canonical: `${baseUrl}/contact` },
  openGraph: {
    title: "Contact | Book Driving Lessons Blackwood",
    description: "Book your first driving lesson. Call 07791 489244 or use our contact form.",
    type: "website",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
