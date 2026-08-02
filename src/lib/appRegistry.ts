import type { AppRegistryEntry } from '@/data/apps';

export const ADMIN_APPS_STORAGE_KEY = 'adminApps';

export type ManagedAppEntry = AppRegistryEntry & {
  privacyText?: string;
  termsText?: string;
  supportEmail?: string;
  supportPhone?: string;
  iconUrl?: string;
  createdAt?: string;
  updatedAt?: string;
};

export const createSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || `app-${Date.now()}`;

export const buildManagedAppPaths = (slug: string) => ({
  websitePath: `/apps/${slug}`,
  privacyPath: `/apps/${slug}/privacy`,
  termsPath: `/apps/${slug}/terms`,
  supportPath: `/apps/${slug}/support`,
});

export const readManagedApps = (): ManagedAppEntry[] => {
  if (typeof window === 'undefined') return [];

  try {
    const saved = window.localStorage.getItem(ADMIN_APPS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const saveManagedApps = (apps: ManagedAppEntry[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(ADMIN_APPS_STORAGE_KEY, JSON.stringify(apps));
};

export const mergeApps = (baseApps: AppRegistryEntry[], managedApps: ManagedAppEntry[]) => {
  const merged = new Map<string, AppRegistryEntry>();

  baseApps.forEach((app) => merged.set(app.slug, app));
  managedApps.forEach((app) => merged.set(app.slug, app));

  return Array.from(merged.values());
};

export const findManagedApp = (slug: string) =>
  readManagedApps().find((app) => app.slug === slug);