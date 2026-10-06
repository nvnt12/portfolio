"use client";

import { useEffect, useMemo, useRef } from "react";
import { animate, motion, motionValue } from "motion/react";
import { LOGO_DOT, LOGO_PATH, LOGO_VIEWBOX } from "./Logo";

const HOME = { x: LOGO_DOT.cx, y: LOGO_DOT.cy };
const START = { x: 594, y: 1400 };
const TAIL = 9;
const LAG = 0.014;
const DURATION = 2.8;

const clamp = (n: number) => Math.min(1, Math.max(0, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

/** First-visit intro: the dot leaves home, traces the N on its own, returns, then the site fades in. */
export function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const total = useRef(0);

  const progress = useMemo(() => motionValue(0), []);
  const opacity = useMemo(() => motionValue(1), []);
  const dots = useMemo(
    () => Array.from({ length: TAIL + 1 }, () => ({ x: motionValue(HOME.x), y: motionValue(HOME.y) })),
    [],
  );
  const draw = useMemo(() => motionValue(0), []);
  const fill = useMemo(() => motionValue(0), []);
  const stroke = useMemo(() => motionValue(1), []);

  useEffect(() => {
    const html = document.documentElement;
    if (!html.classList.contains("is-loading")) return;

    const el = path.current;
    if (!el) return;
    total.current = el.getTotalLength();

    const pointAt = (p: number) => {
      if (p < 0.1) {
        const t = ease(clamp(p / 0.1));
        return { x: lerp(HOME.x, START.x, t), y: lerp(HOME.y, START.y, t) };
      }
      if (p <= 0.85) {
        const pt = el.getPointAtLength(clamp((p - 0.1) / 0.75) * total.current);
        return { x: pt.x, y: pt.y };
      }
      const t = ease(clamp((p - 0.85) / 0.15));
      return { x: lerp(START.x, HOME.x, t), y: lerp(START.y, HOME.y, t) };
    };

    const apply = (p: number) => {
      dots.forEach((d, i) => {
        const pt = pointAt(Math.max(0, p - i * LAG));
        d.x.set(pt.x);
        d.y.set(pt.y);
      });
      draw.set(clamp((p - 0.1) / 0.75));
      fill.set(clamp((p - 0.82) / 0.18));
      stroke.set(1 - clamp((p - 0.8) / 0.18));
    };

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      try {
        sessionStorage.setItem("nvnt-intro", "1");
      } catch {}
      html.classList.remove("is-loading");
    };

    const unsub = progress.on("change", apply);
    const run = animate(progress, 1, { duration: DURATION, ease: [0.45, 0, 0.25, 1] });
    run.then(() => {
      const out = animate(opacity, 0, { duration: 0.55, delay: 0.3, ease: "easeOut" });
      out.then(finish);
    });
    const fallback = window.setTimeout(finish, (DURATION + 3) * 1000);

    return () => {
      unsub();
      run.stop();
      window.clearTimeout(fallback);
    };
  }, [progress, opacity, dots, draw, fill, stroke]);

  return (
    <motion.div
      ref={root}
      aria-hidden
      style={{ opacity }}
      className="site-loader fixed inset-0 z-[100] place-items-center bg-bg"
    >
      <svg viewBox={LOGO_VIEWBOX} className="max-h-[42dvh] w-auto max-w-[62vw] overflow-visible sm:max-w-[16rem]">
        <motion.path d={LOGO_PATH} className="fill-fg" style={{ fillOpacity: fill }} />
        <motion.path
          ref={path}
          d={LOGO_PATH}
          fill="none"
          strokeWidth={16}
          strokeLinejoin="round"
          strokeLinecap="round"
          className="stroke-accent"
          style={{ pathLength: draw, opacity: stroke }}
        />
        {dots
          .map((d, i) => ({ d, i }))
          .reverse()
          .map(({ d, i }) => (
            <motion.circle
              key={i}
              cx={d.x}
              cy={d.y}
              r={LOGO_DOT.r * (1 - (i / (TAIL + 1)) * 0.75)}
              className="fill-accent"
              style={i === 0 ? { filter: "drop-shadow(0 0 22px var(--accent))" } : { opacity: 0.55 * (1 - i / (TAIL + 1)) }}
            />
          ))}
      </svg>
    </motion.div>
  );
}
