import Link from "next/link";
import { site, socials, booking } from "@/lib/data";
import { Logo } from "./Logo";
import { LocalTime } from "./LocalTime";
import { BackToTop } from "./BackToTop";
import { DotsButton } from "./DotsButton";

const pages = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const elsewhere = [
  ...socials,
  { label: "Email", href: `mailto:${site.email}` },
  { label: "Book a call", href: booking },
];

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}

const linkClass = "text-fg/80 underline-offset-4 transition-colors hover:text-fg hover:underline";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-card/40">
      <div className="mx-auto w-full max-w-3xl px-4 pt-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label="Home" className="group inline-block">
              <Logo className="h-8 w-auto" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-pretty text-muted">{site.tagline}</p>
            {site.available && (
              <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1 font-mono text-xs text-muted">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Open to new roles
              </p>
            )}
          </div>

          <Column title="Pages">
            {pages.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className={linkClass}>
                  {p.label}
                </Link>
              </li>
            ))}
          </Column>

          <Column title="Connect">
            {elsewhere.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  {...(s.href.startsWith("http") || s.href.startsWith("mailto:") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={linkClass}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </Column>
        </div>

        <p className="mt-12 font-mono text-xs text-muted pointer-coarse:hidden">
          psst: type <kbd className="rounded border border-line bg-card px-1">dots</kbd> anywhere.
        </p>
        <DotsButton className="mt-12 hidden font-mono text-xs text-muted active:text-fg pointer-coarse:inline" />

        <div className="mt-6 flex flex-col gap-3 border-t border-line py-6 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.location} · <LocalTime timeZone={site.timeZone} />
          </p>
          <BackToTop />
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none -mb-[0.2em] select-none text-center text-[clamp(5rem,24vw,14rem)] font-semibold leading-[0.85] tracking-tighter text-fg/[0.045]"
      >
        navneet
      </div>
    </footer>
  );
}
