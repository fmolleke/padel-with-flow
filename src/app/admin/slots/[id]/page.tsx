import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { SlotEditClient } from './SlotEditClient';

async function getSlotWithRegistrations(id: string) {
  const { data, error } = await supabase
    .from('training_slots')
    .select('*, registrations(*)')
    .eq('id', id)
    .single();

  if (error) return null;

  const registrations = data.registrations
    .filter((r: { cancelled_at: string | null }) => r.cancelled_at === null)
    .sort((a: { registered_at: string }, b: { registered_at: string }) =>
      new Date(a.registered_at).getTime() - new Date(b.registered_at).getTime()
    );

  return { ...data, activeRegistrations: registrations };
}

export default async function SlotDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const slot = await getSlotWithRegistrations(id);
  if (!slot) notFound();

  return <SlotEditClient slot={slot} />;
}
