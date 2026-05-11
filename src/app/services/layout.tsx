import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Leistungen & Preise',
  description:
    'Padel-Training in Osnabrück und Ibbenbüren. Transparente Preise: Einzeltraining 40 €, Duo 20 €, Kleingruppe 15 €, Quartett 12,50 € — jeweils pro Person und Stunde. Kein Paket-Zwang.',
  keywords: [
    'Padel Training Preise Osnabrück',
    'Padel Einzeltraining Osnabrück',
    'Padel Gruppentraining Osnabrück',
    'Padel Kurs buchen Osnabrück',
    'Padel Training Kosten',
    'Padel Stunde Preis',
    'Padel Training Ibbenbüren Preis',
  ],
  openGraph: {
    title: 'Padel Training Preise — Einzeltraining ab 40 €, Gruppe ab 12,50 €',
    description:
      'Transparente Preise pro Person und Stunde in Osnabrück und Ibbenbüren. Einzeltraining 40 €, Duo 20 €, Kleingruppe 15 €, Quartett 12,50 €.',
    url: 'https://padelwithflow.de/services',
  },
  twitter: {
    title: 'Padel Training Preise — Einzeltraining ab 40 €, Gruppe ab 12,50 €',
    description:
      'Transparente Preise pro Person und Stunde. Einzeltraining 40 €, Duo 20 €, Kleingruppe 15 €, Quartett 12,50 €.',
  },
  alternates: {
    canonical: 'https://padelwithflow.de/services',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Padel Training Osnabrück & Ibbenbüren',
  description:
    'Zertifiziertes Padel-Training durch DPV C-Trainer Florian Molleker. Einzel- und Gruppentraining für alle Levels.',
  url: 'https://padelwithflow.de/services',
  provider: {
    '@type': 'Person',
    name: 'Florian Molleker',
    url: 'https://padelwithflow.de/about',
  },
  areaServed: [
    { '@type': 'City', name: 'Osnabrück' },
    { '@type': 'City', name: 'Ibbenbüren' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Padel Trainingspakete',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Einzeltraining',
        description: 'Padel Einzeltraining — 1 Person, strukturierte Einheit mit klarem Fokus',
        price: '40.00',
        priceCurrency: 'EUR',
        unitText: 'pro Person & Stunde',
        seller: { '@type': 'Person', name: 'Florian Molleker' },
      },
      {
        '@type': 'Offer',
        name: 'Duo Training',
        description: 'Padel Duo Training — 2 Personen, pro Person und Stunde',
        price: '20.00',
        priceCurrency: 'EUR',
        unitText: 'pro Person & Stunde',
        seller: { '@type': 'Person', name: 'Florian Molleker' },
      },
      {
        '@type': 'Offer',
        name: 'Kleingruppe',
        description: 'Padel Kleingruppe — 3–4 Personen, pro Person und Stunde',
        price: '15.00',
        priceCurrency: 'EUR',
        unitText: 'pro Person & Stunde',
        seller: { '@type': 'Person', name: 'Florian Molleker' },
      },
      {
        '@type': 'Offer',
        name: 'Quartett',
        description: 'Padel Quartett — 4 Personen, pro Person und Stunde',
        price: '12.50',
        priceCurrency: 'EUR',
        unitText: 'pro Person & Stunde',
        seller: { '@type': 'Person', name: 'Florian Molleker' },
      },
    ],
  },
};

export default function ServicesLayout({ children }: { children: ReactNode }) {
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
