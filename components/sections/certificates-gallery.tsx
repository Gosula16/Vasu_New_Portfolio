"use client";

import Link from "next/link";
import { ArrowRight, Award, BadgeCheck } from "lucide-react";
import { certificateImages } from "@/lib/certificates";
import { Reveal } from "@/components/animations/reveal";

const featuredTitles = certificateImages.slice(0, 6);

export function CertificatesGallery() {
  return (
    <Reveal className="mx-auto w-full max-w-7xl overflow-hidden px-4 sm:px-6">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
            Certifications
          </div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">Credentials snapshot</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
            A concise view of verified learning across ServiceNow, Oracle, cloud architecture, AI analytics, and software engineering.
          </p>
        </div>
        <Link
          href="/certifications"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--glass)] px-4 py-2 text-sm font-semibold text-[var(--fg)] backdrop-blur hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
        >
          View certificates <ArrowRight className="h-4 w-4 text-[var(--neon)]" />
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {featuredTitles.map((certificate) => (
          <Link
            key={certificate.src}
            href="/certifications"
            className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_62%,transparent)] p-5 shadow-[0_18px_70px_rgba(0,0,0,0.16)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 dark:shadow-[0_24px_90px_rgba(0,0,0,0.42)]"
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_20%_20%,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_55%)]" />
            <div className="relative flex items-start gap-4">
              <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[color-mix(in_oklab,var(--accent)_14%,transparent)] ring-1 ring-[color-mix(in_oklab,var(--accent)_28%,transparent)]">
                <Award className="h-5 w-5 text-[var(--neon)]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  <BadgeCheck className="h-3.5 w-3.5 text-[var(--neon)]" />
                  {certificate.issuer}
                </div>
                <h3 className="mt-2 text-base font-semibold leading-snug text-[var(--fg)]">
                  {certificate.title}
                </h3>
                <p className="mt-3 text-xs text-[var(--muted)]">{certificate.date}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Reveal>
  );
}
