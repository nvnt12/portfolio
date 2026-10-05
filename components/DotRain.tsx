"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

type Drop = { id: number; x: number; size: number; delay: number; duration: number; accent: boolean };

/** Listens for a "dot-rain" event and drops a shower of logo dots. */
export function DotRain() {
  const [drops, setDrops] = useState<Drop[]>([]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const rain = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const now = Date.now();
      setDrops(
        Array.from({ length: 42 }, (_, i) => ({
          id: now + i,
          x: Math.random() * 100,
          size: 6 + Math.random() * 16,
          delay: Math.random() * 0.8,
          duration: 1.3 + Math.random() * 1.2,
          accent: Math.random() < 0.35,
        })),
      );
      clearTimeout(timer);
      timer = setTimeout(() => setDrops([]), 3500);
    };
    window.addEventListener("dot-rain", rain);
    return () => {
      window.removeEventListener("dot-rain", rain);
      clearTimeout(timer);
    };
  }, []);

  if (drops.length === 0) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[80] overflow-hidden">
      {drops.map((d) => (
        <motion.span
          key={d.id}
          className={`absolute top-0 rounded-full ${d.accent ? "bg-accent" : "bg-fg"}`}
          style={{ left: `${d.x}%`, width: d.size, height: d.size }}
          initial={{ y: -40 }}
          animate={{ y: "110vh" }}
          transition={{ delay: d.delay, duration: d.duration, ease: [0.45, 0, 0.9, 0.55] }}
        />
      ))}
    </div>
  );
}
