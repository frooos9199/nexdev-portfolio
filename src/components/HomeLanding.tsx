'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight, FaComments, FaGlobe, FaShieldAlt, FaStore, FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';
import { apps } from '@/data/apps';

const trustPoints = [
  {
    icon: FaStore,
    titleAr: 'بوابة تطبيقات مرتبة',
    titleEn: 'Organized app hub',
    textAr: 'كل تطبيق له صفحة واضحة وروابط مستقلة للدعم والخصوصية والشروط.',
    textEn: 'Each app has a clear page with dedicated support, privacy, and terms links.',
  },
  {
    icon: FaGlobe,
    titleAr: 'واجهة بسيطة وواضحة',
    titleEn: 'Clear public presence',
    textAr: 'الزائر يعرف فورًا من أنت، ماذا تبني، وأين يجد تطبيقاتك.',
    textEn: 'Visitors immediately understand who you are, what you build, and where to find your apps.',
  },
  {
    icon: FaShieldAlt,
    titleAr: 'جاهز للمتاجر',
    titleEn: 'Store-ready structure',
    textAr: 'مناسب لربط التطبيقات المنشورة مع الصفحات القانونية وصفحات الدعم.',
    textEn: 'Built to support published apps with legal pages and support routes.',
  },
];

const servicePoints = [
  {
    titleAr: 'تطبيقات iOS ومواقع تعريفية',
    titleEn: 'iOS apps and product sites',
    textAr: 'أبني التطبيق مع صفحة ويب مرتبطة فيه حتى تكون هويته واضحة ومتكاملة.',
    textEn: 'I build the app alongside a supporting web presence so the product feels complete and credible.',
  },
  {
    titleAr: 'صفحات قانونية ودعم لكل تطبيق',
    titleEn: 'Legal and support pages per app',
    textAr: 'روابط مستقلة للخصوصية والشروط والدعم مناسبة للنشر والمتابعة.',
    textEn: 'Independent privacy, terms, and support links ready for publishing and long-term maintenance.',
  },
  {
    titleAr: 'تنفيذ سريع وهوية واضحة',
    titleEn: 'Fast execution with clear positioning',
    textAr: 'الهدف ليس فقط شكل جميل، بل منتج مرتب يعرف المستخدم كيف يتعامل معه.',
    textEn: 'The goal is not just visual polish, but a product that feels structured and easy to trust.',
  },
];

export default function HomeLanding() {
  const { language, t } = useLanguage();
  const featuredApps = apps.slice(0, 3);

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <section id="home" className="relative overflow-hidden border-b border-white/10 px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_32%),radial-gradient(circle_at_80%_20%,_rgba(244,114,182,0.14),_transparent_26%),linear-gradient(180deg,_rgba(2,6,23,1),_rgba(3,7,18,0.95))]" />
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300">
              {t('بوابة التطبيقات والمنتجات الرقمية', 'Apps and digital products hub')}
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              {t(
                'موقع مرتب يجمع تطبيقاتي وصفحاتها الرسمية في مكان واحد.',
                'A structured home for my apps, product pages, and official support links.'
              )}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300" dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {t(
                'أنا فراس العتيبي. أبني تطبيقات ومواقع مرتبطة بها، بحيث يشاهد الزائر التطبيق، يفهم فائدته، ويصل للدعم والروابط القانونية بدون تشتيت.',
                'I am Feras Alotaibi. I build apps and the web presence around them, so visitors can understand the product and reach support and legal links without friction.'
              )}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/apps"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-950 transition hover:bg-cyan-300"
              >
                <span>{t('تصفح التطبيقات', 'Browse apps')}</span>
                <FaArrowRight className={language === 'ar' ? 'rotate-180' : ''} />
              </Link>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200"
              >
                <FaComments />
                <span>{t('ابدأ مشروعك', 'Start a project')}</span>
              </a>
              <Link
                href="/ai"
                className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-6 py-3 text-sm font-semibold text-fuchsia-100 transition hover:border-fuchsia-300 hover:bg-fuchsia-400/20"
              >
                <span>Q8NeXDeV-AI</span>
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { value: `${apps.length}+`, ar: 'تطبيقات وصفحات مرتبطة', en: 'apps and linked pages' },
                { value: '1', ar: 'هوية موحدة', en: 'unified presence' },
                { value: '24/7', ar: 'روابط دعم جاهزة', en: 'ready support links' },
              ].map((item) => (
                <div key={item.en} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <p className="text-2xl font-semibold text-white">{item.value}</p>
                  <p className="mt-1 text-sm text-gray-400">{t(item.ar, item.en)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/40 backdrop-blur-sm">
            <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-gray-400">
                {t('المشهد الحالي', 'Current focus')}
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-white">
                {t('الموقع الآن صار بوابة تطبيقات أوضح', 'The site now reads like an app hub')}
              </h2>
              <div className="mt-6 space-y-3">
                {featuredApps.map((app) => (
                  <div key={app.slug} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-gray-400">{app.arabicName}</p>
                        <p className="text-lg font-semibold text-white">{app.name}</p>
                      </div>
                      {app.status ? (
                        <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
                          {app.status}
                        </span>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/apps"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition hover:text-cyan-100"
              >
                <span>{t('عرض جميع التطبيقات', 'View all apps')}</span>
                <FaArrowRight className={language === 'ar' ? 'rotate-180' : ''} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="apps" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                {t('تطبيقات مختارة', 'Featured apps')}
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                {t('روابط واضحة لكل تطبيق', 'Clear entry points for every app')}
              </h2>
            </div>
            <Link
              href="/apps"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-200 transition hover:text-cyan-200"
            >
              <span>{t('الدليل الكامل', 'Full directory')}</span>
              <FaArrowRight className={language === 'ar' ? 'rotate-180' : ''} />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {featuredApps.map((app, index) => (
              <motion.article
                key={app.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-400">{app.arabicName}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{app.name}</h3>
                  </div>
                  {app.status ? (
                    <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-200">
                      {app.status}
                    </span>
                  ) : null}
                </div>

                <p className="mt-5 min-h-16 text-base leading-7 text-gray-300">{app.description}</p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {app.websitePath ? (
                    <Link
                      href={app.websitePath}
                      className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-950 transition hover:bg-cyan-300"
                    >
                      {t('صفحة التطبيق', 'App page')}
                    </Link>
                  ) : null}
                  {app.privacyPath ? (
                    <Link
                      href={app.privacyPath}
                      className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200"
                    >
                      {t('الخصوصية', 'Privacy')}
                    </Link>
                  ) : null}
                  {app.supportPath ? (
                    <Link
                      href={app.supportPath}
                      className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200"
                    >
                      {t('الدعم', 'Support')}
                    </Link>
                  ) : null}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="border-y border-white/10 bg-white/[0.03] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              {t('كيف أشتغل', 'How I work')}
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              {t('الترتيب أولًا ثم الشكل', 'Structure first, then polish')}
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-300" dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {t(
                'بدل صفحة مزدحمة بكل شيء، الموقع الآن يركز على عرض التطبيقات والهوية العامة بشكل مختصر وواثق.',
                'Instead of a homepage that tries to say everything, the site now focuses on apps and public positioning in a concise way.'
              )}
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {servicePoints.map((item) => (
              <div key={item.titleEn} className="rounded-[1.75rem] border border-white/10 bg-gray-950/70 p-6">
                <h3 className="text-xl font-semibold text-white">{t(item.titleAr, item.titleEn)}</h3>
                <p className="mt-4 text-base leading-7 text-gray-300">{t(item.textAr, item.textEn)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              {t('عن NexDev', 'About NexDev')}
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              {t('واجهة واحدة لكل ما أبنيه', 'One place for everything I ship')}
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {trustPoints.map((point) => (
              <div key={point.titleEn} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <point.icon className="text-2xl text-cyan-300" />
                <h3 className="mt-4 text-xl font-semibold text-white">{t(point.titleAr, point.titleEn)}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-300">{t(point.textAr, point.textEn)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-gradient-to-r from-cyan-400/10 via-white/5 to-fuchsia-400/10 p-8 backdrop-blur-sm sm:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                {t('تواصل', 'Contact')}
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                {t('إذا عندك تطبيق أو فكرة، خلنا نرتبها صح من البداية.', 'If you have an app or product idea, let us structure it properly from the start.')}
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-300">
                {t('للتواصل السريع: واتساب أو البريد مباشرة.', 'For a fast reply, reach out on WhatsApp or email directly.')}
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="https://wa.me/96550540999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-gray-950 transition hover:bg-green-400"
              >
                <FaWhatsapp />
                <span>{t('واتساب', 'WhatsApp')}</span>
              </a>
              <a
                href="mailto:info@q8nexdev.com"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200"
              >
                <span>info@q8nexdev.com</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}