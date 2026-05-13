import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { LogoutButton } from './LogoutButton';
import { DeleteSlotButton } from './DeleteSlotButton';

async function getAllSlots() {
  const { data } = await supabase
    .from('training_slots')
    .select('*, registrations(id, cancelled_at)')
    .order('date_time', { ascending: true });

  return (data ?? []).map((slot) => {
    const active = slot.registrations.filter(
      (r: { cancelled_at: string | null }) => r.cancelled_at === null
    ).length;
    return { ...slot, active_registrations: active };
  });
}

export default async function AdminDashboard() {
  const slots = await getAllSlots();
  const now = new Date();

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <p style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>Admin</p>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0 }}>Trainingstermine</h1>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Link href="/admin/slots/new" style={btnStyle}>+ Neuer Termin</Link>
          <LogoutButton />
        </div>
      </div>

      {slots.length === 0 ? (
        <p style={{ color: '#888' }}>Noch keine Termine. Erstelle deinen ersten Termin.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #222' }}>
              <th style={thStyle}>Titel</th>
              <th style={thStyle}>Datum</th>
              <th style={thStyle}>Teilnehmer</th>
              <th style={thStyle}>Sichtbar</th>
              <th style={thStyle}></th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => {
              const date = new Date(slot.date_time);
              const isFull = slot.active_registrations >= slot.max_participants;
              const isPast = date < now;
              const pastStyle = isPast ? { opacity: 0.45 } : {};
              return (
                <tr key={slot.id} style={{ borderBottom: '1px solid #1a1a1a' }}>
                  <td style={{ ...tdStyle, ...pastStyle }}>{slot.title}</td>
                  <td style={{ ...tdStyle, ...pastStyle }}>
                    {date.toLocaleDateString('de-DE', { day: 'numeric', month: 'short', year: 'numeric' })}
                    {' '}
                    {date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
                    {isPast && (
                      <span style={{ marginLeft: '0.5rem', fontSize: '0.7rem', color: '#888', background: '#1f1f1f', border: '1px solid #333', borderRadius: '4px', padding: '1px 5px' }}>
                        vergangen
                      </span>
                    )}
                  </td>
                  <td style={{ ...tdStyle, ...pastStyle }}>
                    <span style={{ color: isFull ? '#f87171' : '#4ade80' }}>
                      {slot.active_registrations} / {slot.max_participants}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, ...pastStyle }}>
                    <span style={{ color: slot.is_visible ? '#4ade80' : '#888' }}>
                      {slot.is_visible ? 'Ja' : 'Nein'}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'right', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <Link href={`/admin/slots/${slot.id}`} style={linkStyle}>Bearbeiten</Link>
                    <DeleteSlotButton id={slot.id} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </main>
  );
}

const btnStyle: React.CSSProperties = {
  padding: '0.5rem 1rem', borderRadius: '6px', background: '#e5e5e5',
  color: '#0a0a0a', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none',
};
const linkStyle: React.CSSProperties = {
  color: '#888', textDecoration: 'none', fontSize: '0.875rem',
};
const thStyle: React.CSSProperties = {
  textAlign: 'left', padding: '0.5rem 0.75rem', color: '#888', fontWeight: 500,
};
const tdStyle: React.CSSProperties = {
  padding: '0.75rem', verticalAlign: 'middle',
};
