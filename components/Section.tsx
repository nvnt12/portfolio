import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Section({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="mt-24">
      <Reveal className="mb-6 flex items-baseline justify-between gap-4">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{title}</h2>
        {action}
      </Reveal>
      {children}
    </section>
  );
}
