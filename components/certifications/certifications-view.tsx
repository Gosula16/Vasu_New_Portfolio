"use client";

import Image from "next/image";
import Link from "next/link";
import { achievements } from "@/lib/data";
import { certificateImages } from "@/lib/certificates";
import { Reveal } from "@/components/animations/reveal";

export function CertificationsView() {
  return (
    <>
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
          Certifications
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Proof of disciplined learning
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
          A gallery of certificate images from completed programs, workshops, and learning milestones.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {certificateImages.map((certificate, index) => (
          <Reveal key={certificate.src}>
            <Link
              href={certificate.src}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-2xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_62%,transparent)] shadow-[0_18px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 dark:shadow-[0_24px_90px_rgba(0,0,0,0.45)]"
            >
              <div className="relative aspect-[4/3] bg-white">
                <Image
                  src={certificate.src}
                  alt={certificate.title}
                  fill
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                  priority={index < 3}
                />
              </div>
              <div className="border-t border-[var(--border)] px-4 py-3">
                <div className="text-sm font-semibold text-[var(--fg)]">{certificate.title}</div>
                <div className="mt-1 text-xs text-[var(--muted)]">{certificate.issuer}</div>
                <div className="mt-1 text-[11px] text-[var(--muted)]">{certificate.date}</div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12">
        <div className="rounded-3xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_55%,transparent)] p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
            Achievements
          </div>
          <ul className="mt-4 space-y-3 text-sm text-[color-mix(in_oklab,var(--fg)_84%,transparent)]">
            {achievements.map((achievement) => (
              <li key={achievement} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--neon)]" />
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </>
  );
}
