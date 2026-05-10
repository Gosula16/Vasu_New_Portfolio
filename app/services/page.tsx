import type { Metadata } from "next";
import { Layers, Layout, Palette, Sparkles, Workflow } from "lucide-react";
import { services } from "@/lib/data";
import { Reveal } from "@/components/animations/reveal";

export const metadata: Metadata = {
  title: "Services",
  description: "Web development, AI integration, automation, and UI craft.",
};

const iconMap = {
  layout: Layout,
  sparkles: Sparkles,
  layers: Layers,
  workflow: Workflow,
  palette: Palette,
} as const;

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pb-28 pt-10 sm:px-6">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
          Services
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Premium delivery, pragmatic scope
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
          Glass surfaces and neon restraint—services framed like a modern SaaS landing page: confident, clear, and recruiter-friendly.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
        {services.map((s, idx) => {
          const Icon = iconMap[s.icon as keyof typeof iconMap] ?? Sparkles;
          return (
            <Reveal key={s.id}>
              <div className="group relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_62%,transparent)] p-8 shadow-[0_18px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 dark:shadow-[0_24px_90px_rgba(0,0,0,0.45)]">
                <div className="pointer-events-none absolute inset-0 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklab,var(--accent)_22%,transparent),transparent_55%)]" />
                <div className="relative flex gap-5">
                  <div className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[color-mix(in_oklab,var(--accent)_14%,transparent)] ring-1 ring-[color-mix(in_oklab,var(--accent)_28%,transparent)]">
                    <Icon className="h-7 w-7 text-[var(--fg)]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-semibold tracking-tight">{s.title}</h2>
                      <span className="rounded-full bg-[color-mix(in_oklab,var(--neon)_12%,transparent)] px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--muted)] ring-1 ring-[color-mix(in_oklab,var(--neon)_26%,transparent)]">
                        0{idx + 1}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{s.description}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </main>
  );
}
