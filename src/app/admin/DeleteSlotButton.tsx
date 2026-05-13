'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function DeleteSlotButton({ id }: { id: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm('Termin wirklich löschen? Alle Anmeldungen werden ebenfalls gelöscht.')) return;
    setDeleting(true);
    await fetch(`/api/admin/slots/${id}`, { method: 'DELETE' });
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      style={{ color: '#f87171', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', padding: 0 }}
    >
      {deleting ? '…' : 'Löschen'}
    </button>
  );
}
