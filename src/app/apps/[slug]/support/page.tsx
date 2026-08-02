import ManagedAppRoute from '@/components/apps/ManagedAppRoute';

export default function ManagedAppSupportPage({ params }: { params: { slug: string } }) {
  return <ManagedAppRoute slug={params.slug} view="support" />;
}