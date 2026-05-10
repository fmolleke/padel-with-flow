'use client';

import { useTranslation } from 'next-i18next';
import { RevealElement } from '@/hooks/useScrollReveal';
import { CTASection } from '@/components/sections/CTASection';

export const dynamic = 'force-dynamic';

export default function About() {
  const { t } = useTranslation('common');
  return (
    <>

      {/* Page Head Section */}
      <section className="px-5 md:px-8 pt-24 pb-12 md:pt-[180px] md:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-10 items-end lg:grid-cols-[1.4fr_1fr] lg:gap-20">
            <div>
              <RevealElement id="about-eyebrow">
                <div className="font-mono text-xs tracking-widest font-medium text-fg-muted uppercase mb-6">{t('about.eyebrow')}</div>
              </RevealElement>

              <RevealElement id="about-title" delay={1}>
                <h1
                  className="display font-semibold mb-6 tracking-tight text-fg"
                  style={{ fontSize: 'clamp(64px, 10vw, 160px)', margin: '24px 0', letterSpacing: '-0.05em' }}
                >
                  {t('about.title')}
                </h1>
              </RevealElement>

              <RevealElement id="about-subtitle" delay={2}>
                <p className="text-xl md:text-2xl text-fg max-w-[480px]">{t('about.subtitle')}</p>
              </RevealElement>
            </div>

            <RevealElement id="about-photo" delay={2}>
              <div className="max-w-[380px] mx-auto">
                <div className="aspect-[4/5] bg-bg-elev border border-line-soft rounded-lg flex items-center justify-center">
                  <div className="text-sm text-fg-muted text-center px-4">{t('about.photoPlaceholder')}</div>
                </div>
              </div>
            </RevealElement>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="px-5 md:px-8 pt-[60px]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-10 items-start lg:grid-cols-[1.6fr_1fr] lg:gap-20">
            {/* Story Text */}
            <div className="story-text">
              <RevealElement id="about-p1">
                <p className="text-fg" style={{ fontSize: '22px', lineHeight: '1.45', marginBottom: '28px', maxWidth: '620px' }}>
                  {t('about.p1')}
                </p>
              </RevealElement>

              <RevealElement id="about-p2" delay={1}>
                <p className="text-fg" style={{ fontSize: '22px', lineHeight: '1.45', marginBottom: '28px', maxWidth: '620px' }}>
                  {t('about.p2')}
                </p>
              </RevealElement>

              <RevealElement id="about-p3" delay={2}>
                <p className="text-fg" style={{ fontSize: '22px', lineHeight: '1.45', marginBottom: '28px', maxWidth: '620px' }}>
                  {t('about.p3')}
                </p>
              </RevealElement>
            </div>

            {/* Facts Aside */}
            <RevealElement id="about-facts" delay={2}>
              <aside
                className="bg-bg-elev border border-line-soft rounded-lg p-5 md:p-8 sticky top-[100px]"
              >
                <div className="font-mono text-xs tracking-widest font-medium text-fg-muted uppercase mb-5" style={{ letterSpacing: '0.16em' }}>{t('about.facts')}</div>
                <dl className="facts-list">
                  <div className="fact">
                    <dt className="font-mono text-xs text-fg-muted uppercase" style={{ letterSpacing: '0.1em', paddingTop: '2px' }}>{t('about.cert')}</dt>
                    <dd className="text-base font-medium text-fg">{t('about.certValue')}</dd>
                  </div>
                  <div className="fact">
                    <dt className="font-mono text-xs text-fg-muted uppercase" style={{ letterSpacing: '0.1em', paddingTop: '2px' }}>{t('about.exp')}</dt>
                    <dd className="text-base font-medium text-fg">{t('about.expValue')}</dd>
                  </div>
                  <div className="fact">
                    <dt className="font-mono text-xs text-fg-muted uppercase" style={{ letterSpacing: '0.1em', paddingTop: '2px' }}>{t('about.loc')}</dt>
                    <dd className="text-base font-medium text-fg">{t('about.locValue')}</dd>
                  </div>
                  <div className="fact">
                    <dt className="font-mono text-xs text-fg-muted uppercase" style={{ letterSpacing: '0.1em', paddingTop: '2px' }}>{t('about.lang')}</dt>
                    <dd className="text-base font-medium text-fg">{t('about.langValue')}</dd>
                  </div>
                </dl>
              </aside>
            </RevealElement>
          </div>
        </div>
      </section>

      <CTASection />

      <style>{`
        .facts-list {
          display: flex;
          flex-direction: column;
        }

        .fact {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 16px;
          padding: 14px 0;
          border-top: 1px solid var(--line-soft);
        }

        .fact:first-child {
          border-top: none;
        }
      `}</style>
    </>
  );
}
