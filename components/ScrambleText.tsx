"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";

const CHARS = "abcdefghijklmnopqrstuvwxyz";

/** Letters shuffle and settle left-to-right on mount and on hover. */
export function ScrambleText({ text, className }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);
  const frame = useRef<number | null>(null);

  const run = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Let a running scramble finish rather than restarting it every time the cursor re-enters.
    if (frame.current) return;
    let settled = 0;
    const tick = () => {
      setDisplay(
        text
          .split("")
          .map((c, i) => (c === " " || i < settled ? c : CHARS[Math.floor(Math.random() * CHARS.length)]))
          .join(""),
      );
      settled += 0.4;
      if (settled <= text.length) {
        frame.current = requestAnimationFrame(tick);
      } else {
        frame.current = null;
        setDisplay(text);
      }
    };
    frame.current = requestAnimationFrame(tick);
  }, [text]);

  useEffect(() => {
    const t = setTimeout(run, 250);
    return () => {
      clearTimeout(t);
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = null;
    };
  }, [run]);

  // Each real word holds the layout (invisibly) and its scramble is drawn over it, so random letters of
  // different widths never resize the line or shove whatever sits after the name. Spaces stay real, so
  // the name wraps exactly as the plain text would.
  const shown = display.split(" ");
  return (
    <span className={className} onMouseEnter={run}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.split(" ").map((word, i) => (
          <Fragment key={i}>
            {i > 0 && " "}
            <span className="relative inline-block">
              <span className="invisible">{word}</span>
              <span className="absolute left-0 top-0 whitespace-nowrap">{shown[i]}</span>
            </span>
          </Fragment>
        ))}
      </span>
    </span>
  );
}
