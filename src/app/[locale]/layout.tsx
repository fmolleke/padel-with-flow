import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/context/ThemeContext';
import { NavigationWrapper } from '@/components/NavigationWrapper';
import { Footer } from '@/components/Footer';
import '@/styles/globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' });

const BASE_URL = 'https://padelwithflow.de';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isDE = locale === 'de';

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      template: '%s — Padel Training Osnabrück · Florian Molleker',
      default: isDE
        ? 'Padel Training in Osnabrück und Ibbenbüren — Florian Molleker · Padel Trainer'
        : 'Padel Training Osnabrück and Ibbenbüren — Florian Molleker · Padel Coach',
    },
    description: isDE
      ? 'Padel Training in Osnabrück und Ibbenbüren mit Florian Molleker. Zertifizierter DPV C-Trainer. Einzeltraining ab 40 €, Duo ab 20 € pro Person. Für Anfänger, Fortgeschrittene und Turnierspieler.'
      : 'Padel training in Osnabrück and Ibbenbüren with Florian Molleker. Certified DPV C-Trainer. Individual training from €40, duo from €20 per person. For beginners, advanced players and competitors.',
    keywords: isDE
      ? [
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
        ]
      : [
          'Padel Coach Osnabrück',
          'Padel Training Osnabrück',
          'Padel Lessons Osnabrück',
          'Padel Ibbenbüren',
          'Padel Coaching Germany',
          'DPV Certified Padel Trainer',
          'Padel Individual Training',
          'Padel Group Training Osnabrück',
        ],
    authors: [{ name: 'Florian Molleker' }],
    creator: 'Florian Molleker',
    robots: { index: true, follow: true },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        de: `${BASE_URL}/de`,
        en: `${BASE_URL}/en`,
        'x-default': `${BASE_URL}/de`,
      },
    },
    openGraph: {
      type: 'website',
      locale: isDE ? 'de_DE' : 'en_GB',
      alternateLocale: isDE ? ['en_GB'] : ['de_DE'],
      siteName: 'Padel Training Osnabrück und Ibbenbüren — Florian Molleker',
      title: isDE
        ? 'Padel Training in Osnabrück und Ibbenbüren — Florian Molleker'
        : 'Padel Training Osnabrück and Ibbenbüren — Florian Molleker',
      description: isDE
        ? 'Zertifizierter DPV C-Trainer in Osnabrück und Ibbenbüren. Einzeltraining ab 40 €, Duo ab 20 € pro Person. Strukturiert, ehrlich, mit Spaß.'
        : 'Certified DPV C-Trainer in Osnabrück and Ibbenbüren. Individual training from €40, duo from €20 per person. Structured, honest, fun.',
      url: `${BASE_URL}/${locale}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: isDE
        ? 'Padel Training in Osnabrück und Ibbenbüren — Florian Molleker'
        : 'Padel Training Osnabrück and Ibbenbüren — Florian Molleker',
      description: isDE
        ? 'Zertifizierter DPV C-Trainer in Osnabrück und Ibbenbüren. Einzeltraining ab 40 €, Duo ab 20 € pro Person.'
        : 'Certified DPV C-Trainer in Osnabrück and Ibbenbüren. Individual training from €40, duo from €20 per person.',
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'de' | 'en')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${geist.variable} ${geistMono.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/theme-init.js" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <NavigationWrapper />
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
