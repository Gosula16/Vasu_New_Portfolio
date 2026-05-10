"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { ExternalLink, FolderGit2 } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

export type TiltProject = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  demo: string;
  repo: string;
  featured?: boolean;
};

export function TiltProjectCard({
  project,
  className,
}: {
  project: TiltProject;
  className?: string;
}) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);

  const srx = useSpring(rx, { stiffness: 260, damping: 22 });
  const sry = useSpring(ry, { stiffness: 260, damping: 22 });

  const transform = useMotionTemplate`perspective(900px) rotateX(${srx}deg) rotateY(${sry}deg)`;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * -10);
    rx.set((py - 0.5) * 10);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      style={{ transform }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("will-change-transform", className)}
    >
      <GlassCard strong className="relative overflow-hidden p-6 gradient-border">
        <div className="pointer-events-none absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_20%_10%,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_55%),radial-gradient(circle_at_80%_80%,color-mix(in_oklab,var(--accent-2)_16%,transparent),transparent_55%)]" />

        <div className="relative space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                Project
              </div>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">{project.title}</h3>
            </div>
            {project.featured ? (
              <span className="rounded-full bg-[color-mix(in_oklab,var(--neon)_16%,transparent)] px-3 py-1 text-[11px] font-semibold text-[var(--fg)] ring-1 ring-[color-mix(in_oklab,var(--neon)_28%,transparent)]">
                Featured
              </span>
            ) : null}
          </div>

          <p className="text-sm leading-relaxed text-[var(--muted)]">{project.description}</p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_55%,transparent)] px-3 py-1 text-[11px] font-semibold text-[color-mix(in_oklab,var(--fg)_82%,transparent)]"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href={project.demo}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_55%,transparent)] px-4 py-2 text-sm font-semibold text-[var(--fg)] transition-colors hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
            >
              Live demo <ExternalLink className="h-4 w-4 text-[var(--neon)]" />
            </Link>
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_55%,transparent)] px-4 py-2 text-sm font-semibold text-[var(--fg)] transition-colors hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
            >
              GitHub <FolderGit2 className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 opacity-35 bg-gradient-to-t from-[color-mix(in_oklab,var(--accent)_22%,transparent)] to-transparent blur-2xl" />
      </GlassCard>
    </motion.div>
  );
}
