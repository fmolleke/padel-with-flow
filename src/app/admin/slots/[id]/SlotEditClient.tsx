'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SlotForm, SlotFormData } from '../../SlotForm';

type Registration = {
  id: string;
  name: string;
  email: string;
  playtomic_level: string | null;
  registered_at: string;
};

type Slot = SlotFormData & { id: string; activeRegistrations: Registration[] };

export function SlotEditClient({ slot }: { slot: Slot }) {
  const router = useRouter();
  const [error, setError] = useState('');
  const [registrations, setRegistrations] = useState<Registration[]>(slot.activeRegistrations);
  const [deleting, setDeleting] = useState(false);

  async function handleUpdate(data: SlotFormData) {
    const res = await fetch(`/api/admin/slots/${slot.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) { setError(json.error ?? 'Fehler'); return; }
    router.push('/admin');
  }

  async function handleDeleteSlot() {
    if (!confirm('Termin wirklich löschen? Alle Anmeldungen werden ebenfalls gelöscht.')) return;
    setDeleting(true);
    await fetch(`/api/admin/slots/${slot.id}`, { method: 'DELETE' });
    router.push('/admin');
  }

  async function handleRemoveParticipant(regId: string, name: string) {
    if (!confirm(`${name} wirklich aus dem Training entfernen? Diese Person erhält eine E-Mail.`)) return;
    const res = await fetch(`/api/admin/registrations/${regId}`, { method: 'DELETE' });
    if (res.ok) setRegistrations((prev) => prev.filter((r) => r.id !== regId));
  }

  return (
    <main style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem' }}>
      <a href="/admin" style={{ color: '#888', fontSize: '0.875rem', textDecoration: 'none' }}>← Zurück</a>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 600, margin: '1rem 0 2rem' }}>{slot.title}</h1>

      {/* Registrations */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: '#888' }}>
          Anmeldungen ({registrations.length} / {slot.max_participants})
        </h2>
        {registrations.length === 0 ? (
          <p style={{ color: '#555', fontSize: '0.875rem' }}>Noch keine Anmeldungen.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #222' }}>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>E-Mail</th>
                <th style={thStyle}>Level</th>
                <th style={thStyle}></th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((r) => (
                <tr key={r.id} style={{ borderBottom: '1px solid #1a1a1a' }}>
                  <td style={tdStyle}>{r.name}</td>
                  <td style={tdStyle}>{r.email}</td>
                  <td style={tdStyle}>{r.playtomic_level ?? '—'}</td>
                  <td style={{ ...tdStyle, textAlign: 'right' }}>
                    <button
                      onClick={() => handleRemoveParticipant(r.id, r.name)}
                      style={{ color: '#f87171', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}
                    >
                      Entfernen
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Edit form */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: '#888' }}>Termin bearbeiten</h2>
        {error && <p style={{ color: '#f87171', marginBottom: '1rem' }}>{error}</p>}
        <SlotForm initial={slot} onSubmit={handleUpdate} submitLabel="Änderungen speichern" />
      </section>

      {/* Delete */}
      <section style={{ borderTop: '1px solid #222', paddingTop: '1.5rem' }}>
        <button
          onClick={handleDeleteSlot}
          disabled={deleting}
          style={{ padding: '0.5rem 1rem', borderRadius: '6px', background: 'transparent', border: '1px solid #f87171', color: '#f87171', fontSize: '0.875rem', cursor: 'pointer' }}
        >
          {deleting ? 'Wird gelöscht…' : 'Termin löschen'}
        </button>
      </section>
    </main>
  );
}

const thStyle: React.CSSProperties = { textAlign: 'left', padding: '0.5rem 0.75rem', color: '#888', fontWeight: 500 };
const tdStyle: React.CSSProperties = { padding: '0.75rem', verticalAlign: 'middle' };
