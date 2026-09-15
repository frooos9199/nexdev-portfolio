'use client';

import { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import { FiChevronDown, FiChevronUp, FiImage, FiPlus, FiSave, FiTrash2 } from 'react-icons/fi';
import { cloneDefaultMenu, MENU_LOGO_STORAGE_KEY, MENU_STORAGE_KEY, MenuSection } from '@/data/menu';

const DEFAULT_LOGO = '/hokah-mood-logo.svg';

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
  const [logo, setLogo] = useState(DEFAULT_LOGO);
  const [logoError, setLogoError] = useState('');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    const loadSharedMenu = async () => {
      try {
        const response = await fetch('/api/menu', { cache: 'no-store' });
        if (!response.ok) throw new Error('Unable to load menu');
        const data = await response.json();
        const localSections = loadMenu();
        const localLogo = localStorage.getItem(MENU_LOGO_STORAGE_KEY) || DEFAULT_LOGO;

        if (data.isDefault && localStorage.getItem(MENU_STORAGE_KEY)) {
          setSections(localSections);
          setLogo(localLogo);
        } else {
          setSections(data.sections);
          setLogo(data.logo || DEFAULT_LOGO);
          localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(data.sections));
          if (data.logo && data.logo !== DEFAULT_LOGO) {
            localStorage.setItem(MENU_LOGO_STORAGE_KEY, data.logo);
          }
        }
      } catch {
        setSections(loadMenu());
        setLogo(localStorage.getItem(MENU_LOGO_STORAGE_KEY) || DEFAULT_LOGO);
        setSaveError('تعذر تحميل النسخة المشتركة، تم عرض النسخة المحفوظة على هذا الجهاز');
      }
    };

    loadSharedMenu();
  }, []);

  const changeLogo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setLogoError('اختر ملف صورة فقط');
      return;
    }

    if (file.size > 1024 * 1024) {
      setLogoError('حجم الصورة يجب ألا يتجاوز 1 ميجابايت');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setLogo(reader.result);
        setLogoError('');
      }
    };
    reader.readAsDataURL(file);
  };

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

  const toggleItemNote = (sectionIndex: number, itemIndex: number, enabled: boolean) => {
    setSections((current) => current.map((section, currentSectionIndex) => {
      if (currentSectionIndex !== sectionIndex) return section;

      return {
        ...section,
        items: section.items.map((menuItem, currentItemIndex) => {
          if (currentItemIndex !== itemIndex) return menuItem;
          if (!enabled) {
            const { note: _note, ...itemWithoutNote } = menuItem;
            return itemWithoutNote;
          }
          return { ...menuItem, note: { ar: '', en: '' } };
        }),
      };
    }));
  };

  const updateItemNote = (sectionIndex: number, itemIndex: number, language: 'ar' | 'en', value: string) => {
    setSections((current) => current.map((section, currentSectionIndex) => (
      currentSectionIndex === sectionIndex
        ? {
            ...section,
            items: section.items.map((menuItem, currentItemIndex) => (
              currentItemIndex === itemIndex
                ? { ...menuItem, note: { ar: '', en: '', ...menuItem.note, [language]: value } }
                : menuItem
            )),
          }
        : section
    )));
  };

  const moveItem = (sectionIndex: number, itemIndex: number, direction: -1 | 1) => {
    setSections((current) => current.map((section, currentSectionIndex) => {
      if (currentSectionIndex !== sectionIndex) return section;

      const targetIndex = itemIndex + direction;
      if (targetIndex < 0 || targetIndex >= section.items.length) return section;

      const items = [...section.items];
      [items[itemIndex], items[targetIndex]] = [items[targetIndex], items[itemIndex]];
      return { ...section, items };
    }));
  };

  const moveSection = (sectionIndex: number, direction: -1 | 1) => {
    setSections((current) => {
      const targetIndex = sectionIndex + direction;
      if (targetIndex < 0 || targetIndex >= current.length) return current;

      const reorderedSections = [...current];
      [reorderedSections[sectionIndex], reorderedSections[targetIndex]] = [
        reorderedSections[targetIndex],
        reorderedSections[sectionIndex],
      ];
      return reorderedSections;
    });
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

  const saveMenu = async () => {
    setSaving(true);
    setSaveError('');

    try {
      const response = await fetch('/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sections, logo }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'تعذر حفظ المنيو');

      localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(sections));
      if (logo === DEFAULT_LOGO) {
        localStorage.removeItem(MENU_LOGO_STORAGE_KEY);
      } else {
        localStorage.setItem(MENU_LOGO_STORAGE_KEY, logo);
      }
      window.dispatchEvent(new Event('menu-updated'));
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2500);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'تعذر حفظ المنيو');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div dir="rtl" className="space-y-6">
      {saved && (
        <div className="fixed left-1/2 top-5 z-50 -translate-x-1/2 rounded-md bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg">
          تم حفظ المنيو
        </div>
      )}
      {saveError && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {saveError}
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
            disabled={saving}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-gray-950 px-6 font-semibold text-white transition hover:bg-gray-800"
          >
            <FiSave />
            {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
          </button>
        </div>
      </div>

      <section className="rounded-md border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-md bg-black p-2">
            <Image
              key={logo}
              src={logo}
              alt="شعار Hokah MooD"
              width={120}
              height={120}
              unoptimized
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-900">شعار المنيو</h2>
            <p className="mt-1 text-sm text-gray-600">اختر صورة PNG أو JPG أو SVG بحجم لا يتجاوز 1 ميجابايت</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <label className="flex cursor-pointer items-center gap-2 rounded-md bg-gray-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800">
                <FiImage />
                تغيير الشعار
                <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" onChange={changeLogo} className="sr-only" />
              </label>
              {logo !== DEFAULT_LOGO && (
                <button
                  type="button"
                  onClick={() => {
                    setLogo(DEFAULT_LOGO);
                    setLogoError('');
                  }}
                  className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
                >
                  استعادة الشعار الأساسي
                </button>
              )}
            </div>
            {logoError && <p className="mt-2 text-sm font-medium text-red-600">{logoError}</p>}
          </div>
        </div>
      </section>

      <div className="space-y-5">
        {sections.map((section, sectionIndex) => (
          <section key={section.id} className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
              <h2 className="font-bold text-gray-900">{section.name.ar}</h2>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveSection(sectionIndex, -1)}
                  disabled={sectionIndex === 0}
                  title="نقل القسم للأعلى"
                  aria-label={`نقل قسم ${section.name.ar} للأعلى`}
                  className="flex h-9 w-9 items-center justify-center rounded-md text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-25"
                >
                  <FiChevronUp />
                </button>
                <button
                  type="button"
                  onClick={() => moveSection(sectionIndex, 1)}
                  disabled={sectionIndex === sections.length - 1}
                  title="نقل القسم للأسفل"
                  aria-label={`نقل قسم ${section.name.ar} للأسفل`}
                  className="flex h-9 w-9 items-center justify-center rounded-md text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-25"
                >
                  <FiChevronDown />
                </button>
                <button
                  type="button"
                  onClick={() => removeSection(sectionIndex)}
                  title="حذف القسم"
                  aria-label={`حذف قسم ${section.name.ar}`}
                  className="flex h-9 w-9 items-center justify-center rounded-md text-red-600 transition hover:bg-red-50"
                >
                  <FiTrash2 />
                </button>
              </div>
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
              <table className="w-full min-w-[850px] text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500">
                    <th className="px-4 py-3 text-right font-medium">الصنف بالعربي</th>
                    <th className="px-4 py-3 text-left font-medium">Item in English</th>
                    <th className="w-40 px-4 py-3 text-right font-medium">السعر د.ك</th>
                    <th className="w-24 px-3 py-3 text-center font-medium">ملاحظة</th>
                    <th className="w-32 px-3 py-3"><span className="sr-only">ترتيب وحذف</span></th>
                  </tr>
                </thead>
                <tbody>
                  {section.items.map((menuItem, itemIndex) => (
                    <Fragment key={menuItem.id}>
                      <tr className={menuItem.note ? 'bg-gray-50' : 'border-b border-gray-100'}>
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
                        <td className="p-3 text-center">
                          <input
                            type="checkbox"
                            checked={Boolean(menuItem.note)}
                            onChange={(event) => toggleItemNote(sectionIndex, itemIndex, event.target.checked)}
                            aria-label="تفعيل ملاحظة للصنف"
                            className="h-5 w-5 accent-gray-950"
                          />
                        </td>
                        <td className="p-3">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => moveItem(sectionIndex, itemIndex, -1)}
                              disabled={itemIndex === 0}
                              title="نقل الصنف للأعلى"
                              className="flex h-9 w-9 items-center justify-center rounded-md text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-25"
                            >
                              <FiChevronUp />
                            </button>
                            <button
                              type="button"
                              onClick={() => moveItem(sectionIndex, itemIndex, 1)}
                              disabled={itemIndex === section.items.length - 1}
                              title="نقل الصنف للأسفل"
                              className="flex h-9 w-9 items-center justify-center rounded-md text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-25"
                            >
                              <FiChevronDown />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeItem(sectionIndex, itemIndex)}
                              title="حذف الصنف"
                              className="flex h-9 w-9 items-center justify-center rounded-md text-red-600 transition hover:bg-red-50"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                      {menuItem.note && (
                        <tr className="border-b border-gray-200 bg-gray-50">
                          <td colSpan={2} className="px-3 pb-3">
                            <textarea
                              value={menuItem.note.ar}
                              onChange={(event) => updateItemNote(sectionIndex, itemIndex, 'ar', event.target.value)}
                              placeholder="الملاحظة بالعربي"
                              rows={2}
                              className="w-full resize-y rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-gray-900"
                            />
                          </td>
                          <td colSpan={3} className="px-3 pb-3">
                            <textarea
                              dir="ltr"
                              value={menuItem.note.en}
                              onChange={(event) => updateItemNote(sectionIndex, itemIndex, 'en', event.target.value)}
                              placeholder="Note in English"
                              rows={2}
                              className="w-full resize-y rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-gray-900"
                            />
                          </td>
                        </tr>
                      )}
                    </Fragment>
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
          disabled={saving}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-gray-950 px-6 font-semibold text-white transition hover:bg-gray-800 sm:w-auto"
        >
          <FiSave />
          {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
        </button>
      </div>
    </div>
  );
}
