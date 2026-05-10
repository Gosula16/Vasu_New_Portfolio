import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-4 pb-28 pt-24 text-center sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">This route drifted offline</h1>
      <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-[var(--muted)]">
        Even premium portfolios hit dead ends sometimes—let’s route you back to something intentional.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex rounded-2xl bg-gradient-to-r from-[var(--accent)] via-[var(--accent-2)] to-[var(--neon)] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_70px_var(--glow)]"
        >
          Go home
        </Link>
        <Link
          href="/contact"
          className="inline-flex rounded-2xl border border-[var(--border)] bg-[var(--glass)] px-6 py-3 text-sm font-semibold backdrop-blur hover:bg-[color-mix(in_oklab,var(--fg)_6%,transparent)]"
        >
          Contact
        </Link>
      </div>
    </main>
  );
}
