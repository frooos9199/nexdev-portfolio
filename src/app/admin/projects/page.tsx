'use client';

import { useState, useEffect } from 'react';
import { FiPlus, FiSearch, FiFilter, FiEdit2, FiTrash2, FiEye, FiXCircle } from 'react-icons/fi';
import ProjectModal from '@/components/admin/ProjectModal';

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [viewingProject, setViewingProject] = useState<any>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  // تحميل المشاريع من localStorage
  const [projects, setProjects] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('projects');
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return [
    {
      id: 1,
      name: 'تطبيق توصيل الطعام',
      client: 'شركة الذواقة',
      type: ['تطبيق موبايل', 'موقع إلكتروني'],
      status: 'قيد التنفيذ',
      statusColor: 'bg-blue-100 text-blue-700',
      progress: 65,
      startDate: '2025-12-01',
      deadline: '2026-02-15',
      price: '3,500 د.ك',
      paid: '2,000 د.ك',
      maintenancePrice: '350 د.ك',
      maintenancePeriod: 'سنوياً',
      maintenanceStartDate: '2026-02-15',
      nextMaintenanceDate: '2026-02-15'
    },
    {
      id: 2,
      name: 'موقع عقاري',
      client: 'العقارات الذكية',
      type: ['موقع إلكتروني'],
      status: 'قيد المراجعة',
      statusColor: 'bg-yellow-100 text-yellow-700',
      progress: 90,
      startDate: '2025-11-15',
      deadline: '2026-01-28',
      price: '2,800 د.ك',
      paid: '2,800 د.ك',
      maintenancePrice: '280 د.ك',
      maintenancePeriod: 'سنوياً',
      maintenanceStartDate: '2026-01-28',
      nextMaintenanceDate: '2026-01-28'
    },
    {
      id: 3,
      name: 'تطبيق إدارة المهام',
      client: 'TaskFlow',
      type: ['تطبيق ويب', 'برنامج'],
      status: 'مكتمل',
      statusColor: 'bg-green-100 text-green-700',
      progress: 100,
      startDate: '2025-11-01',
      deadline: '2026-01-10',
      price: '4,200 د.ك',
      paid: '4,200 د.ك',
      maintenancePrice: '420 د.ك',
      maintenancePeriod: 'سنوياً',
      maintenanceStartDate: '2026-01-10',
      nextMaintenanceDate: '2026-01-10'
    },
    {
      id: 4,
      name: 'متجر إلكتروني',
      client: 'Fashion Hub',
      type: ['موقع إلكتروني', 'تطبيق موبايل'],
      status: 'قيد التنفيذ',
      statusColor: 'bg-blue-100 text-blue-700',
      progress: 45,
      startDate: '2025-12-15',
      deadline: '2026-03-01',
      price: '5,500 د.ك',
      paid: '1,500 د.ك',
      maintenancePrice: '550 د.ك',
      maintenancePeriod: 'نصف سنوي',
      maintenanceStartDate: '2026-03-01',
      nextMaintenanceDate: '2026-03-01'
    },
    {
      id: 5,
      name: 'نظام إدارة المخزون',
      client: 'StockPro',
      type: ['نظام إدارة', 'برنامج'],
      status: 'معلق',
      statusColor: 'bg-red-100 text-red-700',
      progress: 20,
      startDate: '2025-11-20',
      deadline: '2026-01-30',
      price: '3,800 د.ك',
      paid: '0 د.ك',
      maintenancePrice: '380 د.ك',
      maintenancePeriod: 'سنوياً',
      maintenanceStartDate: '2026-01-30',
      nextMaintenanceDate: '2026-01-30'
    }
  ];
  });

  // حفظ المشاريع في localStorage عند التحديث
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('projects', JSON.stringify(projects));
    }
  }, [projects]);

  // دالة لحساب موعد الدفع القادم
  const calculateNextMaintenanceDate = (startDate: string, period: string): string => {
    if (!startDate) return '';
    
    const start = new Date(startDate);
    const today = new Date();
    
    let monthsToAdd = 12; // افتراضياً سنوياً
    if (period === 'شهرياً') monthsToAdd = 1;
    else if (period === 'ربع سنوي') monthsToAdd = 3;
    else if (period === 'نصف سنوي') monthsToAdd = 6;
    else if (period === 'سنوياً') monthsToAdd = 12;
    
    let nextDate = new Date(start);
    
    // إضافة الأشهر حتى نصل لتاريخ مستقبلي
    while (nextDate <= today) {
      nextDate.setMonth(nextDate.getMonth() + monthsToAdd);
    }
    
    return nextDate.toISOString().split('T')[0];
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {showSuccess && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg z-50 animate-bounce text-sm sm:text-base">
          {successMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">إدارة المشاريع</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">متابعة وتنظيم المشاريع</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:shadow-xl transition-all text-sm sm:text-base">
          <FiPlus />
          <span>مشروع جديد</span>
        </button>
      </div>

  const handleSaveProject = (projectData: any) => {
    const nextMaintenanceDate = projectData.maintenanceStartDate 
      ? calculateNextMaintenanceDate(projectData.maintenanceStartDate, projectData.maintenancePeriod)
      : '';
      
    if (editingProject) {
      // تحديث مشروع موجود
      const updatedProjects = projects.map((p: any) => {
        if (p.id === editingProject.id) {
          return {
            ...p,
            ...projectData,
            id: p.id,
            price: projectData.price.includes('د.ك') ? projectData.price : `${projectData.price} د.ك`,
            paid: projectData.paid?.includes('د.ك') ? projectData.paid : `${projectData.paid || 0} د.ك`,
            maintenancePrice: projectData.maintenancePrice ? 
              (projectData.maintenancePrice.includes('د.ك') ? projectData.maintenancePrice : `${projectData.maintenancePrice} د.ك`) : '',
            nextMaintenanceDate
          };
        }
        return p;
      });
      setProjects(updatedProjects);
      setSuccessMessage('✓ تم تحديث المشروع بنجاح!');
      setEditingProject(null);
    } else {
      // إضافة مشروع جديد
      const newProject = {
        id: projects.length > 0 ? Math.max(...projects.map((p: any) => p.id)) + 1 : 1,
        ...projectData,
        price: `${projectData.price} د.ك`,
        maintenancePrice: projectData.maintenancePrice ? `${projectData.maintenancePrice} د.ك` : '',
        statusColor: 'bg-blue-100 text-blue-700',
        paid: '0 د.ك',
        nextMaintenanceDate
      };
      setProjects([...projects, newProject]);
      setSuccessMessage('✓ تم إضافة المشروع بنجاح!');
    }
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleEditProject = (project: any) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter((project: any) => project.id !== id));
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
          <h1 className="text-3xl font-bold text-gray-800">إدارة المشاريع</h1>
          <p className="text-gray-600 mt-2">إدارة وتتبع جميع المشاريع</p>
        </div>
        <button 
          onClick={() => {
            setEditingProject(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:shadow-xl transition-all"
        >
          <FiPlus />
          <span>مشروع جديد</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-600">المجموع</p>
          <p className="text-2xl font-bold text-gray-800">{projects.length}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-700">قيد التنفيذ</p>
          <p className="text-2xl font-bold text-blue-900">
            {projects.filter((p: any) => p.status === 'قيد التنفيذ').length}
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-sm text-green-700">مكتملة</p>
          <p className="text-2xl font-bold text-green-900">
            {projects.filter((p: any) => p.status === 'مكتمل').length}
          </p>
        </div>
        <div className="bg-red-50 rounded-lg p-4">
          <p className="text-sm text-red-700">معلقة</p>
          <p className="text-2xl font-bold text-red-900">
            {projects.filter((p: any) => p.status === 'معلق').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="البحث عن مشروع..."
              className="w-full pr-10 pl-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">جميع الحالات</option>
            <option value="progress">قيد التنفيذ</option>
            <option value="review">قيد المراجعة</option>
            <option value="completed">مكتمل</option>
            <option value="pending">معلق</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            <FiFilter />
            <span>تصفية</span>
          </button>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">المشروع</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">العميل</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">النوع</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">الحالة</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">التقدم</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">المبلغ</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">الصيانة</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project: any) => (
                <tr key={project.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-800">{project.name}</p>
                      <p className="text-sm text-gray-500">الموعد: {project.deadline}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{project.client}</td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1">
                      {Array.isArray(project.type) ? (
                        project.type.map((t: string, index: number) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {t}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-600">{project.type}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.statusColor}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 min-w-[80px]">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-800">{project.price}</p>
                      <p className="text-xs text-green-600">مدفوع: {project.paid}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {project.maintenancePrice ? (
                      <div>
                        <p className="font-medium text-purple-700">{project.maintenancePrice}</p>
                        <p className="text-xs text-gray-600">{project.maintenancePeriod}</p>
                        {project.nextMaintenanceDate && (
                          <p className="text-xs text-orange-600 mt-1">
                            القادم: {project.nextMaintenanceDate}
                          </p>
                        )}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">لا يوجد</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setViewingProject(project)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" 
                        title="عرض"
                      >
                        <FiEye />
                      </button>
                      <button 
                        onClick={() => handleEditProject(project)}
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition" 
                        title="تعديل"
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        onClick={() => setDeleteConfirm(project.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" 
                        title="حذف"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">عرض 1-{projects.length} من {projects.length} مشروع</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm">
              السابق
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-sm">1</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm">
              التالي
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ProjectModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        onSave={handleSaveProject}
        editingProject={editingProject}
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">تأكيد الحذف</h3>
            <p className="text-gray-600 mb-6">هل أنت متأكد من حذف هذا المشروع؟ لا يمكن التراجع عن هذا الإجراء.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                إلغاء
              </button>
              <button
                onClick={() => handleDeleteProject(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Project Details Modal */}
      {viewingProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{viewingProject.name}</h2>
                  <p className="text-blue-100">عميل: {viewingProject.client}</p>
                </div>
                <button 
                  onClick={() => setViewingProject(null)}
                  className="p-2 hover:bg-white/20 rounded-lg transition"
                >
                  <FiXCircle className="text-2xl" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Status & Progress */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">الحالة</p>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${viewingProject.statusColor}`}>
                    {viewingProject.status}
                  </span>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">نسبة الإنجاز</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all"
                        style={{ width: `${viewingProject.progress || 0}%` }}
                      ></div>
                    </div>
                    <span className="text-lg font-bold text-blue-600">{viewingProject.progress || 0}%</span>
                  </div>
                </div>
              </div>

              {/* Project Type */}
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">نوع المشروع</p>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(viewingProject.type) ? (
                    viewingProject.type.map((t: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
                        {t}
                      </span>
                    ))
                  ) : (
                    <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
                      {viewingProject.type}
                    </span>
                  )}
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">تاريخ البدء</p>
                  <p className="text-lg font-semibold text-gray-800">{viewingProject.startDate}</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">الموعد النهائي</p>
                  <p className="text-lg font-semibold text-gray-800">{viewingProject.deadline}</p>
                </div>
              </div>

              {/* Financial Info */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">المعلومات المالية</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">قيمة المشروع</p>
                    <p className="text-xl font-bold text-gray-800">{viewingProject.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">المبلغ المدفوع</p>
                    <p className="text-xl font-bold text-green-600">{viewingProject.paid || '0 د.ك'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">المتبقي</p>
                    <p className="text-xl font-bold text-orange-600">
                      {(() => {
                        const price = parseFloat(viewingProject.price?.replace(/[^\d.]/g, '') || '0');
                        const paid = parseFloat(viewingProject.paid?.replace(/[^\d.]/g, '') || '0');
                        return `${(price - paid).toLocaleString()} د.ك`;
                      })()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Maintenance Info */}
              {viewingProject.maintenancePrice && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">معلومات الصيانة</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">قيمة الصيانة</p>
                      <p className="text-lg font-bold text-purple-600">{viewingProject.maintenancePrice}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">فترة الدفع</p>
                      <p className="text-lg font-semibold text-gray-800">{viewingProject.maintenancePeriod}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">الدفعة القادمة</p>
                      <p className="text-lg font-semibold text-orange-600">{viewingProject.nextMaintenanceDate}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Description */}
              {viewingProject.description && (
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">الوصف</h3>
                  <p className="text-gray-600">{viewingProject.description}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setViewingProject(null);
                    handleEditProject(viewingProject);
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-xl transition"
                >
                  تعديل المشروع
                </button>
                <button
                  onClick={() => setViewingProject(null)}
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
