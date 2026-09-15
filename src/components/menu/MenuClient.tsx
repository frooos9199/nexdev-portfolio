'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { cloneDefaultMenu, MENU_LOGO_STORAGE_KEY, MENU_STORAGE_KEY, MenuLanguage, MenuSection } from '@/data/menu';

const DEFAULT_LOGO = '/hokah-mood-logo.svg';

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
  const [logo, setLogo] = useState(DEFAULT_LOGO);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(() => cloneDefaultMenu()[0]?.id ?? '');
  const categoryNav = useRef<HTMLDivElement>(null);
  const categoryLinks = useRef(new Map<string, HTMLAnchorElement>());

  useEffect(() => {
    const syncMenu = async () => {
      try {
        const response = await fetch('/api/menu', { cache: 'no-store' });
        if (!response.ok) throw new Error('Unable to load menu');
        const data = await response.json();
        setSections(data.sections);
        setLogo(data.logo || DEFAULT_LOGO);
      } catch {
        setSections(loadMenu());
        setLogo(localStorage.getItem(MENU_LOGO_STORAGE_KEY) || DEFAULT_LOGO);
      } finally {
        setLogoLoaded(true);
      }
    };

    syncMenu();
    window.addEventListener('storage', syncMenu);
    window.addEventListener('menu-updated', syncMenu);
    window.addEventListener('focus', syncMenu);
    return () => {
      window.removeEventListener('storage', syncMenu);
      window.removeEventListener('menu-updated', syncMenu);
      window.removeEventListener('focus', syncMenu);
    };
  }, []);

  useEffect(() => {
    let frameId = 0;

    const updateActiveSection = () => {
      frameId = 0;
      if (!sections.length) return;

      const pageBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      let currentId = sections[0].id;

      if (pageBottom) {
        currentId = sections.at(-1)?.id ?? currentId;
      } else {
        const activationLine = 120;
        for (const section of sections) {
          const element = document.getElementById(section.id);
          if (element && element.getBoundingClientRect().top <= activationLine) {
            currentId = section.id;
          }
        }
      }

      setActiveSection((current) => current === currentId ? current : currentId);
    };

    const handleScroll = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [sections]);

  useEffect(() => {
    const container = categoryNav.current;
    const link = categoryLinks.current.get(activeSection);
    if (!container || !link) return;

    const containerBounds = container.getBoundingClientRect();
    const linkBounds = link.getBoundingClientRect();
    const offset = linkBounds.left + linkBounds.width / 2 - (containerBounds.left + containerBounds.width / 2);

    container.scrollBy({
      left: offset,
      behavior: 'smooth',
    });
  }, [activeSection]);

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
    <main dir={language === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-[#050505] text-white">
      <header className="relative overflow-hidden border-b border-[#d5b46b]/20 bg-[radial-gradient(circle_at_top,rgba(213,180,107,0.12),transparent_58%)]">
        <div className="mx-auto flex max-w-5xl flex-col items-center px-5 pb-9 pt-9 text-center sm:pb-12 sm:pt-12">
        <div className="mb-5 h-32 w-32 shrink-0 sm:h-44 sm:w-44">
          {logoLoaded && (
            <Image
              key={logo}
              src={logo}
              alt={copy[language].title}
              width={180}
              height={180}
              priority
              unoptimized
              className="h-full w-full object-contain"
            />
          )}
        </div>
        <p className="mb-2 text-xs font-semibold uppercase text-[#d5b46b]">Menu</p>
        <h1 className="font-[Georgia] text-3xl font-bold sm:text-4xl">{copy[language].title}</h1>
        <button
          type="button"
          onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
          className="mt-5 border-b border-[#d5b46b] px-1 py-1 text-sm font-medium text-white transition hover:text-[#d5b46b]"
        >
          {copy[language].language}
        </button>
        </div>
      </header>

      <nav className="sticky top-0 z-20 border-b border-[#d5b46b]/25 bg-[#050505]/95 backdrop-blur">
        <div ref={categoryNav} className="mx-auto flex max-w-5xl gap-7 overflow-x-auto px-5 py-4 sm:justify-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              ref={(element) => {
                if (element) categoryLinks.current.set(section.id, element);
                else categoryLinks.current.delete(section.id);
              }}
              aria-current={activeSection === section.id ? 'location' : undefined}
              onClick={() => setActiveSection(section.id)}
              className={`shrink-0 border-b-2 px-1 pb-1 text-sm font-semibold transition ${
                activeSection === section.id
                  ? 'border-[#d5b46b] text-[#d5b46b]'
                  : 'border-transparent text-white/65 hover:text-[#d5b46b]'
              }`}
            >
              {section.name[language]}
            </a>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-5 pb-20 pt-12 sm:px-8">
        {groups.map((group) => (
          <section key={`${group[0].group.ar}-${group[0].id}`} className="mb-20">
            <div className="mb-12 flex items-center gap-4 sm:gap-7">
              <span className="h-px flex-1 bg-[#d5b46b]/55" />
              <h2 className="text-center font-[Georgia] text-3xl font-bold text-[#d5b46b] sm:text-4xl">
                {group[0].group[language]}
              </h2>
              <span className="h-px flex-1 bg-[#d5b46b]/55" />
            </div>
            <div className="space-y-14">
              {group.map((section) => (
                <div key={section.id} id={section.id} className="scroll-mt-24">
                  <h3 className="mb-6 text-center text-xl font-bold sm:text-2xl">{section.name[language]}</h3>
                  <div className="grid gap-x-12 md:grid-cols-2">
                    {section.items.map((menuItem) => (
                      <article key={menuItem.id} className="flex min-h-20 items-start justify-between gap-5 border-b border-dashed border-white/15 py-4 transition-colors hover:border-[#d5b46b]/60">
                        <div className="min-w-0">
                          <h4 className="text-base font-semibold leading-7 sm:text-lg">{menuItem.name[language]}</h4>
                          {menuItem.note && (
                            <p className="mt-1 text-xs leading-5 text-white/55">{menuItem.note[language]}</p>
                          )}
                        </div>
                        <p dir="ltr" className="flex shrink-0 items-center gap-1 pt-1 text-sm font-bold text-[#d5b46b] tabular-nums sm:text-base">
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
