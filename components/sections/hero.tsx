"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Download,
  FolderGit2,
  Share2,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import { personal, roles } from "@/lib/data";
import { MagneticLink } from "@/components/ui/magnetic-link";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

const ParticleField = dynamic(
  () =>
    import("@/components/r3f/particle-field").then((m) => m.ParticleField),
  { ssr: false }
);

function useTyping(text: string, speed = 34) {
  const [out, setOut] = React.useState("");
  React.useEffect(() => {
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed]);
  return out;
}

export function Hero() {
  const [roleIdx, setRoleIdx] = React.useState(0);
  const typed = useTyping(personal.tagline, 26);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setRoleIdx((v) => (v + 1) % roles.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden pt-24">
      <div className="bg-mesh absolute inset-0 -z-20" />
      <ParticleField />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-12 lg:pt-14">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--glass)] px-4 py-2 text-xs font-medium text-[var(--muted)] backdrop-blur"
          >
            <Sparkles className="h-4 w-4 text-[var(--neon)]" />
            <span className="text-[var(--fg)]">{personal.title}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
          >
            <span className="bg-gradient-to-br from-[var(--fg)] via-[var(--fg)] to-[color-mix(in_oklab,var(--muted)_70%,var(--fg))] bg-clip-text text-transparent dark:to-[color-mix(in_oklab,var(--neon)_35%,var(--fg))]">
              {personal.name}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]"
          >
            <span className="rounded-full bg-[color-mix(in_oklab,var(--accent)_12%,transparent)] px-3 py-1 text-xs font-semibold text-[var(--fg)] ring-1 ring-[color-mix(in_oklab,var(--accent)_25%,transparent)]">
              Now exploring:
            </span>
            <motion.span
              key={roles[roleIdx]}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="font-semibold text-[var(--fg)]"
            >
              {roles[roleIdx]}
            </motion.span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[var(--muted)] sm:text-lg"
          >
            <span className="text-[var(--fg)]">{typed}</span>
            <span className="ml-1 inline-block h-5 w-[2px] translate-y-1 bg-[var(--neon)] animate-pulse" />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <MagneticLink href="/contact">Let&apos;s collaborate</MagneticLink>
            <a
              href={personal.resumePath}
              download
              className={cn(
                "inline-flex h-[52px] items-center justify-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--glass)] px-5 text-sm font-semibold text-[var(--fg)] backdrop-blur transition-colors hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
              )}
            >
              <Download className="h-4 w-4" />
              Résumé DOCX
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <SocialIcon href={personal.github} label="GitHub">
              <FolderGit2 className="h-5 w-5" />
            </SocialIcon>
            <SocialIcon href={personal.linkedin} label="LinkedIn">
              <Share2 className="h-5 w-5" />
            </SocialIcon>
            <SocialIcon href={`mailto:${personal.email}`} label="Email">
              <Mail className="h-5 w-5" />
            </SocialIcon>
            <span className="ml-2 inline-flex items-center gap-2 text-xs text-[var(--muted)]">
              <MapPin className="h-4 w-4 text-[var(--neon)]" />
              {personal.location}
            </span>
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlassCard strong className="relative overflow-hidden p-6 sm:p-8 gradient-border">
              <div className="pointer-events-none absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklab,var(--accent)_22%,transparent),transparent_55%),radial-gradient(circle_at_70%_60%,color-mix(in_oklab,var(--accent-2)_18%,transparent),transparent_55%)]" />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                      Portfolio snapshot
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                      {personal.intro.slice(0, 210)}
                      …
                    </p>
                  </div>
                  <div className="hidden h-14 w-14 shrink-0 rounded-2xl bg-[color-mix(in_oklab,var(--neon)_18%,transparent)] ring-1 ring-[color-mix(in_oklab,var(--neon)_35%,transparent)] sm:flex items-center justify-center font-mono text-xs font-bold text-[var(--fg)]">
                        GV
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <MiniStat label="Email" value={personal.email} />
                  <MiniStat label="Phone" value={personal.phone} />
                </div>

                <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_55%,transparent)] p-4 font-mono text-xs leading-relaxed text-[color-mix(in_oklab,var(--fg)_78%,transparent)]">
                  <div className="flex items-center gap-2 text-[var(--muted)]">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.65)]" />
                    dev_env · ready
                  </div>
                  <div className="mt-3 space-y-2">
                    <div>
                      <span className="text-[var(--neon)]">$</span> focus AI/ML · full-stack craft
                    </div>
                    <div className="text-[var(--muted)]">
                      {"// ship clarity, motion, and measurable UX wins"}
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mx-auto flex max-w-7xl justify-center px-4 pb-10 sm:px-6"
      >
        <div className="flex flex-col items-center gap-2 text-xs text-[var(--muted)]">
          <span className="uppercase tracking-[0.28em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <ArrowDown className="h-5 w-5 text-[var(--neon)]" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 420, damping: 26 }}
      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--glass)] text-[var(--fg)] backdrop-blur shadow-[0_14px_60px_rgba(0,0,0,0.12)] hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)] dark:shadow-[0_18px_70px_rgba(0,0,0,0.35)]"
    >
      {children}
    </motion.a>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_45%,transparent)] p-3">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-[var(--muted)]">
        {label}
      </div>
      <div className="mt-1 break-all text-xs font-semibold text-[var(--fg)]">{value}</div>
    </div>
  );
}
