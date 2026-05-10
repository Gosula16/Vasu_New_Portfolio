"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { achievements, certifications } from "@/lib/data";
import { Reveal } from "@/components/animations/reveal";

export function CertificationsView() {
  const [i, setI] = React.useState(0);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setI((v) => (v + 1) % certifications.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, []);

  const active = certifications[i];

  return (
    <>
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
          Certifications
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Proof of disciplined learning
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
          Carousel spotlight with hover zoom cards—swap in certificate imagery when you have assets ready.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="glass-strong relative overflow-hidden rounded-3xl border border-[var(--border)] p-10 gradient-border"
          >
            <div className="pointer-events-none absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_20%_30%,color-mix(in_oklab,var(--accent)_22%,transparent),transparent_55%),radial-gradient(circle_at_80%_70%,color-mix(in_oklab,var(--accent-2)_18%,transparent),transparent_55%)]" />
            <div className="relative">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                Spotlight
              </div>
              <div className="mt-4 text-2xl font-semibold tracking-tight">{active}</div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                Display PDFs or badges here—this carousel rotates automatically for a lively gallery feel.
              </p>
            </div>
          </motion.div>

          <div className="mt-6 flex flex-wrap gap-2">
            {certifications.map((c, idx) => (
              <button
                key={c}
                type="button"
                onClick={() => setI(idx)}
                className={
                  idx === i
                    ? "rounded-full bg-gradient-to-r from-[var(--accent)] via-[var(--accent-2)] to-[var(--neon)] px-4 py-2 text-xs font-semibold text-white"
                    : "rounded-full border border-[var(--border)] bg-[var(--glass)] px-4 py-2 text-xs font-semibold text-[var(--muted)] backdrop-blur hover:text-[var(--fg)]"
                }
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal className="lg:col-span-5">
          <div className="grid grid-cols-1 gap-4">
            {certifications.map((c) => (
              <motion.div
                key={c}
                whileHover={{ scale: 1.02 }}
                className="rounded-3xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_62%,transparent)] p-5 backdrop-blur-xl transition-shadow hover:shadow-[0_22px_90px_rgba(0,0,0,0.35)]"
              >
                <div className="text-sm font-semibold">{c}</div>
                <div className="mt-2 text-xs text-[var(--muted)]">Tap to spotlight · add thumbnail later</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_55%,transparent)] p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
              Achievements
            </div>
            <ul className="mt-4 space-y-3 text-sm text-[color-mix(in_oklab,var(--fg)_84%,transparent)]">
              {achievements.map((a) => (
                <li key={a} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--neon)]" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </>
  );
}
