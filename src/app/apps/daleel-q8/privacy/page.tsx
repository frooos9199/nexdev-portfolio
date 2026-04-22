import type { Metadata } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import AppShell from '@/components/apps/AppShell';
import MarkdownDocument from '@/components/apps/MarkdownDocument';

const pageUrl = 'https://www.q8nexdev.com/apps/daleel-q8/privacy';

export const metadata: Metadata = {
  title: 'Daleel Q8 Go Privacy Policy | Q8 NexDev',
  description: 'Privacy Policy for Daleel Q8 Go published by Q8 NexDev.',
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: 'Daleel Q8 Go Privacy Policy | Q8 NexDev',
    description: 'Privacy Policy for Daleel Q8 Go published by Q8 NexDev.',
    url: pageUrl,
    siteName: 'Q8 NexDev',
    type: 'article',
  },
};

async function getPrivacyContent() {
  const filePath = path.join(process.cwd(), 'PRIVACY_POLICY.md');
  return fs.readFile(filePath, 'utf8');
}

export default async function DaleelQ8PrivacyPage() {
  const content = await getPrivacyContent();

  return (
    <AppShell
      eyebrow="Legal"
      title="Daleel Q8 Go Privacy Policy"
      description="Independent privacy page for Daleel Q8 Go under the Q8 NexDev domain. This route is intended for direct use in store listings and compliance reviews."
    >
      <MarkdownDocument content={content} />
    </AppShell>
  );
}