import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Alyson's Driving Tuition",
  description: "View moments of success from our driving lessons in South Wales. See our students' journeys to becoming confident, safe drivers.",
  openGraph: {
    title: "Gallery | Alyson's Driving Tuition",
    description: "View moments of success from our driving lessons in South Wales.",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
