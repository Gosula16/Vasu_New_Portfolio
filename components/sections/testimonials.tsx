"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import { Reveal } from "@/components/animations/reveal";

export function Testimonials() {
  const [i, setI] = React.useState(0);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setI((v) => (v + 1) % testimonials.length);
    }, 5200);
    return () => window.clearInterval(id);
  }, []);

  const t = testimonials[i];

  return (
    <Reveal className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_65%,transparent)] p-8 shadow-[0_24px_90px_rgba(0,0,0,0.25)] backdrop-blur-xl dark:shadow-[0_24px_120px_rgba(0,0,0,0.55)]">
        <div className="pointer-events-none absolute -left-24 top-0 h-56 w-56 rounded-full bg-[color-mix(in_oklab,var(--accent)_18%,transparent)] blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-56 w-56 rounded-full bg-[color-mix(in_oklab,var(--accent-2)_16%,transparent)] blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
              Testimonials
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Trusted interactions</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
              Floating quote cards with smooth transitions—built for a premium, calm reading rhythm.
            </p>
          </div>

          <div className="relative w-full max-w-xl">
            <div className="absolute -left-2 -top-2 text-[color-mix(in_oklab,var(--neon)_35%,transparent)]">
              <Quote className="h-10 w-10" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_55%,transparent)] p-6"
              >
                <p className="text-sm leading-relaxed text-[color-mix(in_oklab,var(--fg)_88%,transparent)]">
                  “{t.quote}”
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)] via-[var(--accent-2)] to-[var(--neon)] font-mono text-xs font-bold text-white shadow-[0_18px_70px_var(--glow)]">
                    {t.name
                      .split(" ")
                      .slice(0, 2)
                      .map((s) => s[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-[var(--muted)]">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 flex gap-2">
              {testimonials.map((x, idx) => (
                <button
                  key={x.id}
                  type="button"
                  aria-label={`Show testimonial ${idx + 1}`}
                  onClick={() => setI(idx)}
                  className={
                    idx === i
                      ? "h-2 w-8 rounded-full bg-gradient-to-r from-[var(--accent)] via-[var(--accent-2)] to-[var(--neon)]"
                      : "h-2 w-2 rounded-full bg-[color-mix(in_oklab,var(--muted)_35%,transparent)]"
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
