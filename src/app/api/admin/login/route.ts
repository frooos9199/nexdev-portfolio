import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE, createAdminToken } from '@/lib/adminSession';
import { scryptSync, timingSafeEqual } from 'crypto';

const MENU_USERNAME = 'hasan';
const MENU_PASSWORD_HASH = 'ccd28b6950222f8d7beab1676d03ddee:8f348e9a8142bad90922a012b98dd52689ceccdf57279130a860b334e4784bc71c4671b3b1ec763dc3b8e18c6551c33ffebfdc0c3e02d9cd56cb90fbff77360a';

const isMenuPasswordValid = (password: unknown) => {
  if (typeof password !== 'string') return false;
  const [salt, storedHash] = MENU_PASSWORD_HASH.split(':');
  const suppliedHash = scryptSync(password, salt, 64);
  const expectedHash = Buffer.from(storedHash, 'hex');
  return suppliedHash.length === expectedHash.length && timingSafeEqual(suppliedHash, expectedHash);
};

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const isMenuUser = normalizedEmail === MENU_USERNAME && isMenuPasswordValid(password);
  const isFullAdmin = Boolean(adminEmail && normalizedEmail === adminEmail && password === process.env.ADMIN_PASSWORD);

  if (!isMenuUser && !isFullAdmin) {
    return NextResponse.json({ error: 'بيانات الدخول غير صحيحة' }, { status: 401 });
  }

  const session = isMenuUser
    ? { username: MENU_USERNAME, role: 'menu' as const }
    : { username: adminEmail!, role: 'admin' as const };
  const response = NextResponse.json({ authenticated: true, ...session });
  response.cookies.set(ADMIN_COOKIE, createAdminToken(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  });
  return response;
}