'use client';

import { useState, useEffect } from 'react';
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiEye, FiMail, FiPhone, FiXCircle } from 'react-icons/fi';
import ClientModal from '@/components/admin/ClientModal';

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<any>(null);
  const [viewingClient, setViewingClient] = useState<any>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const [clients, setClients] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('clients');
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return [
    {
      id: 1,
      name: 'شركة الذواقة',
      contact: 'أحمد محمد',
      email: 'ahmed@aldhawaqah.com',
      phone: '+965 9999 8888',
      projects: 3,
      totalRevenue: '8,500 د.ك',
      status: 'نشط',
      statusColor: 'bg-green-100 text-green-700',
      joinDate: '2024-05-10'
    },
    {
      id: 2,
      name: 'العقارات الذكية',
      contact: 'فاطمة الكندري',
      email: 'fatma@smartrealestate.com',
      phone: '+965 9888 7777',
      projects: 2,
      totalRevenue: '5,200 د.ك',
      status: 'نشط',
      statusColor: 'bg-green-100 text-green-700',
      joinDate: '2024-08-20'
    },
    {
      id: 3,
      name: 'TaskFlow',
      contact: 'محمد العنزي',
      email: 'mohammed@taskflow.com',
      phone: '+965 9777 6666',
      projects: 1,
      totalRevenue: '4,200 د.ك',
      status: 'مكتمل',
      statusColor: 'bg-blue-100 text-blue-700',
      joinDate: '2024-10-05'
    },
    {
      id: 4,
      name: 'Fashion Hub',
      contact: 'سارة الشمري',
      email: 'sara@fashionhub.com',
      phone: '+965 9666 5555',
      projects: 1,
      totalRevenue: '5,500 د.ك',
      status: 'نشط',
      statusColor: 'bg-green-100 text-green-700',
      joinDate: '2024-12-01'
    },
    {
      id: 5,
      name: 'StockPro',
      contact: 'خالد الرشيد',
      email: 'khaled@stockpro.com',
      phone: '+965 9555 4444',
      projects: 1,
      totalRevenue: '3,800 د.ك',
      status: 'معلق',
      statusColor: 'bg-yellow-100 text-yellow-700',
      joinDate: '2024-11-15'
    }
  ];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('clients', JSON.stringify(clients));
    }
  }, [clients]);

  const handleSaveClient = (clientData: any) => {
    if (editingClient) {
      // تحديث عميل موجود
      const updatedClients = clients.map((c: any) => {
        if (c.id === editingClient.id) {
          return {
            ...c,
            ...clientData,
            id: c.id,
            projects: c.projects,
            totalRevenue: c.totalRevenue,
            status: c.status,
            statusColor: c.statusColor,
            joinDate: c.joinDate
          };
        }
        return c;
      });
      setClients(updatedClients);
      setSuccessMessage('✓ تم تحديث العميل بنجاح!');
      setEditingClient(null);
    } else {
      // إضافة عميل جديد
      const newClient = {
        id: clients.length > 0 ? Math.max(...clients.map((c: any) => c.id)) + 1 : 1,
        ...clientData,
        projects: 0,
        totalRevenue: '0 د.ك',
        status: 'نشط',
        statusColor: 'bg-green-100 text-green-700',
        joinDate: new Date().toISOString().split('T')[0]
      };
      setClients([...clients, newClient]);
      setSuccessMessage('✓ تم إضافة العميل بنجاح!');
    }
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleEditClient = (client: any) => {
    setEditingClient(client);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingClient(null);
  };

  const handleDeleteClient = (id: number) => {
    setClients(clients.filter(client => client.id !== id));
    setDeleteConfirm(null);
  };
  return (
    <div className="space-y-6">
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          {successMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">إدارة العملاء</h1>
          <p className="text-gray-600 mt-2">قاعدة بيانات العملاء والتواصل</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:shadow-xl transition-all">
          <FiPlus />
          <span>عميل جديد</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-600">إجمالي العملاء</p>
          <p className="text-2xl font-bold text-gray-800">{clients.length}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-sm text-green-700">عملاء نشطين</p>
          <p className="text-2xl font-bold text-green-900">
            {clients.filter(c => c.status === 'نشط').length}
          </p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-700">إجمالي المشاريع</p>
          <p className="text-2xl font-bold text-blue-900">
            {clients.reduce((sum, c) => sum + (c.projects || 0), 0)}
          </p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <p className="text-sm text-purple-700">إجمالي الإيرادات</p>
          <p className="text-2xl font-bold text-purple-900">
            {clients.reduce((sum, c) => {
              const revenue = parseFloat(c.totalRevenue?.replace(/[^\d.-]/g, '') || '0');
              return sum + revenue;
            }, 0).toLocaleString()} د.ك
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="relative">
          <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="البحث عن عميل..."
            className="w-full pr-10 pl-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <div key={client.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800">{client.name}</h3>
                <p className="text-sm text-gray-600">{client.contact}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${client.statusColor}`}>
                {client.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FiMail className="text-gray-400" />
                <span className="truncate">{client.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FiPhone className="text-gray-400" />
                <span>{client.phone}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-600">المشاريع</p>
                <p className="text-xl font-bold text-gray-800">{client.projects}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">الإيرادات</p>
                <p className="text-xl font-bold text-gray-800">{client.totalRevenue}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
              <button 
                onClick={() => setViewingClient(client)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-xl transition text-sm"
              >
                <FiEye />
                <span>التفاصيل</span>
              </button>
              <button 
                onClick={() => handleEditClient(client)}
                className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition" 
                title="تعديل"
              >
                <FiEdit2 />
              </button>
              <button 
                onClick={() => setDeleteConfirm(client.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" 
                title="حذف"
              >
                <FiTrash2 />
              </button>
            </div>


      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">تأكيد الحذف</h3>
            <p className="text-gray-600 mb-6">هل أنت متأكد من حذف هذا العميل؟ لا يمكن التراجع عن هذا الإجراء.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                إلغاء
              </button>
              <button
                onClick={() => handleDeleteClient(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}
            <p className="text-xs text-gray-500 mt-3">انضم في {client.joinDate}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      <ClientModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        onSave={handleSaveClient}
        editingClient={editingClient}
      />

      {/* View Client Details Modal */}
      {viewingClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{viewingClient.name}</h2>
                  <p className="text-blue-100">شخص الاتصال: {viewingClient.contact}</p>
                </div>
                <button 
                  onClick={() => setViewingClient(null)}
                  className="p-2 hover:bg-white/20 rounded-lg transition"
                >
                  <FiXCircle className="text-2xl" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Status */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">الحالة</p>
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${viewingClient.statusColor}`}>
                  {viewingClient.status}
                </span>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <FiMail />
                    <p className="text-sm">البريد الإلكتروني</p>
                  </div>
                  <p className="text-lg font-semibold text-gray-800">{viewingClient.email}</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <FiPhone />
                    <p className="text-sm">رقم الهاتف</p>
                  </div>
                  <p className="text-lg font-semibold text-gray-800">{viewingClient.phone}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">الإحصائيات</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">عدد المشاريع</p>
                    <p className="text-2xl font-bold text-blue-600">{viewingClient.projects}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">إجمالي الإيرادات</p>
                    <p className="text-2xl font-bold text-green-600">{viewingClient.totalRevenue}</p>
                  </div>
                </div>
              </div>

              {/* Join Date */}
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">تاريخ الانضمام</p>
                <p className="text-lg font-semibold text-gray-800">{viewingClient.joinDate}</p>
              </div>

              {/* Address */}
              {viewingClient.address && (
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">العنوان</p>
                  <p className="text-gray-800">{viewingClient.address}</p>
                </div>
              )}

              {/* Notes */}
              {viewingClient.notes && (
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">ملاحظات</p>
                  <p className="text-gray-800">{viewingClient.notes}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setViewingClient(null);
                    handleEditClient(viewingClient);
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-xl transition"
                >
                  تعديل العميل
                </button>
                <button
                  onClick={() => setViewingClient(null)}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
