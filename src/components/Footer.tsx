import Link from 'next/link';
import { site } from '@/lib/site';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--line)]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-lg">
            anxious<span className="text-[color:var(--accent)]">diver</span>
          </p>
          <p className="mt-3 text-sm text-[color:var(--muted)] max-w-xs">
            Field notes on fear, calm, and going deeper — by {site.author.name}, technical diver.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">Read</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/posts/" className="ink-link">All writing</Link></li>
            <li><Link href="/topics/anxiety/" className="ink-link">Anxiety</Link></li>
            <li><Link href="/topics/tech/" className="ink-link">Tech diving</Link></li>
            <li><Link href="/topics/gear/" className="ink-link">Gear</Link></li>
            <li><Link href="/topics/stories/" className="ink-link">Stories</Link></li>
            <li><a href="/rss.xml" className="ink-link">RSS</a></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">Elsewhere</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href={site.author.instagram} className="ink-link" rel="me noopener" target="_blank">Instagram — @iangabaraev</a></li>
            <li><a href={site.author.pexels} className="ink-link" rel="me noopener" target="_blank">Pexels — photography</a></li>
            <li><a href={site.author.website} className="ink-link" rel="me noopener" target="_blank">iangabaraev.com</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[color:var(--muted)]">
          <p>© {new Date().getFullYear()} {site.author.name}. All writing is mine; the ocean is no one's.</p>
          <p>Built quietly. Hosted on Cloudflare.</p>
        </div>
      </div>
    </footer>
  );
}

