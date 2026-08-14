import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { getAllPosts, getPost, TOPICS } from '@/lib/posts';
import { site } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';

interface Params { slug: string }

export const dynamicParams = false;

export function generateStaticParams() {
  const posts = getAllPosts();
  // Next 15 with `output: 'export'` requires at least one param.
  // Return a placeholder that resolves to notFound() when there are no posts.
  if (posts.length === 0) return [{ slug: '__placeholder' }];
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: 'Not found' };
  const url = `${site.url}/posts/${post.slug}/`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/posts/${post.slug}/` },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [site.author.name],
      tags: [TOPICS[post.topic].label, ...(post.tags ?? [])],
      images: post.cover ? [{ url: post.cover }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.cover ? [post.cover] : undefined,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const date = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <article className="mx-auto max-w-3xl px-5 sm:px-8 py-16 md:py-24">
      <header className="mb-10 not-prose">
        <div className="flex items-center gap-3 text-sm">
          <Link href={`/topics/${post.topic}/`} className="chip" data-topic={post.topic}>
            {TOPICS[post.topic].label}
          </Link>
          <time dateTime={post.date} className="text-[color:var(--muted)] font-mono text-xs">{date}</time>
          <span className="text-[color:var(--muted)] text-xs">· {post.readingMinutes} min read</span>
        </div>
        <h1 className="mt-5 font-display text-4xl md:text-5xl font-semibold tracking-[-0.02em] leading-[1.05]">
          {post.title}
        </h1>
        <p className="mt-5 text-lg text-[color:var(--muted)]">{post.excerpt}</p>
      </header>

      {post.cover && (
        <figure className="not-prose -mx-5 sm:mx-0 mb-12 md:mb-16 overflow-hidden sm:rounded-xl border-y sm:border border-[var(--line)] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.5)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.cover}
            alt={post.coverAlt ?? post.title}
            loading="eager"
            className="w-full h-auto object-cover aspect-[1200/630]"
          />
          {post.coverCredit && (
            <figcaption className="px-5 sm:px-6 py-3 text-xs font-mono tracking-wide text-[color:var(--muted)] border-t border-[var(--line)] bg-[color-mix(in_oklab,var(--bg)_92%,transparent)]">
              {post.coverCredit}
            </figcaption>
          )}
        </figure>
      )}

      <div className="prose prose-lg dark:prose-invert">
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug],
            },
          }}
        />
      </div>

      <footer className="mt-16 pt-8 border-t border-[var(--line)] flex items-center justify-between text-sm">
        <Link href="/posts/" className="ink-link text-[color:var(--accent)]">← All writing</Link>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${site.url}/posts/${post.slug}/`)}`}
          target="_blank" rel="noopener noreferrer"
          className="ink-link text-[color:var(--muted)] hover:text-[color:var(--accent)]"
        >
          Share
        </a>
      </footer>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          dateModified: post.date,
          inLanguage: 'en',
          mainEntityOfPage: `${site.url}/posts/${post.slug}/`,
          url: `${site.url}/posts/${post.slug}/`,
          author: { '@type': 'Person', name: site.author.name, url: site.author.url },
          publisher: { '@type': 'Person', name: site.author.name, url: site.author.url },
          articleSection: TOPICS[post.topic].label,
          keywords: [TOPICS[post.topic].label, ...(post.tags ?? [])].join(', '),
          image: post.cover ? [`${site.url}${post.cover}`] : undefined,
        }}
      />
    </article>
  );
}

