import type { Metadata } from "next";
import { ProjectsExplorer } from "@/components/projects/projects-explorer";
import { Reveal } from "@/components/animations/reveal";

export const metadata: Metadata = {
  title: "Projects",
  description: "Featured student projects with demos and repositories.",
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pb-28 pt-10 sm:px-6">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
          Projects
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Builds that balance clarity and ambition
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
          Filter by tag, open a cinematic modal, and jump to demos or source—optimized for recruiters who skim fast.
        </p>
      </Reveal>

      <div className="mt-12">
        <ProjectsExplorer />
      </div>
    </main>
  );
}
