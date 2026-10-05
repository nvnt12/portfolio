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
  intro:
    "Frontend engineer building fast, considered interfaces with React and Next.js. These days I also make the architecture calls behind them.",
};

// Leave href empty to hide a link.
export const socials = [
  { label: "GitHub", href: "https://github.com/nvnt12" },
  { label: "LinkedIn", href: "" },
  { label: "X", href: "" },
].filter((s) => s.href);

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
  title: string;
  description: string;
  stack: string[];
  live?: string;
  source?: string;
};

export const projects: Project[] = [
  {
    title: "Codedamn Portfolio Page",
    description:
      "Public profile pages that give a quick, complete overview of a developer’s skills, projects and experience.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Kysely"],
    live: "https://profile.nvnt.in",
    source: "https://github.com/nvnt12/codedamn_profile",
  },
  {
    title: "Codedamn Landing Page",
    description: "A faithful rebuild of the Codedamn landing page, with scroll and entrance animations.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    live: "https://landing.nvnt.in",
    source: "https://github.com/nvnt12/codedamn_landing_page",
  },
  {
    title: "nvnt.in",
    description:
      "This site. Server-rendered pages, a ⌘K command menu, theme switching with view transitions, and no images.",
    stack: ["Next.js 16", "React 19", "Tailwind CSS v4", "Motion"],
    source: "https://github.com/nvnt12/portfolio",
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
