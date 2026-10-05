"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "./Icons";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-line bg-card p-1 pl-4">
      <a href={`mailto:${email}`} className="font-mono text-sm hover:text-accent">
        {email}
      </a>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
          } catch {}
        }}
        aria-label={copied ? "Email copied" : "Copy email address"}
        className="grid size-8 place-items-center rounded-full text-muted transition-colors hover:bg-fg/5 hover:text-fg"
      >
        {copied ? <Check className="text-accent" /> : <Copy />}
      </button>
      <span role="status" className="sr-only">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </div>
  );
}
