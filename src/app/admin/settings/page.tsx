'use client';

import { useState, useEffect } from 'react';
import { FiSave, FiDownload, FiDatabase, FiActivity } from 'react-icons/fi';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('company');
  const [showSuccess, setShowSuccess] = useState(false);
  const [companySettings, setCompanySettings] = useState({
    name: 'NexDev',
    email: 'summit_kw@hotmail.com',
    phone: '+965 5054 0999',
    address: 'الكويت، العاصمة',
    description: 'شركة متخصصة في تطوير التطبيقات والمواقع الإلكترونية',
    taxNumber: '123456789',
    commercialNumber: 'CR-123456'
  });

  // تحميل الإعدادات من localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('companySettings');
      if (saved) {
        setCompanySettings(JSON.parse(saved));
      }
    }
  }, []);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('companySettings', JSON.stringify(companySettings));
    }
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleExportData = () => {
    if (typeof window !== 'undefined') {
      const data = {
        projects: JSON.parse(localStorage.getItem('projects') || '[]'),
        clients: JSON.parse(localStorage.getItem('clients') || '[]'),
        invoices: JSON.parse(localStorage.getItem('invoices') || '[]'),
        settings: companySettings
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nexdev-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      alert('✓ تم تصدير البيانات بنجاح!');
    }
  };

  const handleBackup = () => {
    handleExportData();
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg z-50 animate-bounce text-sm sm:text-base">
          ✓ تم حفظ الإعدادات بنجاح!
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">الإعدادات</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">إدارة إعدادات النظام والحساب</p>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Navigation */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <h3 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">الأقسام</h3>
          <nav className="space-y-1 sm:space-y-2">
            <button 
              onClick={() => setActiveTab('company')}
              className={`w-full text-right px-3 sm:px-4 py-2 rounded-lg font-medium transition text-sm sm:text-base ${
                activeTab === 'company' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              معلومات الشركة
            </button>
            <button 
              onClick={() => setActiveTab('account')}
              className={`w-full text-right px-3 sm:px-4 py-2 rounded-lg font-medium transition text-sm sm:text-base ${
                activeTab === 'account' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              الحساب والأمان
            </button>
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`w-full text-right px-3 sm:px-4 py-2 rounded-lg font-medium transition text-sm sm:text-base ${
                activeTab === 'notifications' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              الإشعارات
            </button>
            <button 
              onClick={() => setActiveTab('backup')}
              className={`w-full text-right px-3 sm:px-4 py-2 rounded-lg font-medium transition text-sm sm:text-base ${
                activeTab === 'backup' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              النسخ الاحتياطي
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-4 sm:p-6">
          {activeTab === 'company' && (
            <>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">معلومات الشركة</h3>
              
              <form onSubmit={handleSaveSettings} className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    اسم الشركة
                  </label>
                  <input
                    type="text"
                    value={companySettings.name}
                    onChange={(e) => setCompanySettings({ ...companySettings, name: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700 text-sm sm:text-base"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      value={companySettings.email}
                      onChange={(e) => setCompanySettings({ ...companySettings, email: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700 text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      value={companySettings.phone}
                      onChange={(e) => setCompanySettings({ ...companySettings, phone: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700 text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    العنوان
                  </label>
                  <input
                    type="text"
                    value={companySettings.address}
                    onChange={(e) => setCompanySettings({ ...companySettings, address: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    الوصف
                  </label>
                  <textarea
                    rows={4}
                    value={companySettings.description}
                    onChange={(e) => setCompanySettings({ ...companySettings, description: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700 text-sm sm:text-base"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      الرقم الضريبي
                    </label>
                    <input
                      type="text"
                      value={companySettings.taxNumber}
                      onChange={(e) => setCompanySettings({ ...companySettings, taxNumber: e.target.value })}
                      placeholder="123456789"
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700 text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      السجل التجاري
                    </label>
                    <input
                      type="text"
                      value={companySettings.commercialNumber}
                      onChange={(e) => setCompanySettings({ ...companySettings, commercialNumber: e.target.value })}
                      placeholder="CR-123456"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700"
                    />
                  </div>
                </div>

                <div className="pt-3 sm:pt-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg hover:shadow-xl transition text-sm sm:text-base"
                  >
                    <FiSave />
                    حفظ التغييرات
                  </button>
                </div>
              </form>
            </>
          )}

          {activeTab === 'account' && (
            <>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">الحساب والأمان</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-blue-800">
                    البريد الإلكتروني المسجل: <strong>{typeof window !== 'undefined' ? localStorage.getItem('adminEmail') : ''}</strong>
                  </p>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm">
                  لتغيير كلمة المرور أو تحديث معلومات الحساب، يرجى التواصل مع المطور.
                </p>
              </div>
            </>
          )}

          {activeTab === 'notifications' && (
            <>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">الإشعارات</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">إشعارات البريد الإلكتروني</p>
                    <p className="text-sm text-gray-600">تلقي إشعارات حول الفواتير الجديدة</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">تنبيهات الصيانة</p>
                    <p className="text-sm text-gray-600">تلقي تنبيهات قبل موعد دفع الصيانة</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </>
          )}

          {activeTab === 'backup' && (
            <>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">النسخ الاحتياطي والبيانات</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FiDatabase className="text-white text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-900 mb-2">نسخ احتياطي</h4>
                      <p className="text-sm text-blue-700 mb-4">إنشاء نسخة احتياطية من جميع البيانات (المشاريع، العملاء، الفواتير)</p>
                      <button 
                        onClick={handleBackup}
                        className="flex items-center gap-2 text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        <FiDownload />
                        إنشاء نسخة احتياطية
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FiDownload className="text-white text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-green-900 mb-2">تصدير البيانات</h4>
                      <p className="text-sm text-green-700 mb-4">تصدير جميع البيانات بصيغة JSON</p>
                      <button 
                        onClick={handleExportData}
                        className="flex items-center gap-2 text-sm bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                      >
                        <FiDownload />
                        تصدير البيانات
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FiActivity className="text-white text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-purple-900 mb-2">معلومات التخزين</h4>
                      <p className="text-sm text-purple-700 mb-4">يتم حفظ جميع البيانات محلياً في متصفحك</p>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-gray-600">المشاريع</p>
                          <p className="text-lg font-bold text-purple-600">
                            {typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('projects') || '[]').length : 0}
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-gray-600">العملاء</p>
                          <p className="text-lg font-bold text-purple-600">
                            {typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('clients') || '[]').length : 0}
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-gray-600">الفواتير</p>
                          <p className="text-lg font-bold text-purple-600">
                            {typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('invoices') || '[]').length : 0}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
