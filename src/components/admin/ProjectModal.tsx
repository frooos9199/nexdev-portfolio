'use client';

import { useState, useEffect } from 'react';
import { FiXCircle } from 'react-icons/fi';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: any) => void;
  editingProject?: any;
}

export default function ProjectModal({ isOpen, onClose, onSave, editingProject }: ProjectModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    client: '',
    type: [] as string[],
    description: '',
    price: '',
    paid: '',
    maintenancePrice: '',
    maintenancePeriod: 'سنوياً',
    maintenanceStartDate: '',
    startDate: '',
    deadline: '',
    status: 'قيد التنفيذ',
    progress: 0
  });

  // تعبئة البيانات عند التعديل
  useEffect(() => {
    if (editingProject) {
      setFormData({
        name: editingProject.name || '',
        client: editingProject.client || '',
        type: Array.isArray(editingProject.type) ? editingProject.type : [],
        description: editingProject.description || '',
        price: editingProject.price?.replace(' د.ك', '') || '',
        paid: editingProject.paid?.replace(' د.ك', '') || '',
        maintenancePrice: editingProject.maintenancePrice?.replace(' د.ك', '') || '',
        maintenancePeriod: editingProject.maintenancePeriod || 'سنوياً',
        maintenanceStartDate: editingProject.maintenanceStartDate || '',
        startDate: editingProject.startDate || '',
        deadline: editingProject.deadline || '',
        status: editingProject.status || 'قيد التنفيذ',
        progress: editingProject.progress || 0
      });
    } else {
      // إعادة تعيين للوضع الافتراضي
      setFormData({
        name: '',
        client: '',
        type: [] as string[],
        description: '',
        price: '',
        paid: '',
        maintenancePrice: '',
        maintenancePeriod: 'سنوياً',
        maintenanceStartDate: '',
        startDate: '',
        deadline: '',
        status: 'قيد التنفيذ',
        progress: 0
      });
    }
  }, [editingProject, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // التحقق من اختيار نوع واحد على الأقل
    if (formData.type.length === 0) {
      alert('يجب اختيار نوع واحد على الأقل للمشروع');
      return;
    }
    
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {editingProject ? 'تعديل المشروع' : 'مشروع جديد'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition">
            <FiXCircle className="text-xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اسم المشروع *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700"
                placeholder="تطبيق توصيل الطعام"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اسم العميل *
              </label>
              <input
                type="text"
                required
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700"
                placeholder="شركة الذواقة"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                نوع المشروع * (يمكن اختيار أكثر من نوع)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['تطبيق موبايل', 'موقع إلكتروني', 'تطبيق ويب', 'نظام إدارة', 'متجر إلكتروني', 'برنامج'].map((type) => (
                  <label key={type} className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition">
                    <input
                      type="checkbox"
                      checked={formData.type.includes(type)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, type: [...formData.type, type] });
                        } else {
                          setFormData({ ...formData, type: formData.type.filter(t => t !== type) });
                        }
                      }}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
              {formData.type.length === 0 && (
                <p className="text-xs text-red-600 mt-2">يجب اختيار نوع واحد على الأقل</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                قيمة المشروع (د.ك) *
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700"
                placeholder="3500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                المبلغ المدفوع (د.ك)
              </label>
              <input
                type="number"
                value={formData.paid}
                onChange={(e) => setFormData({ ...formData, paid: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-700"
                placeholder="2000"
              />
              {formData.price && formData.paid && (
                <p className="text-xs text-gray-600 mt-1">
                  المتبقي: {(parseFloat(formData.price) - parseFloat(formData.paid)).toLocaleString()} د.ك
                </p>
              )}
            </div>
          </div>

          {/* Maintenance Section */}
          <div className="border-t border-gray-200 pt-4 mt-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">معلومات الصيانة</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  قيمة الصيانة (د.ك)
                </label>
                <input
                  type="number"
                  value={formData.maintenancePrice}
                  onChange={(e) => setFormData({ ...formData, maintenancePrice: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700"
                  placeholder="500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  فترة الدفع
                </label>
                <select
                  value={formData.maintenancePeriod}
                  onChange={(e) => setFormData({ ...formData, maintenancePeriod: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700"
                >
                  <option>شهرياً</option>
                  <option>ربع سنوي</option>
                  <option>نصف سنوي</option>
                  <option>سنوياً</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تاريخ بداية الصيانة
                </label>
                <input
                  type="date"
                  value={formData.maintenanceStartDate}
                  onChange={(e) => setFormData({ ...formData, maintenanceStartDate: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              وصف المشروع
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700"
              placeholder="وصف تفصيلي للمشروع..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                تاريخ البدء *
              </label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الموعد النهائي *
              </label>
              <input
                type="date"
                required
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الحالة *
              </label>
              <select
                required
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700"
              >
                <option>قيد التنفيذ</option>
                <option>قيد المراجعة</option>
                <option>مكتمل</option>
                <option>معلق</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                نسبة الإنجاز *
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${formData.progress}%, #e5e7eb ${formData.progress}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">{formData.progress}%</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, progress: Math.max(0, formData.progress - 5) })}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                    >
                      -5%
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, progress: Math.min(100, formData.progress + 5) })}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                    >
                      +5%
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-xl transition"
            >
              {editingProject ? 'تحديث المشروع' : 'حفظ المشروع'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
