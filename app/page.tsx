import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { InteractiveElement } from "@/components/InteractiveElement";
import { ScrambleText } from "@/components/ScrambleText";
import { DraggableDot } from "@/components/DraggableDot";
import { LocalTime } from "@/components/LocalTime";
import { Section } from "@/components/Section";
import { ProjectCard } from "@/components/ProjectCard";
import { ExperienceList } from "@/components/ExperienceList";
import { Marquee } from "@/components/Marquee";import { ArrowRight } from "@/components/Icons";
import { now, projects, site, stack, booking } from "@/lib/data";

export default function Home() {
  return (
    <>
      <section className="pt-16 sm:pt-28">
        <Reveal>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            {site.available && (
              <>
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                <span>Open to work</span>
                <span aria-hidden>·</span>
              </>
            )}
            <span>{site.location}</span>
            <span aria-hidden>·</span>
            <LocalTime timeZone={site.timeZone} />
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-6 text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl">
            <ScrambleText text={site.name} />
            <DraggableDot />
          </h1>
          <p className="mt-3 font-mono text-sm text-accent">{site.role}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted">{site.intro}</p>
        </Reveal>

        <Reveal delay={0.15} className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-transform active:scale-[0.97]"
          >
            See my work
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href={booking}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:border-fg/30 hover:bg-fg/5"
          >
            Book a call
          </a>
          <span className="hidden font-mono text-xs text-muted sm:inline">
            or press <kbd className="rounded border border-line bg-card px-1.5 py-0.5">Ctrl</kbd>{" "}
            <kbd className="rounded border border-line bg-card px-1.5 py-0.5">K</kbd>
          </span>
        </Reveal>
      </section>

      <Section title="Now">
        <ul className="space-y-3">
          {now.map((item, i) => (
            <li key={item}>
              <Reveal delay={i * 0.05}>
                <InteractiveElement className="flex cursor-default gap-3 text-pretty">
                  <span className="font-mono text-xs leading-7 text-accent">0{i + 1}</span>
                  <span className="leading-7">{item}</span>
                </InteractiveElement>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        title="Selected work"
        action={
          <Link href="/projects" className="font-mono text-xs text-muted hover:text-fg">
            All projects →
          </Link>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.slice(0, 2).map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        title="Experience"
        action={
          <Link href="/about" className="font-mono text-xs text-muted hover:text-fg">
            More →
          </Link>
        }
      >
        <ExperienceList />
      </Section>

      <Section title="Tools I use">
        <Reveal>
          <Marquee items={stack.flatMap((g) => g.items)} />
        </Reveal>
      </Section>    </>
  );
}
