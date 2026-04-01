# Alyson's Driving Tuition

A professional, SEO-optimized website for a DVSA Approved Driving Instructor based in Blackwood, South Wales.

**Live Site:** [https://alysonsdrivingtuition.co.uk](https://alysonsdrivingtuition.co.uk)

---

## Features

- **AI Voice Assistant** — Gemini-powered chatbot with voice recognition for instant booking enquiries
- **SEO Optimized** — Local SEO for Blackwood, Tredegar, Risca & South Wales with JSON-LD schema, OG tags, and sitemap
- **Real Reviews** — Authentic testimonials from Facebook page
- **Dark Theme** — Premium glass-card design with amber/red accent palette
- **Responsive** — Mobile-first, accessible design with skip-to-content navigation
- **Contact Form** — Booking form with email notifications via Resend

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Animations | Motion (Framer Motion) |
| AI | Google Gemini API (`@google/genai`) |
| Icons | Lucide React |
| Email | Resend |
| Fonts | Outfit + Space Mono (Google Fonts) |

---

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage
│   │   ├── layout.tsx            # Root layout + JSON-LD schema
│   │   ├── globals.css           # Design system (glass-card, btn, etc.)
│   │   ├── about/
│   │   ├── services/
│   │   ├── pricing/
│   │   ├── areas/
│   │   ├── blog/                 # 4 blog posts with dynamic [slug]
│   │   ├── contact/
│   │   ├── faq/
│   │   ├── testimonials/
│   │   ├── terms/
│   │   ├── privacy/
│   │   ├── sitemap.ts            # XML sitemap
│   │   ├── robots.ts             # robots.txt
│   │   └── api/
│   │       ├── book/             # Contact form handler
│   │       ├── gemini/
│   │       │   ├── chat/         # Chat API
│   │       │   └── token/        # Token API
│   └── components/
│       ├── Navigation.tsx
│       ├── Footer.tsx
│       └── VoiceAssistant.tsx
├── next.config.ts                # Security headers + image domains
├── public/
│   └── (static assets)
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+ (recommended 20+)
- pnpm 8+ (or npm/yarn/bun)

### Installation

```bash
# Clone the repository
git clone https://github.com/SLIIQQUE/alysons-driving-tuition.git
cd alysons-driving-tuition

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Gemini API (required for AI Voice Assistant)
GEMINI_API_KEY=your_gemini_api_key

# Email (required for contact form)
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=alysonbaldwin1@mail.co.uk
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

---

## Design System

The site uses a custom dark theme with the following utilities:

| Class | Description |
|-------|-------------|
| `glass-card` | Frosted glass card with backdrop blur |
| `border-glow` | Subtle border glow effect |
| `text-gradient` | Amber-to-red text gradient |
| `btn` | Base button styles |
| `btn-primary` | Amber gradient button |
| `btn-secondary` | Outline button |
| `input` | Form input styles |

**Colors:** Black background, Amber (#f59e0b) primary, Red (#ef4444) accent, White text

---

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Set environment variables in the Vercel dashboard:
- `GEMINI_API_KEY`
- `RESEND_API_KEY`
- `CONTACT_EMAIL`

### Other Platforms

Build command: `pnpm build`
Output directory: `.next`

---

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Homepage | `/` | Hero, courses, testimonials, pricing preview, blog |
| About | `/about` | About Alyson Baldwin |
| Services | `/services` | Lesson types and offerings |
| Pricing | `/pricing` | Lesson packages |
| Areas | `/areas` | Service areas (Blackwood, Tredegar, Risca, etc.) |
| Blog | `/blog` | Blog index |
| Blog Post | `/blog/[slug]` | Individual blog posts |
| Contact | `/contact` | Contact form |
| FAQ | `/faq` | Frequently asked questions |
| Testimonials | `/testimonials` | Customer reviews |
| Terms | `/terms` | Terms of service |
| Privacy | `/privacy` | Privacy policy |

---

## SEO Features

- **JSON-LD Schema** — DrivingSchool, LocalBusiness, FAQPage
- **Meta Tags** — Title, description, Open Graph, Twitter Cards
- **Sitemap** — Auto-generated XML sitemap (`/sitemap.xml`)
- **Robots.txt** — Configured for search engines
- **Security Headers** — CSP, HSTS, X-Frame-Options

---

## Business Info

| Field | Value |
|-------|-------|
| Name | Alyson's Driving Tuition |
| Owner | Alyson Baldwin |
| Phone | 07791 489244 |
| Email | alysonbaldwin1@mail.co.uk |
| Address | Elim Way, Pontllanfraith, Blackwood NP12 2AA |
| Facebook | @alysonsdrivingtuition |
| Areas | Blackwood, Tredegar, Risca, Newport, Bargoed, Ystrad Mynach |

---

## License

Private — All rights reserved
