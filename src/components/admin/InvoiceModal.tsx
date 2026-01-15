'use client';

import { useState, useEffect } from 'react';
import { FiXCircle } from 'react-icons/fi';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (invoice: any) => void;
  editingInvoice?: any;
}

export default function InvoiceModal({ isOpen, onClose, onSave, editingInvoice }: InvoiceModalProps) {
  const [formData, setFormData] = useState({
    client: '',
    project: '',
    amount: '',
    paid: '',
    date: '',
    dueDate: '',
    items: [{ description: '', quantity: 1, price: '' }],
    notes: ''
  });

  // تعبئة البيانات عند التعديل
  useEffect(() => {
    if (editingInvoice) {
      setFormData({
        client: editingInvoice.client || '',
        project: editingInvoice.project || '',
        amount: editingInvoice.amount?.replace(' د.ك', '') || '',
        paid: editingInvoice.paid?.replace(' د.ك', '') || '0',
        date: editingInvoice.date || '',
        dueDate: editingInvoice.dueDate || '',
        items: editingInvoice.items || [{ description: editingInvoice.project || '', quantity: 1, price: editingInvoice.amount?.replace(' د.ك', '') || '' }],
        notes: editingInvoice.notes || ''
      });
    } else {
      setFormData({
        client: '',
        project: '',
        amount: '',
        paid: '',
        date: '',
        dueDate: '',
        items: [{ description: '', quantity: 1, price: '' }],
        notes: ''
      });
    }
  }, [editingInvoice, isOpen]);

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', quantity: 1, price: '' }]
    });
  };

  const handleRemoveItem = (index: number) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => {
      return sum + (Number(item.quantity) * Number(item.price || 0));
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, total: calculateTotal() });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {editingInvoice ? 'تعديل الفاتورة' : 'فاتورة جديدة'}
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
                العميل *
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                المشروع *
              </label>
              <input
                type="text"
                required
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700"
                placeholder="تطبيق توصيل الطعام"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                تاريخ الفاتورة *
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                تاريخ الاستحقاق *
              </label>
              <input
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700"
              />
            </div>

            {editingInvoice && (
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
                {formData.amount && formData.paid && (
                  <p className="text-xs text-gray-600 mt-1">
                    المتبقي: {(parseFloat(formData.amount) - parseFloat(formData.paid)).toLocaleString()} د.ك
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Items */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">بنود الفاتورة</h3>
              <button
                type="button"
                onClick={handleAddItem}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                + إضافة بند
              </button>
            </div>

            <div className="space-y-3">
              {formData.items.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800"
                    placeholder="الوصف"
                    required
                  />
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800"
                    placeholder="الكمية"
                    min="1"
                    required
                  />
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                    className="w-28 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800"
                    placeholder="السعر"
                    required
                  />
                  {formData.items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <FiXCircle />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
              <span className="font-semibold text-gray-800">المجموع:</span>
              <span className="text-2xl font-bold text-blue-600">{calculateTotal().toFixed(2)} د.ك</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ملاحظات
            </label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700"
              placeholder="شروط الدفع وملاحظات إضافية..."
            />
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
              إنشاء الفاتورة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
