'use client';

import { features } from '@/lib/features';
import { notFound } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';

type Slot = {
  id: string;
  title: string;
  description: string | null;
  date_time: string;
  duration_minutes: number;
  max_participants: number;
  location: string;
  price: number | null;
  active_registrations: number;
  spots_left: number;
};

export default function TrainingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  if (!features.trainingBooking) notFound();

  const t = useTranslations('training');
  const locale = useLocale();
  const dateLocale = locale === 'en' ? 'en-GB' : 'de-DE';

  const [slot, setSlot] = useState<Slot | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [playtomicLevel, setPlaytomicLevel] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    params.then(({ id }) => {
      setId(id);
      fetch(`/api/slots/${id}`)
        .then((r) => r.json())
        .then((data) => { setSlot(data); setLoading(false); })
        .catch(() => setLoading(false));
    });
  }, [params]);

  if (loading) return (
    <section className="page-head">
      <div className="wrap">
        <p style={{ color: 'var(--fg-muted)' }}>{t('loading')}</p>
      </div>
    </section>
  );
  if (!slot || slot.spots_left === undefined) notFound();

  const date = new Date(slot.date_time);
  const isFull = slot.spots_left <= 0;

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const res = await fetch('/api/registrations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slot_id: id, name, email, playtomic_level: playtomicLevel || null, locale }),
    });

    const data = await res.json();
    setSubmitting(false);

    if (!res.ok) {
      setError(data.error ?? 'Ein Fehler ist aufgetreten.');
    } else {
      setSuccess(true);
    }
  }

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <a
            href={`/${locale}/training`}
            className="eyebrow"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', border: '1px solid var(--line-soft)', borderRadius: '999px', marginBottom: '28px' }}
          >
            {t('back')}
          </a>
          <h1 className="display page-title">{slot.title}</h1>
          <p className="body-lg page-subtitle">
            {date.toLocaleDateString(dateLocale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            {' · '}{date.toLocaleTimeString(dateLocale, { hour: '2-digit', minute: '2-digit' })}{t('clockSuffix')}
            {' · '}{slot.duration_minutes} {t('min')}
          </p>
        </div>
      </section>

      <section className="training-detail">
        <div className="wrap">
          <div className="training-detail-grid">

            <div className="training-info-card">
              <div className="training-info-section">
                <div className="eyebrow" style={{ marginBottom: '8px' }}>{t('labelLocation')}</div>
                <p style={{ fontSize: '18px', fontWeight: 500 }}>{slot.location}</p>
              </div>

              {slot.price != null && (
                <div className="training-info-section">
                  <div className="eyebrow" style={{ marginBottom: '8px' }}>{t('labelPrice')}</div>
                  <p style={{ fontSize: '32px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {slot.price} €{' '}
                    <span className="eyebrow" style={{ display: 'inline' }}>{t('perPerson')}</span>
                  </p>
                  <p className="eyebrow" style={{ marginTop: '6px', color: 'var(--fg-muted)' }}>{t('courtIncluded')}</p>
                </div>
              )}

              <div className="training-info-section">
                <div className="eyebrow" style={{ marginBottom: '10px' }}>{t('labelAvailability')}</div>
                <span className={isFull ? 'slot-badge slot-badge-full' : 'slot-badge slot-badge-available'}>
                  {isFull ? t('full') : t('spots', { count: slot.spots_left })}
                </span>
              </div>

              {slot.description && (
                <div className="training-info-section">
                  <div className="eyebrow" style={{ marginBottom: '12px' }}>{t('labelAbout')}</div>
                  <p style={{ fontSize: '16px', lineHeight: '1.65', color: 'var(--fg-muted)' }}>{slot.description}</p>
                </div>
              )}
            </div>

            <div className="training-form-card">
              {success ? (
                <div>
                  <p style={{ fontWeight: 600, fontSize: '18px', marginBottom: '8px' }}>{t('successTitle')}</p>
                  <p style={{ fontSize: '14px', color: 'var(--fg-muted)', lineHeight: '1.6' }}>{t('successBody')}</p>
                </div>
              ) : isFull ? (
                <p style={{ color: 'var(--fg-muted)' }}>{t('fullMessage')}</p>
              ) : (
                <>
                  <div className="eyebrow" style={{ marginBottom: '24px' }}>{t('labelRegistration')}</div>
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>
                        {t('nameLabel')} *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="training-form-input"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>
                        {t('emailLabel')} *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="training-form-input"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>
                        {t('playtomicLabel')}{' '}
                        <span style={{ color: 'var(--fg-muted)', fontWeight: 400 }}>({t('optional')})</span>
                      </label>
                      <input
                        type="text"
                        value={playtomicLevel}
                        onChange={(e) => setPlaytomicLevel(e.target.value)}
                        placeholder={t('playtomicPlaceholder')}
                        className="training-form-input"
                      />
                    </div>
                    <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {error && <p style={{ fontSize: '14px', color: 'var(--accent)' }}>{error}</p>}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn btn-primary"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      {submitting ? t('submitting') : t('submit')}
                    </button>
                    </div>
                  </form>
                </>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
