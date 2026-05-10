import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/lib/data";
import { Reveal } from "@/components/animations/reveal";

export const metadata: Metadata = {
  title: "Blog",
  description: "Essays and notes on shipping polished developer portfolios.",
};

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pb-28 pt-10 sm:px-6">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
          Blog
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Writing that respects your attention
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
          UI-ready article cards—hook up MDX routes when you want real posts. Until then, enjoy the layout system.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Reveal key={post.slug}>
            <article className="group relative h-full overflow-hidden rounded-3xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg)_62%,transparent)] p-6 shadow-[0_18px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 dark:shadow-[0_24px_90px_rgba(0,0,0,0.45)]">
              <div className="pointer-events-none absolute inset-0 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklab,var(--accent)_22%,transparent),transparent_55%)]" />
              <div className="relative flex h-full flex-col">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-[var(--muted)]">
                  {post.date} · {post.readMin} min
                </div>
                <h2 className="mt-3 text-xl font-semibold tracking-tight">{post.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--fg)] hover:text-[var(--neon)]"
                >
                  Read <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
