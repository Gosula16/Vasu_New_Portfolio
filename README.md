# Vasu_New_Portfolio

Premium student developer portfolio — Next.js (App Router), Tailwind CSS, Framer Motion, GSAP, React Three Fiber, TypeScript.

## Scripts

```bash
npm install
npm run dev
npm run build
```

Open [http://localhost:3000](http://localhost:3000) for local development.

## Deploy on Vercel (recommended)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. **Add New Project** → **Import** `Gosula16/Vasu_New_Portfolio`.
3. Framework: **Next.js** (auto-detected). Build: `next build`, output default. **Deploy.**

Vercel sets `VERCEL_URL` on each build, so **Open Graph / `metadataBase`** use the live deployment URL automatically (`lib/site.ts`). For a **custom domain**, add it in the Vercel project → *Settings* → *Domains*, then set an environment variable **`NEXT_PUBLIC_SITE_URL`** to `https://your-domain.com` (Production only).

**CLI** (optional): `npx vercel` for a preview, `npx vercel --prod` for production after `vercel login`.

Add `public/resume.pdf` if you use the résumé download link. Fallback site URL for local dev is `siteConfig.url` in `lib/data.ts`.
