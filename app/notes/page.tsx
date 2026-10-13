import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { formatDate, notes } from "@/lib/notes";

export const metadata: Metadata = {
  title: "Notes",
  description: "Short write-ups on problems I've solved and things I've learned building for the web.",
};

export default function Notes() {
  return (
    <div className="pt-16 sm:pt-24">
      <Reveal>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Notes</h1>
        <p className="mt-4 max-w-xl leading-relaxed text-pretty text-muted">
          Short write-ups on problems I&apos;ve solved and things I&apos;ve learned along the way.
        </p>
      </Reveal>

      <ul className="mt-12 divide-y divide-line border-y border-line">
        {notes.map((n, i) => (
          <li key={n.slug}>
            <Reveal delay={i * 0.05}>
              <Link href={`/notes/${n.slug}`} className="group block py-6">
                <time dateTime={n.date} className="font-mono text-xs text-muted">
                  {formatDate(n.date)}
                </time>
                <h2 className="mt-1.5 text-lg font-medium tracking-tight transition-colors group-hover:text-accent">
                  {n.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-pretty text-muted">{n.summary}</p>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
