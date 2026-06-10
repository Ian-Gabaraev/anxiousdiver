# anxiousdiver.com

Personal blog by **Ian Gabaraev** — on overcoming fear and anxiety while scuba and technical diving.

> Diving with fear, not against it.

Static **Next.js 15 (App Router) + TypeScript** site. MDX posts. SEO-first. Deployed to **Cloudflare Pages**.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # produces ./out (static)
npm run typecheck
```

## Writing a new post

Drop an MDX file into `content/posts/<slug>.mdx`:

```yaml
---
title: "Your post title"
date: "2026-06-15"
topic: "anxiety"   # anxiety | tech | gear | stories
excerpt: "Short summary — also used as meta description."
pinned: true       # optional, only one at a time
featured: true     # optional
tags: ["panic", "deep"]
author: "Ian Gabaraev"
---

Write the post body in MDX (Markdown + JSX). GFM is enabled.
```

That's it. Next build → it gets its own static HTML page, sitemap entry, RSS item, and JSON-LD.

## Design

- **Abyssal** dark theme (default) + **Sunlit Shallows** light theme, toggleable.
- Hero with animated CSS caustics, god rays, and a canvas "marine snow" particle field.
- Fonts: Fraunces (display), Inter (body), JetBrains Mono (accents).
- Topic chips colored by `data-topic`.

## SEO

- Static HTML per article (`output: 'export'`).
- Per-page `generateMetadata` (OpenGraph + Twitter cards).
- JSON-LD: `WebSite`, `Person`, `BlogPosting`.
- `/sitemap.xml`, `/robots.txt`, `/rss.xml`.
- `trailingSlash: true` and absolute `metadataBase`.

## Deploying to Cloudflare Pages

### One-time setup

1. Push this repo to GitHub.
2. In the Cloudflare dashboard → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Select the repo. Set:
   - **Framework preset**: Next.js (Static HTML Export)
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Node version**: `20` (env var `NODE_VERSION=20`)
4. Save & deploy. First build will take a couple of minutes.
5. After it's live, go to the Pages project → **Custom domains** → add
   `anxiousdiver.com` and `www.anxiousdiver.com`. Cloudflare will wire DNS
   automatically since the domain is already on Cloudflare. Add a redirect
   rule so `www` → apex (or vice versa — pick one canonical host).

### CLI deploys (optional)

```bash
npm run pages:deploy   # uses wrangler; requires CF auth
```

## Project rules

See [`CLAUDE.md`](./CLAUDE.md) for design system, content rules, and what AI assistants should/should not do in this repo.

