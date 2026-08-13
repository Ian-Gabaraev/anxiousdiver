# Authoring guide — anxiousdiver.com

Everything you need to publish a new article, add images, keep SEO tight, and
make sure Google (and the RSS crowd) actually finds it.

Read this end-to-end the first time. After that, use the **checklist at the
bottom** before every push.

---

## 1. Create the MDX file

Posts live in `content/posts/`. The **filename becomes the URL slug**.

```
content/posts/letting-go-of-the-wall.mdx
                       ↓
https://anxiousdiver.com/posts/letting-go-of-the-wall/
```

### Slug rules

- Lowercase, hyphen-separated, ASCII only.
- Keep it short but keyword-rich (`first-cave-dive` — not `my-first-time-in-a-cave-and-it-was-scary`).
- Never rename after publishing. If you must, add a redirect (ask before doing this).

---

## 2. Frontmatter — the SEO backbone

Every post starts with YAML frontmatter. This drives titles, meta descriptions,
OpenGraph tags, JSON-LD, sitemap, RSS — everything.

### Minimum required

```yaml
---
title: "Letting Go of the Wall"
date: "2026-08-14"
topic: "stories"
excerpt: "The Dubai Aquarium taught me the difference between fear of sharks and fear of open water. One is a story. The other is your brainstem."
author: "Ian Gabaraev"
---
```

### Full frontmatter (all supported fields)

```yaml
---
title: "Letting Go of the Wall"          # <60 chars ideal, becomes <title> + OG title
date: "2026-08-14"                        # ISO YYYY-MM-DD, drives sort + sitemap
topic: "stories"                          # anxiety | tech | gear | stories
excerpt: "1–2 sentences. Also used as meta description."   # 140–160 chars ideal
cover: "/posts/letting-go-of-the-wall.jpg" # 1200×630, used for OG + Twitter card
tags: ["panic", "dubai", "confined-water"] # optional, freeform
featured: true                             # optional, boosts home-grid ranking
pinned: true                               # optional, ONE at a time — "Start Here"
author: "Ian Gabaraev"
---
```

### SEO field-by-field

| Field | Why it matters | Rule |
|-------|----------------|------|
| `title` | `<title>` tag, OG title, Twitter card, JSON-LD headline | ≤ 60 chars. Front-load the keyword. No clickbait, no colons-for-the-sake-of-it. |
| `date` | Sort order, sitemap `lastmod`, JSON-LD `datePublished` | Real publish date. Don't backdate to game rankings. |
| `topic` | Category page, JSON-LD `articleSection`, chip color | Must be one of the four. Anything else breaks the build. |
| `excerpt` | Meta description, OG description, home-grid card | 140–160 chars. Include the keyword naturally. Write it like a first sentence, not a summary. |
| `cover` | OG image (Facebook, LinkedIn, Slack previews, Twitter card) | See §3. |
| `tags` | JSON-LD `keywords` + OG tags | 3–6 lowercase tags. Real terms, not stuffing. |
| `pinned` | Homepage "Start Here" slot | Only ONE post can be pinned. Unpin the old one first. |
| `featured` | Home-grid weight | Use sparingly. Featured = "worth reading first". |

---

## 3. Images

### Where images live

```
public/
  posts/
    <slug>.jpg              # OG/cover image (1200 × 630)
    <slug>/                 # optional folder for inline images
      hero-wide.jpg
      dive-computer.jpg
```

Reference from MDX with an **absolute** path:

```mdx
![Suunto D5 on a wrist, showing 42 m](/posts/letting-go-of-the-wall/dive-computer.jpg)
```

### Rules

- **Cover image**: 1200 × 630 px, JPG or WebP, < 250 KB. This is what shows up on
  social shares. If it's missing, the site falls back to `/og-default.png`.
- **Inline images**: max 1600 px wide, compressed. WebP preferred, JPG fine.
- **Filenames**: lowercase-with-hyphens. No spaces, no `IMG_1234.jpg`.
- **Alt text is mandatory.** Describe the image factually. This is accessibility
  AND SEO — Google reads alt text. Never write `![](...)`.
- **No copyrighted images.** Own it, license it (Pexels/Unsplash), or don't use it.
- **Don't inline base64.** Ever. It wrecks build size and killed at least one deploy.

### Optimizing before commit

```bash
# JPG
magick input.jpg -resize 1200x630^ -gravity center -extent 1200x630 -quality 82 public/posts/<slug>.jpg

# WebP
cwebp -q 82 input.jpg -o public/posts/<slug>.webp
```

Or use [squoosh.app](https://squoosh.app) if you prefer clicking.

---

## 4. Writing the body

- MDX = Markdown + JSX. GFM is on: tables, task lists, footnotes, autolinks.
- Headings get auto-generated IDs (`rehype-slug`) — you can deep-link to any `##` or `###`.
- **Use `##` for section headings.** `#` is reserved for the post title (rendered from frontmatter).
- Prose is styled by `@tailwindcss/typography`. Don't add classes to paragraphs.
- Code blocks work; specify language for syntax highlighting: ` ```python `.
- Blockquotes render with an accent border — use them sparingly for weight.

### Voice reminder

See `CLAUDE.md` for the full voice guide. Short version: direct, dry, em-dashes,
no motivational filler, no "we" when you mean "I".

---

## 5. SEO checklist — do NOT skip

Before you commit a new post, walk through this list:

- [ ] **Title** ≤ 60 characters, contains the primary keyword.
- [ ] **Excerpt** is 140–160 characters and reads like a hook, not a summary.
- [ ] **Slug** is short, lowercase, hyphenated, keyword-forward.
- [ ] **Date** is today (or the real publish date), ISO format.
- [ ] **Topic** is one of the four valid values.
- [ ] **Cover image** exists at `/public/posts/<slug>.jpg`, is 1200×630, < 250 KB.
- [ ] **Every image has alt text.**
- [ ] Body has **at least one `##` heading** (better ranking, better outline).
- [ ] **Internal link** to at least one related post if one exists.
- [ ] **External link** to at least one authoritative source (DAN, PADI, Rubicon, a paper).
- [ ] Body is **> 600 words** for real ranking weight (shorter is fine for notes; know what you're publishing).
- [ ] No dead links. `curl -I` anything you're not sure about.
- [ ] Preview locally: `npm run dev` → open the post page → check heading hierarchy, images, and OG preview in `<head>`.

---

## 6. Making sure Google finds it

The site is fully static, so once it deploys, discovery is automatic — **if the
plumbing works**. Verify:

### 6.1 Sitemap

The sitemap is generated at build time by `src/app/sitemap.ts` from
`getAllPosts()`. You do **not** edit it by hand. After build, verify:

```bash
npm run build
grep "<slug>" out/sitemap.xml   # replace <slug> with your post slug
```

If your slug shows up, Google can find it. If not, the frontmatter probably
has a bad `date` or `topic` and the loader silently skipped it.

### 6.2 RSS

Same story — `src/app/rss.xml/route.ts` reads all posts at build time. Check:

```bash
grep "<slug>" out/rss.xml
```

### 6.3 JSON-LD

Open the post's HTML in `out/posts/<slug>/index.html` and search for
`BlogPosting`. It should include `headline`, `datePublished`, `author`,
`articleSection`, and — if you set a cover — `image`.

### 6.4 After deploy

1. Wait for Cloudflare Pages to finish (check the deployments tab).
2. Hit the post URL directly and confirm it renders.
3. Test the social preview:
   - Facebook/LinkedIn: <https://www.opengraph.xyz/>
   - Twitter/X: <https://cards-dev.twitter.com/validator> (or just paste in a DM)
4. **Submit the updated sitemap in Google Search Console**:
   - Go to <https://search.google.com/search-console>
   - Property → **Sitemaps** → submit `https://anxiousdiver.com/sitemap.xml`
     (once is enough; Google re-crawls it. But re-submitting after a big post
     nudges the crawler.)
5. Optional: request indexing on the specific URL in Search Console → **URL
   Inspection** → paste URL → **Request indexing**. Useful for big posts.

---

## 7. Publish workflow (the whole thing, condensed)

```bash
# 1. Create the file
$EDITOR content/posts/my-new-post.mdx

# 2. Add a cover image
cp ~/Downloads/cover.jpg public/posts/my-new-post.jpg

# 3. Preview
npm run dev
# → http://localhost:3000/posts/my-new-post/

# 4. Build & smoke-test static output
npm run build
grep my-new-post out/sitemap.xml
grep my-new-post out/rss.xml

# 5. Commit
git add content/posts/my-new-post.mdx public/posts/my-new-post.jpg
git commit -m "post: my new post"
git push

# 6. Cloudflare Pages auto-deploys.
# 7. Verify on prod, then request indexing in Search Console.
```

---

## 8. Common mistakes that will silently break things

| Mistake | What happens |
|---------|--------------|
| `date: 2026-08-14` (no quotes) | YAML may parse as a Date object; usually fine, but quote it to be safe. |
| `topic: "personal"` | Not in the allowed set → post is filtered out with no error. |
| Slug has an uppercase letter or space | 404s on Cloudflare, or URL gets encoded weirdly. |
| Cover image not committed | OG preview falls back to default; nobody clicks. |
| Forgot `alt=""` on an image | Accessibility violation, SEO penalty, and you'll get roasted. |
| Renamed a published post's file | All existing links + Google index break. Don't. |
| Two posts with `pinned: true` | First one wins; second is silently unpinned. |

---

## 9. Deleting or unpublishing

- **Delete**: remove the `.mdx` file and any images under `public/posts/<slug>/`.
  Add a redirect in Cloudflare if the post had external links.
- **Unpublish temporarily**: rename to `.mdx.draft` or move outside
  `content/posts/`. The loader ignores non-`.mdx` files.

---

That's it. Write the piece, run the checklist, push, verify. The plumbing does
the rest.

