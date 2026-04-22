import type { Metadata } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import AppShell from '@/components/apps/AppShell';
import MarkdownDocument from '@/components/apps/MarkdownDocument';

const pageUrl = 'https://www.q8nexdev.com/apps/daleel-q8/terms';

export const metadata: Metadata = {
  title: 'Daleel Q8 Go Terms of Service | Q8 NexDev',
  description: 'Terms of Service for Daleel Q8 Go published by Q8 NexDev.',
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: 'Daleel Q8 Go Terms of Service | Q8 NexDev',
    description: 'Terms of Service for Daleel Q8 Go published by Q8 NexDev.',
    url: pageUrl,
    siteName: 'Q8 NexDev',
    type: 'article',
  },
};

async function getTermsContent() {
  const filePath = path.join(process.cwd(), 'TERMS_OF_SERVICE.md');
  return fs.readFile(filePath, 'utf8');
}

export default async function DaleelQ8TermsPage() {
  const content = await getTermsContent();

  return (
    <AppShell
      eyebrow="Legal"
      title="Daleel Q8 Go Terms of Service"
      description="Independent terms page for Daleel Q8 Go under the Q8 NexDev domain, ready for direct linking from mobile app stores."
    >
      <MarkdownDocument content={content} />
    </AppShell>
  );
}