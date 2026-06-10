import Link from 'next/link';
import type { Post } from '@/lib/posts';
import { TOPICS } from '@/lib/posts';

export function PostCard({ post, variant = 'default' }: { post: Post; variant?: 'default' | 'featured' | 'compact' }) {
  const href = `/posts/${post.slug}/`;
  const date = new Date(post.date);
  const dateLabel = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  if (variant === 'featured') {
    return (
      <Link
        href={href}
        className="group relative block overflow-hidden rounded-2xl border border-[var(--line)] bg-[color-mix(in_oklab,var(--bg)_80%,transparent)] p-7 md:p-10 transition hover:border-[color:var(--accent)]"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition" aria-hidden>
          <div className="caustics" />
        </div>
        <div className="relative">
          <div className="flex items-center gap-3">
            <span className="chip" data-topic={post.topic}>★ Pinned · {TOPICS[post.topic].label}</span>
            <time className="text-xs text-[color:var(--muted)] font-mono">{dateLabel}</time>
            <span className="text-xs text-[color:var(--muted)]">· {post.readingMinutes} min</span>
          </div>
          <h2 className="mt-5 font-display text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
            {post.title}
          </h2>
          <p className="mt-4 max-w-2xl text-[color:var(--muted)] text-lg">{post.excerpt}</p>
          <p className="mt-6 inline-flex items-center gap-2 text-sm text-[color:var(--accent)]">
            Read this one
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group block rounded-xl border border-[var(--line)] p-6 transition hover:border-[color:var(--accent)] hover:-translate-y-0.5"
    >
      <div className="flex items-center gap-3">
        <span className="chip" data-topic={post.topic}>{TOPICS[post.topic].label}</span>
        <time className="text-xs text-[color:var(--muted)] font-mono">{dateLabel}</time>
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold leading-snug group-hover:text-[color:var(--accent)] transition-colors">
        {post.title}
      </h3>
      <p className="mt-2 text-sm text-[color:var(--muted)] line-clamp-3">{post.excerpt}</p>
      <p className="mt-4 text-xs text-[color:var(--muted)] font-mono">{post.readingMinutes} min read →</p>
    </Link>
  );
}

