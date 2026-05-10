import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Über mich',
  description:
    'Florian Molleker — zertifizierter C-Trainer für Padel in Osnabrück und Ibbenbüren. Über 2 Jahre Spielerfahrung. Strukturiertes Training mit klarem Fokus.',
  keywords: [
    'Padel Trainer Osnabrück',
    'Florian Molleker',
    'C-Trainer Padel',
    'Padel Coach Ibbenbüren',
  ],
  openGraph: {
    title: 'Über Florian Molleker — Padel Trainer Osnabrück',
    description:
      'Zertifizierter C-Trainer. Strukturiertes Padel-Training in Osnabrück und Ibbenbüren.',
    url: 'https://padelwithflow.de/about',
  },
  alternates: {
    canonical: 'https://padelwithflow.de/about',
  },
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
