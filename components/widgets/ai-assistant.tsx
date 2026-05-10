"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  text: string;
};

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    role: "assistant",
    text: "Hi, I can answer questions about Vasu's skills, projects, education, certifications, experience, resume, and contact details.",
  },
];

export function AiAssistant() {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("");
  const [messages, setMessages] = React.useState<ChatMessage[]>(initialMessages);
  const [loading, setLoading] = React.useState(false);

  const send = async () => {
    const question = text.trim();
    if (!question || loading) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      text: question,
    };
    setMessages((prev) => [...prev, userMessage]);
    setText("");
    setLoading(true);

    try {
      const response = await fetch("/api/portfolio-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question }),
      });
      const data = (await response.json()) as { ok?: boolean; answer?: string; error?: string };
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: data.ok && data.answer ? data.answer : data.error ?? "I could not answer that yet.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: "I could not reach the portfolio assistant right now. Please try again shortly.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.button
        type="button"
        aria-label="Open assistant"
        onClick={() => setOpen(true)}
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
              className="absolute bottom-24 right-6 w-[min(92vw,440px)]"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <GlassCard strong className="relative overflow-hidden p-5 gradient-border">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[color-mix(in_oklab,var(--accent)_18%,transparent)] ring-1 ring-[color-mix(in_oklab,var(--accent)_28%,transparent)]">
                      <MessageCircle className="h-5 w-5 text-[var(--fg)]" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Portfolio Assistant</div>
                      <div className="text-xs text-[var(--muted)]">
                        Ask about Vasu&apos;s profile
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

                <div className="mt-4 flex max-h-[360px] flex-col gap-3 overflow-y-auto rounded-2xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_55%,transparent)] p-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={
                        message.role === "user"
                          ? "ml-auto max-w-[85%] rounded-2xl bg-[var(--accent)] px-3 py-2 text-sm leading-relaxed text-white"
                          : "max-w-[90%] rounded-2xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_72%,transparent)] px-3 py-2 text-sm leading-relaxed text-[color-mix(in_oklab,var(--fg)_86%,transparent)]"
                      }
                    >
                      {message.text}
                    </div>
                  ))}
                  {loading ? (
                    <div className="max-w-[90%] rounded-2xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_72%,transparent)] px-3 py-2 text-sm text-[var(--muted)]">
                      Thinking...
                    </div>
                  ) : null}
                </div>

                <form
                  className="mt-4 flex items-center gap-2"
                  onSubmit={(event) => {
                    event.preventDefault();
                    void send();
                  }}
                >
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Ask about Vasu..."
                    className="h-11 min-w-0 flex-1 rounded-2xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_55%,transparent)] px-4 text-sm text-[var(--fg)] outline-none placeholder:text-[var(--muted)] focus:ring-2 focus:ring-[color-mix(in_oklab,var(--accent)_35%,transparent)]"
                  />
                  <button
                    type="submit"
                    disabled={loading || !text.trim()}
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)] via-[var(--accent-2)] to-[var(--neon)] text-white shadow-[0_18px_70px_var(--glow)] disabled:cursor-not-allowed disabled:opacity-55"
                    aria-label="Send"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </form>
              </GlassCard>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
