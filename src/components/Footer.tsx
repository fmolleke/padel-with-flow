'use client';

import { useTranslation } from 'next-i18next';
import Link from 'next/link';

export function Footer() {
  const { t } = useTranslation('common');
  return (
    <footer className="border-t border-line-soft mt-10 pt-10 pb-8 px-5 md:px-8 md:mt-[60px] md:pt-[60px] md:pb-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-8 mb-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:mb-[60px]">
          {/* Brand */}
          <div>
            <div className="font-display text-2xl lg:text-4xl font-semibold tracking-tight leading-tight mb-3">
              padel with flow.
            </div>
            <div className="text-sm text-fg-muted max-w-xs">{t('footer.tagline')}</div>
          </div>

          {/* Pages */}
          <div>
            <h4 className="font-mono text-xs tracking-widest font-medium text-fg-muted uppercase mb-4">{t('footer.pages')}</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/" className="text-fg hover:text-accent transition-colors">
                {t('nav.home')}
              </Link>
              <Link href="/about" className="text-fg hover:text-accent transition-colors">
                {t('nav.about')}
              </Link>
              <Link href="/services" className="text-fg hover:text-accent transition-colors">
                {t('nav.services')}
              </Link>
              <Link href="/contact" className="text-fg hover:text-accent transition-colors">
                {t('nav.contact')}
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-xs tracking-widest font-medium text-fg-muted uppercase mb-4">{t('footer.contact')}</h4>
            <div className="flex flex-col gap-2 text-sm">
              <a href="https://instagram.com/padelwithflow" target="_blank" rel="noopener noreferrer" className="text-fg hover:text-accent transition-colors">
                Instagram · @padelwithflow
              </a>
              <a href="https://app.playtomic.io/profile/user/5473961" target="_blank" rel="noopener noreferrer" className="text-fg hover:text-accent transition-colors">
                Playtomic
              </a>
              <span className="text-fg-muted">{t('footer.based')}</span>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-mono text-xs tracking-widest font-medium text-fg-muted uppercase mb-4">{t('footer.legal')}</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/impressum" className="text-fg hover:text-accent transition-colors">
                {t('footer.imprint')}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex justify-between items-center pt-[30px] border-t border-line-soft font-mono text-xs text-fg-faint dark:text-fg-muted tracking-wider">
          <span>{t('footer.copy')}</span>
          <span>{t('footer.based')}</span>
        </div>
      </div>
    </footer>
  );
}
