'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { FaCheck, FaWhatsapp } from 'react-icons/fa';
import { useState } from 'react';

const Pricing = () => {
  const { t, language } = useLanguage();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const packages = [
    {
      id: 'basic',
      nameAr: 'الباقة الأساسية',
      nameEn: 'Basic Package',
      price: '500',
      currency: 'KWD',
      descriptionAr: 'مثالية للمشاريع الصغيرة والشخصية',
      descriptionEn: 'Perfect for small and personal projects',
      features: [
        { ar: 'تصميم موقع من 3-5 صفحات', en: '3-5 pages website design' },
        { ar: 'تصميم متجاوب لجميع الأجهزة', en: 'Responsive design for all devices' },
        { ar: 'استضافة مجانية لمدة سنة', en: 'Free hosting for 1 year' },
        { ar: 'دعم فني لمدة شهر', en: 'Technical support for 1 month' },
        { ar: 'تسليم خلال 7-10 أيام', en: 'Delivery in 7-10 days' },
      ],
      color: 'from-blue-600 to-cyan-600',
      icon: '🌐',
    },
    {
      id: 'professional',
      nameAr: 'الباقة الاحترافية',
      nameEn: 'Professional Package',
      price: '1000',
      currency: 'KWD',
      descriptionAr: 'الأفضل للشركات والأعمال المتوسطة',
      descriptionEn: 'Best for companies and medium businesses',
      features: [
        { ar: 'تصميم موقع من 5-10 صفحات', en: '5-10 pages website design' },
        { ar: 'تصميم متجاوب + تحسين SEO', en: 'Responsive design + SEO optimization' },
        { ar: 'لوحة تحكم إدارية', en: 'Admin dashboard' },
        { ar: 'استضافة مجانية لمدة سنة', en: 'Free hosting for 1 year' },
        { ar: 'دعم فني لمدة 3 أشهر', en: 'Technical support for 3 months' },
        { ar: 'تسليم خلال 14-20 يوم', en: 'Delivery in 14-20 days' },
      ],
      color: 'from-purple-600 to-pink-600',
      icon: '🚀',
      popular: true,
    },
    {
      id: 'enterprise',
      nameAr: 'باقة الشركات',
      nameEn: 'Enterprise Package',
      price: '2000',
      currency: 'KWD',
      descriptionAr: 'حلول متكاملة للمشاريع الكبيرة',
      descriptionEn: 'Complete solutions for large projects',
      features: [
        { ar: 'تصميم موقع غير محدود الصفحات', en: 'Unlimited pages website design' },
        { ar: 'تطبيق موبايل iOS & Android', en: 'Mobile app iOS & Android' },
        { ar: 'لوحة تحكم متقدمة + API', en: 'Advanced dashboard + API' },
        { ar: 'استضافة مجانية لمدة سنتين', en: 'Free hosting for 2 years' },
        { ar: 'دعم فني لمدة سنة', en: 'Technical support for 1 year' },
        { ar: 'تسليم خلال 30-45 يوم', en: 'Delivery in 30-45 days' },
      ],
      color: 'from-orange-600 to-red-600',
      icon: '⭐',
    },
  ];

  const handleWhatsAppContact = (packageName: string) => {
    const message = language === 'ar' 
      ? `مرحباً، أنا مهتم بـ ${packageName}`
      : `Hello, I'm interested in ${packageName}`;
    const whatsappUrl = `https://wa.me/96550540999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="pricing" className="py-20 px-4 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute w-[500px] h-[500px] bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl top-1/4 right-0"
        />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
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
            {t('الباقات والأسعار', 'Pricing Packages')}
          </motion.h2>
          <p className="text-gray-400 text-xl">
            {t('اختر الباقة المناسبة لمشروعك', 'Choose the perfect package for your project')}
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 border ${
                pkg.popular ? 'border-purple-500 shadow-2xl shadow-purple-500/20' : 'border-gray-700'
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold"
                  >
                    {t('الأكثر طلباً', 'Most Popular')}
                  </motion.div>
                </div>
              )}

              {/* Icon */}
              <div className="text-6xl mb-4 text-center">{pkg.icon}</div>

              {/* Package Name */}
              <h3 className="text-2xl font-bold text-white mb-2 text-center">
                {t(pkg.nameAr, pkg.nameEn)}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-center mb-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {t(pkg.descriptionAr, pkg.descriptionEn)}
              </p>

              {/* Price */}
              <div className="text-center mb-8">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`inline-block bg-gradient-to-r ${pkg.color} p-6 rounded-2xl`}
                >
                  <div className="text-5xl font-bold text-white mb-1">
                    {pkg.price}
                  </div>
                  <div className="text-white text-sm opacity-90">
                    {pkg.currency}
                  </div>
                </motion.div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {pkg.features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <FaCheck className="text-green-400 mt-1 flex-shrink-0" />
                    <span>{t(feature.ar, feature.en)}</span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.button
                onClick={() => handleWhatsAppContact(t(pkg.nameAr, pkg.nameEn))}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r ${pkg.color} hover:opacity-90 rounded-lg text-white font-semibold transition-all shadow-lg`}
              >
                <FaWhatsapp className="text-xl" />
                <span>{t('اطلب الآن', 'Order Now')}</span>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Custom Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              {t('لديك مشروع خاص؟', 'Have a custom project?')}
            </h3>
            <p className="text-gray-400 mb-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {t(
                'تواصل معنا للحصول على عرض سعر مخصص يناسب احتياجاتك',
                'Contact us for a custom quote that fits your needs'
              )}
            </p>
            <motion.a
              href="https://wa.me/96550540999"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg text-white font-semibold transition-all shadow-lg"
            >
              <FaWhatsapp className="text-xl" />
              <span>{t('احصل على عرض سعر', 'Get Custom Quote')}</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
