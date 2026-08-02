'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AppShell from '@/components/apps/AppShell';
import { findManagedApp, type ManagedAppEntry } from '@/lib/appRegistry';

type ManagedAppRouteProps = {
  slug: string;
  view: 'profile' | 'privacy' | 'terms' | 'support';
};

const fallbackText = {
  privacy: 'Privacy policy content has not been added yet.',
  terms: 'Terms of service content has not been added yet.',
};

export default function ManagedAppRoute({ slug, view }: ManagedAppRouteProps) {
  const [app, setApp] = useState<ManagedAppEntry | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    setApp(findManagedApp(slug) || null);
    setHasLoaded(true);
  }, [slug]);

  if (!hasLoaded) {
    return (
      <AppShell eyebrow="App Profile" title="Loading app" description="Loading application details.">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-gray-300">Loading...</div>
      </AppShell>
    );
  }

  if (!app) {
    return (
      <AppShell eyebrow="App Profile" title="App not found" description="This app is not available in the local admin registry.">
        <Link href="/apps" className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-gray-950 transition hover:bg-cyan-300">
          Back to apps
        </Link>
      </AppShell>
    );
  }

  if (view === 'privacy' || view === 'terms') {
    const title = view === 'privacy' ? `${app.name} Privacy Policy` : `${app.name} Terms of Service`;
    const content = view === 'privacy' ? app.privacyText : app.termsText;

    return (
      <AppShell eyebrow={view === 'privacy' ? 'Privacy Policy' : 'Terms of Service'} title={title} description={app.description}>
        <article className="rounded-3xl border border-white/10 bg-white/5 p-6 leading-8 text-gray-200 backdrop-blur-sm sm:p-8">
          {(content || fallbackText[view]).split('\n').map((paragraph, index) => (
            <p key={`${paragraph}-${index}`} className="mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </article>
      </AppShell>
    );
  }

  if (view === 'support') {
    return (
      <AppShell eyebrow="Support" title={`${app.name} Support`} description={`Contact support for ${app.name}.`}>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <p className="text-sm uppercase tracking-[0.25em] text-gray-400">Email</p>
            <a href={`mailto:${app.supportEmail || 'info@q8nexdev.com'}`} className="mt-3 block text-xl font-semibold text-cyan-200">
              {app.supportEmail || 'info@q8nexdev.com'}
            </a>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <p className="text-sm uppercase tracking-[0.25em] text-gray-400">Phone / WhatsApp</p>
            <a href={`tel:${app.supportPhone || '+96550540999'}`} className="mt-3 block text-xl font-semibold text-cyan-200">
              {app.supportPhone || '+96550540999'}
            </a>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell eyebrow="App Profile" title={`${app.name} | ${app.arabicName}`} description={app.description}>
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">{app.developer}</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">{app.name}</h2>
          <p className="mt-2 text-lg text-gray-300">{app.arabicName}</p>
          <p className="mt-6 text-lg leading-8 text-gray-300">{app.description}</p>

          {app.features?.length ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {app.features.map((feature) => (
                <div key={feature} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-gray-200">
                  {feature}
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <aside className="space-y-5">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white">Store links</h3>
            <div className="mt-5 flex flex-col gap-3">
              {app.appStoreUrl ? <a href={app.appStoreUrl} className="rounded-full bg-white px-4 py-2 text-center text-sm font-semibold text-gray-950 transition hover:bg-cyan-300">App Store</a> : null}
              {app.googlePlayUrl ? <a href={app.googlePlayUrl} className="rounded-full bg-white px-4 py-2 text-center text-sm font-semibold text-gray-950 transition hover:bg-cyan-300">Google Play</a> : null}
              {!app.appStoreUrl && !app.googlePlayUrl ? <p className="text-sm text-amber-200">Store links can be added from the admin panel.</p> : null}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white">Legal and support</h3>
            <div className="mt-5 flex flex-col gap-3">
              <Link href={`/apps/${app.slug}/privacy`} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200">Privacy Policy</Link>
              <Link href={`/apps/${app.slug}/terms`} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200">Terms of Service</Link>
              <Link href={`/apps/${app.slug}/support`} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200">Support</Link>
            </div>
          </div>
        </aside>
      </section>
    </AppShell>
  );
}