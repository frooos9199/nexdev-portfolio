import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE, createAdminToken } from '@/lib/adminSession';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

  if (!adminEmail || normalizedEmail !== adminEmail || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'بيانات الدخول غير صحيحة' }, { status: 401 });
  }

  const response = NextResponse.json({ authenticated: true, email: adminEmail });
  response.cookies.set(ADMIN_COOKIE, createAdminToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  });
  return response;
}