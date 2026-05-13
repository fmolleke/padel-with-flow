import { features } from '@/lib/features';
import { supabase, TrainingSlot } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { RevealElement } from '@/hooks/useScrollReveal';

async function getSlots() {
  const { data } = await supabase
    .from('training_slots')
    .select('*, registrations(id, cancelled_at)')
    .eq('is_visible', true)
    .gte('date_time', new Date().toISOString())
    .order('date_time', { ascending: true });

  return (data ?? []).map((slot) => {
    const active = slot.registrations.filter(
      (r: { cancelled_at: string | null }) => r.cancelled_at === null
    ).length;
    return { ...slot, active_registrations: active, spots_left: slot.max_participants - active };
  });
}

export default async function TrainingPage({ params }: { params: Promise<{ locale: string }> }) {
  if (!features.trainingBooking) notFound();

  const { locale } = await params;
  const t = await getTranslations('training');
  const slots = await getSlots();

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <RevealElement id="training-eyebrow">
            <div className="eyebrow">{t('eyebrow')}</div>
          </RevealElement>
          <RevealElement id="training-title" delay={1}>
            <h1 className="display page-title">{t('title')}</h1>
          </RevealElement>
          <RevealElement id="training-subtitle" delay={2}>
            <p className="body-lg page-subtitle">{t('subtitle')}</p>
          </RevealElement>
          <RevealElement id="training-note" delay={3}>
            <p className="eyebrow" style={{ marginTop: '16px' }}>{t('minParticipantsNote')}</p>
          </RevealElement>
        </div>
      </section>

      <section className="training-slots">
        <div className="wrap">
          {slots.length === 0 ? (
            <RevealElement id="training-empty">
              <div className="rounded-lg border border-dashed p-12 text-center" style={{ borderColor: 'var(--line-soft)' }}>
                <p style={{ color: 'var(--fg-muted)' }}>{t('empty')}</p>
              </div>
            </RevealElement>
          ) : (
            <div className="flex flex-col gap-4">
              {slots.map((slot, i) => (
                <RevealElement key={slot.id} id={`slot-${slot.id}`} delay={i}>
                  <SlotCard slot={slot} locale={locale} />
                </RevealElement>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

async function SlotCard({ slot, locale }: { slot: TrainingSlot & { active_registrations: number; spots_left: number }; locale: string }) {
  const t = await getTranslations('training');
  const date = new Date(slot.date_time);
  const isFull = slot.spots_left <= 0;
  const dateLocale = locale === 'en' ? 'en-GB' : 'de-DE';

  return (
    <Link href={`/training/${slot.id}` as '/training/[id]'} className="slot-card">
      <div className="slot-card-inner">
        <div className="slot-date">
          <span className="slot-day">{date.toLocaleDateString(dateLocale, { day: 'numeric' })}</span>
          <span className="slot-month">{date.toLocaleDateString(dateLocale, { month: 'short' })}</span>
        </div>

        <div>
          <p className="slot-title">{slot.title}</p>
          <p className="slot-meta">
            {date.toLocaleDateString(dateLocale, { weekday: 'long' })}
            {' · '}
            {date.toLocaleTimeString(dateLocale, { hour: '2-digit', minute: '2-digit' })}{t('clockSuffix')}
            {' · '}{slot.duration_minutes} {t('min')}
            {' · '}{slot.location}
          </p>
          {slot.description && <p className="slot-desc">{slot.description}</p>}
        </div>

        <div className="slot-right">
          {slot.price != null && (
              <>
                <p className="slot-price">{slot.price} €</p>
                <p className="eyebrow" style={{ marginTop: '4px', color: 'var(--fg-muted)', fontSize: '11px' }}>{t('courtIncluded')}</p>
              </>
            )}
          <span className={isFull ? 'slot-badge slot-badge-full' : 'slot-badge slot-badge-available'}>
            {isFull ? t('full') : t('spots', { count: slot.spots_left })}
          </span>
        </div>
      </div>
    </Link>
  );
}
