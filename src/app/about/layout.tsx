import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Über mich',
  description:
    'Florian Molleker — zertifizierter DPV C-Trainer für Padel in Osnabrück und Ibbenbüren. Playtomic Level 5, über 2 Jahre Spielerfahrung. Strukturiertes Training, ehrliches Feedback.',
  keywords: [
    'Florian Molleker Padel',
    'Padel Trainer Osnabrück',
    'DPV C-Trainer Padel',
    'Padel Coach Ibbenbüren',
    'Padel Trainer Zertifizierung',
    'Padel Trainer Erfahrung Osnabrück',
  ],
  openGraph: {
    title: 'Über Florian Molleker — Zertifizierter Padel Trainer Osnabrück',
    description:
      'DPV zertifizierter C-Trainer. Playtomic Level 5. Strukturiertes Padel-Training in Osnabrück und Ibbenbüren — für alle Levels.',
    url: 'https://padelwithflow.de/about',
  },
  twitter: {
    title: 'Über Florian Molleker — Zertifizierter Padel Trainer Osnabrück',
    description:
      'DPV zertifizierter C-Trainer. Strukturiertes Padel-Training in Osnabrück und Ibbenbüren.',
  },
  alternates: {
    canonical: 'https://padelwithflow.de/about',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Florian Molleker',
  jobTitle: 'Padel Trainer',
  url: 'https://padelwithflow.de/about',
  sameAs: ['https://instagram.com/padelwithflow'],
  worksFor: {
    '@type': 'SportsActivityLocation',
    name: 'Padel Training Florian Molleker',
    url: 'https://padelwithflow.de',
  },
  knowsAbout: ['Padel Tennis', 'Padel Training', 'Padel Technik', 'Padel Taktik'],
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    name: 'DPV C-Trainer Lizenz Padel',
    credentialCategory: 'Certification',
    dateCreated: '2026-02-17',
    recognizedBy: {
      '@type': 'Organization',
      name: 'Deutscher Padel Verband (DPV)',
    },
  },
};

export default function AboutLayout({ children }: { children: ReactNode }) {
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
