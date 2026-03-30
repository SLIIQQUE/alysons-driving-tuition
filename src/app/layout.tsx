import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Alyson's Driving Tuition | Driving Lessons in South Wales",
  description: "Learn to drive with confidence in South Wales. Patient, friendly driving lessons from Alyson Baldwin - DVSA Approved Driving Instructor with 20+ years experience. Book your first lesson today.",
  keywords: "driving lessons, driving instructor, South Wales, Blackwood, Tredegar, intensive courses, Pass Plus",
  openGraph: {
    title: "Alyson's Driving Tuition | Driving Lessons in South Wales",
    description: "Learn to drive with confidence. Patient, friendly instruction from an experienced ADI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
