import { features } from '@/lib/features';
import { notFound } from 'next/navigation';

export default function TrainingPage() {
  if (!features.trainingBooking) notFound();

  return (
    <main className="max-w-4xl mx-auto px-8 py-32">
      <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: 'var(--accent)' }}>
        Gruppentraining
      </p>
      <h1 className="font-display text-4xl font-semibold mb-6">Fixe Trainingstermine</h1>
      <p className="text-base leading-relaxed mb-12" style={{ color: 'var(--fg-muted)' }}>
        Hier findest du alle offenen Trainingstermine. Melde dich einfach für einen Slot an — kein Abo, kein Vertrag.
      </p>

      {/* Placeholder — slots will be loaded dynamically later */}
      <div className="rounded-lg border border-dashed p-12 text-center" style={{ borderColor: 'var(--line-soft)' }}>
        <p style={{ color: 'var(--fg-muted)' }}>Trainingstermine werden bald veröffentlicht.</p>
      </div>
    </main>
  );
}
