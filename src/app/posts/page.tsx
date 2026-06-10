import type { Metadata } from 'next';
import { PostCard } from '@/components/PostCard';
import { getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'All posts from Anxious Diver — on fear, anxiety, and technical scuba diving.',
  alternates: { canonical: '/posts/' },
};

export default function PostsIndexPage() {
  const posts = getAllPosts();
  return (
    <section className="mx-auto max-w-6xl px-5 sm:px-8 py-20 md:py-24">
      <header className="mb-12">
        <p className="font-mono text-[0.72rem] tracking-[0.3em] uppercase text-[color:var(--accent)]">// writing</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight">
          Everything I've written so far.
        </h1>
        <p className="mt-4 max-w-2xl text-[color:var(--muted)]">
          Chronological, newest first. Filter by topic in the header.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-[color:var(--muted)]">No posts yet. The first one is being written.</p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => <PostCard key={p.slug} post={p} />)}
        </div>
      )}
    </section>
  );
}

