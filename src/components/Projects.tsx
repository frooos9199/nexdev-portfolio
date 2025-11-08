'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaStar } from 'react-icons/fa';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguage();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative group"
    >
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl overflow-hidden card-hover border border-gray-700 relative">
        {/* Glow Effect on Hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ transform: "translateZ(20px)" }}
        />
        
        {/* Project Image/Icon with 3D Effect */}
        <div className="h-56 bg-gradient-to-br from-purple-600/30 to-blue-600/30 flex items-center justify-center text-9xl relative overflow-hidden">
          <motion.div
            animate={isHovered ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.3 }}
            style={{ transform: "translateZ(50px)" }}
          >
            {project.image}
          </motion.div>
          
          {/* Floating Stars */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
              }}
              style={{
                left: `${20 + i * 15}%`,
                top: '20%',
              }}
            >
              <FaStar className="text-yellow-400 text-xl" />
            </motion.div>
          ))}
        </div>

        {/* Project Content */}
        <div className="p-6 relative" style={{ transform: "translateZ(30px)" }}>
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
            {project.title}
          </h3>
          <p className="text-gray-400 mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech: string, techIndex: number) => (
              <motion.span
                key={techIndex}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-3 py-1 text-sm bg-gradient-to-r from-purple-600/30 to-blue-600/30 text-purple-300 rounded-full border border-purple-600/50"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4">
            <motion.a
              href={project.github}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 rounded-lg text-white transition-all shadow-lg"
            >
              <FaGithub />
              <span>{t('الكود', 'Code')}</span>
            </motion.a>
            <motion.a
              href={project.demo}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-white transition-all shadow-lg glow-effect"
            >
              <FaExternalLinkAlt />
              <span>{t('معاينة', 'Demo')}</span>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const { t } = useLanguage();
  
  const projects = [
    {
      titleAr: 'Q8SHIFT',
      titleEn: 'Q8SHIFT',
      descriptionAr: 'تطبيق احترافي مخصص لموظفي الجمارك الكويتية لإدارة المناوبات والجداول',
      descriptionEn: 'Professional app dedicated to Kuwait Customs employees for shift and schedule management',
      tech: ['Swift', 'iOS', 'Firebase', 'Push Notifications'],
      image: '🇰🇼',
      github: '#',
      demo: 'https://apps.apple.com/us/app/q8shift/id6754179549',
    },
    {
      titleAr: 'الرقية الشرعية بدون نت',
      titleEn: 'Ruqyah Shariah Offline',
      descriptionAr: 'تطبيق إسلامي شامل للرقية الشرعية يعمل بدون إنترنت مع مكتبة صوتية كاملة',
      descriptionEn: 'Comprehensive Islamic Ruqyah app that works offline with complete audio library',
      tech: ['Swift', 'iOS', 'CoreData', 'AVFoundation'],
      image: '📿',
      github: '#',
      demo: 'https://apps.apple.com/us/app/%D8%A7%D9%84%D8%B1%D9%82%D9%8A%D8%A9-%D8%A7%D9%84%D8%B4%D8%B1%D8%B9%D9%8A%D9%87-%D8%A8%D8%AF%D9%88%D9%86-%D9%86%D8%AA/id6754266091',
    },
    {
      titleAr: 'الرقية الشرعية بدون انترنت',
      titleEn: 'Ruqyah Shariah No Internet',
      descriptionAr: 'تطبيق إسلامي متكامل للرقية الشرعية مع إمكانية الاستماع بدون اتصال بالإنترنت',
      descriptionEn: 'Complete Islamic Ruqyah application with offline listening capability',
      tech: ['Swift', 'iOS', 'Offline Mode', 'Audio Player'],
      image: '☪️',
      github: '#',
      demo: 'https://apps.apple.com/us/app/%D8%A7%D9%84%D8%B1%D9%82%D9%8A%D9%87-%D8%A7%D9%84%D8%B4%D8%B1%D8%B9%D9%8A%D8%A9-%D8%A8%D8%AF%D9%88%D9%86-%D8%A7%D9%86%D8%AA%D8%B1%D9%86%D8%AA/id1330037264',
    },
    {
      titleAr: 'موقع بورتفوليو احترافي',
      titleEn: 'Professional Portfolio Website',
      descriptionAr: 'موقع شخصي احترافي لعرض المشاريع والمهارات مع تصميم عصري وتأثيرات متقدمة',
      descriptionEn: 'Professional personal website showcasing projects and skills with modern design and advanced effects',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      image: '✨',
      github: 'https://github.com/feras-kmt',
      demo: 'https://https-github-com-feras-kmt.vercel.app',
    },
    {
      titleAr: 'تطبيق التجارة الإلكترونية',
      titleEn: 'E-Commerce Application',
      descriptionAr: 'تطبيق متكامل للتجارة الإلكترونية مع نظام دفع آمن وإدارة المنتجات',
      descriptionEn: 'Complete e-commerce app with secure payment system and product management',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: '🛒',
      github: '#',
      demo: '#',
    },
    {
      titleAr: 'منصة إدارة المشاريع',
      titleEn: 'Project Management Platform',
      descriptionAr: 'نظام متطور لإدارة المشاريع والمهام مع لوحة تحكم تفاعلية',
      descriptionEn: 'Advanced project and task management system with interactive dashboard',
      tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
      image: '📊',
      github: '#',
      demo: '#',
    },
    {
      titleAr: 'تطبيق الدردشة الفورية',
      titleEn: 'Real-Time Chat App',
      descriptionAr: 'تطبيق دردشة بالوقت الفعلي مع مكالمات صوتية ومرئية',
      descriptionEn: 'Real-time chat application with voice and video calls',
      tech: ['React Native', 'Firebase', 'WebRTC', 'Socket.io'],
      image: '💬',
      github: '#',
      demo: '#',
    },
    {
      titleAr: 'نظام حجز المواعيد',
      titleEn: 'Appointment Booking System',
      descriptionAr: 'منصة لحجز المواعيد مع إشعارات تلقائية وتقويم تفاعلي',
      descriptionEn: 'Booking platform with automatic notifications and interactive calendar',
      tech: ['Vue.js', 'Express', 'MySQL', 'Redis'],
      image: '📅',
      github: '#',
      demo: '#',
    },
    {
      titleAr: 'لوحة تحكم تحليلية',
      titleEn: 'Analytics Dashboard',
      descriptionAr: 'لوحة تحكم متقدمة لتحليل البيانات مع رسوم بيانية تفاعلية',
      descriptionEn: 'Advanced data analytics dashboard with interactive charts',
      tech: ['React', 'D3.js', 'Python', 'FastAPI'],
      image: '📈',
      github: '#',
      demo: '#',
    },
    {
      titleAr: 'موقع بورتفوليو شخصي',
      titleEn: 'Personal Portfolio Website',
      descriptionAr: 'موقع عرض أعمال احترافي مع تصميم عصري وانيميشن سلس',
      descriptionEn: 'Professional portfolio website with modern design and smooth animations',
      tech: ['Next.js', 'Tailwind', 'Framer Motion', 'TypeScript'],
      image: '🎨',
      github: '#',
      demo: '#',
    },
  ];

  return (
    <section id="projects" className="py-20 px-4 relative">
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
            {t('مشاريعي', 'My Projects')}
          </motion.h2>
          <p className="text-gray-400 text-xl">
            {t('مجموعة من أفضل المشاريع التي عملت عليها', 'A collection of my best projects')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={{
                ...project,
                title: t(project.titleAr, project.titleEn),
                description: t(project.descriptionAr, project.descriptionEn)
              }} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
