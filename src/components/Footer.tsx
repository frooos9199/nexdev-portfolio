'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaHeart, FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/feras-kmt', label: 'GitHub' },
    { icon: FaWhatsapp, href: 'https://wa.me/96550540999', label: 'WhatsApp' },
    { icon: FaEnvelope, href: 'mailto:info@q8nexdev.com', label: 'Email' },
  ];

  const footerLinks = [
    { nameAr: 'الرئيسية', nameEn: 'Home', href: '/#home' },
    { nameAr: 'التطبيقات', nameEn: 'Apps', href: '/apps' },
    { nameAr: 'الخدمات', nameEn: 'Services', href: '/#services' },
    { nameAr: 'عنّا', nameEn: 'About', href: '/#about' },
    { nameAr: 'التواصل', nameEn: 'Contact', href: '/#contact' },
    { nameAr: 'سياسة الخصوصية', nameEn: 'Privacy Policy', href: '/privacy-policy' },
  ];

  return (
    <footer className="border-t border-white/10 bg-black/40 px-4 py-12 backdrop-blur-lg sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-right"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">Q8 NexDev</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{t('بوابة التطبيقات', 'Apps Hub')}</h3>
            <p className="mt-3 text-sm leading-7 text-gray-400">
              {t('موقع مرتب لتجميع التطبيقات وروابط الدعم والصفحات القانونية في مكان واحد.', 'A structured home for apps, support routes, and legal pages in one place.')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <h4 className="text-white font-semibold mb-4">{t('روابط سريعة', 'Quick Links')}</h4>
            <div className="flex flex-wrap justify-center gap-4">
              {footerLinks.map((link, index) => (
                <Link key={index} href={link.href} className="block">
                  <motion.span
                    whileHover={{ scale: 1.1, color: '#667eea' }}
                    className="block text-gray-400 transition-colors hover:text-white"
                  >
                    {t(link.nameAr, link.nameEn)}
                  </motion.span>
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center md:text-left"
          >
            <h4 className="text-white font-semibold mb-4">{t('روابط مباشرة', 'Direct links')}</h4>
            <div className="flex justify-center md:justify-start gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -3 }}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 rounded-full text-gray-400 hover:text-white transition-all"
                >
                  <social.icon className="text-xl" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-gray-400 text-sm"
          >
            <p className="flex items-center justify-center gap-2">
              {t('صُنع بكل', 'Made with')}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-red-500"
              >
                <FaHeart />
              </motion.span>
              {t('بواسطة', 'by')} Q8 NexDev © {currentYear}
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
