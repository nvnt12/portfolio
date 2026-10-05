import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/data";

export const metadata: Metadata = { title: "Work", description: "Projects and side work by Navneet Chadha." };

export default function Work() {
  return (
    <div className="pt-16 sm:pt-24">
      <Reveal>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Work</h1>
        <p className="mt-4 max-w-xl leading-relaxed text-pretty text-muted">
          Most of what I build day to day is client work under NDA, so it isn’t listed here. Happy to walk through the
          architecture and decisions behind it in a conversation. These are the things I can show.
        </p>
      </Reveal>
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
