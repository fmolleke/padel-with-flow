'use client';

import { useTranslations } from 'next-intl';
import { RevealElement } from '@/hooks/useScrollReveal';

export function PhilosophySection() {
  const t = useTranslations();

  const pillars = [
    { num: '01', title: t('philo.1.title'), body: t('philo.1.body') },
    { num: '02', title: t('philo.2.title'), body: t('philo.2.body') },
    { num: '03', title: t('philo.3.title'), body: t('philo.3.body') },
  ];

  return (
    <section className="philo">
      <div className="wrap">
        <div className="section-head">
          <RevealElement id="philo-eyebrow">
            <div className="eyebrow">{t('philo.eyebrow')}</div>
          </RevealElement>
          <RevealElement id="philo-title" delay={1}>
            <h2 className="display section-title">{t('philo.title')}</h2>
          </RevealElement>
        </div>

        <div className="philo-grid">
          {pillars.map((pillar, idx) => (
            <RevealElement key={pillar.num} id={`philo-card-${idx}`} delay={idx}>
              <article className="philo-card reveal">
                <div className="philo-num">{pillar.num}</div>
                <h3 className="display philo-title">{pillar.title}</h3>
                <p>{pillar.body}</p>
              </article>
            </RevealElement>
          ))}
        </div>
      </div>
    </section>
  );
}
