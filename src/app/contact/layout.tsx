import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Padel-Stunde anfragen in Osnabrück oder Ibbenbüren. Schreib Florian Molleker auf Instagram @padelwithflow oder via Playtomic — Antwort meist am selben Tag.',
  keywords: [
    'Padel Training anfragen Osnabrück',
    'Padel Trainer Kontakt Osnabrück',
    'Padel Stunde buchen Osnabrück',
    'Padel Training anfragen Ibbenbüren',
    'Padel Coach kontaktieren',
  ],
  openGraph: {
    title: 'Kontakt — Padel Training in Osnabrück & Ibbenbüren anfragen',
    description:
      'Schreib Florian auf Instagram @padelwithflow oder via Playtomic. Kurz dein Level, Ort und Wunschtermin — Antwort meist am selben Tag.',
    url: 'https://padelwithflow.de/contact',
  },
  twitter: {
    title: 'Kontakt — Padel Training in Osnabrück & Ibbenbüren anfragen',
    description:
      'Schreib auf Instagram @padelwithflow oder via Playtomic. Antwort meist am selben Tag.',
  },
  alternates: {
    canonical: 'https://padelwithflow.de/contact',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Kontakt — Padel Training Florian Molleker',
  url: 'https://padelwithflow.de/contact',
  description: 'Padel-Stunde anfragen in Osnabrück oder Ibbenbüren.',
  mainEntity: {
    '@type': 'SportsActivityLocation',
    name: 'Padel Training Florian Molleker',
    url: 'https://padelwithflow.de',
    sameAs: ['https://instagram.com/padelwithflow'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['German', 'English'],
    },
    areaServed: [
      { '@type': 'City', name: 'Osnabrück' },
      { '@type': 'City', name: 'Ibbenbüren' },
    ],
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
