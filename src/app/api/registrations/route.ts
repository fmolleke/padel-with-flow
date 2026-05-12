import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import {
  sendRegistrationConfirmation,
  sendAdminNewRegistration,
} from '@/lib/resend';

export async function POST(request: Request) {
  const body = await request.json();
  const { slot_id, name, email, playtomic_level } = body;

  if (!slot_id || !name || !email) {
    return NextResponse.json({ error: 'slot_id, name und email sind erforderlich.' }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Ungültige E-Mail-Adresse.' }, { status: 400 });
  }

  // Check slot exists and has spots
  const { data: slot, error: slotError } = await supabase
    .from('training_slots')
    .select('*, registrations(id, cancelled_at)')
    .eq('id', slot_id)
    .eq('is_visible', true)
    .single();

  if (slotError || !slot) {
    return NextResponse.json({ error: 'Training nicht gefunden.' }, { status: 404 });
  }

  const activeCount = slot.registrations.filter(
    (r: { cancelled_at: string | null }) => r.cancelled_at === null
  ).length;

  if (activeCount >= slot.max_participants) {
    return NextResponse.json({ error: 'Das Training ist bereits ausgebucht.' }, { status: 409 });
  }

  // Check for duplicate registration
  const { data: existing } = await supabase
    .from('registrations')
    .select('id, cancelled_at')
    .eq('slot_id', slot_id)
    .eq('email', email)
    .is('cancelled_at', null)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ error: 'Du bist bereits für dieses Training angemeldet.' }, { status: 409 });
  }

  const { data: registration, error: regError } = await supabase
    .from('registrations')
    .insert({ slot_id, name, email, playtomic_level: playtomic_level || null })
    .select()
    .single();

  if (regError) return NextResponse.json({ error: 'Anmeldung konnte nicht gespeichert werden.' }, { status: 500 });

  const dateTime = new Date(slot.date_time).toLocaleString('de-DE', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Europe/Berlin',
  });

  await Promise.all([
    sendRegistrationConfirmation({
      to: email,
      name,
      slotTitle: slot.title,
      slotDateTime: dateTime,
      slotLocation: slot.location,
      cancellationToken: registration.cancellation_token,
    }),
    sendAdminNewRegistration({
      name,
      email,
      playtomicLevel: playtomic_level || null,
      slotTitle: slot.title,
      slotDateTime: dateTime,
    }),
  ]);

  return NextResponse.json({ success: true }, { status: 201 });
}
