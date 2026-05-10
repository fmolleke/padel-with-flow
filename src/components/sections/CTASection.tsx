'use client';

import { useTranslation } from 'next-i18next';
import { RevealElement } from '@/hooks/useScrollReveal';
import { Button } from '@/components/Button';
import ArrowIcon from '@/components/icons/ArrowIcon';

export function CTASection() {
  const { t } = useTranslation('common');
  return (
    <section className="big-cta">
      <div className="wrap">
        <RevealElement id="cta-card">
          <div className="cta-card reveal">
            <h2 className="display cta-title">{t('cta.title')}</h2>
            <p className="body-lg cta-body">{t('cta.body')}</p>

            <div className="cta-actions">
              <Button href="https://instagram.com/fmolleke" target="_blank" rel="noopener noreferrer" variant="primary">
                <span>@fmolleke</span>
                <ArrowIcon />
              </Button>
              <Button href="/services" variant="ghost">
                <span>{t('nav.services')}</span>
              </Button>
            </div>
          </div>
        </RevealElement>
      </div>
    </section>
  );
}
