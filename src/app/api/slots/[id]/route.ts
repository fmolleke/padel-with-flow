import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data, error } = await supabase
    .from('training_slots')
    .select('*, registrations(id, cancelled_at)')
    .eq('id', id)
    .eq('is_visible', true)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 404 });

  const activeRegistrations = data.registrations.filter(
    (r: { cancelled_at: string | null }) => r.cancelled_at === null
  ).length;

  return NextResponse.json({
    ...data,
    registrations: undefined,
    active_registrations: activeRegistrations,
    spots_left: data.max_participants - activeRegistrations,
  });
}
