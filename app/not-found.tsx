import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pt-24 sm:pt-32">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">This route didn’t make it into the bundle.</h1>
      <p className="mt-4 text-muted">The page you’re after doesn’t exist, or it moved.</p>
      <Link href="/" className="mt-8 inline-block rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg">
        Back home
      </Link>
    </div>
  );
}
