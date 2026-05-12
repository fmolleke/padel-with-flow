'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SlotForm, SlotFormData } from '../../SlotForm';

export default function NewSlotPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  async function handleSubmit(data: SlotFormData) {
    const res = await fetch('/api/admin/slots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) { setError(json.error ?? 'Fehler'); return; }
    router.push('/admin');
  }

  return (
    <main style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <a href="/admin" style={{ color: '#888', fontSize: '0.875rem', textDecoration: 'none' }}>← Zurück</a>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 600, margin: '1rem 0 2rem' }}>Neuer Termin</h1>
      {error && <p style={{ color: '#f87171', marginBottom: '1rem' }}>{error}</p>}
      <SlotForm onSubmit={handleSubmit} submitLabel="Termin erstellen" />
    </main>
  );
}
