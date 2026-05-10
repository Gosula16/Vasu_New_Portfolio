"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );
  const isDark = mounted && (resolvedTheme ?? theme) === "dark";

  return (
    <button
      type="button"
      className={cn(
        "relative inline-flex h-10 w-[76px] items-center rounded-full border border-[var(--border)] bg-[var(--glass)] p-1 backdrop-blur transition-colors hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]",
        className
      )}
      aria-label="Toggle color theme"
      onClick={() => {
        if (!mounted) return;
        setTheme(isDark ? "light" : "dark");
      }}
      disabled={!mounted}
      suppressHydrationWarning
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 38 }}
        className="absolute left-1 top-1 h-8 w-8 rounded-full bg-gradient-to-br from-[var(--accent)] via-[var(--accent-2)] to-[var(--neon)] shadow-[0_10px_40px_var(--glow)]"
        style={{ x: isDark ? 36 : 0 }}
      />
      <span className="relative z-10 flex w-full items-center justify-between px-2 text-[var(--fg)]">
        <Sun className="h-4 w-4 opacity-90" />
        <Moon className="h-4 w-4 opacity-90" />
      </span>
    </button>
  );
}
