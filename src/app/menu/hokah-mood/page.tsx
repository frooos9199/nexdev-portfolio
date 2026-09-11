import type { Metadata } from 'next';
import MenuClient from '@/components/menu/MenuClient';

export const metadata: Metadata = {
  metadataBase: new URL('https://nexdev-one.vercel.app'),
  title: 'Hokah MooD | Menu',
  description: 'منيو Hokah MooD - المشروبات والحلويات والشيشة',
  alternates: {
    canonical: '/menu/hokah-mood',
  },
  openGraph: {
    title: 'Hokah MooD | Menu',
    description: 'منيو Hokah MooD - المشروبات والحلويات والشيشة',
    url: '/menu/hokah-mood',
    siteName: 'Hokah MooD',
    locale: 'ar_KW',
    type: 'website',
    images: [
      {
        url: '/hokah-mood-share.png',
        width: 1200,
        height: 1200,
        alt: 'Hokah MooD',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hokah MooD | Menu',
    description: 'منيو Hokah MooD - المشروبات والحلويات والشيشة',
    images: ['/hokah-mood-share.png'],
  },
};

export default function MenuPage() {
  return <MenuClient />;
}