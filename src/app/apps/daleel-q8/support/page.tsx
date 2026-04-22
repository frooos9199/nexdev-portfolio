import type { Metadata } from 'next';
import Link from 'next/link';
import AppShell from '@/components/apps/AppShell';

const pageUrl = 'https://www.q8nexdev.com/apps/daleel-q8/support';

export const metadata: Metadata = {
  title: 'Daleel Q8 Go Support | Q8 NexDev',
  description: 'Support and contact page for Daleel Q8 Go.',
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: 'Daleel Q8 Go Support | Q8 NexDev',
    description: 'Support and contact page for Daleel Q8 Go.',
    url: pageUrl,
    siteName: 'Q8 NexDev',
    type: 'website',
  },
};

const supportItems = [
  { label: 'Application', value: 'Daleel Q8 Go | دليل الكويت' },
  { label: 'Company', value: 'Q8 NexDev' },
  { label: 'Email', value: 'info@q8nexdev.com', href: 'mailto:info@q8nexdev.com' },
  { label: 'Phone / WhatsApp', value: '+96550540999', href: 'https://wa.me/96550540999' },
  { label: 'Website', value: 'https://www.q8nexdev.com', href: 'https://www.q8nexdev.com' },
];

export default function DaleelQ8SupportPage() {
  return (
    <AppShell
      eyebrow="Support"
      title="Support for Daleel Q8 Go"
      description="If you face any issue in the app, have a question, or want to request data deletion, contact Q8 NexDev using the details below."
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
          <h2 className="text-2xl font-semibold text-white">Contact details</h2>
          <div className="mt-6 space-y-4">
            {supportItems.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-sm uppercase tracking-[0.2em] text-gray-400">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="mt-2 inline-block text-lg font-semibold text-cyan-200 hover:text-cyan-100">
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
          <h2 className="text-2xl font-semibold text-white">Need help?</h2>
          <p className="mt-4 text-base leading-8 text-gray-300">
            If you encountered a problem in Daleel Q8 Go, need assistance with content, or want to request deletion of your data, contact us by email or WhatsApp and include your device type, app version, and a short description of the issue.
          </p>

          <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5 text-sm leading-7 text-cyan-50">
            Direct store-ready links are also available for the Daleel Q8 Go privacy policy and terms page.
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/apps/daleel-q8/privacy"
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/apps/daleel-q8/terms"
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200"
            >
              Terms of Service
            </Link>
          </div>
        </section>
      </div>
    </AppShell>
  );
}