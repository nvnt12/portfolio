export function Marquee({ items }: { items: string[] }) {
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <ul className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[...items, ...items].map((item, i) => (
          <li key={i} aria-hidden={i >= items.length || undefined} className="pr-2.5">
            <span className="block rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
