'use client';

import { useTranslations } from 'next-intl';
import { RevealElement } from '@/hooks/useScrollReveal';

export default function Impressum() {
  const t = useTranslations();
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <RevealElement id="imprint-eyebrow">
            <div className="eyebrow">{t('impressum.eyebrow')}</div>
          </RevealElement>
          <RevealElement id="imprint-title" delay={1}>
            <h1 className="display imprint-title">{t('impressum.title')}</h1>
          </RevealElement>
        </div>
      </section>

      <section className="legal">
        <div className="wrap">
          <div className="legal-grid">
            <RevealElement id="imprint-contact">
              <div className="legal-block">
                <div className="legal-label">{t('impressum.contact')}</div>
                <div className="legal-content">
                  <p><strong>{t('impressum.name')}</strong></p>
                  <p>{t('impressum.placeholder')}</p>
                  <p style={{ marginTop: '12px' }}>
                    <a href="https://instagram.com/padelwithflow" target="_blank" rel="noopener noreferrer">
                      Instagram · @padelwithflow
                    </a>
                  </p>
                </div>
              </div>
            </RevealElement>

            <RevealElement id="imprint-disclaimer" delay={1}>
              <div className="legal-block">
                <div className="legal-label">{t('impressum.disclaimer.title')}</div>
                <div className="legal-content">
                  <p>{t('impressum.disclaimer.body')}</p>
                </div>
              </div>
            </RevealElement>
          </div>
        </div>
      </section>
    </>
  );
}
