"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "vasu-portfolio-loaded";

export function LoadingScreen() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }

    const frame = window.requestAnimationFrame(() => setShow(true));
    const t = window.setTimeout(() => {
      setShow(false);
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
    }, 900);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[color-mix(in_oklab,var(--bg)_92%,transparent)] backdrop-blur-xl"
          aria-busy="true"
          aria-label="Loading portfolio"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.05, ease: "linear" }}
              className="h-14 w-14 rounded-full bg-gradient-to-br from-[var(--accent)] via-[var(--accent-2)] to-[var(--neon)] p-[2px]"
            >
              <div className="h-full w-full rounded-full bg-[var(--bg)]" />
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold text-[var(--fg)]">
              GV
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
