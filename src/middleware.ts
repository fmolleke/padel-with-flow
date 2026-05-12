import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const intlMiddleware = createMiddleware(routing);

const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET!);

async function isAdminAuthenticated(request: NextRequest): Promise<boolean> {
  try {
    const token = request.cookies.get('admin_session')?.value;
    if (!token) return false;
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api/admin')) {
    if (pathname === '/api/admin/login') return NextResponse.next();
    const authenticated = await isAdminAuthenticated(request);
    if (!authenticated) {
      return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
    }
    return NextResponse.next();
  }

  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') return NextResponse.next();

    const authenticated = await isAdminAuthenticated(request);
    if (!authenticated) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
};
