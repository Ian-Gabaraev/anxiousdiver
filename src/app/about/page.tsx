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
          Day job: I am a lead full-stack engineer. React on the front, Python on the
          back, AWS and Azure underneath. For the past decade I have shipped
          production systems across healthcare, biotech, and education — cloud
          migrations, APIs, real-time UIs, distributed systems that have to hold up at
          scale. At Akvelon I lead development of an enterprise telehealth platform
          serving interpreters across 65 languages.
        </p>
        <p>
          Outside the day job I build things for myself. <a href="https://nomadatlas.dev" target="_blank" rel="noopener">NomadAtlas</a> — a
          React 19 finance dashboard for digital nomads. Bat Sonar — an ultrasonic
          bat-detection rig that combines DSP with machine learning. Same instinct as
          the diving, honestly: go somewhere the room is quiet and see what the
          signal actually looks like.
        </p>
        <p>
          If any of that sounds familiar — welcome. You are not the only one.
        </p>
      </div>

      <div className="mt-12">
        <p className="font-mono text-[0.72rem] tracking-[0.3em] uppercase text-[color:var(--muted)]">// elsewhere</p>
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <a href={site.author.website} target="_blank" rel="noopener me" className="chip inline-flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3c2.8 3.2 2.8 14 0 18M12 3c-2.8 3.2-2.8 14 0 18" />
            </svg>
            iangabaraev.com ↗
          </a>
          <a href={site.author.instagram} target="_blank" rel="noopener me" className="chip inline-flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
            </svg>
            Instagram — @iangabaraev ↗
          </a>
          <a href={site.author.pexels} target="_blank" rel="noopener me" className="chip inline-flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="M4 8h3l2-2.5h6L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
              <circle cx="12" cy="13" r="3.6" />
            </svg>
            Pexels — photography ↗
          </a>
          <Link href="/posts/" className="chip inline-flex items-center gap-2" data-topic="tech">
            Read the writing →
          </Link>
        </div>
      </div>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          '@id': `${site.url}/#person`,
          name: site.author.name,
          url: site.author.url,
          mainEntityOfPage: `${site.url}/about/`,
          jobTitle: 'Lead Full-Stack Engineer',
          worksFor: {
            '@type': 'Organization',
            name: 'Akvelon',
          },
          sameAs: [
            site.author.website,
            site.author.instagram,
            site.author.pexels,
            'https://nomadatlas.dev',
            site.url,
          ].filter(Boolean),
          description:
            'Lead full-stack engineer and technical diver. Writes about anxiety, fear, and the mental side of scuba diving.',
        }}
      />
    </section>
  );
}

