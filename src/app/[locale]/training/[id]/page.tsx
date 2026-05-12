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

  if (!features.trainingBooking) notFound();
  if (loading) return <main className="max-w-2xl mx-auto px-8 py-32"><p>{t('loading')}</p></main>;
  if (!slot || slot.spots_left === undefined) notFound();

  const date = new Date(slot.date_time);
  const isFull = slot.spots_left <= 0;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
    <main className="max-w-2xl mx-auto px-8 py-32">
      <a href={`/${locale}/training`} className="text-sm mb-8 inline-block" style={{ color: 'var(--fg-muted)' }}>
        {t('back')}
      </a>

      <h1 className="font-display text-3xl font-semibold mb-2">{slot.title}</h1>
      <p className="text-sm mb-1" style={{ color: 'var(--fg-muted)' }}>
        {date.toLocaleDateString(dateLocale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        {' · '}{date.toLocaleTimeString(dateLocale, { hour: '2-digit', minute: '2-digit' })}{t('clockSuffix')}
        {' · '}{slot.duration_minutes} {t('min')}
      </p>
      <p className="text-sm mb-4" style={{ color: 'var(--fg-muted)' }}>{slot.location}</p>

      {slot.price != null && (
        <p className="font-semibold mb-4">{slot.price} € pro Person</p>
      )}

      {slot.description && (
        <p className="text-sm mb-6 leading-relaxed" style={{ color: 'var(--fg-muted)' }}>{slot.description}</p>
      )}

      <p className="text-sm mb-8">
        <span
          className="font-medium px-2 py-1 rounded text-xs"
          style={{
            background: isFull ? 'var(--bg-muted)' : 'color-mix(in srgb, var(--accent) 15%, transparent)',
            color: isFull ? 'var(--fg-muted)' : 'var(--accent)',
          }}
        >
          {isFull ? t('full') : t('spots', { count: slot.spots_left })}
        </span>
      </p>

      {success ? (
        <div className="rounded-lg p-6" style={{ background: 'color-mix(in srgb, var(--accent) 10%, transparent)' }}>
          <p className="font-semibold mb-1">{t('successTitle')}</p>
          <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>{t('successBody')}</p>
        </div>
      ) : isFull ? (
        <p style={{ color: 'var(--fg-muted)' }}>{t('fullMessage')}</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">{t('nameLabel')} *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded border text-sm"
              style={{ borderColor: 'var(--line-soft)', background: 'var(--bg-muted)' }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('emailLabel')} *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded border text-sm"
              style={{ borderColor: 'var(--line-soft)', background: 'var(--bg-muted)' }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              {t('playtomicLabel')} <span style={{ color: 'var(--fg-muted)' }}>({t('optional')})</span>
            </label>
            <input
              type="text"
              value={playtomicLevel}
              onChange={(e) => setPlaytomicLevel(e.target.value)}
              placeholder={t('playtomicPlaceholder')}
              className="w-full px-3 py-2 rounded border text-sm"
              style={{ borderColor: 'var(--line-soft)', background: 'var(--bg-muted)' }}
            />
          </div>
          {error && <p className="text-sm" style={{ color: 'var(--accent)' }}>{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 rounded font-medium text-sm transition-all"
            style={{ background: 'var(--accent)', color: 'var(--bg)' }}
          >
            {submitting ? t('submitting') : t('submit')}
          </button>
        </form>
      )}
    </main>
  );
}
