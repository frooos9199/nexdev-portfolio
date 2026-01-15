'use client';

import { useState, useEffect } from 'react';
import { FiBriefcase, FiUsers, FiFileText, FiDollarSign, FiTrendingUp, FiClock } from 'react-icons/fi';
import StatsCard from '@/components/admin/StatsCard';
import RecentProjects from '@/components/admin/RecentProjects';
import RevenueChart from '@/components/admin/RevenueChart';

export default function AdminDashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);

  // تحميل البيانات من localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedProjects = localStorage.getItem('projects');
      const savedClients = localStorage.getItem('clients');
      const savedInvoices = localStorage.getItem('invoices');
      
      if (savedProjects) setProjects(JSON.parse(savedProjects));
      if (savedClients) setClients(JSON.parse(savedClients));
      if (savedInvoices) setInvoices(JSON.parse(savedInvoices));
    }
  }, []);

  // حساب الإحصائيات الديناميكية
  const totalProjects = projects.length;
  const activeClients = clients.filter(c => c.status === 'نشط').length;
  const pendingInvoices = invoices.filter(i => i.status === 'معلق' || i.status === 'متأخر').length;
  
  // حساب إجمالي الإيرادات
  const totalRevenue = invoices.reduce((sum, inv) => {
    const amount = parseFloat(inv.amount?.replace(/[^\d.-]/g, '') || '0');
    return sum + amount;
  }, 0);

  const stats = [
    {
      title: 'إجمالي المشاريع',
      value: totalProjects.toString(),
      icon: FiBriefcase,
      change: '+12%',
      changeType: 'positive' as const,
      color: 'blue' as const
    },
    {
      title: 'العملاء النشطين',
      value: activeClients.toString(),
      icon: FiUsers,
      change: '+8%',
      changeType: 'positive' as const,
      color: 'green' as const
    },
    {
      title: 'الفواتير المعلقة',
      value: pendingInvoices.toString(),
      icon: FiFileText,
      change: '-3',
      changeType: 'negative' as const,
      color: 'yellow' as const
    },
    {
      title: 'الإيرادات الشهرية',
      value: `${totalRevenue.toLocaleString()} د.ك`,
      icon: FiDollarSign,
      change: '+25%',
      changeType: 'positive' as const,
      color: 'purple' as const
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">لوحة التحكم</h1>
        <p className="text-gray-600 mt-2">مرحباً بك في لوحة التحكم الرئيسية</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">إحصائيات سريعة</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <FiClock className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">قيد التنفيذ</p>
                  <p className="text-xl font-bold text-gray-800">
                    {projects.filter(p => p.status === 'قيد التنفيذ').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <FiTrendingUp className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">مكتملة</p>
                  <p className="text-xl font-bold text-gray-800">
                    {projects.filter(p => p.status === 'مكتمل').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <FiFileText className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">معلقة</p>
                  <p className="text-xl font-bold text-gray-800">
                    {projects.filter(p => p.status === 'معلق').length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <RecentProjects />

      {/* Maintenance Alerts */}
      {projects.filter(p => p.maintenancePrice).length > 0 && (
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl shadow-sm p-6 border border-orange-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">تنبيهات الصيانة القادمة</h3>
            <span className="px-3 py-1 bg-orange-500 text-white text-xs font-medium rounded-full">
              {projects.filter(p => p.maintenancePrice).length} مواعيد
            </span>
          </div>
          <div className="space-y-3">
            {projects
              .filter(p => p.maintenancePrice)
              .slice(0, 5)
              .map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-orange-200">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{project.name}</p>
                    <p className="text-sm text-gray-600">{project.client}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-orange-700">{project.maintenancePrice}</p>
                    <p className="text-xs text-gray-600">{project.nextMaintenanceDate}</p>
                  </div>
                </div>
              ))}
            <button className="w-full mt-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg transition font-medium">
              عرض جميع مواعيد الصيانة
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
