"use client";

import { motion, type Easing } from "motion/react";
import { useEffect, useState } from "react";

type Drop = {
  id: number;
  x: number;
  size: number;
  accent: boolean;
  delay: number;
  y: number[];
  dx: number[];
  scaleX: number[];
  scaleY: number[];
  opacity: number[];
  times: number[];
  ease: Easing[];
  duration: number;
};

/** Where the homecoming dot should end up, in viewport pixels. */
type Home = { cx: number; cy: number; diameter: number; notBefore: number };

// Mostly small dots with the odd big one, so the shower reads as texture rather than noise.
const SIZES = [6, 7, 8, 8, 9, 10, 10, 12, 14, 18];
// Quadratic in/out approximates gravity: accelerate on the way down, decelerate on the way up.
const FALL: Easing = [0.11, 0, 0.5, 0];
const RISE: Easing = [0.5, 1, 0.89, 1];

// Each step animates *to* its values over `t` seconds (`x` is a pixel offset from the drop's lane).
// Shape only changes in the short floor-contact steps, so dots stay round while airborne.
type Step = { t: number; ease: Easing; y: number; x: number; sx: number; sy: number; o?: number };

const pick = <T,>(xs: readonly T[]) => xs[Math.floor(Math.random() * xs.length)];
const between = (min: number, max: number) => min + Math.random() * (max - min);

/**
 * One dot that falls from above the viewport and bounces twice on the bottom edge. Normally it then pops away;
 * given a `home`, it waits for the others to clear and jumps back into the logo instead.
 */
function makeDrop(id: number, xPercent: number, vw: number, vh: number, home?: Home): Drop {
  const size = home ? 10 : pick(SIZES);
  const floor = vh - size;
  const fallTime = between(1.0, 1.4);
  const delay = between(0, 1.6);
  // Bounce heights and times follow the same "gravity" as the fall (t ∝ √h), so every dot feels equally heavy.
  const gravity = (height: number) => fallTime * Math.sqrt(Math.max(height, 1) / vh);
  const h1 = vh * between(0.08, 0.2);
  const h2 = h1 * between(0.2, 0.35);
  const up1 = gravity(h1);
  const up2 = gravity(h2);
  const roll = between(-48, 48);

  const start: Step = { t: 0, ease: "linear", y: -size - 24, x: 0, sx: 0.9, sy: 1.12 };
  const steps: Step[] = [
    { t: fallTime, ease: FALL, y: floor, x: 0, sx: 0.9, sy: 1.12 }, // fall
    { t: 0.05, ease: "easeOut", y: floor, x: 0, sx: 1.45, sy: 0.6 }, // squash
    { t: 0.08, ease: "easeOut", y: floor, x: 0, sx: 1, sy: 1 }, // recover
    { t: up1, ease: RISE, y: floor - h1, x: roll * 0.5, sx: 1, sy: 1 }, // bounce up
    { t: up1, ease: FALL, y: floor, x: roll * 0.8, sx: 1, sy: 1 }, // and down
    { t: 0.04, ease: "easeOut", y: floor, x: roll * 0.8, sx: 1.25, sy: 0.8 },
    { t: 0.07, ease: "easeOut", y: floor, x: roll * 0.8, sx: 1, sy: 1 },
    { t: up2, ease: RISE, y: floor - h2, x: roll * 0.95, sx: 1, sy: 1 }, // little hop
    { t: up2, ease: FALL, y: floor, x: roll, sx: 1, sy: 1 },
    { t: 0.04, ease: "easeOut", y: floor, x: roll, sx: 1.1, sy: 0.9 },
    { t: 0.25, ease: "easeOut", y: floor, x: roll, sx: 1, sy: 1 }, // rest
  ];

  if (home) {
    // The drop is anchored at its bottom-centre, so solve for the translate that puts its scaled centre on the logo dot.
    const scale = home.diameter / size;
    const targetX = home.cx - (xPercent / 100) * vw;
    const targetY = home.cy - size + (scale * size) / 2;
    const apexY = Math.min(targetY - 4, Math.max(4, targetY - 18));
    const rise = gravity(floor - apexY);
    const drop = Math.max(0.08, gravity(targetY - apexY));
    const landedAt = delay + steps.reduce((sum, s) => sum + s.t, 0);
    steps.push(
      { t: Math.max(0.1, home.notBefore + 0.15 - landedAt), ease: "linear", y: floor, x: roll, sx: 1, sy: 1 }, // wait for the stage to clear
      { t: 0.16, ease: "easeOut", y: floor, x: roll, sx: 1.35, sy: 0.65 }, // crouch
      { t: rise, ease: RISE, y: apexY, x: roll + (targetX - roll) * (rise / (rise + drop)), sx: 0.85, sy: 1.18 }, // leap
      { t: drop, ease: FALL, y: targetY, x: targetX, sx: scale, sy: scale }, // drop into the logo
    );
  } else {
    steps.push({ t: 0.3, ease: "easeIn", y: floor, x: roll, sx: 0, sy: 0, o: 0 }); // pop away
  }

  const frames = [start, ...steps];
  const duration = steps.reduce((sum, s) => sum + s.t, 0);
  let elapsed = 0;

  return {
    id,
    x: xPercent,
    size,
    accent: home ? false : Math.random() < 0.3,
    delay,
    duration,
    times: frames.map((f) => (elapsed += f.t) / duration),
    ease: steps.map((s) => s.ease),
    y: frames.map((f) => f.y),
    dx: frames.map((f) => f.x),
    scaleX: frames.map((f) => f.sx),
    scaleY: frames.map((f) => f.sy),
    opacity: frames.map((f) => f.o ?? 1),
  };
}

const end = (d: Drop) => d.delay + d.duration;

/**
 * Listens for a "dot-rain" event: the nav logo's dot hops out, a shower of bouncing dots falls, and once they've
 * popped away the last one leaps back up into the logo.
 */
export function DotRain() {
  const [drops, setDrops] = useState<Drop[]>([]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let logoDot: SVGCircleElement | null = null;

    const comeHome = () => {
      logoDot?.classList.remove("is-away");
      logoDot?.classList.add("is-home");
    };

    const rain = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const now = Date.now();
      const { clientWidth: vw, clientHeight: vh } = document.documentElement;

      // Measure the logo dot at rest (it may still be away from a previous shower) before sending it off.
      logoDot = document.querySelector<SVGCircleElement>("header .logo-dot");
      logoDot?.classList.remove("is-away", "is-home");
      const rect = logoDot?.getBoundingClientRect();
      logoDot?.classList.add("is-away");

      // Jittered columns: one dot per lane, placed randomly inside it, so the spread is even but never grid-like.
      const lanes = Math.round(Math.min(36, Math.max(14, vw / 42)));
      const laneX = (i: number) => ((i + between(0.15, 0.85)) / lanes) * 100;
      // The homecoming dot falls somewhere in the middle of the screen so its leap back reads as a clear arc.
      const homeLane = rect?.width ? Math.floor(lanes * between(0.35, 0.65)) : -1;

      const next = Array.from({ length: lanes }, (_, i) => (i === homeLane ? null : makeDrop(now + i, laneX(i), vw, vh)))
        .filter((d): d is Drop => d !== null);
      if (rect?.width) {
        const home = { cx: rect.left + rect.width / 2, cy: rect.top + rect.height / 2, diameter: rect.width, notBefore: Math.max(...next.map(end)) };
        next.push(makeDrop(now + homeLane, laneX(homeLane), vw, vh, home));
      }

      setDrops(next);
      clearTimeout(timer);
      timer = setTimeout(() => {
        comeHome();
        setDrops([]);
      }, Math.max(...next.map(end)) * 1000);
    };

    const onLanded = (e: AnimationEvent) => {
      if (e.animationName === "dot-land") logoDot?.classList.remove("is-home");
    };

    window.addEventListener("dot-rain", rain);
    document.addEventListener("animationend", onLanded);
    return () => {
      window.removeEventListener("dot-rain", rain);
      document.removeEventListener("animationend", onLanded);
      clearTimeout(timer);
      logoDot?.classList.remove("is-away", "is-home");
    };
  }, []);

  if (drops.length === 0) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[80] overflow-hidden">
      {drops.map((d) => (
        <motion.span
          key={d.id}
          className={`absolute top-0 rounded-full ${d.accent ? "bg-accent" : "bg-fg"}`}
          style={{ left: `${d.x}%`, width: d.size, height: d.size, marginLeft: -d.size / 2, transformOrigin: "50% 100%" }}
          initial={{ y: d.y[0], x: 0 }}
          animate={{ y: d.y, x: d.dx, scaleX: d.scaleX, scaleY: d.scaleY, opacity: d.opacity }}
          transition={{
            delay: d.delay,
            duration: d.duration,
            times: d.times,
            ease: d.ease,
            // Horizontal motion stays linear so the leap home traces a true ballistic arc.
            x: { delay: d.delay, duration: d.duration, times: d.times, ease: "linear" },
          }}
        />
      ))}
    </div>
  );
}
