import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Alyson's Driving Tuition",
  description: "Terms of Service for Alyson's Driving Tuition. Professional driving lessons in South Wales.",
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
