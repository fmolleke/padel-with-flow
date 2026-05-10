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

            {/* WhatsApp card */}
            <RevealElement id="contact-wa" delay={1}>
              <a
                className="contact-card whatsapp"
                href="https://wa.me/491733910266"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="contact-card-head">
                  <span className="eyebrow" style={{ color: 'inherit', opacity: 0.7 }}>{t('contact.wa')}</span>
                  <svg className="contact-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 15L15 5M15 5H7M15 5V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="contact-handle display">+49 173 3910266</div>
                <div className="contact-meta">{t('contact.walabel')}</div>
                <svg className="wa-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </RevealElement>

            {/* Playtomic — secondary card */}
            <RevealElement id="contact-pt" delay={2}>
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

            {/* Availability */}
            <RevealElement id="contact-times" delay={4}>
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
