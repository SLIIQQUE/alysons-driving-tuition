import { Metadata } from "next";
import BlogPostClient from "./BlogPostClient";

export function generateStaticParams() {
  return [
    { slug: "how-to-prepare-for-driving-test" },
    { slug: "how-many-driving-lessons-do-you-need" },
    { slug: "nervous-about-learning-to-drive" },
    { slug: "intensive-vs-regular-driving-lessons" },
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const postMeta: Record<string, { title: string; description: string }> = {
    "how-to-prepare-for-driving-test": {
      title: "How to Prepare for Your Driving Test: A Complete Guide | Alyson's Driving Tuition",
      description: "Everything you need to know before your driving test. From what to bring to common mistakes and how to stay calm on test day.",
    },
    "how-many-driving-lessons-do-you-need": {
      title: "How Many Driving Lessons Do You Actually Need? | Alyson's Driving Tuition",
      description: "The average learner needs 45 hours of professional instruction. Here's how to figure out what's right for you.",
    },
    "nervous-about-learning-to-drive": {
      title: "Nervous About Learning to Drive? You're Not Alone | Alyson's Driving Tuition",
      description: "Feeling anxious about getting behind the wheel is completely normal. Practical tips to overcome driving anxiety.",
    },
    "intensive-vs-regular-driving-lessons": {
      title: "Intensive vs Regular Driving Lessons: Which Is Right for You? | Alyson's Driving Tuition",
      description: "Should you cram your lessons or spread them out? We compare intensive courses with regular lessons.",
    },
  };

  const meta = postMeta[slug] || {
    title: "Driving Tips & Advice | Alyson's Driving Tuition",
    description: "Expert driving tips and advice from a DVSA Approved Driving Instructor in South Wales.",
  };

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BlogPostClient slug={slug} />;
}
