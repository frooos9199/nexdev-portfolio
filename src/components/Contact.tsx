'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      titleAr: 'البريد الإلكتروني',
      titleEn: 'Email',
      value: 'contact@nexdev.com',
      link: 'mailto:contact@nexdev.com',
    },
    {
      icon: FaPhone,
      titleAr: 'الهاتف / واتساب',
      titleEn: 'Phone / WhatsApp',
      value: '+965 5054 0999',
      link: 'https://wa.me/9655054099',
    },
    {
      icon: FaMapMarkerAlt,
      titleAr: 'الموقع',
      titleEn: 'Location',
      value: t('الكويت', 'Kuwait'),
      link: '#',
    },
  ];

  return (
    <section id="contact" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold gradient-text mb-4">{t('تواصل معي', 'Contact Me')}</h2>
          <p className="text-gray-400 text-lg">
            {t('لديك مشروع أو فكرة؟ دعنا نتحدث عنها', 'Have a project or idea? Let\'s talk about it')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">
                {t('دعنا نتواصل', 'Let\'s Connect')}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {t(
                  'أنا متاح دائماً للحديث عن مشاريع جديدة، أفكار إبداعية، أو فرص للتعاون. لا تتردد في التواصل معي!',
                  'I\'m always available to discuss new projects, creative ideas, or collaboration opportunities. Don\'t hesitate to reach out!'
                )}
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  whileHover={{ scale: 1.03, x: 5 }}
                  className="flex items-center gap-4 p-4 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 hover:border-purple-600 transition-all"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg">
                    <info.icon className="text-2xl text-white" />
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-sm">{t(info.titleAr, info.titleEn)}</h4>
                    <p className="text-white font-medium">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Decorative Element */}
            <div className="hidden md:block">
              <div className="w-full h-64 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl flex items-center justify-center text-8xl">
                💬
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2 font-medium">
                  {t('الاسم', 'Name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-purple-600 focus:outline-none transition-colors"
                  placeholder={t('أدخل اسمك', 'Enter your name')}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2 font-medium">
                  {t('البريد الإلكتروني', 'Email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-purple-600 focus:outline-none transition-colors"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2 font-medium">
                  {t('الرسالة', 'Message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-purple-600 focus:outline-none transition-colors resize-none"
                  placeholder={t('اكتب رسالتك هنا...', 'Write your message here...')}
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-semibold flex items-center justify-center gap-2 transition-all ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-purple-600/50'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t('جاري الإرسال...', 'Sending...')}</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    <span>{t('إرسال الرسالة', 'Send Message')}</span>
                  </>
                )}
              </motion.button>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-600/20 border border-green-600 rounded-lg text-green-400 text-center"
                >
                  {t('✅ تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.', '✅ Your message has been sent successfully! I will contact you soon.')}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
