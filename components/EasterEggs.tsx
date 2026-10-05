"use client";

import { useEffect } from "react";
import { site } from "@/lib/data";

let greeted = false;

/** Console hello, a tab title that misses you, and typing "dots" anywhere. */
export function EasterEggs() {
  useEffect(() => {
    if (!greeted) {
      greeted = true;
      console.log("%c●%c  Hey, you opened the console.", "color:#fb923c;font-size:20px", "font-size:13px;font-weight:600");
      console.log(`If you read source for fun, we should talk: ${site.email}\nAlso try Ctrl+K, or type "dots" anywhere on the page.`);
    }

    let saved = "";
    const onVisibility = () => {
      if (document.hidden) {
        saved = document.title;
        document.title = "come back, the dot misses you ●";
      } else if (saved) {
        document.title = saved;
      }
    };

    let buffer = "";
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, [contenteditable='true']")) return;
      if (e.key.length !== 1 || e.metaKey || e.ctrlKey) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-4);
      if (buffer === "dots") window.dispatchEvent(new Event("dot-rain"));
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return null;
}
