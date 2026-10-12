"use server";

import { site } from "@/lib/data";

export type SendState = { ok: boolean; message: string } | null;

/**
 * Emails a contact message to me through Resend.
 * Needs RESEND_API_KEY, plus CONTACT_FROM (a sender on a verified domain) once nvnt.in is verified.
 */
export async function sendMessage(_prev: SendState, formData: FormData): Promise<SendState> {
  const name = String(formData.get("name") ?? "").trim().slice(0, 100);
  const email = String(formData.get("email") ?? "").trim().slice(0, 200);
  const message = String(formData.get("message") ?? "").trim().slice(0, 5000);

  // Hidden field only bots fill in. Pretend it worked so they don't retry.
  if (formData.get("company")) return { ok: true, message: "Thanks, got it." };

  if (!name || !message) return { ok: false, message: "Please add your name and a message." };
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, message: "That email doesn’t look right." };

  const failed = { ok: false, message: `Couldn’t send right now. Please email ${site.email} directly.` };

  const { RESEND_API_KEY, CONTACT_FROM } = process.env;
  if (!RESEND_API_KEY) {
    console.error("Contact form: RESEND_API_KEY is not set.");
    return failed;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM || `${site.short} <onboarding@resend.dev>`,
        to: site.email,
        subject: `Hello from ${name}`,
        text: `New message from ${name}${email ? ` <${email}>` : ""}\n\n${message}`,
        ...(email && { reply_to: email }),
      }),
    });
    if (!res.ok) {
      console.error("Contact form: Resend responded", res.status, await res.text());
      return failed;
    }
  } catch (err) {
    console.error("Contact form: couldn't reach Resend", err);
    return failed;
  }

  return { ok: true, message: email ? "Sent. I’ll get back to you soon." : "Sent. Thanks for reaching out!" };
}
