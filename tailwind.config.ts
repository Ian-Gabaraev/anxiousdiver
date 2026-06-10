import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,mdx}', './content/**/*.{md,mdx}'],
  theme: {
    extend: {
      colors: {
        // Abyssal (dark) palette
        abyss: {
          950: '#02060d',
          900: '#040b1a',
          800: '#071529',
          700: '#0b2240',
          600: '#10325c',
        },
        // Bioluminescent accents
        biolume: {
          50: '#e6fffb',
          100: '#b8fff3',
          200: '#7af5e4',
          300: '#3fe6d2',
          400: '#14c9b8',
          500: '#06a99d',
          600: '#048279',
          700: '#066760',
        },
        // Sunlit shallows (light)
        shallow: {
          50: '#f3fbff',
          100: '#e2f4fc',
          200: '#bfe6f5',
          300: '#8ed2ea',
          400: '#54b6da',
          500: '#2a96c2',
        },
        sand: {
          50: '#fbf6ec',
          100: '#f3e7c8',
          200: '#e6cf94',
        },
        coral: {
          400: '#ff7a6b',
          500: '#ff5a48',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      backgroundImage: {
        'caustics-dark':
          'radial-gradient(1200px 600px at 20% 0%, rgba(20,201,184,0.18), transparent 60%), radial-gradient(900px 500px at 90% 20%, rgba(63,230,210,0.12), transparent 60%), radial-gradient(700px 700px at 50% 110%, rgba(16,50,92,0.6), transparent 70%)',
        'caustics-light':
          'radial-gradient(1200px 600px at 20% 0%, rgba(84,182,218,0.35), transparent 60%), radial-gradient(900px 500px at 90% 20%, rgba(191,230,245,0.6), transparent 60%), radial-gradient(700px 700px at 50% 110%, rgba(230,207,148,0.35), transparent 70%)',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-8px,0)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.7', transform: 'translateX(0)' },
          '50%': { opacity: '1', transform: 'translateX(2%)' },
        },
        rise: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        drift: 'drift 9s ease-in-out infinite',
        shimmer: 'shimmer 14s ease-in-out infinite',
        rise: 'rise 0.8s ease-out both',
      },
      typography: ({ theme }: any) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.slate.700'),
            '--tw-prose-headings': theme('colors.abyss.900'),
            '--tw-prose-links': theme('colors.biolume.600'),
            '--tw-prose-bold': theme('colors.abyss.900'),
            '--tw-prose-quotes': theme('colors.abyss.700'),
            '--tw-prose-quote-borders': theme('colors.biolume.300'),
            '--tw-prose-invert-body': theme('colors.slate.300'),
            '--tw-prose-invert-headings': theme('colors.biolume.100'),
            '--tw-prose-invert-links': theme('colors.biolume.300'),
            '--tw-prose-invert-bold': theme('colors.white'),
            '--tw-prose-invert-quotes': theme('colors.biolume.100'),
            '--tw-prose-invert-quote-borders': theme('colors.biolume.500'),
            maxWidth: '72ch',
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;

