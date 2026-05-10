import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { FolderGit2, Mail, MapPin, Phone, Share2 } from "lucide-react";
import { personal } from "@/lib/data";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/animations/reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch for collaborations and opportunities.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pb-28 pt-10 sm:px-6">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
            Contact
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Let’s talk builds, internships, and ideas
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[var(--muted)]">
            Drop a message—validation is instant, motion is smooth, and your theme preference stays saved locally.
          </p>

          <div className="mt-10 space-y-4 rounded-3xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_62%,transparent)] p-6 backdrop-blur-xl">
            <Row icon={<Mail className="h-5 w-5 text-[var(--neon)]" />} label="Email" value={personal.email} href={`mailto:${personal.email}`} />
            <Row icon={<Phone className="h-5 w-5 text-[var(--neon)]" />} label="Phone" value={personal.phone} href={`tel:${personal.phone.replace(/\s/g, "")}`} />
            <Row icon={<MapPin className="h-5 w-5 text-[var(--neon)]" />} label="Location" value={personal.location} />
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--glass)] px-4 py-2 text-xs font-semibold backdrop-blur hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
              >
                <FolderGit2 className="h-4 w-4" /> GitHub
              </Link>
              <Link
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--glass)] px-4 py-2 text-xs font-semibold backdrop-blur hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
              >
                <Share2 className="h-4 w-4" /> LinkedIn
              </Link>
            </div>
          </div>

          <div className="relative mt-10 overflow-hidden rounded-3xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_55%,transparent)] p-8">
            <div className="pointer-events-none absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_30%_30%,color-mix(in_oklab,var(--accent)_22%,transparent),transparent_60%),radial-gradient(circle_at_70%_70%,color-mix(in_oklab,var(--neon)_16%,transparent),transparent_55%)]" />
            <GlobePlaceholder />
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7">
          <div className="glass-strong rounded-3xl border border-[var(--border)] p-6 sm:p-8 gradient-border">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
              Message
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Send a note</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
              No spam folders here—just a clean form that respects reduced-motion preferences across the rest of the site.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}

function Row({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-start gap-3">
      <div className="mt-0.5">{icon}</div>
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-wide text-[var(--muted)]">{label}</div>
        <div className="mt-1 text-sm font-semibold">{href ? <Link href={href}>{value}</Link> : value}</div>
      </div>
    </div>
  );
  return inner;
}

function GlobePlaceholder() {
  return (
    <div className="relative mx-auto aspect-square w-[min(100%,320px)]">
      <div
        className="absolute inset-0 animate-spin rounded-full bg-[conic-gradient(from_180deg,var(--accent),var(--accent-2),var(--neon),var(--accent))] opacity-55 blur-3xl"
        style={{ animationDuration: "22s" }}
      />
      <div className="absolute inset-6 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35),transparent_55%)] opacity-70 mix-blend-overlay dark:opacity-40" />
      <div className="relative flex h-full w-full items-center justify-center rounded-full border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_35%,transparent)] shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="px-8 text-center text-sm font-semibold text-[var(--muted)]">
          Stylized globe placeholder—swap for Mapbox or a lightweight Three globe later.
        </div>
      </div>
    </div>
  );
}
