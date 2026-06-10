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

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
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

