import ManagedAppRoute from '@/components/apps/ManagedAppRoute';

export default function ManagedAppTermsPage({ params }: { params: { slug: string } }) {
  return <ManagedAppRoute slug={params.slug} view="terms" />;
}