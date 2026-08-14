import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { PostCard } from '@/components/PostCard';
import { Newsletter } from '@/components/Newsletter';
import { getAllPosts, getFeaturedPosts, getPinnedPost, TOPICS, type Topic } from '@/lib/posts';

export default function HomePage() {
  const pinned = getPinnedPost();
  const all = getAllPosts();
  const latest = (pinned ? all.filter((p) => p.slug !== pinned.slug) : all).slice(0, 3);
  // fallback if no pinned
  const featured = pinned ?? getFeaturedPosts(1)[0];

  return (
    <>
      <Hero />

      {/* About strip */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-4">
            <p className="font-mono text-[0.72rem] tracking-[0.3em] uppercase text-[color:var(--accent)]">// about</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold tracking-tight">
              Hi, I'm Ian.
            </h2>
          </div>
          <div className="md:col-span-8 text-lg leading-relaxed text-[color:var(--fg)]/90">
            <p>
              I'm a <strong>technical diver</strong> — twin sets, deco bottles, the
              full kit. 500 dives in, I do not panic much anymore. I used to. The gap
              between those two versions of me is what this blog is about.
            </p>
            <p className="mt-4 text-[color:var(--muted)]">
              This is the writing I wish I had had when I was certifying. It is about
              the parts no instructor really teaches you: panic at depth, breath rate,
              narcosis, post-dive shakes, and the slow, unglamorous work of becoming a
              calmer diver.
            </p>
            <p className="mt-6">
              <Link href="/about/" className="ink-link text-[color:var(--accent)]">More about me →</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Featured / pinned post */}
      {featured && (
        <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-20">
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">Start here</h2>
            <Link href="/posts/" className="text-sm ink-link text-[color:var(--accent)]">All writing →</Link>
          </div>
          <PostCard post={featured} variant="featured" />
        </section>
      )}

      {/* Latest posts */}
      {latest.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-20">
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">Recent</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {latest.map((p) => <PostCard key={p.slug} post={p} />)}
          </div>
        </section>
      )}

      {/* Topics */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-24">
        <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight mb-6">Topics</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {(Object.keys(TOPICS) as Topic[]).map((t) => (
            <Link
              key={t}
              href={`/topics/${t}/`}
              className="group rounded-xl border border-[var(--line)] p-5 transition hover:border-[color:var(--accent)]"
            >
              <span className="chip" data-topic={t}>{TOPICS[t].label}</span>
              <p className="mt-3 text-sm text-[color:var(--muted)] group-hover:text-[color:var(--fg)] transition-colors">
                {TOPICS[t].description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-24">
        <Newsletter />
      </section>
    </>
  );
}

