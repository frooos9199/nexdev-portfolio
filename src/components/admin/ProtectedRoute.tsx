'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/session', { cache: 'no-store' })
      .then((response) => response.json())
      .then(({ authenticated }) => {
        if (authenticated) {
          setIsAuthenticated(true);
        } else {
          router.push('/admin/login');
        }
      })
      .catch(() => router.push('/admin/login'))
      .finally(() => setIsLoading(false));
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
