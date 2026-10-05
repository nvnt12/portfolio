import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { CopyEmail } from "@/components/CopyEmail";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/data";

export const metadata: Metadata = { title: "Contact", description: "Get in touch with Navneet Chadha." };

export default function Contact() {
  return (
    <div className="pt-16 sm:pt-24">
      <Reveal>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Let’s talk</h1>
        <p className="mt-4 max-w-xl leading-relaxed text-pretty text-muted">
          I’m open to frontend roles, remote or with relocation. The quickest way to reach me is email.
        </p>
      </Reveal>
      <Reveal delay={0.05} className="mt-8">
        <CopyEmail email={site.email} />
      </Reveal>
      <Reveal delay={0.1} className="mt-14 max-w-lg">
        <ContactForm email={site.email} />
      </Reveal>
    </div>
  );
}
