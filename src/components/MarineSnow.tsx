'use client';

import { useEffect, useRef } from 'react';

/**
 * "Marine snow" — slow drifting particles, evoking the underwater column.
 * Lightweight canvas; respects prefers-reduced-motion.
 */
export function MarineSnow({ density = 70 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    type P = { x: number; y: number; r: number; vx: number; vy: number; a: number };
    let particles: P[] = [];

    const reset = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: density }, () => spawn(true));
    };

    const spawn = (initial = false): P => ({
      x: Math.random() * w,
      y: initial ? Math.random() * h : -10,
      r: Math.random() * 1.6 + 0.3,
      vx: (Math.random() - 0.5) * 0.12,
      vy: Math.random() * 0.25 + 0.05,
      a: Math.random() * 0.5 + 0.2,
    });

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.y > h + 4) Object.assign(p, spawn());
        ctx.beginPath();
        ctx.fillStyle = `rgba(180, 240, 230, ${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    const ro = new ResizeObserver(reset);
    ro.observe(canvas);
    reset();
    tick();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [density]);

  return <canvas ref={ref} className="marine-snow" aria-hidden />;
}

