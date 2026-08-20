import type { ImgHTMLAttributes } from 'react';

const CREDIT_RE = /(Photo\s+by\s+[^.]+?)\.?\s*$/i;

export function extractCredit(alt: string | undefined): { alt: string; credit: string } {
  const raw = (alt ?? '').trim();
  const match = raw.match(CREDIT_RE);
  if (!match) return { alt: raw, credit: 'Photo by Ian Gabaraev' };
  const credit = match[1].trim();
  const cleanAlt = raw.slice(0, match.index).replace(/\s+$/, '').replace(/[,;:]$/, '').trim();
  return { alt: cleanAlt.length > 0 ? cleanAlt : credit, credit };
}

export function PostImage({ src, alt, ...rest }: ImgHTMLAttributes<HTMLImageElement>) {
  if (typeof src !== 'string') return null;
  const { alt: cleanAlt, credit } = extractCredit(alt);
  return (
    <figure className="not-prose my-10 overflow-hidden rounded-xl border border-[var(--line)] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.5)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...rest}
        src={src}
        alt={cleanAlt}
        loading="lazy"
        className="w-full h-auto block"
      />
      <figcaption className="px-5 sm:px-6 py-3 text-xs font-mono tracking-wide text-[color:var(--muted)] border-t border-[var(--line)] bg-[color-mix(in_oklab,var(--bg)_92%,transparent)]">
        {credit}
      </figcaption>
    </figure>
  );
}
