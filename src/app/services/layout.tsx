import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Leistungen & Preise',
  description:
    'Padel-Training in Osnabrück und Ibbenbüren. Transparente Preise pro Person und Stunde: Einzeltraining 40 €, Duo 20 €, Kleingruppe 15 €, Quartett 12,50 €. Ohne versteckte Pakete.',
  keywords: [
    'Padel Training Preise Osnabrück',
    'Padel Stunden buchen',
    'Padel Einzeltraining Osnabrück',
    'Padel Gruppentraining Osnabrück',
  ],
  openGraph: {
    title: 'Padel Training — Preise & Leistungen Osnabrück',
    description:
      'Transparente Preise. Einzel- und Gruppentraining für jedes Level.',
    url: 'https://padelwithflow.de/services',
  },
  alternates: {
    canonical: 'https://padelwithflow.de/services',
  },
};

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
