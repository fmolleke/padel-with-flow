import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendCancellationConfirmation, sendAdminCancellation } from '@/lib/resend';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) return NextResponse.json({ error: 'Token fehlt.' }, { status: 400 });

  const { data, error } = await supabase
    .from('registrations')
    .select('*, training_slots(*)')
    .eq('cancellation_token', token)
    .is('cancelled_at', null)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Ungültiger oder bereits verwendeter Token.' }, { status: 404 });
  }

  return NextResponse.json({
    name: data.name,
    slotTitle: data.training_slots.title,
    slotDateTime: data.training_slots.date_time,
    slotLocation: data.training_slots.location,
  });
}

export async function POST(request: Request) {
  const { token, locale } = await request.json();
  const resolvedLocale: 'de' | 'en' = locale === 'en' ? 'en' : 'de';

  if (!token) return NextResponse.json({ error: 'Token fehlt.' }, { status: 400 });

  const { data, error } = await supabase
    .from('registrations')
    .select('*, training_slots(*)')
    .eq('cancellation_token', token)
    .is('cancelled_at', null)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Ungültiger oder bereits verwendeter Token.' }, { status: 404 });
  }

  const { error: updateError } = await supabase
    .from('registrations')
    .update({ cancelled_at: new Date().toISOString() })
    .eq('id', data.id);

  if (updateError) return NextResponse.json({ error: 'Stornierung konnte nicht gespeichert werden.' }, { status: 500 });

  const dateLocale = resolvedLocale === 'en' ? 'en-GB' : 'de-DE';
  const dateTime = new Date(data.training_slots.date_time).toLocaleString(dateLocale, {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Europe/Berlin',
  });

  await Promise.all([
    sendCancellationConfirmation({
      to: data.email,
      name: data.name,
      slotTitle: data.training_slots.title,
      slotDateTime: dateTime,
      locale: resolvedLocale,
    }),
    sendAdminCancellation({
      name: data.name,
      email: data.email,
      slotTitle: data.training_slots.title,
      slotDateTime: dateTime,
    }),
  ]);

  return NextResponse.json({ success: true });
}
