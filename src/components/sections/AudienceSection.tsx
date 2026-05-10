'use client';

import { useTranslation } from 'next-i18next';
import { RevealElement } from '@/hooks/useScrollReveal';

export function AudienceSection() {
  const { t } = useTranslation('common');

  const audiences = [
    { key: '1', num: 'A', tag: 'START', title: t('audience.1.title'), body: t('audience.1.body') },
    { key: '2', num: 'B', tag: 'GROW', title: t('audience.2.title'), body: t('audience.2.body') },
    { key: '3', num: 'C', tag: 'COMPETE', title: t('audience.3.title'), body: t('audience.3.body') },
  ];

  return (
    <section className="audience">
      <div className="wrap">
        <div className="section-head">
          <RevealElement id="audience-eyebrow">
            <div className="eyebrow">{t('audience.eyebrow')}</div>
          </RevealElement>
          <RevealElement id="audience-title" delay={1}>
            <h2 className="display section-title">{t('audience.title')}</h2>
          </RevealElement>
        </div>

        <div className="audience-grid">
          {audiences.map((aud, idx) => (
            <RevealElement key={aud.key} id={`audience-${aud.key}`} delay={idx}>
              <div className="aud-row reveal">
                <div className="aud-key">
                  <span className="aud-num">{aud.num}</span>
                  <h3 className="display">{aud.title}</h3>
                </div>
                <p>{aud.body}</p>
                <div className="aud-tag">{aud.tag}</div>
              </div>
            </RevealElement>
          ))}
        </div>
      </div>
    </section>
  );
}
