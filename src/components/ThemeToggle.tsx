'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const current = mounted ? (resolvedTheme ?? theme) : 'dark';
  const isDark = current === 'dark';

  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light mode (Sunlit Shallows)' : 'Switch to dark mode (Abyssal)'}
      title={isDark ? 'Sunlit Shallows' : 'Abyssal'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="bubble inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-[color:var(--fg)] hover:text-[color:var(--accent)] transition-colors"
    >
      {/* sun / moon */}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {isDark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </>
        ) : (
          <path d="M21 12.5A9 9 0 1 1 11.5 3a7 7 0 0 0 9.5 9.5Z" />
        )}
      </svg>
    </button>
  );
}

