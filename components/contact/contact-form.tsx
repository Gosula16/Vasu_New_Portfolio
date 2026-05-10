"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check, Loader2, Send } from "lucide-react";
import { personal } from "@/lib/data";

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [pending, setPending] = React.useState(false);
  const [ok, setOk] = React.useState(false);
  const [apiError, setApiError] = React.useState<string | null>(null);

  const validate = () => {
    const next: FieldErrors = {};
    if (name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Enter a valid email.";
    if (message.trim().length < 12) next.message = "Message should be at least 12 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOk(false);
    setApiError(null);
    if (!validate()) return;
    setPending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
      });
      if (!res.ok) throw new Error("bad");
      setOk(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setApiError("Could not send right now—try email instead.");
    } finally {
      setPending(false);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
    } catch {
      /* ignore */
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div>
        <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
          Name
        </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_55%,transparent)] px-4 py-3 text-sm text-[var(--fg)] outline-none transition-shadow focus:ring-2 focus:ring-[color-mix(in_oklab,var(--accent)_35%,transparent)]"
          autoComplete="name"
        />
        {errors.name ? <p className="mt-2 text-xs text-red-400">{errors.name}</p> : null}
      </div>

      <div>
        <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_55%,transparent)] px-4 py-3 text-sm text-[var(--fg)] outline-none transition-shadow focus:ring-2 focus:ring-[color-mix(in_oklab,var(--accent)_35%,transparent)]"
          autoComplete="email"
        />
        {errors.email ? <p className="mt-2 text-xs text-red-400">{errors.email}</p> : null}
      </div>

      <div>
        <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="mt-2 w-full resize-none rounded-2xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_55%,transparent)] px-4 py-3 text-sm text-[var(--fg)] outline-none transition-shadow focus:ring-2 focus:ring-[color-mix(in_oklab,var(--accent)_35%,transparent)]"
        />
        {errors.message ? <p className="mt-2 text-xs text-red-400">{errors.message}</p> : null}
      </div>

      {apiError ? <p className="text-sm text-red-400">{apiError}</p> : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <motion.button
          type="submit"
          disabled={pending}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.99 }}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[var(--accent)] via-[var(--accent-2)] to-[var(--neon)] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_70px_var(--glow)] disabled:opacity-60"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          Send message
        </motion.button>

        <button
          type="button"
          onClick={copyEmail}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--glass)] px-5 py-3 text-sm font-semibold text-[var(--fg)] backdrop-blur hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
        >
          Copy email
        </button>
      </div>

      {ok ? (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200"
        >
          <Check className="h-4 w-4" />
          Sent—I&apos;ll get back to you soon.
        </motion.div>
      ) : null}
    </form>
  );
}
