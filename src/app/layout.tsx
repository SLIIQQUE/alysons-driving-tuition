import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { VoiceAssistant } from "@/components/VoiceAssistant";

const baseUrl = "https://alysonsdrivingtuition.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Alyson's Driving Tuition | Driving Lessons in South Wales",
    template: "%s | Alyson's Driving Tuition",
  },
  description:
    "Learn to drive with confidence in South Wales. Patient, friendly driving lessons from Alyson Baldwin - DVSA Approved Driving Instructor with 20+ years experience. Book your first lesson today.",
  keywords: [
    "driving lessons",
    "driving instructor",
    "South Wales",
    "Blackwood",
    "Tredegar",
    "intensive courses",
    "Pass Plus",
    "learn to drive",
  ],
  authors: [{ name: "Alyson Baldwin" }],
  creator: "Alyson's Driving Tuition",
  publisher: "Alyson's Driving Tuition",
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
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
    description:
      "Learn to drive with confidence. Patient, friendly instruction from an experienced ADI with 20+ years experience.",
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
    description:
      "Learn to drive with confidence. Patient, friendly instruction from an experienced ADI with 20+ years experience.",
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
    "@id": `${baseUrl}/#drivingschool`,
    name: "Alyson's Driving Tuition",
    description:
      "Learn to drive with confidence in South Wales. Patient, friendly driving lessons from Alyson Baldwin - DVSA Approved Driving Instructor.",
    url: baseUrl,
    telephone: "Contact via AI Assistant or email",
    email: "alysonbaldwin1@mail.co.uk",
    image: `${baseUrl}/og-image.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Elim Way, Pontllanfraith",
      addressLocality: "Blackwood",
      addressRegion: "South Wales",
      postalCode: "NP12 2AA",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.6333,
      longitude: -3.2167,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "09:00",
        closes: "17:00",
      },
    ],
    areaServed: [
      { "@type": "Place", name: "Blackwood" },
      { "@type": "Place", name: "Tredegar" },
      { "@type": "Place", name: "Risca" },
      { "@type": "Place", name: "Newport" },
      { "@type": "Place", name: "Bargoed" },
      { "@type": "Place", name: "Ystrad Mynach" },
    ],
    priceRange: "££",
    employee: {
      "@type": "Person",
      "@id": `${baseUrl}/#alyson-baldwin`,
      name: "Alyson Baldwin",
      jobTitle: "DVSA Approved Driving Instructor (ADI)",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "33",
      bestRating: "5",
    },
    sameAs: [
      "https://www.facebook.com/alysonsdrivingtuition",
      "https://www.instagram.com/alysonsdrivingtuition",
    ],
  };

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="alternate" hrefLang="en-GB" href={baseUrl} />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden w-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-500 focus:text-black focus:font-semibold focus:rounded-lg"
        >
          Skip to main content
        </a>
        <Navigation />
        <main id="main-content" className="flex-1 w-full overflow-x-hidden">
          {children}
        </main>
        <Footer />
        <VoiceAssistant />
      </body>
    </html>
  );
}
