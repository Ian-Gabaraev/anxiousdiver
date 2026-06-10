# CLAUDE.md — anxiousdiver.com project rules

> This file is the source of truth for how AI assistants (Claude, Copilot, etc.)
> should work in this repository. Read it before changing anything.

## What this project is

Personal blog of **Ian Gabaraev**, a technical diver, focused on **fear and
anxiety in scuba & technical diving**. Domain: **anxiousdiver.com** (registered
on Cloudflare). Hosted on **Cloudflare Pages** as a fully static site.

## Tagline

Default tagline used in the hero:

> **"Diving with fear, not against it."**

Alternates (interchangeable, keep the same length/cadence):
- "Field notes from an anxious technical diver."
- "Calm is a skill. I'm learning it — 40 m at a time."

## Stack — do not change without asking

- **Next.js 15 App Router + TypeScript**, `output: 'export'` (fully static).
- **Tailwind CSS** + **@tailwindcss/typography** + custom design tokens in
  `tailwind.config.ts` (`abyss`, `biolume`, `shallow`, `sand`, `coral`).
- **MDX posts** in `/content/posts/*.mdx`, rendered with `next-mdx-remote/rsc`
  + `remark-gfm` + `rehype-slug`.
- **`next-themes`** for dark/light (Abyssal default, Sunlit Shallows light).
- **Fonts**: Fraunces (display, serif), Inter (body), JetBrains Mono (mono).
  Loaded from Google Fonts via `@import` in `globals.css`.
- **No client-side database, no CMS, no admin panel.** Posts are files.

## Design system — non-negotiables

- **Aquatic, editorial, unique.** Think "deep-sea field journal", not generic blog.
- Default theme is **dark / Abyssal** — navy → near-black gradient, bioluminescent
  teal/cyan accents (`--accent: #3fe6d2`), animated caustics + light rays + marine
  snow canvas on the hero.
- Light theme is **Sunlit Shallows** — turquoise, sand, calm. Same layout.
- Display headings use **Fraunces** with tight tracking (`-0.02em`).
- Body sets in **Inter**, max line length ~72ch in prose.
- Accent color is sacred. Don't introduce a third bright color casually.
- All motion must respect `prefers-reduced-motion`.
- Hero always shows a "depth scale" strip (0/18/40/60 m). It's a brand element.
- Topic chips use `data-topic="anxiety|tech|gear|stories"` for color.

## SEO — first-class concern

This blog lives or dies by search. Every change must preserve:

1. **Static HTML per article** (`generateStaticParams` + `output: 'export'`).
2. **Per-page `generateMetadata`** with title, description, canonical, OG, Twitter.
3. **JSON-LD**:
   - `WebSite` + `Person` on the root layout.
   - `BlogPosting` on every post page.
   - `Person` on `/about/`.
4. **`sitemap.ts`** must include `/`, `/posts/`, `/about/`, every `/topics/*/`,
   and every `/posts/*/`.
5. **`robots.ts`** must point to `${site.url}/sitemap.xml`.
6. **RSS** at `/rss.xml` (route handler with `dynamic = 'force-static'`).
7. **`trailingSlash: true`** in `next.config.mjs` — keep it. Cloudflare Pages
   serves directories cleanly this way. All internal links must end with `/`.
8. **`metadataBase`** set from `site.url` so OG image URLs resolve absolutely.

## Authoring a new post

1. Create `/content/posts/<slug>.mdx` with frontmatter:
   ```yaml
   ---
   title: "..."
   date: "YYYY-MM-DD"   # ISO; used for sort + sitemap
   topic: "anxiety" | "tech" | "gear" | "stories"
   excerpt: "1–2 sentence summary (shown in cards + meta description)"
   cover: "/posts/<slug>.jpg"   # optional, 1200×630 ideal
   featured: true               # optional — boosts ranking on home grid
   pinned: true                 # optional — only ONE pinned at a time (Start Here)
   tags: ["..."]                # optional
   author: "Ian Gabaraev"
   ---
   ```
2. Write the body in MDX. GFM is enabled (tables, task lists, footnotes).
3. Headings get auto IDs via `rehype-slug` for deep linking.
4. Run `npm run build` to verify it renders and gets a static HTML page.

## Topics

Defined in `src/lib/posts.ts` (`TOPICS`). To add or rename one:
- Update `TOPICS` and the `Topic` union.
- Update header nav in `src/components/Header.tsx` if it should be top-level.
- Add a color rule in `globals.css` (`.chip[data-topic="..."]`).

## File layout

```
src/
  app/
    layout.tsx          # global metadata + JSON-LD + Header/Footer
    page.tsx            # landing page
    globals.css         # design tokens + aquatic effects (caustics, rays, snow)
    sitemap.ts
    robots.ts
    rss.xml/route.ts    # static RSS
    not-found.tsx
    about/page.tsx
    posts/
      page.tsx          # index
      [slug]/page.tsx   # static-rendered MDX post
    topics/
      [topic]/page.tsx
  components/
    Header.tsx Footer.tsx Hero.tsx PostCard.tsx Newsletter.tsx
    MarineSnow.tsx ThemeToggle.tsx Providers.tsx JsonLd.tsx
  lib/
    posts.ts            # MDX frontmatter loader (build-time)
    site.ts             # site-wide constants (name, url, author, socials)
content/
  posts/*.mdx
public/
  favicon.svg og-default.png
```

## Deployment (Cloudflare Pages)

- Build command: `npm run build`
- Output directory: `out`
- Node version: 20+ (project tested on 24).
- Custom domain: `anxiousdiver.com` — set in the Pages project, with
  `www.anxiousdiver.com` redirecting to the apex (in Cloudflare DNS rules).
- After first deploy, in Cloudflare dashboard set:
  - **Always Use HTTPS** = on
  - **Auto Minify** = off (Next already optimises)
  - **Browser Cache TTL** = Respect Existing Headers

## Things AI should not do

- Don't switch frameworks (no Astro, Remix, Vite-only, etc.).
- Don't introduce a CMS, database, or auth.
- Don't add tracking/analytics without asking (privacy stance matters).
- Don't add a third bright accent color or change typography.
- Don't break `trailingSlash: true` or `output: 'export'`.
- Don't remove `prefers-reduced-motion` guards.
- Don't inline large base64 images or generate binary content.

## Security

Per the global rule: after generating or modifying first-party code in a
Snyk-supported language, run `snyk_code_scan`, fix issues, and rescan until
clean.

## Author / socials

- Name: Ian Gabaraev
- Site: https://iangabaraev.com
- Instagram: https://instagram.com/iangabaraev
- Pexels: https://www.pexels.com/@an-gabaraev-2149212079

