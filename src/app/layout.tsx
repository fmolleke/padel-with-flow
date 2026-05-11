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
    'Padel Training in Osnabrück und Ibbenbüren mit Florian Molleker. Zertifizierter C-Trainer. Einzel- und Gruppentraining für Anfänger, Fortgeschrittene und Turnierspieler.',
  keywords: [
    'Padel Trainer Osnabrück',
    'Padel Training Osnabrück',
    'Padel Coach Osnabrück',
    'Padel Ibbenbüren',
    'Padel Stunden',
    'Padel Lernen Osnabrück',
    'Padel C-Trainer',
  ],
  authors: [{ name: 'Florian Molleker' }],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: 'Padel Training Osnabrück — Florian Molleker',
    title: 'Padel Training in Osnabrück — Florian Molleker',
    description:
      'Zertifizierter Padel-Trainer in Osnabrück und Ibbenbüren. Einzel- und Gruppentraining für jedes Level.',
    url: BASE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Padel Training in Osnabrück — Florian Molleker',
    description:
      'Zertifizierter Padel-Trainer in Osnabrück und Ibbenbüren. Einzel- und Gruppentraining für jedes Level.',
  },
  alternates: {
    canonical: BASE_URL,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Padel Training Florian Molleker',
  description: 'Zertifizierter C-Trainer für Padel in Osnabrück und Ibbenbüren.',
  url: BASE_URL,
  sameAs: ['https://instagram.com/padelwithflow'],
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
  knowsAbout: 'Padel Tennis Training',
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
