'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const socialLinks = [
    { icon: FaGithub, href: '#', label: 'GitHub' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
  ];

  const footerLinks = [
    { nameAr: 'الرئيسية', nameEn: 'Home', href: '#home' },
    { nameAr: 'المشاريع', nameEn: 'Projects', href: '#projects' },
    { nameAr: 'المهارات', nameEn: 'Skills', href: '#skills' },
    { nameAr: 'الخصوصية', nameEn: 'Privacy', href: '#privacy' },
    { nameAr: 'التواصل', nameEn: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-black/50 backdrop-blur-lg border-t border-gray-800 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-right"
          >
            <h3 className="text-2xl font-bold gradient-text mb-3">
              NexDev
            </h3>
            <p className="text-gray-400 text-sm">
              {t('مطور تطبيقات ومواقع احترافية | الكويت', 'Professional Apps & Web Developer | Kuwait')}
            </p>
          </motion.div>

          {/* Quick Links */}
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
                <motion.a
                  key={index}
                  href={link.href}
                  whileHover={{ scale: 1.1, color: '#667eea' }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t(link.nameAr, link.nameEn)}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center md:text-left"
          >
            <h4 className="text-white font-semibold mb-4">{t('تابعني', 'Follow Me')}</h4>
            <div className="flex justify-center md:justify-start gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -3 }}
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 rounded-full text-gray-400 hover:text-white transition-all"
                >
                  <social.icon className="text-xl" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
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
              {t('بواسطة', 'by')} NexDev © {currentYear}
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
