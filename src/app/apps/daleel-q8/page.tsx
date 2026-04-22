import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import AppShell from '@/components/apps/AppShell';
import { daleelQ8App } from '@/data/apps';

const pageUrl = 'https://www.q8nexdev.com/apps/daleel-q8';

export const metadata: Metadata = {
  title: 'Daleel Q8 Go | Q8 NexDev',
  description: 'Daleel Q8 Go is a Kuwait discovery app for places, restaurants, hotels, and offers.',
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: 'Daleel Q8 Go | Q8 NexDev',
    description: 'Discover places, restaurants, hotels, and offers across Kuwait with Daleel Q8 Go.',
    url: pageUrl,
    siteName: 'Q8 NexDev',
    type: 'website',
  },
};

const storeLinks = [
  {
    label: 'App Store',
    href: daleelQ8App.appStoreUrl,
    fallback: 'Add the final App Store URL after publication.',
  },
  {
    label: 'Google Play',
    href: daleelQ8App.googlePlayUrl,
    fallback: 'Google Play link will be added after the Android release is completed.',
  },
];

const legalLinks = [
  { label: 'Privacy Policy', href: daleelQ8App.privacyPath! },
  { label: 'Terms of Service', href: daleelQ8App.termsPath! },
  { label: 'Support', href: daleelQ8App.supportPath! },
];

const screenshots = [
  {
    title: 'Explore Kuwait',
    text: 'Browse curated categories for restaurants, hotels, and places around Kuwait.',
  },
  {
    title: 'Offers & Highlights',
    text: 'Review featured offers and local highlights in a clear mobile-first layout.',
  },
  {
    title: 'Direct Support',
    text: 'Reach Q8 NexDev quickly through the dedicated support page and legal routes.',
  },
];

export default function DaleelQ8Page() {
  return (
    <AppShell
      eyebrow="App Profile"
      title="Daleel Q8 Go | دليل الكويت"
      description="A dedicated product page for the Daleel Q8 Go application with store-ready legal and support links under the Q8 NexDev domain."
    >
      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr]">
        <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/10 shadow-2xl shadow-cyan-500/20">
              <Image
                src="/apps/daleel-q8/daleelicon512.png"
                alt="Daleel Q8 Go app icon"
                width={96}
                height={96}
                className="h-20 w-20 object-cover sm:h-24 sm:w-24"
                priority
              />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Q8 NexDev</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">{daleelQ8App.name}</h2>
              <p className="mt-1 text-lg text-gray-300">{daleelQ8App.arabicName}</p>
            </div>
          </div>

          <p className="max-w-3xl text-lg leading-8 text-gray-300">
            {daleelQ8App.description}
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            {daleelQ8App.features?.map((feature) => (
              <div key={feature} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-gray-200">
                {feature}
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <p className="text-sm uppercase tracking-[0.25em] text-gray-400">Developer</p>
              <p className="mt-3 text-xl font-semibold text-white">Q8 NexDev</p>
              <p className="mt-2 text-gray-300">Built for direct linking from app store listings and review teams.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <p className="text-sm uppercase tracking-[0.25em] text-gray-400">Support contact</p>
              <p className="mt-3 text-xl font-semibold text-white">info@q8nexdev.com</p>
              <p className="mt-2 text-gray-300">WhatsApp / Phone: +96550540999</p>
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white">Download links</h3>
            <div className="mt-5 space-y-4">
              {storeLinks.map((link) => (
                <div key={link.label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-gray-400">{link.label}</p>
                  {link.href ? (
                    <a
                      href={link.href}
                      className="mt-3 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-950 transition hover:bg-cyan-300"
                    >
                      Open {link.label}
                    </a>
                  ) : (
                    <p className="mt-3 text-sm leading-6 text-amber-200">{link.fallback}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white">Legal and support</h3>
            <div className="mt-5 flex flex-col gap-3">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </div>

      <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-gray-400">Preview</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Suggested screenshot panels</h3>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-gray-300">
            These placeholders keep the route visually complete until the final app logo and screenshots are added to the repository.
          </p>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {screenshots.map((shot, index) => (
            <div
              key={shot.title}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-5"
            >
              <div className="mb-4 aspect-[9/18] rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.25),_transparent_25%),linear-gradient(180deg,_rgba(17,24,39,0.9),_rgba(2,6,23,1))] p-4">
                <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.25em] text-cyan-200">
                  <span>Screen {index + 1}</span>
                  <span>Daleel Q8 Go</span>
                </div>
                <div className="space-y-3">
                  <div className="h-16 rounded-2xl bg-white/10" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-20 rounded-2xl bg-cyan-400/20" />
                    <div className="h-20 rounded-2xl bg-fuchsia-400/15" />
                  </div>
                  <div className="h-28 rounded-3xl bg-white/5" />
                </div>
              </div>
              <h4 className="text-lg font-semibold text-white">{shot.title}</h4>
              <p className="mt-2 text-sm leading-7 text-gray-300">{shot.text}</p>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}