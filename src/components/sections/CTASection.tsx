'use client';

import { useTranslations } from 'next-intl';
import { RevealElement } from '@/hooks/useScrollReveal';
import { Button } from '@/components/Button';

export function CTASection() {
  const t = useTranslations();
  return (
    <section className="big-cta">
      <div className="wrap">
        <RevealElement id="cta-card">
          <div className="cta-card reveal">
            <h2 className="display cta-title">{t('cta.title')}</h2>
            <p className="body-lg cta-body">{t('cta.body')}</p>

            <div className="cta-actions">
              <Button href="https://instagram.com/padelwithflow" target="_blank" rel="noopener noreferrer" variant="primary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/>
                </svg>
                <span>Instagram</span>
              </Button>
              <Button href="https://app.playtomic.io/profile/user/5473961" target="_blank" rel="noopener noreferrer" variant="ghost">
                <img src="/assets/playtomic_logo_white.png" alt="Playtomic" width="24" height="24" style={{ display: 'block', flexShrink: 0 }} />
                <span>Playtomic</span>
              </Button>
            </div>
          </div>
        </RevealElement>
      </div>
    </section>
  );
}
