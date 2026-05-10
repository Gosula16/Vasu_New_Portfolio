"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { personal } from "@/lib/data";
import { Reveal } from "@/components/animations/reveal";

const WEEKS = 26;
const DAYS = 7;

function pseudoIntensity(seed: number, week: number, day: number) {
  const x = Math.sin(seed * 12.9898 + week * 78.233 + day * 45.164) * 43758.5453;
  return x - Math.floor(x);
}

export function GithubHeatmap() {
  const seed = personal.githubUsername.length;

  const cells = React.useMemo(() => {
    const out: { week: number; day: number; level: number }[] = [];
    for (let week = 0; week < WEEKS; week++) {
      for (let day = 0; day < DAYS; day++) {
        const p = pseudoIntensity(seed, week, day);
        const level = p > 0.78 ? 4 : p > 0.58 ? 3 : p > 0.38 ? 2 : p > 0.18 ? 1 : 0;
        out.push({ week, day, level });
      }
    }
    return out;
  }, [seed]);

  return (
    <Reveal className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="glass-strong rounded-3xl border border-[var(--border)] p-6 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
              GitHub activity UI
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Contribution heatmap</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
              Demo visualization inspired by GitHub’s contribution graph. Swap in real data via the GitHub API when you’re ready.
            </p>
          </div>
          <a
            className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_55%,transparent)] px-4 py-2 text-xs font-semibold text-[var(--fg)] hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            @{personal.githubUsername}
          </a>
        </div>

        <div className="mt-6 overflow-x-auto pb-2">
          <div
            className="inline-grid gap-[3px]"
            style={{
              gridTemplateColumns: `repeat(${WEEKS}, 12px)`,
              gridTemplateRows: `repeat(${DAYS}, 12px)`,
            }}
          >
            {cells.map(({ week, day, level }) => {
              const alpha = 0.12 + level * 0.18;
              return (
                <motion.div
                  key={`${week}-${day}`}
                  initial={{ opacity: 0, scale: 0.88 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (week * DAYS + day) * 0.0012 }}
                  title={`week ${week + 1} · day ${day + 1}`}
                  className="h-3 w-3 rounded-[3px] ring-1 ring-[color-mix(in_oklab,var(--accent)_25%,transparent)]"
                  style={{
                    gridColumn: week + 1,
                    gridRow: day + 1,
                    background:
                      level === 0
                        ? "color-mix(in oklab, var(--muted) 14%, transparent)"
                        : `color-mix(in oklab, var(--neon) ${Math.round(alpha * 100)}%, transparent)`,
                  }}
                />
              );
            })}
          </div>
          <div className="mt-3 flex items-center justify-end gap-2 text-[11px] text-[var(--muted)]">
            <span>Less</span>
            <span className="inline-flex gap-1">
              {[0, 1, 2, 3, 4].map((lvl) => (
                <span
                  key={lvl}
                  className="h-3 w-3 rounded-[3px] ring-1 ring-[color-mix(in_oklab,var(--accent)_25%,transparent)]"
                  style={{
                    background:
                      lvl === 0
                        ? "color-mix(in oklab, var(--muted) 14%, transparent)"
                        : `color-mix(in oklab, var(--neon) ${12 + lvl * 18}%, transparent)`,
                  }}
                />
              ))}
            </span>
            <span>More</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
