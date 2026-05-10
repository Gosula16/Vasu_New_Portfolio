"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUp, FolderGit2, Mail, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { navItems } from "@/lib/nav";
import { personal } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Footer() {
  const year = new Date().getFullYear();

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_88%,transparent)] backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="text-lg font-semibold tracking-tight">{personal.name}</div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--muted)]">
              {personal.tagline}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <IconLink href={personal.github} label="GitHub">
                <FolderGit2 className="h-5 w-5" />
              </IconLink>
              <IconLink href={personal.linkedin} label="LinkedIn">
                <Share2 className="h-5 w-5" />
              </IconLink>
              <IconLink href={`mailto:${personal.email}`} label="Email">
                <Mail className="h-5 w-5" />
              </IconLink>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                Navigate
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {navItems.slice(0, 5).map((item) => (
                  <li key={item.href}>
                    <Link
                      className="text-[color-mix(in_oklab,var(--fg)_78%,transparent)] hover:text-[var(--fg)]"
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                More
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {navItems.slice(5).map((item) => (
                  <li key={item.href}>
                    <Link
                      className="text-[color-mix(in_oklab,var(--fg)_78%,transparent)] hover:text-[var(--fg)]"
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="sm:col-span-1 col-span-2 sm:col-span-1">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                Contact
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="break-all text-[color-mix(in_oklab,var(--fg)_78%,transparent)]">
                  {personal.email}
                </li>
                <li className="text-[color-mix(in_oklab,var(--fg)_78%,transparent)]">
                  {personal.phone}
                </li>
                <li className="text-[color-mix(in_oklab,var(--fg)_78%,transparent)]">
                  {personal.location}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[var(--border)] pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-[var(--muted)]">
            © {year} {personal.name}. Crafted with Next.js · Tailwind · Motion.
          </p>
          <motion.button
            type="button"
            onClick={scrollTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--glass)] px-4 py-2 text-xs font-semibold text-[var(--fg)] backdrop-blur",
              "hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
            )}
          >
            Back to top
            <ArrowUp className="h-4 w-4 text-[var(--neon)]" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

function IconLink({
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
      whileHover={{ y: -2 }}
      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--glass)] text-[var(--fg)] backdrop-blur"
    >
      {children}
    </motion.a>
  );
}
