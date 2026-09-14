'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

type Session = {
  username: string;
  role: 'admin' | 'menu';
};

export default function ProtectedRoute({ children }: { children: (session: Session) => React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/session', { cache: 'no-store' })
      .then((response) => response.json())
      .then((data) => {
        if (data.authenticated && data.username && data.role) {
          if (data.role === 'menu' && pathname !== '/admin/menu') {
            router.replace('/admin/menu');
            return;
          }
          setSession({ username: data.username, role: data.role });
        } else {
          router.replace('/admin/login');
        }
      })
      .catch(() => router.replace('/admin/login'))
      .finally(() => setIsLoading(false));
  }, [pathname, router]);

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

  if (!session) {
    return null;
  }

  return <>{children(session)}</>;
}
