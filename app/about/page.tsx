import type { Metadata } from "next";
import Link from "next/link";
import {
  achievements,
  education,
  personal,
  skillCategories,
} from "@/lib/data";
import { Reveal } from "@/components/animations/reveal";
import { SkillCategory, SkillRing } from "@/components/skills/skill-ring";
import { GlassCard } from "@/components/ui/glass-card";

export const metadata: Metadata = {
  title: "About",
  description: personal.summary,
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pb-28 pt-10 sm:px-6">
      <Reveal>
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
            About
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Precision craft, student hustle
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[var(--muted)]">{personal.summary}</p>
        </div>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <GlassCard strong className="p-8 gradient-border">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
              Introduction
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[color-mix(in_oklab,var(--fg)_84%,transparent)]">
              {personal.intro}
            </p>

            <div className="mt-8">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                Career goals
              </div>
              <ul className="mt-4 space-y-3 text-sm text-[color-mix(in_oklab,var(--fg)_84%,transparent)]">
                {personal.careerGoals.map((g) => (
                  <li key={g} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--neon)] shadow-[0_0_18px_var(--glow)]" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                Strengths
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {personal.strengths.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_55%,transparent)] px-3 py-1 text-xs font-semibold"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>
        </Reveal>

        <Reveal className="lg:col-span-5">
          <div className="glass-strong rounded-3xl border border-[var(--border)] p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
              Education timeline
            </div>
            <div className="mt-6 space-y-6">
              <div className="relative pl-6">
                <span className="absolute left-0 top-2 h-full w-px bg-[color-mix(in_oklab,var(--accent)_35%,transparent)]" />
                <span className="absolute left-[-4px] top-2 h-3 w-3 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--neon)] shadow-[0_0_22px_var(--glow)]" />
                <div className="text-sm font-semibold">{education.university}</div>
                <div className="mt-1 text-xs text-[var(--muted)]">{education.degree}</div>
                <div className="mt-3 flex flex-wrap gap-3 text-xs font-semibold">
                  <span className="rounded-full bg-[color-mix(in_oklab,var(--accent)_14%,transparent)] px-3 py-1 ring-1 ring-[color-mix(in_oklab,var(--accent)_28%,transparent)]">
                    CGPA {education.cgpa}
                  </span>
                  <span className="rounded-full bg-[color-mix(in_oklab,var(--accent-2)_12%,transparent)] px-3 py-1 ring-1 ring-[color-mix(in_oklab,var(--accent-2)_26%,transparent)]">
                    Graduating {education.graduationYear}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                Achievements
              </div>
              <ul className="mt-4 space-y-3 text-sm text-[color-mix(in_oklab,var(--fg)_84%,transparent)]">
                {achievements.map((a) => (
                  <li key={a} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-2)]" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/projects"
              className="mt-8 inline-flex rounded-full border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_55%,transparent)] px-4 py-2 text-sm font-semibold hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
            >
              View projects
            </Link>
          </div>
        </Reveal>
      </div>

      <div className="mt-14 space-y-8">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight">Skills snapshot</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
            Circular progress rings animate on scroll—perfect for fast recruiter scanning without noisy charts.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {skillCategories.map((cat) => (
            <Reveal key={cat.id}>
              <SkillCategory title={cat.label}>
                {cat.skills.map((s) => (
                  <SkillRing key={s.name} label={s.name} value={s.level} />
                ))}
              </SkillCategory>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
