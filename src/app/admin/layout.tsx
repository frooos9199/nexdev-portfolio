'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { FiHome, FiBriefcase, FiUsers, FiFileText, FiBarChart2, FiSettings, FiLogOut } from 'react-icons/fi';
import ProtectedRoute from '@/components/admin/ProtectedRoute';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // السماح بصفحة تسجيل الدخول بدون حماية
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminEmail');
    router.push('/admin/login');
  };

  const adminEmail = typeof window !== 'undefined' ? localStorage.getItem('adminEmail') : null;

  const isActive = (path: string) => {
    if (path === '/admin') {
      return pathname === '/admin';
    }
    return pathname?.startsWith(path);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="fixed right-0 top-0 h-full w-64 bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 text-white p-6 z-10 border-l border-purple-500/20">
          <div className="mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">NexDev</h2>
            <p className="text-sm text-gray-400">لوحة التحكم</p>
          </div>

          <nav className="space-y-2">
            <Link 
              href="/admin" 
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive('/admin') && pathname === '/admin'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                  : 'hover:bg-gray-800/50'
              }`}
            >
              <FiHome className="text-xl" />
              <span>الرئيسية</span>
            </Link>
            
            <Link 
              href="/admin/projects" 
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive('/admin/projects') 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                  : 'hover:bg-gray-800/50'
              }`}
            >
              <FiBriefcase className="text-xl" />
              <span>المشاريع</span>
            </Link>
            
            <Link 
              href="/admin/clients" 
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive('/admin/clients') 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                  : 'hover:bg-gray-800/50'
              }`}
            >
              <FiUsers className="text-xl" />
              <span>العملاء</span>
            </Link>
            
            <Link 
              href="/admin/invoices" 
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive('/admin/invoices') 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                  : 'hover:bg-gray-800/50'
              }`}
            >
              <FiFileText className="text-xl" />
              <span>الفواتير</span>
            </Link>
            
            <Link 
              href="/admin/reports" 
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive('/admin/reports') 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                  : 'hover:bg-gray-800/50'
              }`}
            >
              <FiBarChart2 className="text-xl" />
              <span>التقارير</span>
            </Link>
            
            <Link 
              href="/admin/settings" 
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive('/admin/settings') 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                  : 'hover:bg-gray-800/50'
              }`}
            >
              <FiSettings className="text-xl" />
              <span>الإعدادات</span>
            </Link>
          </nav>

          <div className="absolute bottom-6 right-6 left-6 space-y-3">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600/10 hover:bg-gradient-to-r hover:from-red-600 hover:to-pink-600 transition text-right border border-red-500/30"
            >
              <FiLogOut className="text-xl" />
              <span>تسجيل الخروج</span>
            </button>
            
            <div className="bg-gradient-to-r from-gray-800 to-gray-800/50 rounded-lg p-4 border border-purple-500/20">
              <p className="text-sm font-medium">المدير</p>
              <p className="text-xs text-gray-400 truncate">{adminEmail || 'summit_kw@hotmail.com'}</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="mr-64 p-8">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
