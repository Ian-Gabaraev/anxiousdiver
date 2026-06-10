import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PostCard } from '@/components/PostCard';
import { getPostsByTopic, TOPICS, type Topic } from '@/lib/posts';

interface Params { topic: string }

export function generateStaticParams() {
  return (Object.keys(TOPICS) as Topic[]).map((topic) => ({ topic }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { topic } = await params;
  if (!(topic in TOPICS)) return { title: 'Topic' };
  const t = TOPICS[topic as Topic];
  return {
    title: t.label,
    description: t.description,
    alternates: { canonical: `/topics/${topic}/` },
  };
}

export default async function TopicPage({ params }: { params: Promise<Params> }) {
  const { topic } = await params;
  if (!(topic in TOPICS)) notFound();
  const t = TOPICS[topic as Topic];
  const posts = getPostsByTopic(topic as Topic);

  return (
    <section className="mx-auto max-w-6xl px-5 sm:px-8 py-20 md:py-24">
      <header className="mb-12">
        <p className="font-mono text-[0.72rem] tracking-[0.3em] uppercase text-[color:var(--accent)]">// topic</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight">{t.label}</h1>
        <p className="mt-4 max-w-2xl text-[color:var(--muted)]">{t.description}</p>
      </header>

      {posts.length === 0 ? (
        <p className="text-[color:var(--muted)]">No posts here yet. Coming soon.</p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => <PostCard key={p.slug} post={p} />)}
        </div>
      )}
    </section>
  );
}

