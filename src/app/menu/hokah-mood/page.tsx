import type { Metadata } from 'next';
import MenuClient from '@/components/menu/MenuClient';

export const metadata: Metadata = {
  title: 'Hokah MooD | Menu',
  description: 'Hokah MooD menu',
};

export default function MenuPage() {
  return <MenuClient />;
}