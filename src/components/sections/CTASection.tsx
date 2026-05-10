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
              <Button href="https://wa.me/491733910266" target="_blank" rel="noopener noreferrer" variant="primary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.7-1.7-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zm-5.4 7.4c-1.7 0-3.4-.5-4.9-1.4l-.4-.2-3.6.9 1-3.6-.2-.4a9.9 9.9 0 0 1-1.5-5.3c0-5.5 4.4-9.9 9.9-9.9 2.6 0 5.1 1 7 2.9a9.9 9.9 0 0 1 2.9 7c0 5.5-4.5 10-9.9 10zM20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.5 0 .2 5.3.2 11.9c0 2.1.5 4.1 1.6 5.9L.1 24l6.3-1.7c1.7 1 3.7 1.4 5.7 1.4 6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.5-8.4z"/>
                </svg>
                <span>WhatsApp</span>
                <ArrowIcon />
              </Button>
              <Button href="https://app.playtomic.io/profile/user/5473961" target="_blank" rel="noopener noreferrer" variant="ghost">
                <img src="/assets/playtomic_logo_white.png" alt="Playtomic" width="24" height="24" style={{ display: 'block', flexShrink: 0 }} />
                <span>Playtomic</span>
              </Button>
              <Button href="https://instagram.com/fmolleke" target="_blank" rel="noopener noreferrer" variant="ghost">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/>
                </svg>
                <span>Instagram</span>
              </Button>
            </div>
          </div>
        </RevealElement>
      </div>
    </section>
  );
}
