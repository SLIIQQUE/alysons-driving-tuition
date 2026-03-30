import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Driving Lessons & Courses",
  description: "Professional driving lessons in South Wales. Standard lessons from £30/hr, intensive courses from £450, block bookings with up to 15% discount. Book your first lesson today.",
  keywords: ["driving lessons", "driving courses", "intensive driving course", "block booking driving lessons", "Pass Plus", "South Wales", "Blackwood", "Tredegar"],
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
