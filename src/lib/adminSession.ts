import { createHmac, timingSafeEqual } from 'crypto';
import type { NextRequest } from 'next/server';

export const ADMIN_COOKIE = 'nexdev_admin_session';

const sign = (value: string) => {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error('ADMIN_SESSION_SECRET is not configured');
  return createHmac('sha256', secret).update(value).digest('base64url');
};

export const createAdminToken = () => {
  const expiresAt = String(Date.now() + 7 * 24 * 60 * 60 * 1000);
  return `${expiresAt}.${sign(expiresAt)}`;
};

export const isAdminTokenValid = (token?: string) => {
  if (!token) return false;
  const [expiresAt, signature] = token.split('.');
  if (!expiresAt || !signature || Number(expiresAt) <= Date.now()) return false;

  const expected = Buffer.from(sign(expiresAt));
  const received = Buffer.from(signature);
  return expected.length === received.length && timingSafeEqual(expected, received);
};

export const isAdminRequest = (request: NextRequest) => (
  isAdminTokenValid(request.cookies.get(ADMIN_COOKIE)?.value)
);