"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/lib/data";
import { TiltProjectCard } from "@/components/projects/tilt-card";
import { Reveal } from "@/components/animations/reveal";

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <Reveal className="mx-auto w-full max-w-7xl overflow-hidden px-4 sm:px-6">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
            Projects
          </div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">Selected builds</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
            Premium cards with tilt physics, gradient borders, and quick links—designed to feel alive without sacrificing clarity.
          </p>
        </div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 self-start rounded-full border border-[var(--border)] bg-[var(--glass)] px-4 py-2 text-sm font-semibold text-[var(--fg)] backdrop-blur hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)] sm:self-auto"
        >
          View all <ArrowRight className="h-4 w-4 text-[var(--neon)]" />
        </Link>
      </div>

      <div className="mt-8 flex max-w-full gap-6 overflow-x-auto overscroll-x-contain pb-4 pt-2 [scrollbar-width:thin]">
        {featured.map((p) => (
          <div key={p.id} className="w-[min(88vw,420px)] shrink-0">
            <TiltProjectCard project={p} />
          </div>
        ))}
      </div>
    </Reveal>
  );
}
