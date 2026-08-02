import ManagedAppRoute from '@/components/apps/ManagedAppRoute';

export default function ManagedAppPrivacyPage({ params }: { params: { slug: string } }) {
  return <ManagedAppRoute slug={params.slug} view="privacy" />;
}