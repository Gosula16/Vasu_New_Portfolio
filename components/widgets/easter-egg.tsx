"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

const SEQ = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function EasterEgg() {
  const posRef = React.useRef(0);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const expected = SEQ[posRef.current];
      const key =
        e.key.startsWith("Arrow") ? e.key : e.key.length === 1 ? e.key.toLowerCase() : e.key;

      const match =
        expected.startsWith("Arrow") ? key === expected : key === expected;

      if (!match) {
        posRef.current = 0;
        return;
      }

      posRef.current += 1;
      if (posRef.current >= SEQ.length) {
        posRef.current = 0;
        setShow(true);
        window.setTimeout(() => setShow(false), 2200);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/55 backdrop-blur-md"
          role="dialog"
          aria-label="Easter egg"
        >
          <div className="glass-strong max-w-md rounded-3xl border border-[var(--border)] p-8 text-center shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
              Secret unlocked
            </div>
            <div className="mt-3 text-2xl font-semibold tracking-tight">
              You found the premium path.
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
              If you’re reading this, you probably enjoy delightful UX—exactly the kind of craft I want to keep shipping.
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
