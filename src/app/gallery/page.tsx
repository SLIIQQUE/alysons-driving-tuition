import type { Metadata } from "next";
import GalleryPageClient from "./GalleryPageClient";

export const metadata: Metadata = {
  title: "Gallery | Driving Lessons in South Wales - Alyson's Driving Tuition",
  description: "See our driving lessons in action. Browse photos of our dual-controlled car, successful pupils, and driving lessons across Blackwood, Tredegar, and South Wales.",
  keywords: ["driving lessons gallery", "driving instructor photos", "Blackwood driving school", "South Wales driving lessons"],
  openGraph: {
    title: "Gallery | Alyson's Driving Tuition",
    description: "See our driving lessons in action. Browse photos of successful pupils and driving lessons across South Wales.",
    type: "website",
  },
};

export default function GalleryPage() {
  return <GalleryPageClient />;
}
