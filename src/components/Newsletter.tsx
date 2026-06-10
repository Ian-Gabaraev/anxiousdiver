'use client';

import { useState } from 'react';

/**
 * Static-friendly newsletter form. Submits to a configurable endpoint
 * (e.g. Buttondown, ConvertKit, or a Cloudflare Worker).
 * Set NEXT_PUBLIC_NEWSLETTER_ENDPOINT to enable.
 */
export function Newsletter() {
  const endpoint = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT;
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [email, setEmail] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!endpoint) {
      setState('done'); // graceful fallback so the UI works in dev
      return;
    }
    try {
      setState('loading');
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setState(res.ok ? 'done' : 'error');
    } catch {
      setState('error');
    }
  }

  return (
    <section className="relative overflow-hidden rounded-2xl border border-[var(--line)] p-8 md:p-12">
      <div className="caustics" aria-hidden />
      <div className="relative max-w-2xl">
        <p className="font-mono text-[0.72rem] tracking-[0.3em] uppercase text-[color:var(--accent)]">// surface signals</p>
        <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold tracking-tight">
          One email when a new piece goes live.
        </h2>
        <p className="mt-3 text-[color:var(--muted)]">
          No funnels. No tracking pixels. Just the writing — and the occasional dive log.
        </p>

        {state === 'done' ? (
          <p className="mt-6 text-[color:var(--accent)]">
            Thanks. I'll send you something worth reading. ✦
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 flex flex-col sm:flex-row gap-3">
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@yourdomain.com"
              autoComplete="email"
              // Password managers (1Password, LastPass, Dashlane, Bitwarden) inject
              // inline styles + icons into email inputs, which causes a React
              // hydration mismatch on first render. These attributes ask them to
              // skip this field; suppressHydrationWarning handles any extension
              // we haven't covered.
              data-1p-ignore
              data-lpignore="true"
              data-bwignore
              data-form-type="other"
              suppressHydrationWarning
              className="flex-1 rounded-full bg-transparent border border-[var(--line)] px-5 py-3 text-sm placeholder:text-[color:var(--muted)] focus:border-[color:var(--accent)] outline-none"
            />
            <button
              type="submit"
              disabled={state === 'loading'}
              className="bubble rounded-full bg-[color:var(--accent)] px-6 py-3 text-sm font-medium text-[#02060d] disabled:opacity-60"
            >
              {state === 'loading' ? 'Sending…' : 'Subscribe'}
            </button>
          </form>
        )}
        {state === 'error' && (
          <p className="mt-3 text-sm text-coral-400">Something went sideways. Try again in a moment.</p>
        )}
      </div>
    </section>
  );
}

