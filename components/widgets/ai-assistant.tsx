"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

export function AiAssistant() {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("");

  const replies = React.useMemo(
    () => [
      "Try the Projects page—each card tilts on hover.",
      "Press ⌘K / Ctrl+K to jump anywhere instantly.",
      "Want the premium glow? Move your cursor on desktop.",
      "Theme persistence lives in local storage via next-themes.",
    ],
    []
  );

  const [idx, setIdx] = React.useState(0);

  const send = () => {
    if (!text.trim()) return;
    setText("");
    setIdx((v) => (v + 1) % replies.length);
  };

  return (
    <>
      <motion.button
        type="button"
        aria-label="Open assistant"
        onClick={() => {
          setIdx(0);
          setOpen(true);
        }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="fixed bottom-6 right-6 z-[55] hidden h-14 w-14 items-center justify-center rounded-3xl border border-[var(--border)] bg-[var(--glass-strong)] text-[var(--fg)] shadow-[0_22px_90px_rgba(0,0,0,0.35)] backdrop-blur md:inline-flex"
      >
        <Sparkles className="h-6 w-6 text-[var(--neon)]" />
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/45 backdrop-blur-sm"
            role="presentation"
            onMouseDown={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 18, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 18, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-24 right-6 w-[min(92vw,420px)]"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <GlassCard strong className="relative overflow-hidden p-5 gradient-border">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[color-mix(in_oklab,var(--accent)_18%,transparent)] ring-1 ring-[color-mix(in_oklab,var(--accent)_28%,transparent)]">
                      <MessageCircle className="h-5 w-5 text-[var(--fg)]" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Assistant UI</div>
                      <div className="text-xs text-[var(--muted)]">
                        Demo widget · wire your model later
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label="Close assistant"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_55%,transparent)]"
                    onClick={() => setOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_55%,transparent)] p-4 text-sm leading-relaxed text-[color-mix(in_oklab,var(--fg)_82%,transparent)]">
                  {replies[idx]}
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Ask anything…"
                    className="h-11 flex-1 rounded-2xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_55%,transparent)] px-4 text-sm text-[var(--fg)] outline-none placeholder:text-[var(--muted)] focus:ring-2 focus:ring-[color-mix(in_oklab,var(--accent)_35%,transparent)]"
                  />
                  <button
                    type="button"
                    onClick={send}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)] via-[var(--accent-2)] to-[var(--neon)] text-white shadow-[0_18px_70px_var(--glow)]"
                    aria-label="Send"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
