import { features } from '@/lib/features';
import { supabase, TrainingSlot } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';

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

export default async function TrainingPage() {
  if (!features.trainingBooking) notFound();

  const slots = await getSlots();

  return (
    <main className="max-w-4xl mx-auto px-8 py-32">
      <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: 'var(--accent)' }}>
        Gruppentraining
      </p>
      <h1 className="font-display text-4xl font-semibold mb-4">Fixe Trainingstermine</h1>
      <p className="text-base leading-relaxed mb-12" style={{ color: 'var(--fg-muted)' }}>
        Melde dich für einen offenen Trainingstermin an — kein Abo, kein Vertrag.
      </p>

      {slots.length === 0 ? (
        <div className="rounded-lg border border-dashed p-12 text-center" style={{ borderColor: 'var(--line-soft)' }}>
          <p style={{ color: 'var(--fg-muted)' }}>Aktuell sind keine Trainingstermine verfügbar.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {slots.map((slot) => (
            <SlotCard key={slot.id} slot={slot} />
          ))}
        </div>
      )}
    </main>
  );
}

function SlotCard({ slot }: { slot: TrainingSlot & { active_registrations: number; spots_left: number } }) {
  const date = new Date(slot.date_time);
  const isFull = slot.spots_left <= 0;

  return (
    <Link
      href={`/training/${slot.id}` as '/training/[id]'}
      className="block rounded-lg border p-6 transition-all hover:border-accent"
      style={{ borderColor: 'var(--line-soft)' }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold text-lg mb-1">{slot.title}</p>
          <p className="text-sm mb-1" style={{ color: 'var(--fg-muted)' }}>
            {date.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}
            {' · '}
            {date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })} Uhr
            {' · '}{slot.duration_minutes} min
          </p>
          <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>{slot.location}</p>
        </div>
        <div className="text-right shrink-0">
          {slot.price != null && (
            <p className="font-semibold mb-1">{slot.price} €</p>
          )}
          <span
            className="text-xs font-medium px-2 py-1 rounded"
            style={{
              background: isFull ? 'var(--bg-muted)' : 'color-mix(in srgb, var(--accent) 15%, transparent)',
              color: isFull ? 'var(--fg-muted)' : 'var(--accent)',
            }}
          >
            {isFull ? 'Ausgebucht' : `${slot.spots_left} Platz${slot.spots_left !== 1 ? 'e' : ''} frei`}
          </span>
        </div>
      </div>
      {slot.description && (
        <p className="text-sm mt-3" style={{ color: 'var(--fg-muted)' }}>{slot.description}</p>
      )}
    </Link>
  );
}
