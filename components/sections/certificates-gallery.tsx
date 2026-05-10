"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { certificateImages } from "@/lib/certificates";
import { Reveal } from "@/components/animations/reveal";

export function CertificatesGallery() {
  const featured = certificateImages.slice(0, 6);

  return (
    <Reveal className="mx-auto w-full max-w-7xl overflow-hidden px-4 sm:px-6">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
            Certifications
          </div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">Certificate gallery</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
            Verified learning milestones and program completions shown as real certificate images.
          </p>
        </div>
        <Link
          href="/certifications"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--glass)] px-4 py-2 text-sm font-semibold text-[var(--fg)] backdrop-blur hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
        >
          View all <ArrowRight className="h-4 w-4 text-[var(--neon)]" />
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((certificate, index) => (
          <Link
            key={certificate.src}
            href={certificate.src}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_62%,transparent)] shadow-[0_18px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 dark:shadow-[0_24px_90px_rgba(0,0,0,0.45)]"
          >
            <div className="relative aspect-[4/3] bg-white">
              <Image
                src={certificate.src}
                alt={certificate.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-contain transition-transform duration-500 group-hover:scale-105"
                priority={index < 2}
              />
            </div>
            <div className="border-t border-[var(--border)] px-4 py-3 text-sm font-semibold">
              {certificate.title}
            </div>
          </Link>
        ))}
      </div>
    </Reveal>
  );
}
