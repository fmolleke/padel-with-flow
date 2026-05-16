'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { RevealElement } from '@/hooks/useScrollReveal';
import { CTASection } from '@/components/sections/CTASection';

export default function About() {
  const t = useTranslations();
  return (
    <>

      {/* Page Head Section */}
      <section className="px-5 md:px-8 pt-24 pb-12 md:pt-[180px] md:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-10 items-center lg:grid-cols-[1.2fr_1fr] lg:gap-20">
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
              <Image
                src="/assets/DSC02399.JPG"
                alt="Florian Molleker"
                width={0}
                height={0}
                sizes="(max-width: 768px) 100vw, 45vw"
                quality={90}
                style={{ width: '100%', height: 'auto', maxHeight: '480px', objectFit: 'contain', borderRadius: '12px' }}
              />
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

      {/* Certificate Section */}
      <section className="cert-section">
        <div className="wrap">
          <div className="cert-grid">
            <div className="cert-meta">
              <RevealElement id="cert-eyebrow">
                <div className="eyebrow">{t('about.certSection.eyebrow')}</div>
              </RevealElement>
              <RevealElement id="cert-title" delay={1}>
                <h2 className="cert-title display">{t('about.certSection.title')}</h2>
              </RevealElement>
              <RevealElement id="cert-body" delay={2}>
                <p className="body-lg cert-body">{t('about.certSection.body')}</p>
                <dl className="cert-facts">
                  <div className="cert-fact">
                    <dt>{t('about.certSection.f1k')}</dt>
                    <dd>{t('about.certSection.f1v')}</dd>
                  </div>
                  <div className="cert-fact">
                    <dt>{t('about.certSection.f2k')}</dt>
                    <dd>{t('about.certSection.f2v')}</dd>
                  </div>
                  <div className="cert-fact">
                    <dt>{t('about.certSection.f3k')}</dt>
                    <dd>{t('about.certSection.f3v')}</dd>
                  </div>
                </dl>
              </RevealElement>
            </div>

            <RevealElement id="cert-card" delay={1}>
              <a
                className="cert-card"
                href="/assets/c-trainer-zertifikat.jpg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Zertifikat in voller Größe öffnen"
              >
                <img
                  src="/assets/c-trainer-zertifikat.jpg"
                  alt="DPV C-Trainer Zertifikat Florian Molleker"
                  loading="lazy"
                />
                <div className="cert-card-tag">
                  <span>{t('about.certSection.view')}</span>
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </a>
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
        .fact:first-child { border-top: none; }

        .cert-section { padding: 80px 0 20px; }
        .cert-grid {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 80px;
          align-items: center;
        }
        @media (max-width: 960px) {
          .cert-grid { grid-template-columns: 1fr; gap: 40px; }
        }
        .cert-title {
          font-size: clamp(36px, 4.4vw, 56px);
          font-weight: 600;
          letter-spacing: -0.03em;
          line-height: 1;
          margin: 18px 0 20px;
        }
        .cert-body { max-width: 440px; margin-bottom: 28px; }
        .cert-facts {
          display: flex;
          flex-direction: column;
          border-top: 1px solid var(--line-soft);
          max-width: 440px;
        }
        .cert-fact {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 16px;
          padding: 12px 0;
          border-bottom: 1px solid var(--line-soft);
        }
        .cert-fact dt {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--fg-muted);
          padding-top: 2px;
        }
        .cert-fact dd { font-size: 15px; font-weight: 500; }
        .cert-card {
          position: relative;
          display: block;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: var(--bg-muted);
          border: 1px solid var(--line-soft);
          box-shadow: 0 30px 80px -40px rgba(20,18,12,0.35), 0 8px 20px -16px rgba(20,18,12,0.2);
          transition: transform 0.5s var(--ease), box-shadow 0.5s var(--ease);
        }
        .cert-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 40px 100px -40px rgba(20,18,12,0.45), 0 12px 28px -16px rgba(20,18,12,0.3);
        }
        .cert-card img { display: block; width: 100%; height: auto; object-fit: cover; }
        .cert-card-tag {
          position: absolute;
          bottom: 14px;
          right: 14px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 999px;
          background: var(--bg-elev);
          border: 1px solid var(--line-soft);
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--fg);
          backdrop-filter: blur(8px);
          transition: background 0.2s var(--ease), color 0.2s var(--ease), border-color 0.2s var(--ease);
        }
        .cert-card:hover .cert-card-tag {
          background: var(--accent);
          color: var(--accent-fg);
          border-color: var(--accent);
        }
      `}</style>
    </>
  );
}
