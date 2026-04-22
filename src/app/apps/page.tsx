import type { Metadata } from 'next';
import Link from 'next/link';
import AppShell from '@/components/apps/AppShell';
import { apps } from '@/data/apps';

export const metadata: Metadata = {
  title: 'Apps | Q8 NexDev',
  description: 'Browse Q8 NexDev application pages and their dedicated legal and support links.',
  alternates: {
    canonical: 'https://www.q8nexdev.com/apps',
  },
  openGraph: {
    title: 'Apps | Q8 NexDev',
    description: 'Browse Q8 NexDev application pages and their dedicated legal and support links.',
    url: 'https://www.q8nexdev.com/apps',
    siteName: 'Q8 NexDev',
    type: 'website',
  },
};

export default function AppsIndexPage() {
  return (
    <AppShell
      eyebrow="Application Directory"
      title="Q8 NexDev Apps"
      description="Dedicated pages for each application, including independent privacy, terms, and support links that can be shared directly with App Store and Google Play."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {apps.map((app) => (
          <article
            key={app.slug}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-gray-400">{app.arabicName}</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">{app.name}</h2>
              </div>
              {app.status ? (
                <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
                  {app.status}
                </span>
              ) : null}
            </div>

            <p className="text-base leading-7 text-gray-300">{app.description}</p>
            <p className="mt-4 text-sm text-gray-400">Developer: {app.developer}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              {app.websitePath ? (
                <Link
                  href={app.websitePath}
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-950 transition hover:bg-cyan-300"
                >
                  Open app page
                </Link>
              ) : null}

              {app.privacyPath ? (
                <Link
                  href={app.privacyPath}
                  className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200"
                >
                  Privacy Policy
                </Link>
              ) : null}

              {app.termsPath ? (
                <Link
                  href={app.termsPath}
                  className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200"
                >
                  Terms of Service
                </Link>
              ) : null}

              {app.supportPath ? (
                <Link
                  href={app.supportPath}
                  className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200"
                >
                  Support
                </Link>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </AppShell>
  );
}