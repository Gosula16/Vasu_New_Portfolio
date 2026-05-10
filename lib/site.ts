import { siteConfig } from "@/lib/data";

/**
 * Canonical site URL for metadata and OG tags.
 * On Vercel, `VERCEL_URL` is set per deployment (preview + production).
 * Set `NEXT_PUBLIC_SITE_URL` for a stable production URL (e.g. custom domain).
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/^https?:\/\//, "")}`;
  }
  return siteConfig.url.replace(/\/$/, "");
}
