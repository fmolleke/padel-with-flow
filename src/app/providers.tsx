'use client';

import { ReactNode, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from '@/context/ThemeContext';
import { ClientNavigation } from './client-navigation';
import { Footer } from '@/components/Footer';
import i18n from '@/i18n/client';

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    const match = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]*)/);
    const locale = match?.[1] ?? 'de';
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <ClientNavigation />
        <main>{children}</main>
        <Footer />
      </ThemeProvider>
    </I18nextProvider>
  );
}
