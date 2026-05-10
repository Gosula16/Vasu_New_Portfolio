"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Music2 } from "lucide-react";

type SpotifyTrack = {
  title: string;
  artist: string;
  album: string;
  image: string | null;
  url: string | null;
};

type SpotifyResponse = {
  ok?: boolean;
  configured?: boolean;
  isPlaying?: boolean;
  track?: SpotifyTrack | null;
};

export function SpotifyNowPlaying() {
  const [data, setData] = React.useState<SpotifyResponse | null>(null);

  React.useEffect(() => {
    let alive = true;

    async function loadTrack() {
      try {
        const response = await fetch("/api/spotify-now-playing", { cache: "no-store" });
        const nextData = (await response.json()) as SpotifyResponse;
        if (alive) setData(nextData);
      } catch {
        if (alive) setData({ ok: false, configured: false, track: null });
      }
    }

    void loadTrack();
    const id = window.setInterval(loadTrack, 60000);

    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, []);

  const track = data?.track ?? null;
  const title = track?.title ?? "Spotify not connected";
  const subtitle = track ? track.artist : "Add refresh token to show live tracks";
  const detail = track?.album || (data?.configured ? "Nothing playing right now" : "Waiting for Spotify OAuth setup");

  const content = (
    <div className="flex items-center gap-3">
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[color-mix(in_oklab,var(--accent-2)_18%,transparent)] ring-1 ring-[color-mix(in_oklab,var(--accent-2)_30%,transparent)]">
        {track?.image ? (
          <Image src={track.image} alt="" fill sizes="48px" className="object-cover" />
        ) : (
          <Music2 className="h-6 w-6 text-[var(--fg)]" />
        )}
      </div>
      <div className="min-w-0">
        <div className="truncate text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
          {data?.isPlaying ? "Now playing" : "Spotify"}
        </div>
        <div className="truncate text-sm font-semibold text-[var(--fg)]">{title}</div>
        <div className="truncate text-xs text-[var(--muted)]">{subtitle}</div>
        <div className="truncate text-[11px] text-[var(--muted)]">{detail}</div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.45 }}
      className="fixed bottom-6 left-6 z-[54] hidden w-[300px] 2xl:block"
    >
      <div className="glass-strong rounded-3xl border border-[var(--border)] p-4 shadow-[0_22px_90px_rgba(0,0,0,0.35)]">
        {track?.url ? (
          <a href={track.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${track.title} on Spotify`}>
            {content}
          </a>
        ) : (
          content
        )}
      </div>
    </motion.div>
  );
}
