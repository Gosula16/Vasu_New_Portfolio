"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { personal } from "@/lib/data";
import { MagneticLink } from "@/components/ui/magnetic-link";
import { Reveal } from "@/components/animations/reveal";

export function ContactCta() {
  return (
    <Reveal className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_62%,transparent)] p-8 shadow-[0_28px_110px_rgba(0,0,0,0.35)] backdrop-blur-xl dark:bg-[color-mix(in_oklab,var(--bg)_55%,transparent)]">
        <div className="pointer-events-none absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_15%_30%,color-mix(in_oklab,var(--accent)_22%,transparent),transparent_55%),radial-gradient(circle_at_85%_40%,color-mix(in_oklab,var(--accent-2)_18%,transparent),transparent_55%)]" />

        <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
              Contact
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Let’s build something meaningful</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
              Premium motion, accessible semantics, and fast loads—tell me what you’re aiming for and we’ll map the fastest route.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <MagneticLink href="/contact">Open contact form</MagneticLink>
            <motion.a
              href={`mailto:${personal.email}`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--glass)] px-5 py-3 text-sm font-semibold text-[var(--fg)] backdrop-blur"
            >
              <Mail className="h-4 w-4 text-[var(--neon)]" />
              Email me
            </motion.a>
            <Link
              href={`tel:${personal.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-[color-mix(in_oklab,var(--fg)_78%,transparent)] hover:text-[var(--fg)]"
            >
              Call <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
