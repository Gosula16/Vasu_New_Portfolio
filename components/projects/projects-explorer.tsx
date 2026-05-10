"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { projects as allProjects } from "@/lib/data";
import { TiltProjectCard } from "@/components/projects/tilt-card";

const TAGS = Array.from(new Set(allProjects.flatMap((p) => p.tags))).sort();

export function ProjectsExplorer() {
  const [tag, setTag] = React.useState<string | "all">("all");
  const [openId, setOpenId] = React.useState<string | null>(null);

  const filtered =
    tag === "all" ? allProjects : allProjects.filter((p) => p.tags.includes(tag));

  const openProject = allProjects.find((p) => p.id === openId) ?? null;

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <FilterChip active={tag === "all"} onClick={() => setTag("all")}>
          All
        </FilterChip>
        {TAGS.map((t) => (
          <FilterChip key={t} active={tag === t} onClick={() => setTag(t)}>
            {t}
          </FilterChip>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {filtered.map((p) => (
          <div
            key={p.id}
            role="button"
            tabIndex={0}
            className="cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklab,var(--accent)_45%,transparent)]"
            onClick={() => setOpenId(p.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpenId(p.id);
              }
            }}
          >
            <TiltProjectCard project={p} />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {openProject ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[75] bg-black/55 backdrop-blur-sm"
            role="presentation"
            onMouseDown={() => setOpenId(null)}
          >
            <motion.div
              initial={{ y: 16, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 16, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-1/2 top-[10vh] w-[min(92vw,680px)] -translate-x-1/2"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <div className="glass-strong relative overflow-hidden rounded-3xl border border-[var(--border)] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
                <button
                  type="button"
                  aria-label="Close"
                  className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_55%,transparent)]"
                  onClick={() => setOpenId(null)}
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="aspect-video w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_55%,transparent)]">
                  <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_30%,color-mix(in_oklab,var(--accent)_22%,transparent),transparent_60%),radial-gradient(circle_at_70%_70%,color-mix(in_oklab,var(--neon)_16%,transparent),transparent_55%)]">
                    <div className="px-6 text-center text-sm font-semibold text-[var(--muted)]">
                      Video preview placeholder — drop in a screen recording or loop on hover.
                    </div>
                  </div>
                </div>

                <div className="mt-6 pr-10">
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                    Project
                  </div>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight">{openProject.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                    {openProject.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {openProject.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_55%,transparent)] px-3 py-1 text-[11px] font-semibold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function FilterChip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "rounded-full bg-gradient-to-r from-[var(--accent)] via-[var(--accent-2)] to-[var(--neon)] px-4 py-2 text-xs font-semibold text-white shadow-[0_14px_55px_var(--glow)]"
          : "rounded-full border border-[var(--border)] bg-[var(--glass)] px-4 py-2 text-xs font-semibold text-[var(--muted)] backdrop-blur hover:text-[var(--fg)]"
      }
    >
      {children}
    </button>
  );
}
