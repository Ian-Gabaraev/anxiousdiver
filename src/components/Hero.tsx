'use client';

import Link from 'next/link';
import { MarineSnow } from './MarineSnow';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function Hero() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = !mounted || resolvedTheme === 'dark';

  return (
    <section
      className={`relative overflow-hidden ${isDark ? 'hero-bg-dark' : 'hero-bg-light'}`}
      aria-label="Introduction"
    >
      <div className="caustics" aria-hidden />
      <div className="rays" aria-hidden />
      <MarineSnow density={80} />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 pt-24 pb-28 md:pt-36 md:pb-40">
        <p className="font-mono text-[0.72rem] tracking-[0.32em] uppercase text-[color:var(--accent)] animate-rise">
          // depth · breath · attention
        </p>

        <h1 className="mt-6 font-display font-semibold tracking-[-0.02em] text-[clamp(2.4rem,6vw,4.75rem)] leading-[0.98] animate-rise">
          Diving with fear,
          <br />
          <span className="italic text-[color:var(--accent)]">not against it.</span>
        </h1>

        <p className="mt-7 max-w-2xl text-lg md:text-xl text-[color:var(--muted)] animate-rise">
          A blog by <strong className="text-[color:var(--fg)] font-medium">Ian Gabaraev</strong>, a technical
          diver who still gets scared. Honest writing about anxiety, breath, decompression,
          and the small skills that turn panic back into curiosity.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3 animate-rise">
          <Link
            href="/posts/"
            className="bubble inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-5 py-2.5 text-sm font-medium text-[#02060d] hover:brightness-110 transition"
          >
            Read the writing
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
          <Link
            href="/about/"
            className="bubble inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-medium hover:text-[color:var(--accent)] transition"
          >
            About Ian
          </Link>
        </div>

        {/* Depth scale */}
        <DepthScale />
      </div>
    </section>
  );
}

function DepthScale() {
  const marks = [
    { d: '0 m',  label: 'surface',  note: 'breath in' },
    { d: '18 m', label: 'recreational',  note: 'most people stop here' },
    { d: '40 m', label: 'deep',  note: 'first time I panicked' },
    { d: '60 m', label: 'trimix', note: 'where calm becomes a skill' },
  ];
  return (
    <div className="mt-16 hidden md:grid grid-cols-4 gap-4 text-xs">
      {marks.map((m, i) => (
        <div
          key={m.d}
          className="border-l border-[var(--line)] pl-4 animate-rise"
          style={{ animationDelay: `${120 * i}ms` }}
        >
          <p className="font-mono text-[color:var(--accent)]">{m.d}</p>
          <p className="mt-1 uppercase tracking-[0.18em] text-[10px] text-[color:var(--muted)]">{m.label}</p>
          <p className="mt-2 text-[color:var(--fg)]/80 italic">"{m.note}"</p>
        </div>
      ))}
    </div>
  );
}

