import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const baseUrl = 'https://alysonsdrivingtuition.co.uk';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Alyson's Driving Tuition | Driving Lessons in South Wales",
    template: "%s | Alyson's Driving Tuition",
  },
  description: "Learn to drive with confidence in South Wales. Patient, friendly driving lessons from Alyson Baldwin - DVSA Approved Driving Instructor with 20+ years experience. Book your first lesson today.",
  keywords: ["driving lessons", "driving instructor", "South Wales", "Blackwood", "Tredegar", "intensive courses", "Pass Plus", "learn to drive"],
  authors: [{ name: "Alyson Baldwin" }],
  creator: "Alyson's Driving Tuition",
  publisher: "Alyson's Driving Tuition",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: baseUrl,
    siteName: "Alyson's Driving Tuition",
    title: "Alyson's Driving Tuition | Driving Lessons in South Wales",
    description: "Learn to drive with confidence. Patient, friendly instruction from an experienced ADI with 20+ years experience.",
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Alyson's Driving Tuition - Professional Driving Lessons in South Wales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alyson's Driving Tuition | Driving Lessons in South Wales",
    description: "Learn to drive with confidence. Patient, friendly instruction from an experienced ADI with 20+ years experience.",
    images: [`${baseUrl}/og-image.jpg`],
    creator: "@alysonsdriving",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DrivingSchool",
    name: "Alyson's Driving Tuition",
    description: "Learn to drive with confidence in South Wales. Patient, friendly driving lessons from Alyson Baldwin - DVSA Approved Driving Instructor.",
    url: baseUrl,
    telephone: "01234567890",
    email: "hello@alysonsdrivingtuition.co.uk",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Blackwood",
      addressRegion: "South Wales",
      addressCountry: "GB",
    },
    areaServed: [
      { "@type": "Place", name: "Blackwood" },
      { "@type": "Place", name: "Tredegar" },
      { "@type": "Place", name: "Risca" },
      { "@type": "Place", name: "Newport" },
    ],
    priceRange: "££",
    instructor: {
      "@type": "Person",
      name: "Alyson Baldwin",
      jobTitle: "DVSA Approved Driving Instructor (ADI)",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
      bestRating: "5",
    },
    sameAs: [
      "https://www.facebook.com/alysonsdrivingtuition",
      "https://www.instagram.com/alysonsdrivingtuition",
    ],
  };

  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
