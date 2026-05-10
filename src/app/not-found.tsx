'use client';

import { useTranslation } from 'next-i18next';
import { RevealElement } from '@/hooks/useScrollReveal';
import { Button } from '@/components/Button';

export default function NotFound() {
  const { t } = useTranslation('common');
  return (
    <>
      <section
        style={{
          minHeight: '100vh',
          padding: '160px 0 80px',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated background */}
        <div
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, color: 'var(--fg)', pointerEvents: 'none' }}
        >
          <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
            <defs>
              <pattern id="grid404" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.06" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid404)" />
            <path
              className="nf-arc"
              d="M 100 600 Q 400 200 700 400 T 1100 700"
              stroke="currentColor"
              fill="none"
              strokeWidth="1"
              strokeDasharray="2 6"
              opacity="0.4"
            />
            <circle className="nf-ball-dot" r="7" fill="var(--accent)" />
          </svg>
        </div>

        <div className="wrap nf-wrap" style={{ position: 'relative' }}>
          {/* 404 code */}
          <RevealElement id="nf-code">
            <div className="nf-code">
              <span className="nf-digit">4</span>
              <span className="nf-ball-glyph" aria-hidden="true">
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                  <circle cx="50" cy="50" r="44" fill="var(--accent)" />
                  <path d="M 18 40 Q 50 20 82 40" stroke="var(--accent-fg)" strokeWidth="1.5" fill="none" opacity="0.5" />
                  <path d="M 18 60 Q 50 80 82 60" stroke="var(--accent-fg)" strokeWidth="1.5" fill="none" opacity="0.5" />
                </svg>
              </span>
              <span className="nf-digit">4</span>
            </div>
          </RevealElement>

          {/* Text side */}
          <div className="nf-text">
            <RevealElement id="nf-eyebrow" delay={1}>
              <div className="eyebrow nf-eyebrow">{t('nf.eyebrow')}</div>
            </RevealElement>

            <RevealElement id="nf-title" delay={2}>
              <h1 className="display nf-title">{t('nf.title')}</h1>
            </RevealElement>

            <RevealElement id="nf-sub" delay={3}>
              <p className="body-lg nf-sub">{t('nf.sub')}</p>
            </RevealElement>

            <RevealElement id="nf-ctas" delay={4}>
              <div className="nf-ctas">
                <Button href="/" variant="primary">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M12 7H2m0 0L6 3M2 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{t('nf.cta1')}</span>
                </Button>
                <Button href="/contact" variant="ghost">
                  <span>{t('nav.contact')}</span>
                </Button>
              </div>

              <div className="nf-links">
                <span className="eyebrow nf-also">{t('nf.also')}</span>
                <a href="/about">{t('nav.about')}</a>
                <span className="nf-dot">·</span>
                <a href="/services">{t('nav.services')}</a>
                <span className="nf-dot">·</span>
                <a href="/contact">{t('nav.contact')}</a>
              </div>
            </RevealElement>
          </div>
        </div>
      </section>

      <style>{`
        .nf-wrap {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 60px;
          align-items: center;
        }
        @media (max-width: 860px) {
          .nf-wrap { grid-template-columns: 1fr; gap: 40px; }
        }

        .nf-code {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(180px, 28vw, 380px);
          line-height: 0.9;
          letter-spacing: -0.06em;
        }
        .nf-digit { display: inline-block; }
        .nf-ball-glyph {
          display: inline-block;
          width: 0.85em;
          height: 0.85em;
          margin: 0 -0.05em;
          animation: nfBounce 2.4s var(--ease, ease-in-out) infinite;
        }
        @keyframes nfBounce {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-12%) rotate(-8deg); }
          50% { transform: translateY(0) rotate(0deg); }
          75% { transform: translateY(-6%) rotate(8deg); }
        }

        .nf-arc {
          stroke-dasharray: 1500;
          stroke-dashoffset: 1500;
          animation: nfDraw 4s ease-out 0.4s forwards;
        }
        .nf-ball-dot {
          offset-path: path("M 100 600 Q 400 200 700 400 T 1100 700");
          animation: nfRoll 4s ease-out 0.4s forwards;
        }
        @keyframes nfDraw { to { stroke-dashoffset: 0; } }
        @keyframes nfRoll {
          0% { offset-distance: 0%; opacity: 0; }
          10% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 1; }
        }

        .nf-eyebrow { margin-bottom: 16px; }
        .nf-title {
          font-size: clamp(36px, 5vw, 64px);
          margin: 0 0 20px;
          max-width: 520px;
        }
        .nf-sub { max-width: 460px; margin-bottom: 32px; }
        .nf-ctas { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 36px; }
        .nf-links {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          font-size: 14px;
          padding-top: 28px;
          border-top: 1px solid var(--line-soft);
        }
        .nf-also { margin-right: 4px; }
        .nf-links a { color: var(--fg); transition: color 0.2s; font-weight: 500; }
        .nf-links a:hover { color: var(--accent); }
        .nf-dot { color: var(--fg-faint); }
      `}</style>
    </>
  );
}
