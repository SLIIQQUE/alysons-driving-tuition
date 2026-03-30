import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Alyson's Driving Tuition",
  description: "Privacy Policy for Alyson's Driving Tuition. How we handle and protect your personal information.",
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
