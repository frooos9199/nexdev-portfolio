'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { FaShieldAlt, FaLock, FaUserSecret, FaDatabase } from 'react-icons/fa';

const PrivacySection = () => {
  const { t, language } = useLanguage();

  const sections = [
    {
      icon: <FaShieldAlt className="text-4xl text-purple-400" />,
      titleAr: 'سياسة الخصوصية',
      titleEn: 'Privacy Policy',
      contentAr: 'نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية في جميع تطبيقاتنا',
      contentEn: 'We respect your privacy and protect your personal data in all our applications',
    },
    {
      icon: <FaDatabase className="text-4xl text-blue-400" />,
      titleAr: 'جمع البيانات',
      titleEn: 'Data Collection',
      contentAr: 'لا نجمع أي معلومات شخصية حساسة دون موافقتك الصريحة',
      contentEn: 'We do not collect sensitive personal information without your explicit consent',
    },
    {
      icon: <FaLock className="text-4xl text-green-400" />,
      titleAr: 'حماية البيانات',
      titleEn: 'Data Protection',
      contentAr: 'جميع البيانات مشفرة ومحمية بأحدث التقنيات الأمنية',
      contentEn: 'All data is encrypted and protected with latest security technologies',
    },
    {
      icon: <FaUserSecret className="text-4xl text-pink-400" />,
      titleAr: 'عدم المشاركة',
      titleEn: 'No Sharing',
      contentAr: 'لا نبيع أو نشارك بياناتك مع أي أطراف ثالثة',
      contentEn: 'We do not sell or share your data with any third parties',
    },
  ];

  return (
    <section id="privacy" className="py-20 px-4 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute w-[500px] h-[500px] bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-full blur-3xl top-1/4 left-0"
        />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-6xl font-bold gradient-text mb-4"
            whileInView={{ scale: [0.9, 1.05, 1] }}
            transition={{ duration: 0.5 }}
          >
            {t('سياسة الخصوصية', 'Privacy Policy')}
          </motion.h2>
          <p className="text-gray-400 text-xl">
            {t('التزامنا بحماية خصوصيتك وأمان بياناتك', 'Our commitment to protecting your privacy and data security')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 card-hover text-center"
            >
              <motion.div 
                className="flex justify-center mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {section.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-3">
                {t(section.titleAr, section.titleEn)}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {t(section.contentAr, section.contentEn)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Applications Covered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            {t('التطبيقات المشمولة', 'Covered Applications')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 text-center"
            >
              <div className="text-4xl mb-2">🇰🇼</div>
              <h4 className="text-lg font-bold text-purple-400">Q8SHIFT</h4>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 text-center"
            >
              <div className="text-4xl mb-2">📿</div>
              <h4 className="text-lg font-bold text-blue-400">{t('الرقية الشرعية', 'Ruqyah')}</h4>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 text-center"
            >
              <div className="text-4xl mb-2">☪️</div>
              <h4 className="text-lg font-bold text-green-400">{t('الرقية بدون نت', 'Ruqyah Offline')}</h4>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrivacySection;
