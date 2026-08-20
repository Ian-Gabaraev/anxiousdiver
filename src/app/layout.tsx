import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { site } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.defaultTitle, template: site.titleTemplate },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.author.name, url: site.author.url }],
  creator: site.author.name,
  publisher: site.author.name,
  keywords: [
    'scuba diving', 'anxiety', 'fear of diving', 'technical diving',
    'tec diving', 'panic underwater', 'dive psychology', 'Ian Gabaraev',
  ],
  openGraph: {
    type: 'website',
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: site.defaultTitle,
    description: site.description,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.defaultTitle,
    description: site.description,
    images: [site.ogImage],
  },
  alternates: {
    canonical: site.url,
    types: { 'application/rss+xml': '/rss.xml' },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f3fbff' },
    { media: '(prefers-color-scheme: dark)',  color: '#02060d' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            '@id': `${site.url}/#website`,
            name: site.name,
            url: site.url,
            description: site.description,
            inLanguage: 'en',
            publisher: { '@id': `${site.url}/#person` },
            author: { '@id': `${site.url}/#person` },
          }}
        />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Person',
            '@id': `${site.url}/#person`,
            name: site.author.name,
            url: site.author.url,
            jobTitle: 'Lead Full-Stack Engineer',
            description:
              'Lead full-stack engineer and technical diver. Writes about anxiety, fear, and the mental side of scuba diving at anxiousdiver.com.',
            sameAs: [
              site.author.website,
              site.author.instagram,
              site.author.pexels,
              'https://nomadatlas.dev',
              site.url,
            ].filter(Boolean),
          }}
        />
      </body>
    </html>
  );
}

