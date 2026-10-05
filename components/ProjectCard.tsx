import type { Project } from "@/lib/data";
import { SpotlightCard } from "./SpotlightCard";
import { ArrowUpRight } from "./Icons";

export function ProjectCard({ project }: { project: Project }) {
  const primary = project.live ?? project.source;
  return (
    <SpotlightCard className="h-full">
      <div className="flex h-full flex-col p-5 sm:p-6">
        <h3 className="font-medium">
          {primary ? (
            <a href={primary} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 after:absolute after:inset-0">
              {project.title}
              <ArrowUpRight className="text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
            </a>
          ) : (
            project.title
          )}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <li key={s} className="rounded-md bg-fg/[0.05] px-2 py-0.5 font-mono text-[11px] text-muted">
              {s}
            </li>
          ))}
        </ul>
        {project.live && project.source && (
          <a
            href={project.source}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 mt-4 self-start font-mono text-xs text-muted underline-offset-4 hover:text-fg hover:underline"
          >
            Source
          </a>
        )}
      </div>
    </SpotlightCard>
  );
}
