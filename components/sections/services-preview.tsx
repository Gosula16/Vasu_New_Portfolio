"use client";

import Link from "next/link";
import * as React from "react";
import { Layers, Layout, Palette, Sparkles, Workflow } from "lucide-react";
import { services } from "@/lib/data";
import { Reveal } from "@/components/animations/reveal";

const iconMap = {
  layout: Layout,
  sparkles: Sparkles,
  layers: Layers,
  workflow: Workflow,
  palette: Palette,
} as const;

export function ServicesPreview() {
  const subset = services.slice(0, 3);

  return (
    <Reveal className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
            Services
          </div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">What I can help ship</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
            Glass surfaces, gradient borders, and crisp hierarchy—ideal for landing pages, dashboards, and AI-assisted workflows.
          </p>
        </div>
        <Link
          href="/services"
          className="inline-flex w-fit rounded-full border border-[var(--border)] bg-[var(--glass)] px-4 py-2 text-sm font-semibold text-[var(--fg)] backdrop-blur hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
        >
          Explore services
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {subset.map((s) => {
          const Icon = iconMap[s.icon as keyof typeof iconMap] ?? Sparkles;
          return (
            <div
              key={s.id}
              className="group relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_62%,transparent)] p-6 shadow-[0_18px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 dark:shadow-[0_24px_90px_rgba(0,0,0,0.45)]"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklab,var(--accent)_22%,transparent),transparent_55%)]" />
              <div className="relative">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[color-mix(in_oklab,var(--accent)_14%,transparent)] ring-1 ring-[color-mix(in_oklab,var(--accent)_28%,transparent)]">
                  <Icon className="h-6 w-6 text-[var(--fg)]" />
                </div>
                <div className="mt-4 text-lg font-semibold">{s.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{s.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}
