"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendMessage, type SendState } from "@/app/contact/actions";
import { ArrowRight } from "./Icons";

/** Sends straight to me through a Server Action, no email app needed. */
export function ContactForm() {
  const [state, action, pending] = useActionState<SendState, FormData>(sendMessage, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.ok) formRef.current?.reset();
  }, [state]);

  const field =
    "mt-1.5 w-full rounded-lg border border-line bg-card px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-accent";

  return (
    <form ref={formRef} action={action} className="space-y-4">
      <label className="block text-sm">
        Name
        <input name="name" required maxLength={100} autoComplete="name" placeholder="Your name" className={field} />
      </label>
      <label className="block text-sm">
        Email <span className="text-muted">(optional, if you’d like a reply)</span>
        <input name="email" type="email" maxLength={200} autoComplete="email" placeholder="you@example.com" className={field} />
      </label>
      <label className="block text-sm">
        Message
        <textarea
          name="message"
          required
          maxLength={5000}
          rows={5}
          placeholder="What are you working on?"
          className={`${field} resize-y`}
        />
      </label>
      {/* Honeypot: hidden from people, irresistible to bots. */}
      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-transform active:scale-[0.97] disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send message"}
          <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
        </button>
        <p className={`text-xs ${state && !state.ok ? "text-red-500" : "text-muted"}`} role="status">
          {state?.message ?? "Goes straight to me."}
        </p>
      </div>
    </form>
  );
}
