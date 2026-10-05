import { experience } from "@/lib/data";
import { Reveal } from "./Reveal";

export function ExperienceList({ detailed = false }: { detailed?: boolean }) {
  return (
    <ol className="divide-y divide-line border-y border-line">
      {experience.map((role, i) => (
        <li key={`${role.company}-${role.title}`}>
          <Reveal delay={Math.min(i * 0.04, 0.2)} className="grid gap-1 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
            <p className="font-mono text-xs text-muted sm:pt-0.5">{role.period}</p>
            <div>
              <p className="font-medium">
                {role.title} <span className="text-muted">· {role.company}</span>
              </p>
              {detailed && (
                <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted">
                  {role.points.map((p) => (
                    <li key={p} className="relative pl-4 before:absolute before:left-0 before:top-[0.6em] before:size-1 before:rounded-full before:bg-accent">
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
