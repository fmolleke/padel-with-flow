import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Padel-Stunde anfragen in Osnabrück oder Ibbenbüren. Schreib Florian Molleker auf Instagram @padelwithflow — Antwort meist am selben Tag.',
  keywords: [
    'Padel Trainer Kontakt Osnabrück',
    'Padel Stunde anfragen',
    'Padel buchen Osnabrück',
  ],
  openGraph: {
    title: 'Kontakt — Padel Training Osnabrück',
    description:
      'Padel-Stunde anfragen in Osnabrück oder Ibbenbüren. Schreib mir auf Instagram — Antwort meist am selben Tag.',
    url: 'https://padelwithflow.de/contact',
  },
  alternates: {
    canonical: 'https://padelwithflow.de/contact',
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
