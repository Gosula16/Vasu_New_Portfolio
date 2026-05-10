import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage(props: Props) {
  const { slug } = await props.params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 pb-28 pt-10 sm:px-6">
      <Link href="/blog" className="text-sm font-semibold text-[var(--muted)] hover:text-[var(--fg)]">
        ← Back to blog
      </Link>
      <article className="mt-8">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--muted)]">
          {post.date} · {post.readMin} min read
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">{post.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-[var(--muted)]">{post.excerpt}</p>
        <div className="mt-10 space-y-4 text-sm leading-relaxed text-[color-mix(in_oklab,var(--fg)_84%,transparent)]">
          <p>
            This is a lightweight placeholder article route—ideal for verifying navigation, SEO tags, and animations.
            Replace this body with MDX content when you&apos;re ready to publish long-form writing.
          </p>
          <p className="mt-4">
            Until then, the surrounding portfolio already demonstrates motion discipline, accessible landmarks, and a
            theme-aware design system you can extend confidently.
          </p>
        </div>
      </article>
    </main>
  );
}
