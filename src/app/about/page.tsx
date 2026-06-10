import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'About',
  description: `About ${site.author.name}, the anxious technical diver behind ${site.name}.`,
  alternates: { canonical: '/about/' },
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 sm:px-8 py-20 md:py-28">
      <p className="font-mono text-[0.72rem] tracking-[0.3em] uppercase text-[color:var(--accent)]">// about</p>
      <h1 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight">
        Ian Gabaraev.
      </h1>
      <p className="mt-6 text-lg text-[color:var(--muted)]">
        Technical diver. Software person. Someone who genuinely loves the ocean and
        is genuinely, regularly, scared of it.
      </p>

      <div className="prose prose-lg dark:prose-invert mt-10">
        <p>
          I started diving like most people do — warm water, a kind instructor, a
          camera. I kept going because something about being suspended in blue felt
          like the closest thing to silence I had ever found.
        </p>
        <p>
          Then I went deeper. Tech training, twin sets, deco bottles, planning gas
          for runtimes longer than my attention span. And somewhere in there the
          anxiety arrived — quietly at first, then with a kind of confidence.
        </p>
        <p>
          This blog is a place to write honestly about that: the panic, the recovery,
          the boring drills that actually work, the gear that helps, and the dives
          that change how you think.
        </p>
        <p>
          If any of that sounds familiar — welcome. You're not the only one.
        </p>
      </div>

      <div className="mt-12 flex flex-wrap gap-3 text-sm">
        <a href={site.author.instagram} target="_blank" rel="noopener me" className="chip">Instagram ↗</a>
        <a href={site.author.pexels}    target="_blank" rel="noopener me" className="chip">Pexels ↗</a>
        <a href={site.author.website}   target="_blank" rel="noopener me" className="chip">iangabaraev.com ↗</a>
        <Link href="/posts/" className="chip" data-topic="tech">Read the writing →</Link>
      </div>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: site.author.name,
          url: site.author.url,
          jobTitle: 'Technical Diver',
          sameAs: [site.author.instagram, site.author.pexels, site.author.website].filter(Boolean),
          description: 'Technical diver writing about anxiety, fear, and the mental side of scuba diving.',
        }}
      />
    </section>
  );
}

