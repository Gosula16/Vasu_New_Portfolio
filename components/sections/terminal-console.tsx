"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/animations/reveal";

const SCRIPT = [
  { text: "> boot portfolio_kernel…", delay: 0 },
  { text: "> load modules: next, tailwind, motion, gsap…", delay: 420 },
  { text: "> mount sections: hero, projects, contact…", delay: 820 },
  { text: "> status: ready ✓", delay: 1220 },
];

export function TerminalConsole() {
  const [lines, setLines] = React.useState<string[]>([]);

  React.useEffect(() => {
    const timers: number[] = [];
    SCRIPT.forEach((s) => {
      timers.push(
        window.setTimeout(() => {
          setLines((prev) => [...prev, s.text]);
        }, s.delay)
      );
    });
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  return (
    <Reveal className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_72%,transparent)] shadow-[0_24px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400/90" />
          <span className="h-3 w-3 rounded-full bg-amber-400/90" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/90" />
          <span className="ml-3 font-mono text-[11px] text-[var(--muted)]">terminal — portfolio</span>
        </div>
        <div className="p-5 font-mono text-xs leading-relaxed text-[color-mix(in_oklab,var(--fg)_82%,transparent)]">
          {lines.map((l, idx) => (
            <motion.div
              key={`${l}-${idx}`}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-2 first:mt-0"
            >
              {l}
            </motion.div>
          ))}
          <motion.span
            aria-hidden
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.1 }}
            className="mt-2 inline-block h-4 w-[10px] translate-y-1 bg-[var(--neon)]"
          />
        </div>
      </div>
    </Reveal>
  );
}
