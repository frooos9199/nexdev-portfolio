import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE, isAdminRequest } from '@/lib/adminSession';

export function GET(request: NextRequest) {
  return NextResponse.json({ authenticated: isAdminRequest(request) });
}

export function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(ADMIN_COOKIE, '', { expires: new Date(0), path: '/' });
  return response;
}