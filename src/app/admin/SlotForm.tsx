'use client';

import { useState, useRef } from 'react';

export type SlotFormData = {
  title: string;
  description: string;
  date_time: string;
  duration_minutes: number;
  max_participants: number;
  location: string;
  price: number | null;
  is_visible: boolean;
};

type Props = {
  initial?: Partial<SlotFormData>;
  onSubmit: (data: SlotFormData) => Promise<void>;
  submitLabel: string;
};

export function SlotForm({ initial, onSubmit, submitLabel }: Props) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const initialDate = initial?.date_time
    ? new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Berlin', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(initial.date_time))
    : '';
  const initialTime = initial?.date_time
    ? new Intl.DateTimeFormat('de-DE', { timeZone: 'Europe/Berlin', hour: '2-digit', minute: '2-digit' }).format(new Date(initial.date_time))
    : '';
  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(initialTime);
  const [duration, setDuration] = useState(String(initial?.duration_minutes ?? 60));
  const [maxParticipants, setMaxParticipants] = useState(String(initial?.max_participants ?? 4));
  const [location, setLocation] = useState(initial?.location ?? '');
  const [price, setPrice] = useState(initial?.price != null ? String(initial.price) : '');
  const [isVisible, setIsVisible] = useState(initial?.is_visible ?? true);
  const [submitting, setSubmitting] = useState(false);
  const datePickerRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const isoDateTime = new Date(`${date}T${time}:00`).toISOString();
    await onSubmit({
      title,
      description,
      date_time: isoDateTime,
      duration_minutes: Number(duration),
      max_participants: Number(maxParticipants),
      location,
      price: price !== '' ? Number(price) : null,
      is_visible: isVisible,
    });
    setSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Field label="Titel *">
        <input style={inputStyle} required value={title} onChange={(e) => setTitle(e.target.value)} />
      </Field>
      <Field label="Beschreibung">
        <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={description} onChange={(e) => setDescription(e.target.value)} />
      </Field>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <Field label="Datum *">
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              readOnly
              required
              value={date ? date.split('-').reverse().join('.') : ''}
              placeholder="TT.MM.JJJJ"
              style={{ ...inputStyle, cursor: 'pointer' }}
              onClick={() => datePickerRef.current?.showPicker()}
            />
            <input
              ref={datePickerRef}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
            />
          </div>
        </Field>
        <Field label="Uhrzeit *">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <select
              required
              value={time.split(':')[0] ?? ''}
              onChange={(e) => setTime(`${e.target.value}:${time.split(':')[1] ?? '00'}`)}
              style={inputStyle}
            >
              <option value="" disabled>HH</option>
              {Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0')).map((h) => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
            <select
              required
              value={time.split(':')[1] ?? ''}
              onChange={(e) => setTime(`${time.split(':')[0] ?? '00'}:${e.target.value}`)}
              style={inputStyle}
            >
              <option value="" disabled>MM</option>
              {['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'].map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </Field>
      </div>
      <Field label="Dauer (Minuten) *">
        <input type="number" style={inputStyle} required value={duration} onChange={(e) => setDuration(e.target.value)} min={15} />
      </Field>
      <Field label="Max. Teilnehmer *">
        <input type="number" style={inputStyle} required value={maxParticipants} onChange={(e) => setMaxParticipants(e.target.value)} min={1} />
      </Field>
      <Field label="Ort *">
        <input style={inputStyle} required value={location} onChange={(e) => setLocation(e.target.value)} />
      </Field>
      <Field label="Preis (€)">
        <input type="number" style={inputStyle} value={price} onChange={(e) => setPrice(e.target.value)} min={0} step={0.01} placeholder="Leer lassen = kostenlos" />
      </Field>
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
        <input type="checkbox" checked={isVisible} onChange={(e) => setIsVisible(e.target.checked)} />
        Öffentlich sichtbar
      </label>
      <button
        type="submit"
        disabled={submitting}
        style={{ padding: '0.625rem', borderRadius: '6px', border: 'none', background: '#e5e5e5', color: '#0a0a0a', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', marginTop: '0.5rem' }}
      >
        {submitting ? 'Wird gespeichert…' : submitLabel}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.8125rem', color: '#888', marginBottom: '0.375rem' }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.625rem 0.75rem', borderRadius: '6px',
  border: '1px solid #333', background: '#111', color: '#e5e5e5',
  fontSize: '0.875rem', boxSizing: 'border-box',
};
