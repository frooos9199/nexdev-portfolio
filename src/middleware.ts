import { NextRequest, NextResponse } from 'next/server';

const ADMIN_COOKIE = 'nexdev_admin_session';

type SessionPayload = {
  role: 'admin' | 'menu';
  expiresAt: string;
};

const decodeBase64Url = (value: string) => {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  return Uint8Array.from(atob(base64), (character) => character.charCodeAt(0));
};

const getSession = async (request: NextRequest): Promise<SessionPayload | null> => {
  const secret = process.env.ADMIN_SESSION_SECRET;
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  if (!secret || !token) return null;

  const [payload, signature] = token.split('.');
  if (!payload || !signature) return null;

  try {
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify'],
    );
    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      decodeBase64Url(signature),
      new TextEncoder().encode(payload),
    );
    if (!isValid) return null;

    const session = JSON.parse(new TextDecoder().decode(decodeBase64Url(payload))) as SessionPayload;
    if (Number(session.expiresAt) <= Date.now() || !['admin', 'menu'].includes(session.role)) return null;
    return session;
  } catch {
    return null;
  }
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === '/admin/login') return NextResponse.next();

  const session = await getSession(request);
  if (!session) return NextResponse.redirect(new URL('/admin/login', request.url));
  if (session.role === 'menu' && pathname !== '/admin/menu') {
    return NextResponse.redirect(new URL('/admin/menu', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};