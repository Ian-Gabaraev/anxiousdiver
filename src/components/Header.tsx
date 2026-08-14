import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { site } from '@/lib/site';

export function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[color-mix(in_oklab,var(--bg)_72%,transparent)] border-b border-[var(--line)]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between gap-6">
        <Link href="/" className="group inline-flex items-center gap-2.5" aria-label={`${site.name} home`}>
          <Logo />
          <span className="font-display text-[1.05rem] font-semibold tracking-tight">
            anxious<span className="text-[color:var(--accent)]">diver</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm">
          <Link href="/posts/" className="ink-link opacity-80 hover:opacity-100">Writing</Link>
          <Link href="/topics/anxiety/" className="ink-link opacity-80 hover:opacity-100">Anxiety</Link>
          <Link href="/topics/tech/" className="ink-link opacity-80 hover:opacity-100">Tech</Link>
          <Link href="/topics/gear/" className="ink-link opacity-80 hover:opacity-100">Gear</Link>
          <Link href="/upcoming/" className="ink-link opacity-80 hover:opacity-100">Upcoming</Link>
          <Link href="/about/" className="ink-link opacity-80 hover:opacity-100">About</Link>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href={site.author.website}
            rel="me noopener"
            target="_blank"
            aria-label="Ian Gabaraev — personal site"
            title="iangabaraev.com"
            className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-[color:var(--fg)] hover:text-[color:var(--accent)] hover:border-[color:var(--accent)] transition-colors"
          >
            <IconGlobe />
          </a>
          <a
            href={site.author.instagram}
            rel="me noopener"
            target="_blank"
            aria-label="Instagram — @iangabaraev"
            title="Instagram"
            className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-[color:var(--fg)] hover:text-[color:var(--accent)] hover:border-[color:var(--accent)] transition-colors"
          >
            <IconInstagram />
          </a>
          <a
            href={site.author.pexels}
            rel="me noopener"
            target="_blank"
            aria-label="Pexels — photography by Ian Gabaraev"
            title="Pexels"
            className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-[color:var(--fg)] hover:text-[color:var(--accent)] hover:border-[color:var(--accent)] transition-colors"
          >
            <IconCamera />
          </a>
          <a
            href="/rss.xml"
            aria-label="RSS feed"
            className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-[color:var(--fg)] hover:text-[color:var(--accent)] hover:border-[color:var(--accent)] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16" />
              <circle cx="5" cy="19" r="1.6" fill="currentColor" />
            </svg>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function IconGlobe() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.8 3.2 2.8 14 0 18M12 3c-2.8 3.2-2.8 14 0 18" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconCamera() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M4 8h3l2-2.5h6L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
      <circle cx="12" cy="13" r="3.6" />
    </svg>
  );
}

function Logo() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden className="transition-transform group-hover:rotate-[8deg]">
      <defs>
        <linearGradient id="lg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%"  stopColor="#7af5e4" />
          <stop offset="100%" stopColor="#048279" />
        </linearGradient>
      </defs>
      {/* stylised bubble + ripple */}
      <circle cx="16" cy="13" r="7" fill="url(#lg)" opacity="0.95" />
      <circle cx="16" cy="13" r="7" fill="none" stroke="url(#lg)" strokeWidth="1" opacity="0.5" transform="translate(0 2) scale(1.05) translate(-0.8 -0.6)" />
      <path d="M3 26 Q 8 22, 13 26 T 23 26 T 33 26" fill="none" stroke="url(#lg)" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

