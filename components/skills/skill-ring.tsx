"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export function SkillRing({
  label,
  value,
  size = 112,
  stroke = 8,
}: {
  label: string;
  value: number;
  size?: number;
  stroke?: number;
}) {
  const gid = React.useId().replace(/:/g, "");
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="color-mix(in oklab, var(--muted) 22%, transparent)"
            strokeWidth={stroke}
            fill="none"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={`url(#ringGrad-${gid})`}
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            initial={{ strokeDashoffset: c }}
            animate={inView ? { strokeDashoffset: c * (1 - value / 100) } : {}}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
            strokeDasharray={c}
          />
          <defs>
            <linearGradient id={`ringGrad-${gid}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--accent)" />
              <stop offset="55%" stopColor="var(--accent-2)" />
              <stop offset="100%" stopColor="var(--neon)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-mono text-sm font-semibold text-[var(--fg)]">
          {value}%
        </div>
      </div>
      <div className="max-w-[9rem] text-center text-xs font-semibold text-[color-mix(in_oklab,var(--fg)_82%,transparent)]">
        {label}
      </div>
    </div>
  );
}

export function SkillCategory({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("glass rounded-3xl border border-[var(--border)] p-6", className)}>
      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
        {title}
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-8 sm:justify-start">{children}</div>
    </div>
  );
}
