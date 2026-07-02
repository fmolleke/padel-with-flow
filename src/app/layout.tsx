import type { ReactNode } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import { getLocale } from 'next-intl/server';
import '@/styles/globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' });

const BASE_URL = 'https://padelwithflow.de';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsActivityLocation',
  name: 'Padel Training Florian Molleker',
  description:
    'Zertifizierter DPV C-Trainer für Padel in Osnabrück und Ibbenbüren. Einzel- und Gruppentraining für alle Levels.',
  url: BASE_URL,
  sameAs: ['https://instagram.com/padelwithflow'],
  founder: {
    '@type': 'Person',
    name: 'Florian Molleker',
    jobTitle: 'Padel Trainer',
    url: `${BASE_URL}/de/about`,
  },
  sport: 'Padel',
  address: [
    {
      '@type': 'PostalAddress',
      addressLocality: 'Osnabrück',
      addressRegion: 'Niedersachsen',
      addressCountry: 'DE',
    },
    {
      '@type': 'PostalAddress',
      addressLocality: 'Ibbenbüren',
      addressRegion: 'Nordrhein-Westfalen',
      addressCountry: 'DE',
    },
  ],
  priceRange: '€€',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Padel Trainingspakete',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Einzeltraining',
        description: '1 Person - strukturierte Einheit mit klarem Fokus',
        price: '40.00',
        priceCurrency: 'EUR',
        unitText: 'pro Person & Stunde',
      },
      {
        '@type': 'Offer',
        name: 'Duo Training',
        description: '2 Personen - pro Person und Stunde',
        price: '20.00',
        priceCurrency: 'EUR',
        unitText: 'pro Person & Stunde',
      },
      {
        '@type': 'Offer',
        name: 'Kleingruppe',
        description: '3 Personen - pro Person und Stunde',
        price: '15.00',
        priceCurrency: 'EUR',
        unitText: 'pro Person & Stunde',
      },
      {
        '@type': 'Offer',
        name: 'Quartett',
        description: '4 Personen - pro Person und Stunde',
        price: '12.50',
        priceCurrency: 'EUR',
        unitText: 'pro Person & Stunde',
      },
    ],
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  return (
    <html
      lang={locale}
      className={`${geist.variable} ${geistMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <Script src="/theme-init.js" strategy="beforeInteractive" />
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
