import { createHmac, timingSafeEqual } from 'crypto';
import type { NextRequest } from 'next/server';

export const ADMIN_COOKIE = 'nexdev_admin_session';

export type AdminRole = 'admin' | 'menu';

export type AdminSession = {
  username: string;
  role: AdminRole;
};

const sign = (value: string) => {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error('ADMIN_SESSION_SECRET is not configured');
  return createHmac('sha256', secret).update(value).digest('base64url');
};

export const createAdminToken = (session: AdminSession) => {
  const expiresAt = String(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const payload = Buffer.from(JSON.stringify({ ...session, expiresAt })).toString('base64url');
  return `${payload}.${sign(payload)}`;
};

export const getAdminSession = (token?: string): AdminSession | null => {
  if (!token) return null;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return null;

  const expected = Buffer.from(sign(payload));
  const received = Buffer.from(signature);
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) return null;

  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString()) as AdminSession & { expiresAt: string };
    if (Number(session.expiresAt) <= Date.now()) return null;
    if (!session.username || !['admin', 'menu'].includes(session.role)) return null;
    return { username: session.username, role: session.role };
  } catch {
    return null;
  }
};

export const getAdminRequestSession = (request: NextRequest) => (
  getAdminSession(request.cookies.get(ADMIN_COOKIE)?.value)
);

export const isAdminRequest = (request: NextRequest) => Boolean(getAdminRequestSession(request));