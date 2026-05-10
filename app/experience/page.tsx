import type { Metadata } from "next";
import { experience, personal } from "@/lib/data";
import { Reveal } from "@/components/animations/reveal";

export const metadata: Metadata = {
  title: "Experience",
  description: "Workshops, internships, and hackathons.",
};

export default function ExperiencePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pb-28 pt-10 sm:px-6">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
          Experience
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Momentum from real-world programs
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
          A vertical timeline with crisp hierarchy—highlighting workshops, internships, and competitive builds.
        </p>
      </Reveal>

      <div className="relative mx-auto mt-16 max-w-3xl">
        <div className="absolute left-[14px] top-2 bottom-2 w-px bg-[color-mix(in_oklab,var(--accent)_35%,transparent)] md:left-1/2 md:-translate-x-1/2" />

        <div className="space-y-12">
          {experience.map((x, idx) => (
            <Reveal key={x.id}>
              <div
                className={
                  idx % 2 === 0
                    ? "relative grid grid-cols-1 gap-6 md:grid-cols-2 md:items-start"
                    : "relative grid grid-cols-1 gap-6 md:grid-cols-2 md:items-start"
                }
              >
                <div className="md:col-span-1 md:text-right md:pr-10">
                  <div className="inline-flex items-center gap-3 md:flex-row-reverse">
                    <span className="hidden h-3 w-3 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--neon)] shadow-[0_0_22px_var(--glow)] md:block" />
                    <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                      {x.period}
                    </div>
                  </div>
                  <div className="mt-3 text-xl font-semibold tracking-tight">{x.title}</div>
                  <div className="mt-1 text-sm text-[var(--muted)]">{x.org}</div>
                </div>

                <div className="md:col-span-1 md:pl-10">
                  <div className="glass rounded-3xl border border-[var(--border)] p-6">
                    <p className="text-sm leading-relaxed text-[color-mix(in_oklab,var(--fg)_84%,transparent)]">
                      {x.description}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[color-mix(in_oklab,var(--accent)_12%,transparent)] px-3 py-1 text-[11px] font-semibold ring-1 ring-[color-mix(in_oklab,var(--accent)_26%,transparent)]">
                      {personal.name.split(" ")[0]} · highlights
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
