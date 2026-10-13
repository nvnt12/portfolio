import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { formatDate, notes, type Block } from "@/lib/notes";
import { projects } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = notes.find((n) => n.slug === slug);
  return note ? { title: note.title, description: note.summary } : {};
}

function Render({ block }: { block: Block }) {
  switch (block.type) {
    case "h":
      return <h2 className="pt-4 text-xl font-semibold tracking-tight">{block.text}</h2>;
    case "code":
      return (
        <pre className="overflow-x-auto rounded-lg border border-line bg-card p-4 font-mono text-[13px] leading-relaxed">
          <code data-lang={block.lang}>{block.code}</code>
        </pre>
      );
    default:
      return <p className="leading-relaxed text-pretty text-fg/90">{block.text}</p>;
  }
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const note = notes.find((n) => n.slug === slug);
  if (!note) notFound();
  const project = projects.find((p) => p.slug === note.project);

  return (
    <article className="pt-16 sm:pt-24">
      <Reveal>
        <Link href="/notes" className="font-mono text-xs text-muted hover:text-fg">
          ← All notes
        </Link>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{note.title}</h1>
        <p className="mt-3 font-mono text-xs text-muted">
          <time dateTime={note.date}>{formatDate(note.date)}</time>
          {project && (
            <>
              {" · from "}
              <Link href={`/projects/${project.slug}`} className="underline-offset-4 hover:text-fg hover:underline">
                {project.title}
              </Link>
            </>
          )}
        </p>
      </Reveal>

      <Reveal delay={0.05} className="mt-10 space-y-5">
        {note.body.map((block, i) => (
          <Render key={i} block={block} />
        ))}
      </Reveal>
    </article>
  );
}
