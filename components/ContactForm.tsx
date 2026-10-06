"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "./Icons";

/** No backend: opens the visitor's email app, and falls back to copying the message if nothing opens. */
export function ContactForm({ email }: { email: string }) {
  const [status, setStatus] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = `Hello from ${name}`;
    const body = `${message}\n\n— ${name}`;

    let opened = false;
    const onAway = () => {
      opened = true;
    };
    window.addEventListener("blur", onAway, { once: true });
    document.addEventListener("visibilitychange", onAway, { once: true });

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("Opening your email app…");

    setTimeout(async () => {
      window.removeEventListener("blur", onAway);
      document.removeEventListener("visibilitychange", onAway);
      if (opened) {
        setStatus("Your email app should have opened. Just press send.");
        return;
      }
      try {
        await navigator.clipboard.writeText(`To: ${email}\nSubject: ${subject}\n\n${body}`);
        setStatus(`No email app opened, so I copied your message. Paste it into an email to ${email}.`);
      } catch {
        setStatus(`No email app opened. Please email ${email} directly.`);
      }
    }, 1500);
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
          {status || "Opens in your email app."}
        </p>
      </div>
    </form>
  );
}
