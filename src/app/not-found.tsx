import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-5 sm:px-8 py-32 text-center">
      <p className="font-mono text-[0.72rem] tracking-[0.3em] uppercase text-[color:var(--accent)]">// lost at depth</p>
      <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight">404</h1>
      <p className="mt-4 text-[color:var(--muted)]">
        This page drifted off the dive plan. Let's surface.
      </p>
      <Link href="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-5 py-2.5 text-sm font-medium text-[#02060d]">
        Back to surface
      </Link>
    </section>
  );
}

