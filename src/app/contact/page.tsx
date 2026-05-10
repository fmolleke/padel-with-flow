'use client';

import { useTranslation } from 'next-i18next';
import { RevealElement } from '@/hooks/useScrollReveal';

export const dynamic = 'force-dynamic';

export default function Contact() {
  const { t } = useTranslation('common');
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <RevealElement id="contact-eyebrow">
            <div className="eyebrow">{t('contact.eyebrow')}</div>
          </RevealElement>
          <RevealElement id="contact-title" delay={1}>
            <h1 className="display page-title">{t('contact.title')}</h1>
          </RevealElement>
          <RevealElement id="contact-subtitle" delay={2}>
            <p className="body-lg page-subtitle">{t('contact.subtitle')}</p>
          </RevealElement>
        </div>
      </section>

      <section className="contact-section">
        <div className="wrap">
          <div className="contact-grid">

            {/* Instagram — primary card, spans 2 rows */}
            <RevealElement id="contact-ig" className="contact-ig-wrapper">
              <a
                className="contact-card primary"
                href="https://instagram.com/fmolleke"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="contact-card-head">
                  <span className="eyebrow" style={{ color: 'inherit', opacity: 0.7 }}>{t('contact.ig')}</span>
                  <svg className="contact-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 15L15 5M15 5H7M15 5V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="contact-handle display">{t('contact.ighandle')}</div>
                <div className="contact-meta">{t('contact.iglabel')}</div>
                <svg className="ig-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
                </svg>
              </a>
            </RevealElement>

            {/* Locations */}
            <RevealElement id="contact-locations" delay={1}>
              <div className="contact-card">
                <div className="eyebrow">{t('contact.locations')}</div>
                <ul className="loc-list">
                  <li><span className="loc-pin"></span><span>{t('contact.loc1')}</span></li>
                  <li><span className="loc-pin"></span><span>{t('contact.loc2')}</span></li>
                </ul>
                <p className="contact-note">{t('contact.locDetail')}</p>
              </div>
            </RevealElement>

            {/* Availability */}
            <RevealElement id="contact-times" delay={2}>
              <div className="contact-card">
                <div className="eyebrow">{t('contact.times')}</div>
                <div className="schedule">
                  <div className="day">
                    <span className="day-letter">M</span>
                    <span className="day-letter">D</span>
                    <span className="day-letter">M</span>
                    <span className="day-letter">D</span>
                    <span className="day-letter">F</span>
                    <span className="day-letter active">S</span>
                    <span className="day-letter active">S</span>
                  </div>
                </div>
                <p className="contact-note">{t('contact.timesDetail')}</p>
              </div>
            </RevealElement>

          </div>
        </div>
      </section>
    </>
  );
}
