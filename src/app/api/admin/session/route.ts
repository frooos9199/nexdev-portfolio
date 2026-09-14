import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE, getAdminRequestSession } from '@/lib/adminSession';

export function GET(request: NextRequest) {
  const session = getAdminRequestSession(request);
  return NextResponse.json({ authenticated: Boolean(session), ...session });
}

export function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(ADMIN_COOKIE, '', { expires: new Date(0), path: '/' });
  return response;
}