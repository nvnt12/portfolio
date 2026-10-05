import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { ExperienceList } from "@/components/ExperienceList";
import { stack } from "@/lib/data";

export const metadata: Metadata = { title: "About", description: "Background, experience and tools." };

export default function About() {
  return (
    <div className="pt-16 sm:pt-24">
      <Reveal>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">About</h1>
      </Reveal>
      <Reveal delay={0.05} className="mt-6 max-w-xl space-y-4 leading-relaxed text-pretty text-muted">
        <p>
          I’m a frontend developer with three years of building production apps in React and Next.js, most recently at
          8848 Digital, where I moved from React Developer to owning frontend architecture across five applications.
        </p>
        <p>
          I care about the parts users never see but always feel: how state flows through an app, how fast the first
          screen paints, and whether the next developer can make sense of the code.
        </p>
        <p>I studied Computer Science at the University of Mumbai.</p>
      </Reveal>

      <Section title="Experience">
        <ExperienceList detailed />
      </Section>

      <Section title="Tools">
        <dl className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
          {stack.map((g, i) => (
            <Reveal key={g.group} delay={i * 0.04}>
              <dt className="text-sm font-medium">{g.group}</dt>
              <dd className="mt-1 text-sm text-muted">{g.items.join(" · ")}</dd>
            </Reveal>
          ))}
        </dl>
      </Section>
    </div>
  );
}
