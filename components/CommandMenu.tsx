"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { site, socials } from "@/lib/data";
import { toggleTheme } from "@/lib/theme";

type Item = { label: string; hint: string; run: () => void };

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const items: Item[] = useMemo(
    () => [
      { label: "Home", hint: "Page", run: () => router.push("/") },
      { label: "Work", hint: "Page", run: () => router.push("/work") },
      { label: "About", hint: "Page", run: () => router.push("/about") },
      { label: "Contact", hint: "Page", run: () => router.push("/contact") },
      { label: "Copy email", hint: site.email, run: () => void navigator.clipboard?.writeText(site.email) },
      { label: "Toggle theme", hint: "Action", run: toggleTheme },
      ...socials.map((s) => ({
        label: `Open ${s.label}`,
        hint: "Link",
        run: () => void window.open(s.href, "_blank", "noopener,noreferrer"),
      })),
    ],
    [router],
  );

  const filtered = items.filter((i) => i.label.toLowerCase().includes(query.trim().toLowerCase()));
  const current = Math.min(active, Math.max(filtered.length - 1, 0));

  const show = (next: boolean) => {
    setOpen(next);
    setQuery("");
    setActive(0);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        setQuery("");
        setActive(0);
      }
    };
    const onOpen = () => {
      setOpen(true);
      setQuery("");
      setActive(0);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-menu", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-menu", onOpen);
    };
  }, []);

  const select = (item?: Item) => {
    if (!item) return;
    show(false);
    item.run();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/40 px-4 pt-[15vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={() => show(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            onMouseDown={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md overflow-hidden rounded-xl border border-line bg-card shadow-2xl"
          >
            <input
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setActive((current + 1) % Math.max(filtered.length, 1));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActive((current - 1 + filtered.length) % Math.max(filtered.length, 1));
                } else if (e.key === "Enter") {
                  e.preventDefault();
                  select(filtered[current]);
                } else if (e.key === "Escape") {
                  show(false);
                }
              }}
              placeholder="Type a command or search…"
              role="combobox"
              aria-expanded="true"
              aria-controls="command-list"
              aria-activedescendant={filtered[current] ? `cmd-${current}` : undefined}
              className="w-full border-b border-line bg-transparent px-4 py-3.5 text-sm outline-none placeholder:text-muted"
            />
            <ul id="command-list" role="listbox" className="max-h-72 overflow-y-auto p-1.5">
              {filtered.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">No results</li>}
              {filtered.map((item, i) => (
                <li
                  key={item.label}
                  id={`cmd-${i}`}
                  role="option"
                  aria-selected={i === current}
                  onMouseMove={() => setActive(i)}
                  onClick={() => select(item)}
                  className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm ${i === current ? "bg-fg/[0.07]" : ""}`}
                >
                  <span>{item.label}</span>
                  <span className="truncate pl-4 font-mono text-xs text-muted">{item.hint}</span>
                </li>
              ))}
            </ul>
            <div className="flex gap-4 border-t border-line px-4 py-2 font-mono text-[11px] text-muted">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span>esc close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
