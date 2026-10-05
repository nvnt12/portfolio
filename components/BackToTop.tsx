"use client";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        })
      }
      className="group inline-flex items-center gap-1.5 transition-colors hover:text-fg"
    >
      Back to top
      <span aria-hidden className="inline-block transition-transform duration-300 group-hover:-translate-y-1">
        ↑
      </span>
    </button>
  );
}
