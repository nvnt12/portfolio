import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built, with the thinking, stack, scope and trade-offs behind each one.",
};

export default function Projects() {
  return (
    <div className="pt-16 sm:pt-24">
      <Reveal>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Projects</h1>
        <p className="mt-4 max-w-xl leading-relaxed text-pretty text-muted">
          Things I&apos;ve built on my own. Open one for the idea behind it, the stack, what it covers, and what I&apos;d do next.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-4">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.06}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-16 rounded-lg border border-line bg-card/30 p-6 sm:p-8">
        <p className="text-sm text-muted">
          Most of my day-to-day work is client projects under NDA. Happy to talk through the architecture, decisions and challenges.{" "}
          <Link href="/contact" className="font-medium text-fg transition-colors hover:text-accent">
            Get in touch →
          </Link>
        </p>
      </Reveal>
    </div>
  );
}
