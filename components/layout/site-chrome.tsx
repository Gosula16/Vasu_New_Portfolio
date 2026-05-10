"use client";

import * as React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CursorGlow } from "@/components/effects/cursor-glow";
import { ScrollProgress } from "@/components/effects/scroll-progress";
import { CommandPalette } from "@/components/widgets/command-palette";
import { AiAssistant } from "@/components/widgets/ai-assistant";
import { SpotifyNowPlaying } from "@/components/widgets/spotify-card";
import { EasterEgg } from "@/components/widgets/easter-egg";
import { LoadingScreen } from "@/components/widgets/loading-screen";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <CursorGlow />
      <EasterEgg />
      <div className="noise relative min-h-screen">
        <Navbar />
        <div className="pt-16">{children}</div>
        <Footer />
        <CommandPalette />
        <AiAssistant />
        <SpotifyNowPlaying />
      </div>
    </>
  );
}
