'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  const { t, language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <main className="min-h-screen bg-gray-950">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            {isArabic ? 'سياسة الخصوصية - Q8SHIFT' : 'Privacy Policy - Q8SHIFT'}
          </h1>
          
          <div className="text-gray-300 space-y-6" dir={isArabic ? 'rtl' : 'ltr'}>
            <p className="text-sm text-gray-400">
              {isArabic ? 'آخر تحديث: 19 يناير 2025' : 'Last Updated: January 19, 2025'}
            </p>

            <section className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-2xl font-semibold text-purple-400 mb-4">
                {isArabic ? 'مقدمة' : 'Introduction'}
              </h2>
              <p className="mb-4">
                {isArabic 
                  ? 'هذه سياسة الخصوصية لتطبيق Q8SHIFT المقدم من قبل المطور FERAS ALOTAIBI. نحن ملتزمون بحماية خصوصيتك وأمان بياناتك. تم تصميم تطبيقنا وفقاً لأعلى معايير حماية البيانات والخصوصية.'
                  : 'This is the Privacy Policy for Q8SHIFT app provided by developer FERAS ALOTAIBI. We are committed to protecting your privacy and data security. Our app is designed according to the highest standards of data protection and privacy.'}
              </p>
              <div className="bg-gray-800 rounded p-4 border border-gray-700">
                <p className="font-semibold text-white mb-2">
                  {isArabic ? '📱 معلومات التطبيق والمطور' : '📱 App and Developer Information'}
                </p>
                <p><strong>{isArabic ? 'اسم التطبيق:' : 'App Name:'}</strong> Q8SHIFT</p>
                <p><strong>{isArabic ? 'اسم المطور:' : 'Developer Name:'}</strong> FERAS ALOTAIBI</p>
                <p><strong>{isArabic ? 'رقم الهاتف:' : 'Phone:'}</strong> +965-50540999</p>
                <p><strong>{isArabic ? 'البريد الإلكتروني:' : 'Email:'}</strong> summit_kw@hotmail.com</p>
              </div>
            </section>

            <section className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-2xl font-semibold text-blue-400 mb-4">
                {isArabic ? 'المعلومات التي نجمعها' : 'Information We Collect'}
              </h2>
              <p className="mb-3">
                {isArabic 
                  ? 'تطبيق Q8SHIFT لا يجمع أي معلومات شخصية بما في ذلك:'
                  : 'Q8SHIFT app does not collect any personal information including:'}
              </p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>{isArabic ? 'الاسم الكامل' : 'Full name'}</li>
                <li>{isArabic ? 'العنوان' : 'Address'}</li>
                <li>{isArabic ? 'البريد الإلكتروني' : 'Email address'}</li>
                <li>{isArabic ? 'رقم الهاتف' : 'Phone number'}</li>
                <li>{isArabic ? 'الموقع الجغرافي الدقيق' : 'Precise geolocation'}</li>
                <li>{isArabic ? 'الصور أو الفيديوهات' : 'Photos or videos'}</li>
                <li>{isArabic ? 'معلومات الجهاز الحساسة' : 'Sensitive device information'}</li>
              </ul>
            </section>

            <section className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-2xl font-semibold text-green-400 mb-4">
                {isArabic ? 'حماية بيانات الأطفال' : 'Children\'s Data Protection'}
              </h2>
              <p>
                {isArabic 
                  ? 'نلتزم بجميع القوانين المحلية والدولية المتعلقة بحماية الخصوصية. تطبيق Q8SHIFT:'
                  : 'We comply with all local and international laws regarding privacy protection. Q8SHIFT app:'}
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 mr-4">
                <li>{isArabic ? 'لا يتطلب إنشاء حساب' : 'Does not require account creation'}</li>
                <li>{isArabic ? 'لا يحتوي على إعلانات' : 'Contains no advertisements'}</li>
                <li>{isArabic ? 'لا يحتوي على روابط خارجية' : 'Contains no external links'}</li>
                <li>{isArabic ? 'لا يتتبع سلوك المستخدم' : 'Does not track user behavior'}</li>
                <li>{isArabic ? 'لا يشارك البيانات مع أطراف ثالثة' : 'Does not share data with third parties'}</li>
                <li>{isArabic ? 'يعمل بدون اتصال بالإنترنت' : 'Works offline'}</li>
              </ul>
            </section>

            <section className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-2xl font-semibold text-pink-400 mb-4">
                {isArabic ? 'الإعدادات المحلية' : 'Local Storage'}
              </h2>
              <p>
                {isArabic 
                  ? 'التطبيق قد يحفظ بعض البيانات محلياً على الجهاز فقط لتحسين تجربة المستخدم (مثل: التقدم في اللعبة، الإعدادات). هذه البيانات:'
                  : 'The app may store some data locally on the device only to enhance user experience (such as: game progress, settings). This data:'}
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 mr-4">
                <li>{isArabic ? 'تبقى على الجهاز فقط' : 'Remains on the device only'}</li>
                <li>{isArabic ? 'لا تُرسل إلى خوادمنا أو أي خوادم خارجية' : 'Is not sent to our servers or any external servers'}</li>
                <li>{isArabic ? 'يمكن حذفها في أي وقت' : 'Can be deleted at any time'}</li>
                <li>{isArabic ? 'لا تحتوي على معلومات شخصية' : 'Does not contain personal information'}</li>
              </ul>
            </section>

            <section className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
                {isArabic ? 'الأذونات المطلوبة' : 'Required Permissions'}
              </h2>
              <p>
                {isArabic 
                  ? 'التطبيق لا يطلب أي أذونات غير ضرورية. إذا كان التطبيق يحتاج إلى أذونات معينة (مثل الصوت)، فسيتم استخدامها فقط لوظائف التطبيق الأساسية ولن يتم استخدامها لجمع البيانات.'
                  : 'The app does not request any unnecessary permissions. If the app needs certain permissions (such as audio), they will only be used for core app functionality and will not be used for data collection.'}
              </p>
            </section>

            <section className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-2xl font-semibold text-red-400 mb-4">
                {isArabic ? 'الأمان' : 'Security'}
              </h2>
              <p>
                {isArabic 
                  ? 'نتخذ جميع التدابير الأمنية المناسبة لضمان سلامة التطبيق وحماية الأطفال من أي محتوى غير مناسب أو مخاطر أمنية.'
                  : 'We take all appropriate security measures to ensure app safety and protect children from inappropriate content or security risks.'}
              </p>
            </section>

            <section className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-2xl font-semibold text-indigo-400 mb-4">
                {isArabic ? 'حقوق الوالدين' : 'Parental Rights'}
              </h2>
              <p>
                {isArabic 
                  ? 'للوالدين الحق في:'
                  : 'Parents have the right to:'}
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 mr-4">
                <li>{isArabic ? 'مراجعة أي بيانات محفوظة محلياً' : 'Review any locally stored data'}</li>
                <li>{isArabic ? 'حذف جميع البيانات المحلية' : 'Delete all local data'}</li>
                <li>{isArabic ? 'التواصل معنا لأي استفسارات' : 'Contact us for any inquiries'}</li>
                <li>{isArabic ? 'طلب معلومات إضافية حول ممارسات الخصوصية' : 'Request additional information about privacy practices'}</li>
              </ul>
            </section>

            <section className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">
                {isArabic ? 'التغييرات على سياسة الخصوصية' : 'Changes to Privacy Policy'}
              </h2>
              <p>
                {isArabic 
                  ? 'قد نقوم بتحديث سياسة الخصوصية من وقت لآخر. سنقوم بإخطاركم بأي تغييرات من خلال تحديث التطبيق وتاريخ "آخر تحديث" في أعلى هذه السياسة.'
                  : 'We may update our Privacy Policy from time to time. We will notify you of any changes by updating the app and the "Last Updated" date at the top of this policy.'}
              </p>
            </section>

            <section className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-2xl font-semibold text-orange-400 mb-4">
                {isArabic ? 'اتصل بنا' : 'Contact Us'}
              </h2>
              <p className="mb-4">
                {isArabic 
                  ? 'إذا كان لديك أي أسئلة أو استفسارات حول سياسة الخصوصية هذه، يرجى التواصل معنا:'
                  : 'If you have any questions or concerns about this Privacy Policy, please contact us:'}
              </p>
              <div className="bg-gray-800 rounded p-4 border border-gray-700 space-y-2">
                <p><strong>{isArabic ? 'التطبيق:' : 'App:'}</strong> Q8SHIFT</p>
                <p><strong>{isArabic ? 'المطور:' : 'Developer:'}</strong> FERAS ALOTAIBI</p>
                <p><strong>{isArabic ? 'البريد الإلكتروني:' : 'Email:'}</strong> summit_kw@hotmail.com</p>
                <p><strong>{isArabic ? 'الهاتف:' : 'Phone:'}</strong> +965-50540999</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </main>
  );
}licy from time to time. We will notify you of any changes by updating the app and the "Last Updated" date at the top of this policy.'}
              </p>
            </section>

            <section className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-2xl font-semibold text-purple-400 mb-4">
                {isArabic ? 'اتصل بنا' : 'Contact Us'}
              </h2>
              <p>
                {isArabic 
                  ? 'إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا:'
                  : 'If you have any questions about this Privacy Policy, please contact us:'}
              </p>
              <div className="mt-4 space-y-2">
                <p><strong>{isArabic ? 'البريد الإلكتروني:' : 'Email:'}</strong> info@q8nexdev.com</p>
                <p><strong>{isArabic ? 'الموقع الإلكتروني:' : 'Website:'}</strong> https://www.q8nexdev.com</p>
              </div>
            </section>

            <section className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-lg p-6 border border-purple-700">
              <h2 className="text-2xl font-semibold text-white mb-4">
                {isArabic ? '🛡️ التزامنا' : '🛡️ Our Commitment'}
              </h2>
              <p className="text-white">
                {isArabic 
                  ? 'نحن ملتزمون بتوفير بيئة آمنة وخالية من المخاطر للأطفال. خصوصية وسلامة أطفالك هي أولويتنا القصوى.'
                  : 'We are committed to providing a safe and risk-free environment for children. Your children\'s privacy and safety is our top priority.'}
              </p>
            </section>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
