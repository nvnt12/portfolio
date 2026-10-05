"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

const LINES = [
  "psst, drag me",
  "wheee",
  "again?",
  "one more time",
  "okay, that’s plenty",
  "fine. keep going.",
  "it’s the dot from my logo",
  "it likes you, I think",
];

/** The logo's dot, sitting after the name. Fling it and it springs home. */
export function DraggableDot() {
  const reduce = useReducedMotion();
  const [flings, setFlings] = useState(0);
  const line = flings < LINES.length ? LINES[flings] : `flung ${flings} times. impressive.`;

  return (
    <span className="relative inline-block">
      <motion.span
        aria-hidden
        drag={!reduce}
        dragSnapToOrigin
        dragElastic={0.5}
        dragTransition={{ bounceStiffness: 500, bounceDamping: 14 }}
        whileHover={{ scale: 1.15 }}
        whileDrag={{ scale: 1.35 }}
        onDragEnd={() => setFlings((f) => f + 1)}
        className="ml-[0.05em] inline-block size-[0.2em] cursor-grab touch-none rounded-full bg-accent align-[0.62em] active:cursor-grabbing"
      />
      {!reduce && (
        <AnimatePresence mode="wait">
          <motion.span
            key={flings}
            aria-hidden
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ delay: flings === 0 ? 1.4 : 0, duration: 0.25 }}
            className="pointer-events-none absolute bottom-full right-0 mb-1 hidden whitespace-nowrap font-mono text-xs font-normal tracking-normal text-muted sm:block"
          >
            {line} ↓
          </motion.span>
        </AnimatePresence>
      )}
    </span>
  );
}
