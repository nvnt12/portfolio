"use server";

import { site } from "@/lib/data";

export type SendState = { ok: boolean; message: string } | null;

/**
 * Delivers a contact message to whichever channels have env vars set:
 * - Telegram (instant push): TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID
 * - Email via Resend:        RESEND_API_KEY (+ optional CONTACT_FROM, a sender on a verified domain)
 */
export async function sendMessage(_prev: SendState, formData: FormData): Promise<SendState> {
  const name = String(formData.get("name") ?? "").trim().slice(0, 100);
  const email = String(formData.get("email") ?? "").trim().slice(0, 200);
  const message = String(formData.get("message") ?? "").trim().slice(0, 5000);

  // Hidden field only bots fill in. Pretend it worked so they don't retry.
  if (formData.get("company")) return { ok: true, message: "Thanks, got it." };

  if (!name || !message) return { ok: false, message: "Please add your name and a message." };
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, message: "That email doesn’t look right." };

  const text = `New message from ${name}${email ? ` <${email}>` : ""}\n\n${message}`;
  const sends: Promise<Response>[] = [];

  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, RESEND_API_KEY, CONTACT_FROM } = process.env;

  if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
    sends.push(
      fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text }),
      }),
    );
  }

  if (RESEND_API_KEY) {
    sends.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: CONTACT_FROM || `${site.short} <onboarding@resend.dev>`,
          to: site.email,
          subject: `Hello from ${name}`,
          text,
          ...(email && { reply_to: email }),
        }),
      }),
    );
  }

  if (sends.length === 0) {
    console.error("Contact form: no delivery channel configured (set TELEGRAM_* or RESEND_API_KEY).");
    return { ok: false, message: `Couldn’t send right now. Please email ${site.email} directly.` };
  }

  const results = await Promise.allSettled(sends);
  const delivered = results.some((r) => r.status === "fulfilled" && r.value.ok);
  if (!delivered) {
    console.error("Contact form: every delivery channel failed", results);
    return { ok: false, message: `Couldn’t send right now. Please email ${site.email} directly.` };
  }

  return { ok: true, message: email ? "Sent. I’ll get back to you soon." : "Sent. Thanks for reaching out!" };
}
