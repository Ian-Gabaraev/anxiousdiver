import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';
import { TOPICS, type Topic } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Upcoming articles',
  description:
    'The next essays and field notes on the anxiousdiver.com pipeline — anxiety, technical diving, gear, and stories from the water.',
  alternates: { canonical: '/upcoming/' },
  openGraph: {
    title: 'Upcoming articles — Anxious Diver',
    description:
      'What is next on the writing bench: 10 articles on fear, breath, narcosis, gear, and the mental side of technical diving.',
    url: `${site.url}/upcoming/`,
    type: 'website',
  },
};

interface UpcomingPost {
  title: string;
  topic: Topic;
  pitch: string;
}

// Edit this list as ideas move to drafts or get published.
// Keep it 8–12 items. Order = priority.
const UPCOMING: UpcomingPost[] = [
  {
    title: 'The Breath That Fixes Everything (Until It Does Not)',
    topic: 'anxiety',
    pitch:
      'Box breathing, tactical breathing, coherent breathing — they all work at depth, and they all stop working the moment you actually need them. What I do instead.',
  },
  {
    title: 'What Nitrogen Narcosis Actually Feels Like at 40 Metres',
    topic: 'tech',
    pitch:
      'Not a Wikipedia definition. The specific way my thinking gets slippery, the tells I have learned to catch, and the drills that let me still function.',
  },
  {
    title: 'My First Panic at Depth — And the 90 Seconds That Got Me Out',
    topic: 'stories',
    pitch:
      'One dive. The exact moment control left. What my buddy did right. What I did wrong. Written the way I would want to read it if it had not happened to me yet.',
  },
  {
    title: 'The Twin-Set Learning Curve Nobody Warns You About',
    topic: 'tech',
    pitch:
      'Trim, valve drills, the sheer physical intimidation of the rig. Six months of feeling like a beginner again — and the small wins that made me stop dreading kit-up day.',
  },
  {
    title: 'Why "Just Relax" Is the Worst Dive Advice Ever Given',
    topic: 'anxiety',
    pitch:
      'It sounds kind. It is useless at depth. A better replacement — three words a rebreather instructor gave me that actually work when your pp02 alarm is going off.',
  },
  {
    title: 'Post-Dive Shakes: Adrenaline, Cold, or Something Else?',
    topic: 'anxiety',
    pitch:
      'Nobody talks about the twenty minutes after you climb back on the boat. What is happening in your body, why it lasts, and when it is worth flagging to a doctor.',
  },
  {
    title: 'Suunto D5 vs. Shearwater Peregrine, Two Years In',
    topic: 'gear',
    pitch:
      'I dove both to the same depths in the same conditions. The one that survived my anxiety, and the one that quietly made it worse.',
  },
  {
    title: 'How I Rebuilt My SAC Rate After a Panic Attack',
    topic: 'tech',
    pitch:
      'SAC went from 16 to 28 L/min after one bad dive. Getting it back down took ten months and was not about calmness. It was about the boring stuff nobody films.',
  },
  {
    title: 'Overhead Environments and the Anxious Diver',
    topic: 'anxiety',
    pitch:
      'Wrecks, caves, ice, roofs. The honest question is not whether you can handle it — it is whether you should. How I decide, and the dives I have said no to.',
  },
  {
    title: 'The Deco Stop That Reset My Relationship With Fear',
    topic: 'stories',
    pitch:
      'A twelve-minute hang at six metres. Nothing to look at, nothing to do. It became the most useful meditation I have ever done — and the reason I stopped fighting the clock underwater.',
  },
];

export default function UpcomingPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 sm:px-8 py-20 md:py-28">
      <header className="mb-14">
        <p className="font-mono text-[0.72rem] tracking-[0.3em] uppercase text-[color:var(--accent)]">
          // pipeline
        </p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-[-0.02em]">
          Upcoming articles.
        </h1>
        <p className="mt-6 text-lg text-[color:var(--muted)] max-w-2xl">
          The next ten pieces on the bench — in rough priority order. Titles will shift as
          drafts land. If you want to catch them as they publish,{' '}
          <a href="/rss.xml" className="ink-link text-[color:var(--accent)]">subscribe via RSS</a>.
        </p>
      </header>

      <ol className="space-y-6">
        {UPCOMING.map((post, i) => {
          const t = TOPICS[post.topic];
          return (
            <li
              key={post.title}
              className="group relative rounded-2xl border border-[var(--line)] bg-[color-mix(in_oklab,var(--bg)_60%,transparent)] p-6 sm:p-7 transition-colors hover:border-[color:var(--accent)]/60"
            >
              <div className="flex items-start gap-5">
                <span
                  aria-hidden
                  className="shrink-0 font-mono text-[0.78rem] tracking-[0.18em] text-[color:var(--muted)] pt-1 tabular-nums"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="chip" data-topic={post.topic}>
                      {t.label}
                    </span>
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[color:var(--muted)]">
                      draft
                    </span>
                  </div>
                  <h2 className="mt-3 font-display text-xl md:text-2xl font-semibold tracking-tight leading-tight">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
                    {post.pitch}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-16 flex flex-wrap items-center gap-3 text-sm">
        <Link href="/posts/" className="chip" data-topic="tech">
          Read what is already published →
        </Link>
        <a href="/rss.xml" className="chip">
          RSS ↗
        </a>
      </div>
    </section>
  );
}

