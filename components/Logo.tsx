// Vector of the nvnt mark. Uses currentColor, so it follows the text colour.
export const LOGO_VIEWBOX = "594 498 963 914";
export const LOGO_PATH = "M594 1400V895a219.5 200 0 0 1 439 0v317a57 57 0 0 0 114 0V706h162v506a219 200 0 0 1-438 0V895a57.5 57.5 0 0 0-115 0v505z";
export const LOGO_DOT = { cx: 1461.5, cy: 593.5, r: 95.5 };

export function Logo({ className, title = "Navneet Chadha" }: { className?: string; title?: string }) {
  return (
    <svg viewBox={LOGO_VIEWBOX} fill="currentColor" role="img" aria-label={title} className={className}>
      <path d={LOGO_PATH} />
      <circle className="logo-dot" {...LOGO_DOT} />
    </svg>
  );
}
