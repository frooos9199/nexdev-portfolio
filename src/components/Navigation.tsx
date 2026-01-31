'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaGlobe, FaUserShield } from 'react-icons/fa';
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
    { name: t('الرئيسية', 'Home'), href: '#home' },
    { name: t('المشاريع', 'Projects'), href: '#projects' },
    { name: t('المهارات', 'Skills'), href: '#skills' },
    { name: t('الأسعار', 'Pricing'), href: '#pricing' },
    { name: t('الخصوصية', 'Privacy'), href: '#privacy' },
    { name: t('سياسة الخصوصية', 'Privacy Policy'), href: '/privacy-policy' },
    { name: t('التواصل', 'Contact'), href: '#contact' },
    { name: t('🤖 Q8 NeX DeV', '🤖 Q8 NeX DeV'), href: '/ai' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold gradient-text cursor-pointer"
          >
            {t('NexDev', 'NexDev')}
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse gap-4">
            {navItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                whileHover={{ scale: 1.1, color: '#667eea' }}
                className="text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                {item.name}
              </motion.a>
            ))}
            
            {/* Admin Login Button */}
            <Link href="/admin/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <FaUserShield />
                <span>{t('لوحة التحكم', 'Admin')}</span>
              </motion.button>
            </Link>
            
            {/* Language Toggle Button */}
            <motion.button
              onClick={toggleLanguage}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white text-sm font-semibold"
            >
              <FaGlobe />
              <span>{language === 'ar' ? 'EN' : 'ع'}</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Language Toggle Mobile */}
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 space-y-4"
          >
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-300 hover:text-white transition-colors py-2"
              >
                {item.name}
              </a>
            ))}
            
            {/* Admin Login Mobile */}
            <Link href="/admin/login">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold"
              >
                <FaUserShield />
                <span>{t('لوحة التحكم', 'Admin Panel')}</span>
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navigation;
