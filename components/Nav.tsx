"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { Command } from "./Icons";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-bg/75 backdrop-blur-md">
      <nav aria-label="Main" className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between gap-2 px-4 sm:px-6">
        <Link href="/" aria-label="Home" className="group -m-1 rounded-md p-1">
          <Logo className="h-6 w-auto" />
        </Link>

        <div className="flex items-center gap-1">
          <ul className="flex items-center">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative block rounded-full px-3 py-1.5 text-sm transition-colors ${active ? "text-fg" : "text-muted hover:text-fg"}`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-fg/[0.07]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-command-menu"))}
            aria-label="Open command menu"
            className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-fg/5 hover:text-fg"
          >
            <Command />
          </button>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
