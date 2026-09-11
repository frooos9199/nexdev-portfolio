'use client';

import { useEffect, useState } from 'react';
import { FiPlus, FiSave, FiTrash2 } from 'react-icons/fi';
import { cloneDefaultMenu, MENU_STORAGE_KEY, MenuSection } from '@/data/menu';

const createId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

const loadMenu = () => {
  const saved = localStorage.getItem(MENU_STORAGE_KEY);
  if (!saved) return cloneDefaultMenu();

  try {
    return JSON.parse(saved) as MenuSection[];
  } catch {
    return cloneDefaultMenu();
  }
};

export default function MenuAdminPage() {
  const [sections, setSections] = useState<MenuSection[]>(cloneDefaultMenu);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSections(loadMenu());
  }, []);

  const updateSection = (sectionIndex: number, field: 'group' | 'name', language: 'ar' | 'en', value: string) => {
    setSections((current) => current.map((section, index) => (
      index === sectionIndex
        ? { ...section, [field]: { ...section[field], [language]: value } }
        : section
    )));
  };

  const updateItem = (sectionIndex: number, itemIndex: number, field: 'ar' | 'en' | 'price', value: string) => {
    setSections((current) => current.map((section, currentSectionIndex) => {
      if (currentSectionIndex !== sectionIndex) return section;

      return {
        ...section,
        items: section.items.map((menuItem, currentItemIndex) => {
          if (currentItemIndex !== itemIndex) return menuItem;
          if (field === 'price') return { ...menuItem, price: Number(value) };
          return { ...menuItem, name: { ...menuItem.name, [field]: value } };
        }),
      };
    }));
  };

  const addSection = () => {
    setSections((current) => [
      ...current,
      {
        id: createId('section'),
        group: { ar: 'قسم رئيسي جديد', en: 'New category' },
        name: { ar: 'قسم جديد', en: 'New section' },
        items: [],
      },
    ]);
  };

  const removeSection = (sectionIndex: number) => {
    if (!window.confirm('هل تريد حذف هذا القسم وكل أصنافه؟')) return;
    setSections((current) => current.filter((_, index) => index !== sectionIndex));
  };

  const addItem = (sectionIndex: number) => {
    setSections((current) => current.map((section, index) => (
      index === sectionIndex
        ? {
            ...section,
            items: [
              ...section.items,
              { id: createId('item'), name: { ar: 'صنف جديد', en: 'New item' }, price: 0 },
            ],
          }
        : section
    )));
  };

  const removeItem = (sectionIndex: number, itemIndex: number) => {
    setSections((current) => current.map((section, index) => (
      index === sectionIndex
        ? { ...section, items: section.items.filter((_, currentItemIndex) => currentItemIndex !== itemIndex) }
        : section
    )));
  };

  const saveMenu = () => {
    localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(sections));
    window.dispatchEvent(new Event('menu-updated'));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div dir="rtl" className="space-y-6">
      {saved && (
        <div className="fixed left-1/2 top-5 z-50 -translate-x-1/2 rounded-md bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg">
          تم حفظ المنيو
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">إدارة المنيو</h1>
          <p className="mt-2 text-sm text-gray-600">إضافة وتعديل الأقسام والأصناف والأسعار بالعربي والإنجليزي</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={addSection}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-5 font-semibold text-gray-900 transition hover:bg-gray-100"
          >
            <FiPlus />
            إضافة قسم
          </button>
          <button
            type="button"
            onClick={saveMenu}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-gray-950 px-6 font-semibold text-white transition hover:bg-gray-800"
          >
            <FiSave />
            حفظ التغييرات
          </button>
        </div>
      </div>

      <div className="space-y-5">
        {sections.map((section, sectionIndex) => (
          <section key={section.id} className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
              <h2 className="font-bold text-gray-900">{section.name.ar}</h2>
              <button
                type="button"
                onClick={() => removeSection(sectionIndex)}
                title="حذف القسم"
                className="flex h-9 w-9 items-center justify-center rounded-md text-red-600 transition hover:bg-red-50"
              >
                <FiTrash2 />
              </button>
            </div>
            <div className="grid gap-4 border-b border-gray-200 bg-gray-50 p-4 sm:grid-cols-2 lg:grid-cols-4">
              <label className="text-sm font-medium text-gray-700">
                القسم الرئيسي بالعربي
                <input
                  value={section.group.ar}
                  onChange={(event) => updateSection(sectionIndex, 'group', 'ar', event.target.value)}
                  className="mt-1.5 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-gray-900"
                />
              </label>
              <label className="text-sm font-medium text-gray-700">
                Main category
                <input
                  dir="ltr"
                  value={section.group.en}
                  onChange={(event) => updateSection(sectionIndex, 'group', 'en', event.target.value)}
                  className="mt-1.5 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-gray-900"
                />
              </label>
              <label className="text-sm font-medium text-gray-700">
                اسم القسم بالعربي
                <input
                  value={section.name.ar}
                  onChange={(event) => updateSection(sectionIndex, 'name', 'ar', event.target.value)}
                  className="mt-1.5 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-gray-900"
                />
              </label>
              <label className="text-sm font-medium text-gray-700">
                Section name
                <input
                  dir="ltr"
                  value={section.name.en}
                  onChange={(event) => updateSection(sectionIndex, 'name', 'en', event.target.value)}
                  className="mt-1.5 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-gray-900"
                />
              </label>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500">
                    <th className="px-4 py-3 text-right font-medium">الصنف بالعربي</th>
                    <th className="px-4 py-3 text-left font-medium">Item in English</th>
                    <th className="w-40 px-4 py-3 text-right font-medium">السعر د.ك</th>
                    <th className="w-16 px-3 py-3"><span className="sr-only">حذف</span></th>
                  </tr>
                </thead>
                <tbody>
                  {section.items.map((menuItem, itemIndex) => (
                    <tr key={menuItem.id} className="border-b border-gray-100 last:border-0">
                      <td className="p-3">
                        <input
                          value={menuItem.name.ar}
                          onChange={(event) => updateItem(sectionIndex, itemIndex, 'ar', event.target.value)}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-gray-900"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          dir="ltr"
                          value={menuItem.name.en}
                          onChange={(event) => updateItem(sectionIndex, itemIndex, 'en', event.target.value)}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-gray-900"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          dir="ltr"
                          type="number"
                          min="0"
                          step="0.001"
                          value={menuItem.price}
                          onChange={(event) => updateItem(sectionIndex, itemIndex, 'price', event.target.value)}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-gray-900"
                        />
                      </td>
                      <td className="p-3">
                        <button
                          type="button"
                          onClick={() => removeItem(sectionIndex, itemIndex)}
                          title="حذف الصنف"
                          className="flex h-9 w-9 items-center justify-center rounded-md text-red-600 transition hover:bg-red-50"
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-gray-100 p-4">
              <button
                type="button"
                onClick={() => addItem(sectionIndex)}
                className="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
              >
                <FiPlus />
                إضافة صنف
              </button>
            </div>
          </section>
        ))}
      </div>

      <div className="flex justify-end pb-5">
        <button
          type="button"
          onClick={saveMenu}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-gray-950 px-6 font-semibold text-white transition hover:bg-gray-800 sm:w-auto"
        >
          <FiSave />
          حفظ التغييرات
        </button>
      </div>
    </div>
  );
}
