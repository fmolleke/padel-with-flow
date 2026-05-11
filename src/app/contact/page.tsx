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

            {/* Instagram — primary card */}
            <RevealElement id="contact-ig">
              <a
                className="contact-card primary"
                href="https://instagram.com/padelwithflow"
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

            {/* Playtomic — secondary card */}
            <RevealElement id="contact-pt" delay={1}>
              <a
                className="contact-card secondary"
                href="https://app.playtomic.io/profile/user/5473961"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="contact-card-head">
                  <span className="eyebrow" style={{ color: 'inherit', opacity: 0.7 }}>{t('contact.pt')}</span>
                  <svg className="contact-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 15L15 5M15 5H7M15 5V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="contact-handle display">{t('contact.pthandle')}</div>
                <div className="contact-meta">{t('contact.ptlabel')}</div>
                <svg className="pt-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                  <path d="M4 5h16v11a2 2 0 0 1-2 2h-7l-4 3v-3H6a2 2 0 0 1-2-2V5z" />
                  <circle cx="9" cy="11" r="1" fill="currentColor" />
                  <circle cx="12" cy="11" r="1" fill="currentColor" />
                  <circle cx="15" cy="11" r="1" fill="currentColor" />
                </svg>
              </a>
            </RevealElement>

            {/* Locations */}
            <RevealElement id="contact-locations" delay={3}>
              <div className="contact-card">
                <div className="eyebrow">{t('contact.locations')}</div>
                <ul className="loc-list">
                  <li><span className="loc-pin"></span><span>{t('contact.loc1')}</span></li>
                  <li><span className="loc-pin"></span><span>{t('contact.loc2')}</span></li>
                </ul>
                <p className="contact-note">{t('contact.locDetail')}</p>
              </div>
            </RevealElement>

          </div>
        </div>
      </section>
    </>
  );
}
