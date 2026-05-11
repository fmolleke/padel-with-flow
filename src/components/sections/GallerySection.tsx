'use client';

import { useTranslations } from 'next-intl';
import { useScrollReveal, RevealElement } from '@/hooks/useScrollReveal';

export function GallerySection() {
  const t = useTranslations();
  const revealed = useScrollReveal();

  const galleryItems = [
    { id: 'gi-1', labelKey: 'gallery.item1' as const },
    { id: 'gi-2', labelKey: 'gallery.item2' as const },
    { id: 'gi-3', labelKey: 'gallery.item3' as const },
    { id: 'gi-4', labelKey: 'gallery.item4' as const },
    { id: 'gi-5', labelKey: 'gallery.item5' as const },
  ];

  return (
    <section className="gallery">
      <div className="wrap">
        <div className="section-head">
          <RevealElement id="gallery-eyebrow">
            <div className="eyebrow">{t('gallery.eyebrow')}</div>
          </RevealElement>
          <RevealElement id="gallery-title" delay={1}>
            <h2 className="display section-title">{t('gallery.title')}</h2>
          </RevealElement>
        </div>

        <div className="gallery-grid">
          {galleryItems.map((item, idx) => (
            <div
              key={item.id}
              data-reveal-id={`gallery-${item.id}`}
              className={`gallery-item ${item.id} reveal${revealed.has(`gallery-${item.id}`) ? ' in' : ''}`}
              style={idx > 0 ? { transitionDelay: `${(idx % 5) * 0.08}s` } : undefined}
            >
              <div className="photo relative w-full h-full overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-fg-muted text-center p-4">
                  <span className="font-mono text-xs tracking-widest">{t(item.labelKey)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
