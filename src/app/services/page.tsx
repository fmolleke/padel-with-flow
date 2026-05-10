'use client';

import { useTranslation } from 'next-i18next';
import { RevealElement } from '@/hooks/useScrollReveal';
import { CTASection } from '@/components/sections/CTASection';

export const dynamic = 'force-dynamic';

export default function Services() {
  const { t } = useTranslation('common');
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <RevealElement id="services-eyebrow">
            <div className="eyebrow">{t('services.eyebrow')}</div>
          </RevealElement>
          <RevealElement id="services-title" delay={1}>
            <h1 className="display page-title">{t('services.title')}</h1>
          </RevealElement>
          <RevealElement id="services-subtitle" delay={2}>
            <p className="body-lg page-subtitle">{t('services.subtitle')}</p>
          </RevealElement>
        </div>
      </section>

      <section className="prices">
        <div className="wrap">
          <div className="price-grid">
            <RevealElement id="service-1">
              <article className="price-card" data-tier="1">
                <div className="price-num">01</div>
                <h3 className="display price-name">{t('services.s1.title')}</h3>
                <div className="price-sub">{t('services.s1.subtitle')}</div>
                <div className="price-amount">
                  <span className="price-value display">{t('services.s1.price')}</span>
                  <span className="price-unit">{t('services.unit')}</span>
                </div>
                <a className="price-cta" href="/contact">
                  <span>{t('home.cta1')}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10m0 0L8 3m4 4L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </a>
              </article>
            </RevealElement>

            <RevealElement id="service-2" delay={1}>
              <article className="price-card" data-tier="2">
                <div className="price-num">02</div>
                <h3 className="display price-name">{t('services.s2.title')}</h3>
                <div className="price-sub">{t('services.s2.subtitle')}</div>
                <div className="price-amount">
                  <span className="price-value display">{t('services.s2.price')}</span>
                  <span className="price-unit">{t('services.unit')}</span>
                </div>
                <a className="price-cta" href="/contact">
                  <span>{t('home.cta1')}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10m0 0L8 3m4 4L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </a>
              </article>
            </RevealElement>

            <RevealElement id="service-3" delay={2}>
              <article className="price-card" data-tier="3">
                <div className="price-num">03</div>
                <h3 className="display price-name">{t('services.s3.title')}</h3>
                <div className="price-sub">{t('services.s3.subtitle')}</div>
                <div className="price-amount">
                  <span className="price-value display">{t('services.s3.price')}</span>
                  <span className="price-unit">{t('services.unit')}</span>
                </div>
                <a className="price-cta" href="/contact">
                  <span>{t('home.cta1')}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10m0 0L8 3m4 4L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </a>
              </article>
            </RevealElement>

            <RevealElement id="service-4" delay={3}>
              <article className="price-card highlight" data-tier="4">
                <div className="price-num">04</div>
                <h3 className="display price-name">{t('services.s4.title')}</h3>
                <div className="price-sub">{t('services.s4.subtitle')}</div>
                <div className="price-amount">
                  <span className="price-value display">{t('services.s4.price')}</span>
                  <span className="price-unit">{t('services.unit')}</span>
                </div>
                <a className="price-cta" href="/contact">
                  <span>{t('home.cta1')}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10m0 0L8 3m4 4L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </a>
              </article>
            </RevealElement>
          </div>
        </div>
      </section>

      <section className="includes">
        <div className="wrap">
          <div className="includes-grid">
            <RevealElement id="includes-included">
              <div>
                <div className="eyebrow">{t('services.included')}</div>
                <ul className="check-list">
                  <li><span className="check">✓</span><span>{t('services.inc1')}</span></li>
                  <li><span className="check">✓</span><span>{t('services.inc2')}</span></li>
                  <li><span className="check">✓</span><span>{t('services.inc3')}</span></li>
                  <li><span className="check">✓</span><span>{t('services.inc4')}</span></li>
                </ul>
              </div>
            </RevealElement>
            <RevealElement id="includes-not-included" delay={1}>
              <div>
                <div className="eyebrow">{t('services.notIncluded')}</div>
                <ul className="check-list muted">
                  <li><span className="check">—</span><span>{t('services.ni1')}</span></li>
                  <li><span className="check">—</span><span>{t('services.ni2')}</span></li>
                </ul>
              </div>
            </RevealElement>
          </div>
        </div>
      </section>

      <section className="process">
        <div className="wrap">
          <div className="process-head reveal">
            <RevealElement id="process-eyebrow">
              <div className="eyebrow">{t('services.process.eyebrow')}</div>
            </RevealElement>
            <RevealElement id="process-title" delay={1}>
              <h2 className="display process-title">{t('services.process.title')}</h2>
            </RevealElement>
          </div>
          <ol className="process-list">
            {[1, 2, 3, 4, 5].map((n, i) => (
              <RevealElement key={n} id={`process-step-${n}`} delay={i}>
                <li className="process-step">
                  <div className="step-num">{String(n).padStart(2, '0')}</div>
                  <div className="step-body">
                    <h3 className="display step-title">{t(`services.process.${n}.title`)}</h3>
                    <p className="step-text">{t(`services.process.${n}.body`)}</p>
                  </div>
                </li>
              </RevealElement>
            ))}
          </ol>
        </div>
      </section>

      <CTASection />
    </>
  );
}
