import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Providers } from './providers';
import '@/styles/globals.css';

const BASE_URL = 'https://padelwithflow.de';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: '%s — Padel Training Osnabrück · Florian Molleker',
    default: 'Padel Training in Osnabrück — Florian Molleker · Padel Trainer',
  },
  description:
    'Padel Training in Osnabrück und Ibbenbüren mit Florian Molleker. Zertifizierter DPV C-Trainer. Einzeltraining ab 40 €, Duo ab 20 € pro Person. Für Anfänger, Fortgeschrittene und Turnierspieler.',
  keywords: [
    'Padel Trainer Osnabrück',
    'Padel Training Osnabrück',
    'Padel Coach Osnabrück',
    'Padel Ibbenbüren',
    'Padel Stunden buchen',
    'Padel Kurs Osnabrück',
    'Padel Lernen Osnabrück',
    'Padel C-Trainer DPV',
    'Padel Einzeltraining Osnabrück',
    'Padel Gruppentraining Osnabrück',
  ],
  authors: [{ name: 'Florian Molleker' }],
  creator: 'Florian Molleker',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: 'Padel Training Osnabrück — Florian Molleker',
    title: 'Padel Training in Osnabrück — Florian Molleker',
    description:
      'Zertifizierter DPV C-Trainer in Osnabrück und Ibbenbüren. Einzeltraining ab 40 €, Duo ab 20 € pro Person. Strukturiert, ehrlich, mit Spaß.',
    url: BASE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Padel Training in Osnabrück — Florian Molleker',
    description:
      'Zertifizierter DPV C-Trainer in Osnabrück und Ibbenbüren. Einzeltraining ab 40 €, Duo ab 20 € pro Person.',
  },
  alternates: {
    canonical: BASE_URL,
  },
};

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
    url: `${BASE_URL}/about`,
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
        description: '1 Person — strukturierte Einheit mit klarem Fokus',
        price: '40.00',
        priceCurrency: 'EUR',
        unitText: 'pro Person & Stunde',
      },
      {
        '@type': 'Offer',
        name: 'Duo Training',
        description: '2 Personen — pro Person und Stunde',
        price: '20.00',
        priceCurrency: 'EUR',
        unitText: 'pro Person & Stunde',
      },
      {
        '@type': 'Offer',
        name: 'Kleingruppe',
        description: '3–4 Personen — pro Person und Stunde',
        price: '15.00',
        priceCurrency: 'EUR',
        unitText: 'pro Person & Stunde',
      },
      {
        '@type': 'Offer',
        name: 'Quartett',
        description: '4 Personen — pro Person und Stunde',
        price: '12.50',
        priceCurrency: 'EUR',
        unitText: 'pro Person & Stunde',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
