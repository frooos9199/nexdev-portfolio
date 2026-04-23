'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaGlobe } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('الرئيسية', 'Home'), href: '/#home' },
    { name: t('التطبيقات', 'Apps'), href: '/apps' },
    { name: t('الخدمات', 'Services'), href: '/#services' },
    { name: t('عنّا', 'About'), href: '/#about' },
    { name: t('التواصل', 'Contact'), href: '/#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? 'border-b border-white/10 bg-gray-950/88 backdrop-blur-xl shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="block">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="cursor-pointer"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">Q8 NexDev</p>
              <p className="mt-1 text-lg font-semibold text-white">{t('بوابة التطبيقات', 'Apps Hub')}</p>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <Link key={index} href={item.href} className="block">
                <motion.span
                  whileHover={{ y: -1 }}
                  className="block cursor-pointer text-sm font-medium text-gray-300 transition-colors hover:text-white"
                >
                  {item.name}
                </motion.span>
              </Link>
            ))}

            <motion.button
              onClick={toggleLanguage}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200"
            >
              <FaGlobe />
              <span>{language === 'ar' ? 'EN' : 'ع'}</span>
            </motion.button>

            <Link href="/apps" className="block">
              <motion.span
                whileHover={{ scale: 1.03 }}
                className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-950 transition hover:bg-cyan-300"
              >
                {t('استعراض التطبيقات', 'View apps')}
              </motion.span>
            </Link>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <motion.button
              onClick={toggleLanguage}
              whileTap={{ scale: 0.9 }}
              className="text-white text-xl"
            >
              <FaGlobe />
            </motion.button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white text-2xl"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 rounded-3xl border border-white/10 bg-gray-950/95 p-4 md:hidden"
          >
            <div className="space-y-3">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-2xl px-3 py-3 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <Link href="/apps">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 w-full rounded-2xl bg-white px-4 py-3 font-semibold text-gray-950"
              >
                <span>{t('استعراض التطبيقات', 'View apps')}</span>
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navigation;
