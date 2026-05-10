import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Impressum',
  description:
    'Impressum und rechtliche Hinweise — Padel Training Florian Molleker, Osnabrück und Ibbenbüren.',
  robots: { index: false, follow: true },
  alternates: {
    canonical: 'https://padelwithflow.de/impressum',
  },
};

export default function ImpressumLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
