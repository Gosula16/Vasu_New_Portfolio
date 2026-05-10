# Vasu_New_Portfolio

Premium student developer portfolio - Next.js (App Router), Tailwind CSS, Framer Motion, GSAP, React Three Fiber, TypeScript.

## Live Site

[https://vasu-portfolio-ashen.vercel.app](https://vasu-portfolio-ashen.vercel.app)

## Scripts

```bash
npm install
npm run dev
npm run build
```

Open [http://localhost:3000](http://localhost:3000) for local development.

## Gemini Portfolio Assistant

The floating assistant answers questions about Vasu's portfolio through a server-side route at `/api/portfolio-chat`.

Set this environment variable locally and in Vercel:

```bash
GEMINI_API_KEY=your_google_ai_studio_key
```

## Spotify Now Playing

The Spotify card reads from `/api/spotify-now-playing` and keeps credentials server-side.

Set these environment variables locally and in Vercel:

```bash
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=refresh_token_with_user_read_currently_playing_scope
```

## Deploy on Vercel (recommended)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. **Add New Project** -> **Import** `Gosula16/Vasu_New_Portfolio`.
3. Framework: **Next.js** (auto-detected). Build: `next build`, output default. **Deploy.**

Vercel sets `VERCEL_URL` on each build, so **Open Graph / `metadataBase`** use the live deployment URL automatically (`lib/site.ts`). For a **custom domain**, add it in the Vercel project -> *Settings* -> *Domains*, then set an environment variable **`NEXT_PUBLIC_SITE_URL`** to `https://your-domain.com` (Production only).

**CLI** (optional): `npx vercel` for a preview, `npx vercel --prod` for production after `vercel login`.

The downloadable resume lives at `public/resume.docx`. Fallback site URL for local dev is `siteConfig.url` in `lib/data.ts`.
