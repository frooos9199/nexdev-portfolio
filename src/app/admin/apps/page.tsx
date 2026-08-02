'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiEdit2, FiExternalLink, FiPlus, FiSave, FiTrash2, FiXCircle } from 'react-icons/fi';
import { buildManagedAppPaths, createSlug, readManagedApps, saveManagedApps, type ManagedAppEntry } from '@/lib/appRegistry';

const emptyForm = {
  slug: '',
  name: '',
  arabicName: '',
  description: '',
  developer: 'Q8 NexDev',
  status: 'Draft',
  appStoreUrl: '',
  googlePlayUrl: '',
  privacyText: '',
  termsText: '',
  supportEmail: 'info@q8nexdev.com',
  supportPhone: '+96550540999',
  featuresText: '',
};

export default function AdminAppsPage() {
  const [apps, setApps] = useState<ManagedAppEntry[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setApps(readManagedApps());
  }, []);

  const persistApps = (nextApps: ManagedAppEntry[]) => {
    setApps(nextApps);
    saveManagedApps(nextApps);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2500);
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingSlug(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const slug = createSlug(form.slug || form.name);
    const now = new Date().toISOString();
    const paths = buildManagedAppPaths(slug);
    const features = form.featuresText
      .split('\n')
      .map((feature) => feature.trim())
      .filter(Boolean);

    const nextApp: ManagedAppEntry = {
      slug,
      name: form.name.trim(),
      arabicName: form.arabicName.trim() || form.name.trim(),
      description: form.description.trim(),
      developer: form.developer.trim() || 'Q8 NexDev',
      status: form.status.trim() || 'Draft',
      appStoreUrl: form.appStoreUrl.trim(),
      googlePlayUrl: form.googlePlayUrl.trim(),
      privacyText: form.privacyText.trim(),
      termsText: form.termsText.trim(),
      supportEmail: form.supportEmail.trim(),
      supportPhone: form.supportPhone.trim(),
      features,
      ...paths,
      createdAt: apps.find((app) => app.slug === editingSlug)?.createdAt || now,
      updatedAt: now,
    };

    const nextApps = editingSlug
      ? apps.map((app) => (app.slug === editingSlug ? nextApp : app))
      : [...apps.filter((app) => app.slug !== slug), nextApp];

    persistApps(nextApps);
    resetForm();
  };

  const handleEdit = (app: ManagedAppEntry) => {
    setEditingSlug(app.slug);
    setForm({
      slug: app.slug,
      name: app.name,
      arabicName: app.arabicName,
      description: app.description,
      developer: app.developer,
      status: app.status || 'Draft',
      appStoreUrl: app.appStoreUrl || '',
      googlePlayUrl: app.googlePlayUrl || '',
      privacyText: app.privacyText || '',
      termsText: app.termsText || '',
      supportEmail: app.supportEmail || 'info@q8nexdev.com',
      supportPhone: app.supportPhone || '+96550540999',
      featuresText: app.features?.join('\n') || '',
    });
  };

  const handleDelete = (slug: string) => {
    persistApps(apps.filter((app) => app.slug !== slug));
    if (editingSlug === slug) resetForm();
  };

  return (
    <div className="space-y-6">
      {showSuccess && (
        <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-green-600 px-6 py-3 text-sm text-white shadow-lg">
          تم حفظ بيانات التطبيقات بنجاح
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">إدارة التطبيقات</h1>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">أضف تطبيقاتك وروابط المتاجر وصفحات الخصوصية والدعم.</p>
        </div>
        <Link href="/apps" className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100">
          <FiExternalLink />
          عرض صفحة التطبيقات
        </Link>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-xl bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-gray-900">{editingSlug ? 'تعديل تطبيق' : 'تطبيق جديد'}</h2>
            {editingSlug ? (
              <button onClick={resetForm} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
                <FiXCircle />
                إلغاء التعديل
              </button>
            ) : null}
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-gray-700">
                اسم التطبيق
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 focus:border-transparent focus:ring-2 focus:ring-blue-500" />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                الاسم العربي
                <input value={form.arabicName} onChange={(e) => setForm({ ...form, arabicName: e.target.value })} className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 focus:border-transparent focus:ring-2 focus:ring-blue-500" />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-gray-700">
                رابط مختصر slug
                <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="my-app" className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 focus:border-transparent focus:ring-2 focus:ring-blue-500" />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                الحالة
                <input value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} placeholder="Live / Draft" className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 focus:border-transparent focus:ring-2 focus:ring-blue-500" />
              </label>
            </div>

            <label className="block text-sm font-medium text-gray-700">
              الوصف
              <textarea required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 focus:border-transparent focus:ring-2 focus:ring-blue-500" />
            </label>

            <label className="block text-sm font-medium text-gray-700">
              المميزات، كل ميزة في سطر
              <textarea rows={4} value={form.featuresText} onChange={(e) => setForm({ ...form, featuresText: e.target.value })} className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 focus:border-transparent focus:ring-2 focus:ring-blue-500" />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-gray-700">
                رابط App Store
                <input type="url" value={form.appStoreUrl} onChange={(e) => setForm({ ...form, appStoreUrl: e.target.value })} className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 focus:border-transparent focus:ring-2 focus:ring-blue-500" />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                رابط Google Play
                <input type="url" value={form.googlePlayUrl} onChange={(e) => setForm({ ...form, googlePlayUrl: e.target.value })} className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 focus:border-transparent focus:ring-2 focus:ring-blue-500" />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-gray-700">
                بريد الدعم
                <input type="email" value={form.supportEmail} onChange={(e) => setForm({ ...form, supportEmail: e.target.value })} className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 focus:border-transparent focus:ring-2 focus:ring-blue-500" />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                هاتف الدعم
                <input value={form.supportPhone} onChange={(e) => setForm({ ...form, supportPhone: e.target.value })} className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 focus:border-transparent focus:ring-2 focus:ring-blue-500" />
              </label>
            </div>

            <label className="block text-sm font-medium text-gray-700">
              نص الخصوصية
              <textarea rows={5} value={form.privacyText} onChange={(e) => setForm({ ...form, privacyText: e.target.value })} className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 focus:border-transparent focus:ring-2 focus:ring-blue-500" />
            </label>

            <label className="block text-sm font-medium text-gray-700">
              نص الشروط والأحكام
              <textarea rows={5} value={form.termsText} onChange={(e) => setForm({ ...form, termsText: e.target.value })} className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 focus:border-transparent focus:ring-2 focus:ring-blue-500" />
            </label>

            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 font-semibold text-white transition hover:shadow-xl sm:w-auto">
              {editingSlug ? <FiSave /> : <FiPlus />}
              {editingSlug ? 'حفظ التعديل' : 'إضافة التطبيق'}
            </button>
          </form>
        </section>

        <section className="rounded-xl bg-white p-4 shadow-sm sm:p-6">
          <h2 className="mb-5 text-lg font-semibold text-gray-900">التطبيقات المضافة من الإدارة</h2>
          {apps.length === 0 ? (
            <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-500">
              لا توجد تطبيقات مضافة حتى الآن.
            </div>
          ) : (
            <div className="space-y-4">
              {apps.map((app) => (
                <article key={app.slug} className="rounded-xl border border-gray-200 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">{app.status}</p>
                      <h3 className="mt-1 text-xl font-bold text-gray-900">{app.name}</h3>
                      <p className="text-sm text-gray-500">/{app.slug}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(app)} className="rounded-lg p-2 text-blue-600 hover:bg-blue-50" title="تعديل">
                        <FiEdit2 />
                      </button>
                      <button onClick={() => handleDelete(app.slug)} className="rounded-lg p-2 text-red-600 hover:bg-red-50" title="حذف">
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">{app.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-sm">
                    <Link href={app.websitePath || '#'} className="rounded-full bg-gray-900 px-3 py-1.5 font-semibold text-white">صفحة التطبيق</Link>
                    <Link href={app.privacyPath || '#'} className="rounded-full border border-gray-200 px-3 py-1.5 font-semibold text-gray-700">الخصوصية</Link>
                    <Link href={app.termsPath || '#'} className="rounded-full border border-gray-200 px-3 py-1.5 font-semibold text-gray-700">الشروط</Link>
                    <Link href={app.supportPath || '#'} className="rounded-full border border-gray-200 px-3 py-1.5 font-semibold text-gray-700">الدعم</Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}