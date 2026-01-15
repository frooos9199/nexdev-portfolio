'use client';

import { useState, useEffect } from 'react';
import { FiTrendingUp, FiDownload, FiCalendar, FiDollarSign, FiPackage, FiUsers, FiPieChart } from 'react-icons/fi';

export default function ReportsPage() {
  // تحميل البيانات من localStorage
  const [projects, setProjects] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);

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

  // حساب الإحصائيات
  const parseAmount = (amount: string) => {
    return parseFloat(amount.replace(/[^\d.]/g, '') || '0');
  };

  const totalRevenue = projects.reduce((sum, project) => sum + parseAmount(project.price), 0);
  const totalPaid = projects.reduce((sum, project) => sum + parseAmount(project.paid || '0'), 0);
  const totalExpenses = totalRevenue * 0.23; // نفترض 23% مصاريف
  const netProfit = totalPaid - totalExpenses;
  const completedProjects = projects.filter(p => p.status === 'مكتمل').length;
  const avgProjectValue = projects.length > 0 ? totalRevenue / projects.length : 0;

  // إحصائيات حسب الحالة
  const inProgressCount = projects.filter(p => p.status === 'قيد التنفيذ').length;
  const pendingCount = projects.filter(p => p.status === 'معلق').length;
  const reviewCount = projects.filter(p => p.status === 'قيد المراجعة').length;

  // متوسط نسبة الإنجاز
  const avgProgress = projects.length > 0 
    ? Math.round(projects.reduce((sum, p) => sum + (p.progress || 0), 0) / projects.length)
    : 0;

  // أفضل العملاء
  const clientStats = clients.map(client => {
    const clientProjects = projects.filter(p => p.client === client.name);
    const clientRevenue = clientProjects.reduce((sum, p) => sum + parseAmount(p.price), 0);
    return {
      name: client.name,
      projects: clientProjects.length,
      revenue: clientRevenue
    };
  }).sort((a, b) => b.revenue - a.revenue).slice(0, 5);

  // إحصائيات الفواتير
  const paidInvoices = invoices.filter(inv => inv.status === 'مدفوع').length;
  const pendingInvoices = invoices.filter(inv => inv.status === 'معلق').length;
  const overdueInvoices = invoices.filter(inv => inv.status === 'متأخر').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">التقارير والإحصائيات</h1>
          <p className="text-gray-600 mt-2">تحليل الأداء المالي والتشغيلي - بيانات حقيقية</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition shadow-lg">
          <FiDownload />
          <span>تصدير التقرير</span>
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-blue-100 text-sm">إجمالي الإيرادات</p>
            <FiDollarSign className="text-2xl opacity-80" />
          </div>
          <p className="text-3xl font-bold mt-2">{totalRevenue.toLocaleString()} د.ك</p>
          <p className="text-sm mt-2 text-blue-100">من {projects.length} مشروع</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-green-100 text-sm">صافي الربح</p>
            <FiTrendingUp className="text-2xl opacity-80" />
          </div>
          <p className="text-3xl font-bold mt-2">{netProfit.toLocaleString()} د.ك</p>
          <p className="text-sm mt-2 text-green-100">نسبة الربح {((netProfit/totalPaid)*100).toFixed(0)}%</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-purple-100 text-sm">المشاريع المكتملة</p>
            <FiPackage className="text-2xl opacity-80" />
          </div>
          <p className="text-3xl font-bold mt-2">{completedProjects}</p>
          <p className="text-sm mt-2 text-purple-100">من إجمالي {projects.length} مشروع</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-orange-100 text-sm">متوسط قيمة المشروع</p>
            <FiPieChart className="text-2xl opacity-80" />
          </div>
          <p className="text-3xl font-bold mt-2">{avgProjectValue.toLocaleString()} د.ك</p>
          <p className="text-sm mt-2 text-orange-100">معدل الإنجاز {avgProgress}%</p>
        </div>
      </div>

      {/* إحصائيات المشاريع والفواتير */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* حالة المشاريع */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <FiPackage className="text-purple-600" />
            توزيع المشاريع حسب الحالة
          </h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">قيد التنفيذ</span>
                <span className="text-sm font-bold text-blue-600">{inProgressCount} مشروع</span>
              </div>
              <div className="bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all"
                  style={{ width: `${(inProgressCount/projects.length)*100}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">قيد المراجعة</span>
                <span className="text-sm font-bold text-yellow-600">{reviewCount} مشروع</span>
              </div>
              <div className="bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-3 rounded-full transition-all"
                  style={{ width: `${(reviewCount/projects.length)*100}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">مكتمل</span>
                <span className="text-sm font-bold text-green-600">{completedProjects} مشروع</span>
              </div>
              <div className="bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all"
                  style={{ width: `${(completedProjects/projects.length)*100}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">معلق</span>
                <span className="text-sm font-bold text-red-600">{pendingCount} مشروع</span>
              </div>
              <div className="bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all"
                  style={{ width: `${(pendingCount/projects.length)*100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">متوسط نسبة الإنجاز</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {avgProgress}%
              </span>
            </div>
          </div>
        </div>

        {/* حالة الفواتير */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <FiDollarSign className="text-green-600" />
            توزيع الفواتير حسب الحالة
          </h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">مدفوع</span>
                <span className="text-sm font-bold text-green-600">{paidInvoices} فاتورة</span>
              </div>
              <div className="bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all"
                  style={{ width: `${invoices.length > 0 ? (paidInvoices/invoices.length)*100 : 0}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">معلق</span>
                <span className="text-sm font-bold text-yellow-600">{pendingInvoices} فاتورة</span>
              </div>
              <div className="bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-3 rounded-full transition-all"
                  style={{ width: `${invoices.length > 0 ? (pendingInvoices/invoices.length)*100 : 0}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">متأخر</span>
                <span className="text-sm font-bold text-red-600">{overdueInvoices} فاتورة</span>
              </div>
              <div className="bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all"
                  style={{ width: `${invoices.length > 0 ? (overdueInvoices/invoices.length)*100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">إجمالي الفواتير</span>
              <span className="text-lg font-bold text-gray-800">{invoices.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">المبلغ المدفوع</span>
              <span className="text-lg font-bold text-green-600">{totalPaid.toLocaleString()} د.ك</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">المتبقي</span>
              <span className="text-lg font-bold text-orange-600">{(totalRevenue - totalPaid).toLocaleString()} د.ك</span>
            </div>
          </div>
        </div>
      </div>

      {/* أفضل العملاء */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <FiUsers className="text-blue-600" />
            أفضل العملاء
          </h3>
          <span className="text-sm text-gray-500">{clients.length} عميل نشط</span>
        </div>
        
        {clientStats.length > 0 ? (
          <div className="space-y-3">
            {clientStats.map((client, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg hover:shadow-md transition">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                    index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500' :
                    index === 2 ? 'bg-gradient-to-r from-orange-600 to-red-600' :
                    'bg-gradient-to-r from-blue-500 to-purple-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{client.name}</p>
                    <p className="text-sm text-gray-600">{client.projects} مشاريع</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="font-bold text-green-600">{client.revenue.toLocaleString()} د.ك</p>
                  <p className="text-xs text-gray-500">
                    {((client.revenue/totalRevenue)*100).toFixed(1)}% من الإيرادات
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            لا توجد بيانات عملاء حتى الآن
          </div>
        )}
      </div>

      {/* المشاريع الأكثر قيمة */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <FiTrendingUp className="text-purple-600" />
            أعلى المشاريع قيمة
          </h3>
        </div>
        
        {projects.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">المشروع</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">العميل</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإنجاز</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">القيمة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {projects
                  .sort((a, b) => parseAmount(b.price) - parseAmount(a.price))
                  .slice(0, 5)
                  .map((project, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-800">{project.name}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{project.client}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${project.statusColor}`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 min-w-[60px]">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                              style={{ width: `${project.progress || 0}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-600">{project.progress || 0}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-bold text-green-600">{project.price}</p>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            لا توجد مشاريع حتى الآن
          </div>
        )}
      </div>

      {/* نظرة عامة دائرية */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <FiPieChart className="text-blue-600" />
          نظرة عامة على حالة المشاريع
        </h3>
        
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle className="text-gray-200" strokeWidth="8" stroke="currentColor" fill="transparent" r="56" cx="64" cy="64"/>
                  <circle 
                    className="text-green-600 transition-all duration-1000" 
                    strokeWidth="8" 
                    strokeDasharray={2 * Math.PI * 56} 
                    strokeDashoffset={2 * Math.PI * 56 * (1 - (completedProjects/projects.length))} 
                    strokeLinecap="round" 
                    stroke="currentColor" 
                    fill="transparent" 
                    r="56" 
                    cx="64" 
                    cy="64"
                  />
                </svg>
                <span className="absolute text-2xl font-bold text-gray-800">
                  {Math.round((completedProjects/projects.length)*100)}%
                </span>
              </div>
              <p className="mt-4 font-semibold text-gray-800">مكتملة</p>
              <p className="text-sm text-gray-600">{completedProjects} مشروع</p>
            </div>

            <div className="text-center">
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle className="text-gray-200" strokeWidth="8" stroke="currentColor" fill="transparent" r="56" cx="64" cy="64"/>
                  <circle 
                    className="text-blue-600 transition-all duration-1000" 
                    strokeWidth="8" 
                    strokeDasharray={2 * Math.PI * 56} 
                    strokeDashoffset={2 * Math.PI * 56 * (1 - (inProgressCount/projects.length))} 
                    strokeLinecap="round" 
                    stroke="currentColor" 
                    fill="transparent" 
                    r="56" 
                    cx="64" 
                    cy="64"
                  />
                </svg>
                <span className="absolute text-2xl font-bold text-gray-800">
                  {Math.round((inProgressCount/projects.length)*100)}%
                </span>
              </div>
              <p className="mt-4 font-semibold text-gray-800">قيد التنفيذ</p>
              <p className="text-sm text-gray-600">{inProgressCount} مشروع</p>
            </div>

            <div className="text-center">
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle className="text-gray-200" strokeWidth="8" stroke="currentColor" fill="transparent" r="56" cx="64" cy="64"/>
                  <circle 
                    className="text-yellow-600 transition-all duration-1000" 
                    strokeWidth="8" 
                    strokeDasharray={2 * Math.PI * 56} 
                    strokeDashoffset={2 * Math.PI * 56 * (1 - (reviewCount/projects.length))} 
                    strokeLinecap="round" 
                    stroke="currentColor" 
                    fill="transparent" 
                    r="56" 
                    cx="64" 
                    cy="64"
                  />
                </svg>
                <span className="absolute text-2xl font-bold text-gray-800">
                  {Math.round((reviewCount/projects.length)*100)}%
                </span>
              </div>
              <p className="mt-4 font-semibold text-gray-800">قيد المراجعة</p>
              <p className="text-sm text-gray-600">{reviewCount} مشروع</p>
            </div>

            <div className="text-center">
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle className="text-gray-200" strokeWidth="8" stroke="currentColor" fill="transparent" r="56" cx="64" cy="64"/>
                  <circle 
                    className="text-red-600 transition-all duration-1000" 
                    strokeWidth="8" 
                    strokeDasharray={2 * Math.PI * 56} 
                    strokeDashoffset={2 * Math.PI * 56 * (1 - (pendingCount/projects.length))} 
                    strokeLinecap="round" 
                    stroke="currentColor" 
                    fill="transparent" 
                    r="56" 
                    cx="64" 
                    cy="64"
                  />
                </svg>
                <span className="absolute text-2xl font-bold text-gray-800">
                  {Math.round((pendingCount/projects.length)*100)}%
                </span>
              </div>
              <p className="mt-4 font-semibold text-gray-800">معلقة</p>
              <p className="text-sm text-gray-600">{pendingCount} مشروع</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            لا توجد مشاريع لعرض الإحصائيات
          </div>
        )}
      </div>
    </div>
  );
}
