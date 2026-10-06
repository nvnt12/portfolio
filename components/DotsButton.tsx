"use client";

export function DotsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event("dot-rain"))} className={className}>
      psst: tap here for dots
    </button>
  );
}
