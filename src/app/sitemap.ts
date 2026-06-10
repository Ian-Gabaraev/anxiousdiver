import type { MetadataRoute } from 'next';
import { getAllPosts, TOPICS, type Topic } from '@/lib/posts';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${site.url}/`,        lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${site.url}/posts/`,  lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${site.url}/about/`,  lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ];
  const topicUrls: MetadataRoute.Sitemap = (Object.keys(TOPICS) as Topic[]).map((t) => ({
    url: `${site.url}/topics/${t}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));
  const postUrls: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${site.url}/posts/${p.slug}/`,
    lastModified: new Date(p.date),
    changeFrequency: 'yearly',
    priority: 0.8,
  }));
  return [...staticUrls, ...topicUrls, ...postUrls];
}

