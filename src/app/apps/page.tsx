import type { Metadata } from 'next';
import AppShell from '@/components/apps/AppShell';
import AppsDirectoryClient from '@/components/apps/AppsDirectoryClient';

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
      <AppsDirectoryClient />
    </AppShell>
  );
}