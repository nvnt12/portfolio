// All site content lives here. Edit this file, not the components.

export const site = {
  name: "Navneet Chadha",
  short: "nvnt",
  role: "Frontend Engineer",
  location: "India", // e.g. "Mumbai, India"
  timeZone: "Asia/Kolkata",
  email: "admin@nvnt.in",
  url: "https://nvnt.in", // the domain this site will be deployed on
  available: true,
  tagline: "Frontend engineer. Fast interfaces, tidy state, and the small details that make people smile.",
  intro:
    "Frontend engineer building fast, considered interfaces with React and Next.js. These days I also make the architecture calls behind them.",
};

// Leave href empty to hide a link.
export const socials = [
  { label: "GitHub", href: "https://github.com/nvnt12" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/navneetchadha12" },
  { label: "X", href: "https://x.com/chadhanavneet02" },
].filter((s) => s.href);

export const booking = "https://cal.com/navneet-chadha-cpk0lr/30min?overlayCalendar=true";

export const now = [
  "Owning frontend architecture across five production apps at 8848 Digital",
  "Going deeper on rendering performance and Core Web Vitals",
  "Open to frontend roles — remote, or relocation with visa sponsorship",
];

export type Role = {
  company: string;
  title: string;
  period: string;
  points: string[];
};

export const experience: Role[] = [
  {
    company: "8848 Digital LLP",
    title: "Frontend Developer",
    period: "May 2026 — Now",
    points: [
      "Own frontend architecture and technical decisions across five production applications.",
      "Set project structure, state-management patterns and tooling standards for new builds.",
      "Review code and guide teammates on React and Next.js practices.",
    ],
  },
  {
    company: "8848 Digital LLP",
    title: "React Developer",
    period: "Apr 2025 — May 2026",
    points: [
      "Built and maintained e-commerce applications with React and Next.js.",
      "Integrated APIs and shipped features end to end.",
      "Refactored legacy modules for performance and maintainability.",
    ],
  },
  {
    company: "Asynchronia",
    title: "Frontend Developer",
    period: "Sep 2024 — Mar 2025",
    points: [
      "Built React features from scratch, from UI to API integration.",
      "Worked across Python, Vue.js and WordPress, including Python APIs that extract and process data from PDFs.",
    ],
  },
  {
    company: "WeframeTech",
    title: "Fullstack Developer",
    period: "Jan 2024 — Aug 2024",
    points: [
      "Led frontend development on client projects with Next.js, TypeScript and Tailwind CSS.",
      "Ran weekly client updates and turned feedback into shipped features.",
    ],
  },
  {
    company: "Fibo",
    title: "Frontend Developer",
    period: "Nov 2023 — Dec 2023",
    points: ["Built product pages with Next.js and TypeScript, working directly with the founder."],
  },
  {
    company: "WeframeTech",
    title: "Frontend Developer",
    period: "Apr 2023 — Oct 2023",
    points: ["Implemented UI designs and features with Next.js, TypeScript and Tailwind CSS."],
  },
];

export type Project = {
  slug: string;
  title: string;
  description: string;
  stack: string[];
  live?: string;
  source?: string;
  // The rest is for the project's own page at /projects/[slug].
  idea: string[];
  scope: string[];
  limitations: string[];
  future: string[];
};

export const projects: Project[] = [
  {
    slug: "coworkhq",
    title: "CoWorkHQ",
    description:
      "Booking and management for coworking spaces: conflict-free desk and room booking, QR check-in, payments and billing, on web and native mobile.",
    stack: [
      "React",
      "Vite",
      "Expo",
      "React Native",
      "TypeScript",
      "TanStack Query",
      "Tailwind CSS",
      "NativeWind",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Supabase Auth",
      "Razorpay",
      "Turborepo",
      "pnpm",
    ],
    idea: [
      "Most small coworking spaces run on a spreadsheet, a WhatsApp group and a notebook at the front desk. Rooms get double-booked, pay-per-visit members are billed by counting entries by hand, and nobody really knows how full the place is.",
      "CoWorkHQ puts all of that in one place. Members find a desk or room, pay for it and check in at the door. Operators manage their locations, staff, events and revenue. It’s built as a marketplace, so many coworking businesses can list their spaces and customers book across all of them.",
      "I wanted it on the web and as a real native app without writing the business logic twice. That decided the architecture: a monorepo where both clients share one API client, one set of types and one set of rules, and only the UI is platform-specific.",
    ],
    scope: [
      "A pnpm + Turborepo monorepo: Vite web app, Expo mobile app and Express API, sharing core logic and TypeScript types.",
      "Email/password and Google sign-in through Supabase. The API verifies the token and enforces every role and permission check itself; hiding screens is only a convenience.",
      "Conflict-free booking guaranteed by a PostgreSQL constraint, not a UI check. Reschedule or cancel any time before it starts.",
      "Razorpay payments. The slot is held for 15 minutes while someone pays, settled exactly once from the redirect, the webhook or a server-side check, and refunded automatically if it can’t be kept.",
      "Search and filter by location, type, seats, price, amenities and live availability for a chosen time, sorted by distance with “near me”.",
      "Check-in for members and a front-desk mode for staff; pay-per-visit billing counts check-ins.",
      "Marketplace roles: a platform admin, organisation admins, and staff with per-person permissions (front desk, spaces, events, revenue, booking for customers).",
      "Monthly billing statements, revenue per organisation, community events with RSVPs, and a ⌘K command palette on web.",
      "Mobile isn’t a port. Booking and tables are rebuilt for touch: tap an hour on a day grid instead of dragging across a week calendar.",
    ],
    limitations: [
      "Every online payment lands in one platform Razorpay account, so paying organisations out is manual.",
      "Spaces have no photos yet; the data model has none, so each one gets a generated plate.",
      "No GST invoices, no partial refunds, and no email or push notifications.",
      "The QR pass is a reference to show at the desk, not a door key, and mobile shows it as text rather than a QR code.",
      "Team and platform admin panels are web-only; mobile shows the team read-only.",
      "The API is written as a long-lived server but deployed serverless, so cold starts make the first requests slow.",
    ],
    future: [
      "Automatic payouts to each organisation with Razorpay Route.",
      "GST-compliant invoices, receipts and partial refunds.",
      "Booking reminders and check-in nudges by email and push.",
      "Space photos through object storage, and an occupancy dashboard for operators.",
      "Door hardware integration, so the pass actually opens the door.",
      "Move the API to a long-lived host like Railway or Render to get rid of cold starts.",
    ],
  },
  {
    slug: "nvnt-in",
    title: "nvnt.in",
    description:
      "This site. Server-rendered pages, a ⌘K command menu, theme switching with view transitions, and no images.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Motion"],
    live: "https://nvnt.in",
    source: "https://github.com/nvnt12/portfolio",
    idea: [
      "A portfolio is the one frontend project where I’m the client. I wanted it to feel like a small product rather than a résumé page: quick to load, nice to poke at, and full of small details for people who look closely.",
      "The one rule was no images. Everything is type, CSS and a few dots, which keeps it fast and makes the design come from layout and motion instead of screenshots.",
    ],
    scope: [
      "Server-rendered pages on the Next.js App Router, with all content in one data file.",
      "A ⌘K command menu for pages, socials and theme.",
      "Light and dark themes with view transitions, applied before first paint so there’s no flash.",
      "An intro loader, a draggable dot, dot rain, click bursts and a few hidden easter eggs, all respecting reduced motion.",
      "A contact form that delivers messages straight to me, no email app needed.",
      "A generated Open Graph image, sitemap and robots file.",
    ],
    limitations: [
      "Content lives in code, so every edit needs a deploy.",
      "Project pages are text-only, which undersells visual work.",
      "Most of my professional work is under NDA and can’t be shown here.",
    ],
    future: [
      "A notes section in MDX for write-ups on things I’ve learned.",
      "Short screen recordings on project pages.",
      "Privacy-friendly analytics to see what people actually read.",
    ],
  },
];

export const stack = [
  { group: "Core", items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML & CSS"] },
  { group: "State & data", items: ["Redux Toolkit", "Zustand", "TanStack Query", "React Hook Form"] },
  { group: "UI", items: ["Tailwind CSS", "PrimeReact", "Motion"] },
  { group: "Tooling", items: ["Vite", "Turborepo", "pnpm", "ESLint", "Prettier", "Husky", "Git"] },
  { group: "Backend", items: ["Node.js", "Express", "REST APIs", "PostgreSQL", "MongoDB"] },
  { group: "Also", items: ["React Native", "Python", "Vercel", "Docker"] },
];
