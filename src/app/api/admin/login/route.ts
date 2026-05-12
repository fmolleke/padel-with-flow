import { NextResponse } from 'next/server';
import { createAdminSession } from '@/lib/admin-auth';

export async function POST(request: Request) {
  const { password } = await request.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Falsches Passwort.' }, { status: 401 });
  }

  await createAdminSession();
  return NextResponse.json({ success: true });
}
