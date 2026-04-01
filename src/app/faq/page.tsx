import { Metadata } from "next";
import FAQPageContent from "./FAQPageContent";

const baseUrl = "https://alysonsdrivingtuition.co.uk";

export const metadata: Metadata = {
  title: "FAQ | Driving Lessons South Wales | Alyson's Driving",
  description: "Answers to common questions about driving lessons, intensive courses, pricing, test booking & more. Learn to drive in South Wales.",
  keywords: ["driving lessons FAQ", "learning to drive questions", "driving test FAQ", "intensive course questions", "driving lesson prices"],
  alternates: { canonical: `${baseUrl}/faq` },
  openGraph: {
    title: "FAQ | Driving Lessons South Wales",
    description: "Answers to common questions about driving lessons in South Wales.",
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long does it take to learn to drive?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Everyone learns at different speeds. On average, it takes around 40-50 hours of professional training plus private practice to reach test standard. However, this varies depending on your individual ability and how often you have lessons."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer automatic driving lessons?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! We offer both manual and automatic driving lessons. Please contact us to discuss your preference and find the best option for you."
      }
    },
    {
      "@type": "Question",
      "name": "What cars do you use for lessons?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We use a modern, dual-controlled Ford Fiesta (manual) for lessons. It's safe, reliable, air-conditioned, and regularly serviced for your comfort and safety during lessons."
      }
    },
    {
      "@type": "Question",
      "name": "How much do driving lessons cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Standard lessons start from £30 per hour. Block bookings offer discounts - 5% off for 5+ lessons, 10% off for 10+ lessons, and 15% off for 20+ lessons. Intensive course prices vary depending on your needs."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer intensive driving courses?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! We offer intensive courses where you can pass your test in just 1-2 weeks. These are perfect for those who need their license quickly for work or have a deadline."
      }
    },
    {
      "@type": "Question",
      "name": "What is Pass Plus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pass Plus is a post-test course that helps new drivers gain more experience after passing their test. It covers various driving conditions and can sometimes help reduce insurance premiums."
      }
    },
    {
      "@type": "Question",
      "name": "Do you help with the theory test?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! We provide support with theory test preparation. We can help you practice questions and ensure you're confident before booking your theory test."
      }
    },
    {
      "@type": "Question",
      "name": "What areas do you cover?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We cover Blackwood, Tredegar, Risca, Newport, and surrounding South Wales areas."
      }
    },
    {
      "@type": "Question",
      "name": "Do you teach nervous beginners?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely! We have extensive experience teaching nervous beginners. We pride ourselves on being patient and understanding. Everyone learns at their own pace, and we'll never rush you."
      }
    },
    {
      "@type": "Question",
      "name": "At what age can I start learning to drive?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can start learning to drive at 17. However, you can apply for your provisional driving licence from age 15 years and 9 months. Many pupils start taking lessons before they're 17 to be ready for their test as soon as they turn 17."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if I need to cancel a lesson?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We ask for 48 hours notice for cancellations. Cancellations with less than 48 hours notice may be charged. Please contact us as soon as possible if you need to reschedule."
      }
    },
    {
      "@type": "Question",
      "name": "Can I have lessons in my own car?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For safety reasons, we recommend learning in our dual-controlled car initially. Once you reach a certain level and if your car is suitable and insured, we can discuss this. Safety is always our top priority."
      }
    },
  ],
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQPageContent />
    </>
  );
}
