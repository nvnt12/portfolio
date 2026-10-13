import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { ExternalLink } from "@/components/Icons";
import { projects } from "@/lib/data";
import { notes } from "@/lib/notes";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return project ? { title: project.title, description: project.description } : {};
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="space-y-4">
      {items.map((para) => (
        <Reveal key={para}>
          <p className="leading-relaxed text-pretty text-fg/90">{para}</p>
        </Reveal>
      ))}
    </div>
  );
}

function Points({ items }: { items: string[] }) {
  return (
    <Reveal>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const related = notes.filter((n) => n.project === project.slug);

  return (
    <article className="pt-16 sm:pt-24">
      <Reveal>
        <Link href="/projects" className="font-mono text-xs text-muted hover:text-fg">
          ← All projects
        </Link>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">{project.title}</h1>
        <p className="mt-4 max-w-xl leading-relaxed text-pretty text-muted">{project.description}</p>
        {(project.live || project.source) && (
          <div className="mt-6 flex flex-wrap gap-2">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-fg px-4 py-1.5 text-xs font-medium text-bg transition-transform active:scale-[0.97]"
              >
                Visit live
                <ExternalLink className="size-3.5" />
              </a>
            )}
            {project.source && (
              <a
                href={project.source}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-1.5 text-xs font-medium text-muted transition-colors hover:border-fg/30 hover:text-fg"
              >
                Source
              </a>
            )}
          </div>
        )}
      </Reveal>

      <Section title="The idea">
        <Paragraphs items={project.idea} />
      </Section>

      <Section title="Scope">
        <Paragraphs items={project.scope} />
      </Section>

      {project.users && (
        <Section title="Who uses it">
          <div className="grid gap-3 sm:grid-cols-2">
            {project.users.map((u, i) => (
              <Reveal key={u.role} delay={i * 0.04} className="h-full rounded-lg border border-line bg-card/40 p-4">
                <h3 className="text-sm font-medium">{u.role}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{u.does}</p>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <Section title="Features">
        <Points items={project.features} />
      </Section>

      {project.highlights && (
        <Section title="Engineering highlights">
          <div className="space-y-6">
            {project.highlights.map((h) => (
              <Reveal key={h.title} className="border-l-2 border-accent/60 pl-4">
                <h3 className="font-medium">{h.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-pretty text-muted">{h.body}</p>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <Section title="Tech stack">
        <Reveal>
          <ul className="flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <li key={s} className="rounded-md bg-fg/[0.05] px-3 py-1.5 font-mono text-xs text-fg/80">
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section title="Limitations">
        <Points items={project.limitations} />
      </Section>

      <Section title="What's next">
        <Points items={project.future} />
      </Section>

      {related.length > 0 && (
        <Section title="Write-ups">
          <Reveal>
            <ul className="space-y-4">
              {related.map((n) => (
                <li key={n.slug}>
                  <Link href={`/notes/${n.slug}`} className="group block">
                    <span className="font-medium transition-colors group-hover:text-accent">{n.title} →</span>
                    <span className="mt-0.5 block text-sm text-muted">{n.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>
      )}

      {next !== project && (
        <Reveal className="mt-24 border-t border-line pt-8">
          <Link href={`/projects/${next.slug}`} className="group block">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Next project</span>
            <span className="mt-2 block text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent">
              {next.title} →
            </span>
          </Link>
        </Reveal>
      )}
    </article>
  );
}
