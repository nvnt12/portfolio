"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "./Icons";

/** No backend needed: composes the message in the visitor's email app. */
export function ContactForm({ email }: { email: string }) {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Hello from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const field =
    "mt-1.5 w-full rounded-lg border border-line bg-card px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-accent";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block text-sm">
        Name
        <input name="name" required autoComplete="name" placeholder="Your name" className={field} />
      </label>
      <label className="block text-sm">
        Message
        <textarea name="message" required rows={5} placeholder="What are you working on?" className={`${field} resize-y`} />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="group inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-transform active:scale-[0.97]"
        >
          Send message
          <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
        </button>
        <p className="text-xs text-muted" role="status">
          {sent ? "Your email app should have opened." : "Opens in your email app."}
        </p>
      </div>
    </form>
  );
}
