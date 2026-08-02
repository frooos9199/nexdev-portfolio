import ManagedAppRoute from '@/components/apps/ManagedAppRoute';

export default function ManagedAppPage({ params }: { params: { slug: string } }) {
  return <ManagedAppRoute slug={params.slug} view="profile" />;
}