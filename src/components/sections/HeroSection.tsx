'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { RevealElement } from '@/hooks/useScrollReveal';
import { Button } from '@/components/Button';
import ArrowIcon from '@/components/icons/ArrowIcon';

export function HeroSection() {
  const t = useTranslations();
  return (
    <section className="hero">
      {/* Background SVG */}
      <div className="hero-bg" aria-hidden="true">
        <svg className="hero-court" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.06" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Padel court schematic */}
          <g className="court-lines animate-court-fade" stroke="currentColor" fill="none" strokeWidth="1.2" opacity="0.18">
            <rect x="780" y="180" width="360" height="540" rx="2" />
            <line x1="780" y1="450" x2="1140" y2="450" />
            <line x1="960" y1="290" x2="960" y2="610" />
            <rect x="780" y="290" width="360" height="320" />
          </g>
          {/* Ball arc */}
          <path
            className="ball-path animate-draw-arc"
            d="M 100 600 Q 500 100 1000 500"
            stroke="currentColor"
            fill="none"
            strokeWidth="1"
            strokeDasharray="2 6"
            opacity="0.4"
          />
          <circle className="ball animate-ball-roll" r="6" fill="#ff5a1f" />
        </svg>
      </div>

      {/* Content */}
      <div className="wrap hero-wrap">
        <div className="hero-text">
          <div className="relative z-10">
            <RevealElement id="hero-eyebrow">
              <div className="eyebrow">
                {t('home.eyebrow')}
              </div>
            </RevealElement>

            <RevealElement id="hero-title">
              <h1 className="display hero-title">
                <span className="block">{t('home.heroLine1')}</span>
                <span className="block text-accent italic font-medium">{t('home.heroLine2')}</span>
              </h1>
            </RevealElement>

            <RevealElement id="hero-subtitle" delay={1}>
              <p className="body-lg max-w-[520px] mb-9">{t('home.heroSub')}</p>
            </RevealElement>

            <RevealElement id="hero-ctas" delay={2}>
              <div className="hero-ctas">
                <Button href="/contact" variant="primary">
                  <span>{t('home.cta1')}</span>
                  <ArrowIcon />
                </Button>
                <Button href="/about" variant="ghost">
                  <span>{t('home.cta2')}</span>
                </Button>
              </div>
            </RevealElement>
          </div>
        </div>

        <div className="hero-photo">
          <div className="photo hero-photo-frame">
            <Image
              src="/assets/oncourt.jpg"
              alt={t('home.photoAlt')}
              fill
              className="object-cover"
              priority
            />
            <div className="hero-photo-tag">
              <span className="hero-photo-tag-dot"></span>
              <span>{t('home.liveTag')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
