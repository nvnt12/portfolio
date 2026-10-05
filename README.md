# nvnt.in

Personal site of Navneet Chadha. Next.js 16 (App Router), React 19, Tailwind CSS v4, Motion.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Editing content

Everything you'd want to change (name, intro, email, socials, experience, projects, tools) is in `lib/data.ts`.
Colours live as CSS variables at the top of `app/globals.css`.

## What's in here

- Server-rendered pages; client JS only where there's interaction
- `Ctrl/⌘ + K` command menu
- Light/dark theme with no flash on load, animated with the View Transitions API
- Scroll reveals, cursor spotlight cards, text scramble, live local time
- All motion respects `prefers-reduced-motion`
- Sitemap, robots and a generated Open Graph image
