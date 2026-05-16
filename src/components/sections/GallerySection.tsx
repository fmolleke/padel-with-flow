'use client';

import Image from 'next/image';
import Masonry from 'react-masonry-css';
import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useScrollReveal, RevealElement } from '@/hooks/useScrollReveal';

const galleryImages = [
  '/assets/DSC00547.JPG',
  '/assets/DSC00724.jpg',
  '/assets/DSC00605.JPG',
  '/assets/DSC00614.JPG',
  '/assets/DSC00926.JPG',
  '/assets/DSC01086.JPG',
  '/assets/DSC01231.JPG',
  '/assets/DSC01425.JPG',
  '/assets/DSC01553.JPG',
  '/assets/DSC01616.JPG',
  '/assets/DSC01832.JPG',
  '/assets/DSC02285.JPG',
  '/assets/DSC02359.JPG',
  '/assets/DSC02443.JPG',
  '/assets/DSC02534.JPG',
  '/assets/DSC02843.JPG',
  '/assets/DSC02896.JPG',
  '/assets/DSC02959.JPG',
  '/assets/DSC02999.JPG',
  '/assets/DSC03037.JPG',
  '/assets/DSC03321.JPG',
  '/assets/DSC03333.JPG',
  '/assets/DSC03340.JPG',
  '/assets/DSC03536.JPG',
  '/assets/DSC03826.JPG',
  '/assets/DSC03874.JPG',
  '/assets/DSC03891.JPG',
];

const breakpointColumns = {
  default: 3,
  860: 2,
  480: 1,
};

export function GallerySection() {
  const t = useTranslations();
  const revealed = useScrollReveal();
  const [expanded, setExpanded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const visibleImages = galleryImages;

  return (
    <section className="gallery" ref={sectionRef}>
      <div className="wrap">
        <div className="section-head">
          <RevealElement id="gallery-eyebrow">
            <div className="eyebrow">{t('gallery.eyebrow')}</div>
          </RevealElement>
          <RevealElement id="gallery-title" delay={1}>
            <h2 className="display section-title">{t('gallery.title')}</h2>
          </RevealElement>
        </div>

        <div className={`gallery-grid-wrapper${!expanded ? ' gallery-grid-collapsed' : ''}`}>
          <Masonry
            breakpointCols={breakpointColumns}
            className="gallery-grid"
            columnClassName="gallery-grid-col"
          >
            {visibleImages.map((src, idx) => (
              <div
                key={src}
                data-reveal-id={`gallery-${idx}`}
                className={`gallery-item reveal${revealed.has(`gallery-${idx}`) ? ' in' : ''}`}
              >
                <Image
                  src={src}
                  alt={`Gallery photo ${idx + 1}`}
                  width={0}
                  height={0}
                  sizes="(max-width: 480px) 100vw, (max-width: 860px) 50vw, 33vw"
                  quality={90}
                  style={{ height: 'auto' }}
                />
              </div>
            ))}
          </Masonry>
          {!expanded && <div className="gallery-fade-overlay" />}
        </div>

        <div className="gallery-expand">
          {!expanded ? (
            <button className="btn btn-ghost" onClick={() => setExpanded(true)}>
              {t('gallery.showMore')}
            </button>
          ) : (
            <button className="btn btn-ghost" onClick={() => { setExpanded(false); sectionRef.current?.scrollIntoView({ behavior: 'smooth' }); }}>
              {t('gallery.showLess')}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
