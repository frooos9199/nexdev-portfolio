'use client';

import { useState, useEffect } from 'react';
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiEye, FiDownload, FiSend, FiFileText, FiDollarSign, FiXCircle } from 'react-icons/fi';
import InvoiceModal from '@/components/admin/InvoiceModal';

export default function InvoicesPage() {
  const [activeTab, setActiveTab] = useState('invoices');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<any>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [viewInvoice, setViewInvoice] = useState<any | null>(null);
  
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [viewReceipt, setViewReceipt] = useState<any | null>(null);
  const [deleteReceiptConfirm, setDeleteReceiptConfirm] = useState<string | null>(null);

  const [invoices, setInvoices] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('invoices');
      if (saved) return JSON.parse(saved);
    }
    return [];
  });
  
  const [receipts, setReceipts] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('receipts');
      if (saved) return JSON.parse(saved);
    }
    return [];
  });

  const [projects, setProjects] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('projects');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [receiptForm, setReceiptForm] = useState({
    projectId: '',
    amount: '',
    paymentMethod: 'كاش',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('invoices', JSON.stringify(invoices));
      localStorage.setItem('receipts', JSON.stringify(receipts));
    }
  }, [invoices, receipts]);

  const handleSaveInvoice = (invoiceData: any) => {
    if (editingInvoice) {
      const updatedInvoices = invoices.map((inv: any) => {
        if (inv.id === editingInvoice.id) {
          const total = invoiceData.total || parseFloat(invoiceData.amount?.replace(/[^\d.]/g, '') || '0');
          const paid = parseFloat(invoiceData.paid?.replace(/[^\d.]/g, '') || '0');
          const remaining = total - paid;
          
          let status = 'معلق';
          let statusColor = 'bg-yellow-100 text-yellow-700';
          
          if (remaining === 0) {
            status = 'مدفوع';
            statusColor = 'bg-green-100 text-green-700';
          } else if (paid > 0) {
            status = 'جزئي';
            statusColor = 'bg-yellow-100 text-yellow-700';
          }
          
          return {
            ...inv,
            ...invoiceData,
            id: inv.id,
            amount: `${total} د.ك`,
            paid: `${paid} د.ك`,
            remaining: `${remaining} د.ك`,
            status,
            statusColor
          };
        }
        return inv;
      });
      setInvoices(updatedInvoices);
      setEditingInvoice(null);
    } else {
      const newInvoice = {
        id: `INV-${String(invoices.length + 1).padStart(3, '0')}`,
        ...invoiceData,
        amount: `${invoiceData.total} د.ك`,
        paid: '0 د.ك',
        remaining: `${invoiceData.total} د.ك`,
        status: 'معلق',
        statusColor: 'bg-yellow-100 text-yellow-700'
      };
      setInvoices([...invoices, newInvoice]);
    }
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDeleteInvoice = (id: string) => {
    setInvoices(invoices.filter((invoice: any) => invoice.id !== id));
    setDeleteConfirm(null);
  };

  const handleEditInvoice = (invoice: any) => {
    setEditingInvoice(invoice);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingInvoice(null);
  };

  const handleSaveReceipt = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedProject = projects.find((p: any) => p.id === receiptForm.projectId);
    if (!selectedProject) return;

    const newReceipt = {
      id: `REC-${String(receipts.length + 1).padStart(3, '0')}`,
      projectId: receiptForm.projectId,
      invoiceId: selectedProject.invoiceId || 'N/A',
      client: selectedProject.client,
      project: selectedProject.title,
      amount: `${receiptForm.amount} د.ك`,
      paymentMethod: receiptForm.paymentMethod,
      date: receiptForm.date,
      notes: receiptForm.notes
    };

    setReceipts([...receipts, newReceipt]);
    setIsReceiptModalOpen(false);
    setReceiptForm({
      projectId: '',
      amount: '',
      paymentMethod: 'كاش',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDeleteReceipt = (id: string) => {
    setReceipts(receipts.filter((receipt: any) => receipt.id !== id));
    setDeleteReceiptConfirm(null);
  };

  const handleDownloadReceiptPDF = (receipt: any) => {
    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) return;

    const html = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <title>وصل استلام - ${receipt.id}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; background: #fff; direction: rtl; }
          .header { background: linear-gradient(135deg, #9333ea 0%, #2563eb 100%); color: white; padding: 30px; border-radius: 10px; margin-bottom: 30px; }
          .header h1 { font-size: 32px; margin-bottom: 10px; }
          .header p { font-size: 18px; opacity: 0.9; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
          .info-box { background: #f3f4f6; padding: 15px; border-radius: 8px; }
          .info-box label { display: block; color: #6b7280; font-size: 12px; margin-bottom: 5px; }
          .info-box p { color: #111827; font-size: 16px; font-weight: 600; }
          .amount-section { background: linear-gradient(135deg, #ede9fe 0%, #dbeafe 100%); padding: 40px; border-radius: 15px; text-align: center; margin: 30px 0; }
          .amount-section label { color: #7c3aed; font-size: 14px; margin-bottom: 10px; display: block; }
          .amount-section .amount { color: #7c3aed; font-size: 48px; font-weight: bold; }
          .notes { background: #fef3c7; border-right: 4px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .notes h3 { color: #92400e; margin-bottom: 10px; font-size: 14px; }
          .notes p { color: #78350f; line-height: 1.6; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px; }
          @media print { body { padding: 20px; } .no-print { display: none; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>وصل استلام</h1>
          <p>${receipt.id}</p>
        </div>
        <div class="info-grid">
          <div class="info-box">
            <label>التاريخ</label>
            <p>${receipt.date}</p>
          </div>
          <div class="info-box">
            <label>طريقة الدفع</label>
            <p>${receipt.paymentMethod}</p>
          </div>
          <div class="info-box">
            <label>العميل</label>
            <p>${receipt.client}</p>
          </div>
          <div class="info-box">
            <label>المشروع</label>
            <p>${receipt.project}</p>
          </div>
        </div>
        <div class="amount-section">
          <label>المبلغ المستلم</label>
          <div class="amount">${receipt.amount}</div>
        </div>
        ${receipt.notes ? `
          <div class="notes">
            <h3>ملاحظات:</h3>
            <p>${receipt.notes}</p>
          </div>
        ` : ''}
        <div class="footer">
          <p>تم إنشاء هذا الوصل بواسطة نظام إدارة المشاريع</p>
          <p style="margin-top: 5px;">nexdev.kw</p>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const handleSendReceiptWhatsApp = (receipt: any) => {
    handleDownloadReceiptPDF(receipt);
    setTimeout(() => {
      const message = `وصل استلام ${receipt.id}\n\nالعميل: ${receipt.client}\nالمشروع: ${receipt.project}\nالمبلغ: ${receipt.amount}\nطريقة الدفع: ${receipt.paymentMethod}\nالتاريخ: ${receipt.date}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }, 500);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {showSuccess && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg z-50 animate-bounce text-sm sm:text-base">
          ✓ تمت العملية بنجاح!
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">إدارة الفواتير</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">الفواتير وسندات القبض</p>
        </div>
      </div>

      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('invoices')}
          className={`flex items-center gap-2 px-6 py-3 font-medium transition relative ${
            activeTab === 'invoices' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <FiFileText />
          <span>الفواتير</span>
          <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">{invoices.length}</span>
        </button>
        <button
          onClick={() => setActiveTab('receipts')}
          className={`flex items-center gap-2 px-6 py-3 font-medium transition relative ${
            activeTab === 'receipts' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <FiDollarSign />
          <span>وصولات الاستلام</span>
          <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">{receipts.length}</span>
        </button>
      </div>

      {activeTab === 'invoices' && (
        <>
          <div className="flex justify-between items-center">
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:shadow-xl transition-all">
              <FiPlus />
              <span>فاتورة جديدة</span>
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-50 to-blue-50">
                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">رقم الفاتورة</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">العميل</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">المشروع</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">المبلغ</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">الحالة</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice: any) => (
                    <tr key={invoice.id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                      <td className="px-6 py-4"><span className="font-semibold text-blue-600">{invoice.id}</span></td>
                      <td className="px-6 py-4"><p className="font-medium text-gray-900">{invoice.client}</p></td>
                      <td className="px-6 py-4"><p className="text-gray-600">{invoice.project}</p></td>
                      <td className="px-6 py-4"><span className="font-bold text-gray-900">{invoice.amount}</span></td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${invoice.statusColor}`}>{invoice.status}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button onClick={() => setViewInvoice(invoice)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="عرض">
                            <FiEye />
                          </button>
                          <button onClick={() => handleEditInvoice(invoice)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition" title="تعديل">
                            <FiEdit2 />
                          </button>
                          <button onClick={() => setDeleteConfirm(invoice.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="حذف">
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {invoices.length === 0 && (
              <div className="text-center py-12">
                <FiFileText className="text-6xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">لا توجد فواتير بعد</p>
                <button onClick={() => setIsModalOpen(true)} className="mt-4 text-blue-600 hover:text-blue-700 font-medium">
                  + إنشاء فاتورة جديدة
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === 'receipts' && (
        <>
          <div className="flex justify-between items-center">
            <button onClick={() => setIsReceiptModalOpen(true)} className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:shadow-xl transition-all">
              <FiPlus />
              <span>وصل استلام جديد</span>
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-50 to-blue-50">
                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">رقم الوصل</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">العميل</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">المشروع</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">المبلغ</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">طريقة الدفع</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">التاريخ</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {receipts.map((receipt: any) => (
                    <tr key={receipt.id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                      <td className="px-6 py-4"><span className="font-semibold text-purple-600">{receipt.id}</span></td>
                      <td className="px-6 py-4"><p className="font-medium text-gray-900">{receipt.client}</p></td>
                      <td className="px-6 py-4"><p className="text-gray-600">{receipt.project}</p></td>
                      <td className="px-6 py-4"><span className="font-bold text-green-600">{receipt.amount}</span></td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{receipt.paymentMethod}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{receipt.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button onClick={() => setViewReceipt(receipt)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="عرض">
                            <FiEye />
                          </button>
                          <button onClick={() => handleDownloadReceiptPDF(receipt)} className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition" title="تحميل PDF">
                            <FiDownload />
                          </button>
                          <button onClick={() => handleSendReceiptWhatsApp(receipt)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition" title="إرسال واتساب">
                            <FiSend />
                          </button>
                          <button onClick={() => setDeleteReceiptConfirm(receipt.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="حذف">
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {receipts.length === 0 && (
              <div className="text-center py-12">
                <FiDollarSign className="text-6xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">لا توجد وصولات استلام بعد</p>
                <button onClick={() => setIsReceiptModalOpen(true)} className="mt-4 text-blue-600 hover:text-blue-700 font-medium">
                  + إنشاء وصل استلام جديد
                </button>
              </div>
            )}
          </div>
        </>
      )}

      <InvoiceModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveInvoice} editingInvoice={editingInvoice} />

      {isReceiptModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">وصل استلام جديد</h2>
              <button onClick={() => setIsReceiptModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg transition">
                <FiXCircle className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleSaveReceipt} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المشروع *</label>
                <select required value={receiptForm.projectId} onChange={(e) => setReceiptForm({ ...receiptForm, projectId: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700">
                  <option value="">اختر المشروع</option>
                  {projects.map((project: any) => (
                    <option key={project.id} value={project.id}>{project.title} - {project.client}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">المبلغ (د.ك) *</label>
                  <input type="number" required step="0.01" value={receiptForm.amount} onChange={(e) => setReceiptForm({ ...receiptForm, amount: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700" placeholder="0.00" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">طريقة الدفع *</label>
                  <select required value={receiptForm.paymentMethod} onChange={(e) => setReceiptForm({ ...receiptForm, paymentMethod: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700">
                    <option value="كاش">كاش</option>
                    <option value="تحويل بنكي">تحويل بنكي</option>
                    <option value="شيك">شيك</option>
                    <option value="بطاقة ائتمان">بطاقة ائتمان</option>
                    <option value="K-Net">K-Net</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">التاريخ *</label>
                <input type="date" required value={receiptForm.date} onChange={(e) => setReceiptForm({ ...receiptForm, date: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ملاحظات</label>
                <textarea rows={3} value={receiptForm.notes} onChange={(e) => setReceiptForm({ ...receiptForm, notes: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700" placeholder="أي ملاحظات إضافية..." />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button type="button" onClick={() => setIsReceiptModalOpen(false)} className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">إلغاء</button>
                <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-xl transition">حفظ الوصل</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">وصل استلام</h2>
                <p className="text-purple-100 mt-1">{viewReceipt.id}</p>
              </div>
              <button onClick={() => setViewReceipt(null)} className="p-2 hover:bg-white/20 rounded-lg transition">
                <FiXCircle className="text-2xl" />
              </button>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">التاريخ</p>
                  <p className="font-semibold text-gray-900">{viewReceipt.date}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">طريقة الدفع</p>
                  <p className="font-semibold text-gray-900">{viewReceipt.paymentMethod}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">العميل</p>
                  <p className="font-semibold text-gray-900">{viewReceipt.client}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">المشروع</p>
                  <p className="font-semibold text-gray-900">{viewReceipt.project}</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-xl text-center mb-6">
                <p className="text-sm text-purple-700 mb-2">المبلغ المستلم</p>
                <p className="text-5xl font-bold text-purple-600">{viewReceipt.amount}</p>
              </div>

              {viewReceipt.notes && (
                <div className="bg-yellow-50 border-r-4 border-yellow-500 p-4 rounded mb-6">
                  <p className="text-sm font-semibold text-yellow-900 mb-2">ملاحظات:</p>
                  <p className="text-gray-700">{viewReceipt.notes}</p>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleDownloadReceiptPDF(viewReceipt)}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:shadow-xl transition"
                >
                  <FiDownload />
                  <span>تحميل PDF</span>
                </button>
                <button
                  onClick={() => handleSendReceiptWhatsApp(viewReceipt)}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
                >
                  <FiSend />
                  <span>إرسال واتساب</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteReceiptConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">تأكيد الحذف</h3>
            <p className="text-gray-600 mb-6">هل أنت متأكد من حذف هذا الوصل؟ لا يمكن التراجع عن هذا الإجراء.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteReceiptConfirm(null)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">إلغاء</button>
              <button onClick={() => handleDeleteReceipt(deleteReceiptConfirm)} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">حذف</button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">تأكيد الحذف</h3>
            <p className="text-gray-600 mb-6">هل أنت متأكد من حذف هذه الفاتورة؟ لا يمكن التراجع عن هذا الإجراء.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">إلغاء</button>
              <button onClick={() => handleDeleteInvoice(deleteConfirm)} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">حذف</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
