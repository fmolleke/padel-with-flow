import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await supabase
    .from('training_slots')
    .select('*, registrations(id, cancelled_at)')
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
    };
  });

  return NextResponse.json(slots);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, description, date_time, duration_minutes, max_participants, location, price, is_visible } = body;

  if (!title || !date_time || !max_participants || !location) {
    return NextResponse.json({ error: 'Pflichtfelder fehlen.' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('training_slots')
    .insert({ title, description, date_time, duration_minutes, max_participants, location, price, is_visible })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data, { status: 201 });
}
