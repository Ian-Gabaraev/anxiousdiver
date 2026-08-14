import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

export type Topic = 'anxiety' | 'tech' | 'gear' | 'stories';

export const TOPICS: Record<Topic, { label: string; description: string }> = {
  anxiety:  { label: 'Anxiety',     description: 'Honest writing about fear, panic, and the mental side of diving.' },
  tech:     { label: 'Tech Diving', description: 'Decompression, gas planning, and the technical end of the sport.' },
  gear:     { label: 'Gear',        description: 'What I actually use, what broke, what I would buy again.' },
  stories:  { label: 'Stories',     description: 'Dive logs and field notes from the water.' },
};

export interface PostFrontmatter {
  title: string;
  date: string;          // ISO YYYY-MM-DD
  excerpt: string;
  topic: Topic;
  cover?: string;
  coverAlt?: string;     // custom alt for the hero cover (defaults to title)
  coverCredit?: string;  // photographer credit rendered as a figcaption
  featured?: boolean;
  pinned?: boolean;
  tags?: string[];
  author?: string;
}

export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
  readingMinutes: number;
}

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

function readDirSafe(dir: string): string[] {
  try { return fs.readdirSync(dir); } catch { return []; }
}

export function getAllPosts(): Post[] {
  const files = readDirSafe(POSTS_DIR).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));
  const posts = files.map((file) => {
    const slug = file.replace(/\.(mdx|md)$/, '');
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
    const { data, content } = matter(raw);
    const fm = data as PostFrontmatter;
    return {
      ...fm,
      slug,
      content,
      readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
    } satisfies Post;
  });
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getPinnedPost(): Post | undefined {
  return getAllPosts().find((p) => p.pinned);
}

export function getFeaturedPosts(limit = 3): Post[] {
  return getAllPosts().filter((p) => !p.pinned).slice(0, limit);
}

export function getPostsByTopic(topic: Topic): Post[] {
  return getAllPosts().filter((p) => p.topic === topic);
}

