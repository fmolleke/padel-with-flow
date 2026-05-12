import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendRemovedByAdminNotification } from '@/lib/resend';

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data, error } = await supabase
    .from('registrations')
    .select('*, training_slots(*)')
    .eq('id', id)
    .single();

  if (error || !data) return NextResponse.json({ error: 'Anmeldung nicht gefunden.' }, { status: 404 });

  const { error: updateError } = await supabase
    .from('registrations')
    .update({ cancelled_at: new Date().toISOString(), removed_by_admin: true })
    .eq('id', id);

  if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });

  const dateTime = new Date(data.training_slots.date_time).toLocaleString('de-DE', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Europe/Berlin',
  });

  await sendRemovedByAdminNotification({
    to: data.email,
    name: data.name,
    slotTitle: data.training_slots.title,
    slotDateTime: dateTime,
  });

  return NextResponse.json({ success: true });
}
