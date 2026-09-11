'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cloneDefaultMenu, MENU_STORAGE_KEY, MenuLanguage, MenuSection } from '@/data/menu';

const copy = {
  ar: { title: 'Hokah MooD', currency: 'د.ك', language: 'English' },
  en: { title: 'Hokah MooD', currency: 'KWD', language: 'عربي' },
};

const loadMenu = () => {
  const saved = localStorage.getItem(MENU_STORAGE_KEY);
  if (!saved) return cloneDefaultMenu();

  try {
    return JSON.parse(saved) as MenuSection[];
  } catch {
    return cloneDefaultMenu();
  }
};

export default function MenuClient() {
  const [language, setLanguage] = useState<MenuLanguage>('ar');
  const [sections, setSections] = useState<MenuSection[]>(cloneDefaultMenu);

  useEffect(() => {
    setSections(loadMenu());

    const syncMenu = () => setSections(loadMenu());
    window.addEventListener('storage', syncMenu);
    window.addEventListener('menu-updated', syncMenu);
    return () => {
      window.removeEventListener('storage', syncMenu);
      window.removeEventListener('menu-updated', syncMenu);
    };
  }, []);

  const groups = sections.reduce<MenuSection[][]>((result, section) => {
    const previous = result.at(-1);
    if (previous && previous[0].group[language] === section.group[language]) {
      previous.push(section);
    } else {
      result.push([section]);
    }
    return result;
  }, []);

  return (
    <main dir={language === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-black text-white">
      <header className="mx-auto flex max-w-5xl flex-col items-center px-5 pb-7 pt-10 text-center sm:pt-14">
        <Image
          src="/hokah-mood-logo.svg"
          alt={copy[language].title}
          width={180}
          height={180}
          priority
          className="mb-5 h-36 w-36 object-contain sm:h-44 sm:w-44"
        />
        <h1 className="text-3xl font-bold sm:text-4xl">{copy[language].title}</h1>
        <button
          type="button"
          onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
          className="mt-5 border-b border-white/60 px-1 py-1 text-sm font-medium text-white transition hover:border-white"
        >
          {copy[language].language}
        </button>
      </header>

      <nav className="sticky top-0 z-20 border-y border-white/15 bg-black/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl gap-7 overflow-x-auto px-5 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="shrink-0 text-sm font-semibold text-white/70 transition hover:text-white"
            >
              {section.name[language]}
            </a>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-5 pb-20 pt-12 sm:px-8">
        {groups.map((group) => (
          <section key={`${group[0].group.ar}-${group[0].id}`} className="mb-16">
            <h2 className="mb-10 border-b border-white pb-4 text-center text-3xl font-bold sm:text-4xl">
              {group[0].group[language]}
            </h2>
            <div className="space-y-14">
              {group.map((section) => (
                <div key={section.id} id={section.id} className="scroll-mt-24">
                  <h3 className="mb-5 text-center text-xl font-bold sm:text-2xl">{section.name[language]}</h3>
                  <div className="grid gap-x-12 md:grid-cols-2">
                    {section.items.map((menuItem) => (
                      <article key={menuItem.id} className="flex min-h-20 items-start justify-between gap-5 border-b border-white/15 py-4">
                        <div className="min-w-0">
                          <h4 className="text-base font-semibold leading-7 sm:text-lg">{menuItem.name[language]}</h4>
                          {menuItem.note && (
                            <p className="mt-1 text-xs leading-5 text-white/55">{menuItem.note[language]}</p>
                          )}
                        </div>
                        <p dir="ltr" className="flex shrink-0 items-center gap-1 pt-1 text-sm font-bold tabular-nums sm:text-base">
                          <span dir={language === 'ar' ? 'rtl' : 'ltr'}>{copy[language].currency}</span>
                          <span>{menuItem.price.toFixed(3)}</span>
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
