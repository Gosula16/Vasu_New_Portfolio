"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export function MagneticLink({
  href,
  className,
  children,
  strength = 0.22,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 320, damping: 26, mass: 0.7 });
  const sy = useSpring(y, { stiffness: 320, damping: 26, mass: 0.7 });

  React.useEffect(() => {
    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (prefersReduced) return;

    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      x.set(dx * strength);
      y.set(dy * strength);
    };
    const onLeave = () => {
      x.set(0);
      y.set(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength, x, y]);

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} className="inline-flex">
      <Link
        href={href}
        className={cn(
          "relative overflow-hidden rounded-2xl bg-gradient-to-br from-[color-mix(in_oklab,var(--accent)_70%,white)] via-[color-mix(in_oklab,var(--accent-2)_65%,white)] to-[color-mix(in_oklab,var(--neon)_55%,white)] p-[1px] shadow-[0_18px_70px_var(--glow)] transition-transform dark:from-[color-mix(in_oklab,var(--accent)_35%,black)] dark:via-[color-mix(in_oklab,var(--accent-2)_35%,black)] dark:to-[color-mix(in_oklab,var(--neon)_28%,black)]",
          className
        )}
      >
        <span className="inline-flex items-center justify-center gap-2 rounded-[15px] bg-[color-mix(in_oklab,var(--bg)_92%,transparent)] px-5 py-3 text-sm font-semibold text-[var(--fg)] backdrop-blur dark:bg-[color-mix(in_oklab,var(--bg)_70%,transparent)]">
          {children}
        </span>
      </Link>
    </motion.div>
  );
}
