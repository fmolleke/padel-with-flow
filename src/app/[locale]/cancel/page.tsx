'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

type SlotInfo = {
  name: string;
  slotTitle: string;
  slotDateTime: string;
  slotLocation: string;
};

export default function CancelPage() {
  const { locale } = useParams<{ locale: string }>();
  const [token, setToken] = useState<string | null>(null);
  const [info, setInfo] = useState<SlotInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelled, setCancelled] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get('token');
    setToken(t);
    if (!t) { setLoading(false); setError('Kein Token angegeben.'); return; }

    fetch(`/api/cancel?token=${t}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setInfo(data);
        setLoading(false);
      })
      .catch(() => { setError('Fehler beim Laden.'); setLoading(false); });
  }, []);

  async function handleCancel() {
    setSubmitting(true);
    const res = await fetch('/api/cancel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, locale }),
    });
    const data = await res.json();
    setSubmitting(false);
    if (!res.ok) setError(data.error ?? 'Fehler beim Stornieren.');
    else setCancelled(true);
  }

  if (loading) return <main className="max-w-lg mx-auto px-8 py-32"><p>Laden…</p></main>;

  return (
    <main className="max-w-lg mx-auto px-8 py-32">
      <h1 className="font-display text-3xl font-semibold mb-6">Anmeldung stornieren</h1>

      {error && (
        <p style={{ color: 'var(--fg-muted)' }}>{error}</p>
      )}

      {cancelled && (
        <div className="rounded-lg p-6" style={{ background: 'var(--bg-muted)' }}>
          <p className="font-semibold mb-1">Stornierung bestätigt.</p>
          <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>
            Dein Platz wurde freigegeben. Du erhältst eine Bestätigungs-E-Mail.
          </p>
        </div>
      )}

      {info && !cancelled && (
        <div>
          <p className="text-sm mb-6 leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
            Hallo <strong>{info.name}</strong>, möchtest du deine Anmeldung für{' '}
            <strong>{info.slotTitle}</strong> stornieren?
          </p>
          <div className="rounded-lg border p-4 mb-6 text-sm" style={{ borderColor: 'var(--line-soft)' }}>
            <p className="font-medium mb-1">{info.slotTitle}</p>
            <p style={{ color: 'var(--fg-muted)' }}>
              {new Date(info.slotDateTime).toLocaleDateString('de-DE', {
                weekday: 'long', day: 'numeric', month: 'long',
              })}
              {' · '}
              {new Date(info.slotDateTime).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })} Uhr
            </p>
            <p style={{ color: 'var(--fg-muted)' }}>{info.slotLocation}</p>
          </div>
          <button
            onClick={handleCancel}
            disabled={submitting}
            className="px-6 py-3 rounded font-medium text-sm transition-all"
            style={{ background: 'var(--bg-muted)', color: 'var(--fg)' }}
          >
            {submitting ? 'Wird storniert…' : 'Ja, Anmeldung stornieren'}
          </button>
        </div>
      )}
    </main>
  );
}
