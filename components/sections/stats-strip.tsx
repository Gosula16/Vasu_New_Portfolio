"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { stats } from "@/lib/data";
import { GlassCard } from "@/components/ui/glass-card";

function AnimatedNumber({ value }: { value: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="text-3xl font-semibold tracking-tight sm:text-4xl"
    >
      {value}
    </motion.div>
  );
}

export function StatsStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6">
      <GlassCard className="grid grid-cols-2 gap-6 p-6 sm:grid-cols-4 sm:p-8">
        {stats.map((s) => (
          <div key={s.label} className="space-y-2">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
              {s.label}
            </div>
            <AnimatedNumber value={s.value} />
          </div>
        ))}
      </GlassCard>
    </section>
  );
}
