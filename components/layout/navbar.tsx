"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems } from "@/lib/nav";
import { personal } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_78%,transparent)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="group relative flex items-center gap-2 font-semibold tracking-tight"
        >
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[color-mix(in_oklab,var(--accent)_22%,transparent)] ring-1 ring-[var(--border)]">
            <span className="text-sm font-bold">GV</span>
            <span className="absolute inset-0 rounded-xl opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_30%,color-mix(in_oklab,var(--neon)_55%,transparent),transparent_60%)]" />
          </span>
          <span className="hidden sm:inline">{personal.name.split(" ").slice(-2).join(" ")}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-3 py-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--fg)]",
                  active && "text-[var(--fg)]"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-[color-mix(in_oklab,var(--accent)_16%,transparent)] ring-1 ring-[color-mix(in_oklab,var(--accent)_35%,transparent)]"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--glass)] backdrop-blur lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_88%,transparent)] backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-xl px-3 py-3 text-sm",
                      active
                        ? "bg-[color-mix(in_oklab,var(--accent)_14%,transparent)] text-[var(--fg)] ring-1 ring-[color-mix(in_oklab,var(--accent)_28%,transparent)]"
                        : "text-[var(--muted)] hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)] hover:text-[var(--fg)]"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
