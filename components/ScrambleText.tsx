"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CHARS = "abcdefghijklmnopqrstuvwxyz";

/** Letters shuffle and settle left-to-right on mount and on hover. */
export function ScrambleText({ text, className }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);
  const frame = useRef<number | null>(null);

  const run = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (frame.current) cancelAnimationFrame(frame.current);
    let settled = 0;
    const tick = () => {
      setDisplay(
        text
          .split("")
          .map((c, i) => (c === " " || i < settled ? c : CHARS[Math.floor(Math.random() * CHARS.length)]))
          .join(""),
      );
      settled += 0.4;
      if (settled <= text.length) frame.current = requestAnimationFrame(tick);
      else setDisplay(text);
    };
    frame.current = requestAnimationFrame(tick);
  }, [text]);

  useEffect(() => {
    const t = setTimeout(run, 250);
    return () => {
      clearTimeout(t);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [run]);

  return (
    <span className={className} onMouseEnter={run}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{display}</span>
    </span>
  );
}
