import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await supabase
    .from('training_slots')
    .select('*, registrations(id, cancelled_at)')
    .eq('is_visible', true)
    .gte('date_time', new Date().toISOString())
    .order('date_time', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const slots = data.map((slot) => {
    const activeRegistrations = slot.registrations.filter(
      (r: { cancelled_at: string | null }) => r.cancelled_at === null
    ).length;
    return {
      ...slot,
      registrations: undefined,
      active_registrations: activeRegistrations,
      spots_left: slot.max_participants - activeRegistrations,
    };
  });

  return NextResponse.json(slots);
}
