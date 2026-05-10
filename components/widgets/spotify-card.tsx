"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Music2 } from "lucide-react";

export function SpotifyNowPlaying() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.45 }}
      className="fixed bottom-6 left-6 z-[54] hidden w-[280px] 2xl:block"
    >
      <div className="glass-strong rounded-3xl border border-[var(--border)] p-4 shadow-[0_22px_90px_rgba(0,0,0,0.35)]">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color-mix(in_oklab,var(--accent-2)_18%,transparent)] ring-1 ring-[color-mix(in_oklab,var(--accent-2)_30%,transparent)]">
            <Music2 className="h-6 w-6 text-[var(--fg)]" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
              Now playing UI
            </div>
            <div className="truncate text-sm font-semibold text-[var(--fg)]">
              Connect Spotify API for live tracks
            </div>
            <div className="truncate text-xs text-[var(--muted)]">
              Perfect placeholder for “currently listening”
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
