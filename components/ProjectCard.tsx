import Link from "next/link";
import type { Project } from "@/lib/data";
import { SpotlightCard } from "./SpotlightCard";
import { ArrowUpRight } from "./Icons";

/** `featured` adds a label and the project's engineering highlights, for the one card that leads. */
export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const highlights = featured ? (project.highlights ?? []).slice(0, 3) : [];
  return (
    <SpotlightCard className="h-full">
      <div className={`flex h-full flex-col ${featured ? "p-6 sm:p-8" : "p-5 sm:p-6"}`}>
        {featured && <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Featured project</p>}
        <h3 className={featured ? "text-xl font-semibold tracking-tight" : "font-medium"}>
          <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-1.5 after:absolute after:inset-0">
            {project.title}
            <ArrowUpRight className="text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>
        {highlights.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {highlights.map((h) => (
              <li key={h.title} className="flex gap-2.5 text-sm text-fg/85">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                {h.title}
              </li>
            ))}
          </ul>
        )}
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <li key={s} className="rounded-md bg-fg/[0.05] px-2 py-0.5 font-mono text-[11px] text-muted">
              {s}
            </li>
          ))}
        </ul>
        {(project.live || project.source) && (
          <div className="relative z-10 mt-4 flex gap-4 font-mono text-xs text-muted">
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-fg hover:underline">
                Live
              </a>
            )}
            {project.source && (
              <a href={project.source} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-fg hover:underline">
                Source
              </a>
            )}
          </div>
        )}
      </div>
    </SpotlightCard>
  );
}
