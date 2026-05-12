'use client';

import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  return (
    <button
      onClick={handleLogout}
      style={{ padding: '0.5rem 1rem', borderRadius: '6px', background: 'transparent', border: '1px solid #333', color: '#888', fontSize: '0.875rem', cursor: 'pointer' }}
    >
      Abmelden
    </button>
  );
}
