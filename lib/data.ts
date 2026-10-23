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
  // The at-a-glance line under the intro: what a recruiter checks first.
  years: "3+",
  core: ["React", "Next.js", "TypeScript"],
  workPrefs: "Remote (IST) or relocation with visa sponsorship",
  noticePeriod: "", // e.g. "30 days"; leave empty to hide
  resume: "/navneet-chadha-resume.pdf", // a PDF in public/; leave empty to hide the button
  tagline: "Frontend engineer. Fast interfaces, tidy state, and the small details that make people smile.",
  intro:
    "Frontend engineer who ships full-stack. I build fast, considered interfaces with React and Next.js, plus the APIs and native apps behind them when a product needs it. These days I also make the architecture calls.",
};

// Leave href empty to hide a link.
export const socials = [
  { label: "GitHub", href: "https://github.com/nvnt12" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/navneetchadha12" },
  { label: "X", href: "https://x.com/chadhanavneet02" },
].filter((s) => s.href);

export const booking = "https://cal.com/navneet-chadha-cpk0lr/30min?overlayCalendar=true";

export const now = [
  "Leading frontend architecture across 5+ production apps at 8848 Digital",
  "Building CoWorkHQ, a coworking marketplace on web and native mobile",
  "Going deeper on rendering performance and Core Web Vitals",
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
      "Promoted to lead frontend architecture for 5+ production applications serving thousands of users.",
      "Improved performance: Lighthouse 68 → 92 and a 35% smaller bundle through code splitting and memoization.",
      "Designed the state management architecture with Redux Toolkit, Zustand and TanStack Query, cutting down recurring state bugs.",
      "Set up the E2E testing strategy, worked with the backend team on API design, and mentored junior developers.",
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
  scope: string[]; // what it covers, who it's for, and where it stops
  users?: { role: string; does: string }[];
  features: string[];
  highlights?: { title: string; body: string }[]; // the hard problems and how they were solved
};

export const projects: Project[] = [
  {
    slug: "coworkhq",
    title: "CoWorkHQ",
    description:
      "A marketplace for coworking spaces: conflict-free desk and room booking, payments into each operator’s own Razorpay account, QR-pass check-in and white-label builds, on web and native mobile.",
    live: "https://coworkhq.nvnt.in",
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
      "Supabase Storage",
      "Razorpay",
      "Resend",
      "Expo Notifications",
      "Turborepo",
      "pnpm",
    ],
    idea: [
      "Most small coworking spaces run on a spreadsheet, a WhatsApp group and a notebook at the front desk. Rooms get double-booked, pay-per-visit members are billed by counting entries by hand, and nobody really knows how full the place is.",
      "CoWorkHQ puts all of that in one place. Members find a desk or room, pay for it and check in at the door. Operators manage their locations, staff, events and revenue. It’s built as a marketplace, so many coworking businesses can list their spaces and customers book across all of them.",
      "I wanted it on the web and as a real native app without writing the business logic twice. That decided the architecture: a monorepo where both clients share one API client, one set of types and one set of rules, and only the UI is platform-specific.",
    ],
    scope: [
      "A marketplace for coworking spaces in India. Many coworking businesses list their locations on one platform, and customers book across all of them with one account.",
      "It covers the whole visit: finding a space, booking and paying for it, and checking in at the desk. It also covers the operator’s side: locations, spaces, staff, events and revenue.",
      "Three clients share one core: a web app for members and admins, a native iOS and Android app for members and the front desk, and one API that enforces every rule. Hiding a screen in an app is only a convenience; the server decides.",
      "Each organisation connects its own Razorpay account, so customers’ money goes straight to the operator.",
      "It can also run under a client’s own brand: their name, colours, logo, web address and phone app, built from one brand file.",
    ],
    users: [
      {
        role: "Customer",
        does: "Anyone who signs up. Finds, books and pays for desks and rooms at any organisation, checks in with their pass, and RSVPs to events.",
      },
      {
        role: "Organisation admin",
        does: "Runs a coworking business. Manages its own locations, spaces, events, revenue, front desk, team and permissions, and never sees other organisations.",
      },
      {
        role: "Staff",
        does: "Works for one organisation and only gets what their admin switches on: front desk, booking for customers, managing spaces or events, viewing revenue.",
      },
      {
        role: "Platform admin",
        does: "Owns the marketplace. Adds, renames and suspends organisations, and sees what each one earns.",
      },
    ],
    features: [
      "Email/password and Google sign-in. Invited colleagues land in their organisation as soon as they sign up.",
      "Locations with an address, map position and opening hours; desks and rooms with amenities, an hourly price and up to 8 photos, uploaded from the web or the phone.",
      "Search and filters for location, type, seats, price, amenities and live availability at a chosen time, sorted by distance with “near me”.",
      "Conflict-free booking, guaranteed by a PostgreSQL constraint rather than a UI check, within the location’s opening hours. Customers can move or cancel a booking when their organisation allows it.",
      "Per-organisation policies: how far ahead people can book, the longest booking, cancellation and refund cut-offs, moves, self check-in, events and desk payments, all enforced by the API.",
      "Each organisation connects its own Razorpay account for card, UPI, netbanking or wallet payments. The slot is held for 15 minutes while someone pays, every payment is settled exactly once, and refunds follow the organisation’s rules.",
      "Staff can book for a walk-in customer and collect payment at the desk or with a Razorpay link and QR code.",
      "Every booking gets a QR pass. The front desk scans it with a phone or laptop camera, or a handheld scanner, and the person is checked in or told exactly why not.",
      "Self check-in from 30 minutes before a booking, check-out, and pay-per-visit billing worked out from check-ins.",
      "Monthly billing statements, revenue per organisation and a pay-per-visit report.",
      "Email and push notifications for confirmations, payment links, moves, cancellations and refunds, plus a reminder the day before.",
      "Community events per location, with RSVPs and capacity.",
      "Per-person staff permissions, checked by the API on every request, and an activity log of what staff did for customers.",
      "White-label builds: a client’s own name, colours, logo and storefront on web, and their own app on the stores.",
      "Customers can delete their account from the web or the phone, as the app stores require.",
      "A native app built for touch, not a port: pick a day and tap an hour instead of dragging across a week calendar.",
      "Saved spaces, a ⌘K command palette on web, and light and dark themes.",
    ],
    highlights: [
      {
        title: "Double booking is impossible, not just unlikely",
        body: "A Postgres EXCLUDE constraint over each space’s time ranges rejects any overlapping booking that isn’t cancelled, including slots held while someone pays. The API turns the violation into a clean “slot taken”, so two people racing for the same room can never both win, whatever the UI showed them.",
      },
      {
        title: "Every payment is settled exactly once",
        body: "A payment can be reported three ways (the browser redirect, the webhook and a server-side check), in any order or all at once. The first report claims it with a conditional update and the rest read back the decision. A payment that can’t be kept (a lapsed hold, a cancelled booking, a duplicate) is refunded, and a refund that fails halfway finishes on the next webhook retry.",
      },
      {
        title: "One core, two clients that each feel native",
        body: "Web and mobile share the API client, data hooks, types and business rules from one package, so a rule changes in exactly one place. The UI is deliberately not shared: dragging across a week calendar on web becomes picking a day and tapping an hour on a phone.",
      },
      {
        title: "Authorisation lives on the server",
        body: "Every route checks a permission and that whatever it touches belongs to the caller’s organisation. A pass from another organisation scans as “not found”, exactly like a random code, so nothing leaks about who else is on the platform. Sensitive routes are rate-limited, and the database itself refuses direct access with row-level security.",
      },
      {
        title: "Each organisation’s payment keys, kept safe",
        body: "Organisations connect their own Razorpay keys, which are checked with a read-only call and stored encrypted with AES-256-GCM, each bound to its organisation. No response ever returns a secret. Every payment records the account that took it, so refunds and webhooks always use the right keys, and each organisation’s webhook only settles its own payments.",
      },
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
      "A personal site for recruiters, hiring managers and other developers: who I am, what I’ve built, and how to reach me.",
      "Fully static and server-rendered, with no CMS, database or images. Content lives in one data file in the repo.",
    ],
    features: [
      "Server-rendered pages on the Next.js App Router, with a dedicated page for each project.",
      "A ⌘K command menu for pages, socials and theme.",
      "Light and dark themes with view transitions, applied before first paint so there’s no flash.",
      "An intro loader, a draggable dot, dot rain, click bursts and a few hidden easter eggs, all respecting reduced motion.",
      "A contact form that delivers messages straight to me, no email app needed.",
      "A generated Open Graph image, sitemap and robots file.",
    ],
    highlights: [
      {
        title: "No flash, no matter the theme",
        body: "A tiny inline script picks the theme before the first paint, so a dark-mode visitor never sees a white flash. Theme switches use the View Transitions API when it’s available and the visitor hasn’t asked for reduced motion.",
      },
      {
        title: "A contact form that doesn’t need a mail app",
        body: "A Server Action validates the message, drops bots with a honeypot field and emails it through Resend from a verified domain, with reply-to set to the visitor. When anything fails, the visitor is told to email directly instead of being left guessing.",
      },
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
