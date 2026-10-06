"use client";

import { useEffect, useRef } from "react";

const PARTICLES = 8;

export function ClickBurst() {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onClick = (e: MouseEvent) => {
      const host = layer.current;
      if (!host) return;
      const interactive =
        e.target instanceof Element && e.target.closest("a, button, input, textarea, select, [role=dialog]");

      for (let i = 0; i < (interactive ? PARTICLES : PARTICLES / 2); i++) {
        const dot = document.createElement("span");
        const angle = (Math.PI * 2 * i) / PARTICLES + Math.random() * 0.5;
        const dist = 18 + Math.random() * 26;
        dot.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:5px;height:5px;margin:-2.5px;border-radius:9999px;background:var(--color-accent);pointer-events:none;`;
        host.appendChild(dot);
        const anim = dot.animate(
          [
            { transform: "translate(0,0) scale(1)", opacity: 1 },
            { transform: `translate(${Math.cos(angle) * dist}px,${Math.sin(angle) * dist}px) scale(0)`, opacity: 0 },
          ],
          { duration: 550, easing: "cubic-bezier(.22,1,.36,1)" },
        );
        anim.onfinish = () => dot.remove();
      }
    };

    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return <div ref={layer} aria-hidden className="pointer-events-none fixed inset-0 z-[80]" />;
}
