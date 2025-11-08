'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  FaReact,
  FaNode,
  FaPython,
  FaDatabase,
  FaDocker,
  FaGitAlt,
  FaFigma,
  FaMobile,
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiRedis,
  SiGraphql,
} from 'react-icons/si';

const Skills = () => {
  const { t } = useLanguage();
  const skillCategories = [
    {
      titleAr: 'Frontend',
      titleEn: 'Frontend',
      skills: [
        { name: 'React', icon: FaReact, color: '#61DAFB' },
        { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
        { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      ],
    },
    {
      titleAr: 'Backend',
      titleEn: 'Backend',
      skills: [
        { name: 'Node.js', icon: FaNode, color: '#339933' },
        { name: 'Python', icon: FaPython, color: '#3776AB' },
        { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
        { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      ],
    },
    {
      titleAr: 'قواعد البيانات والأدوات',
      titleEn: 'Database & Tools',
      skills: [
        { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
        { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
        { name: 'Redis', icon: SiRedis, color: '#DC382D' },
        { name: 'Docker', icon: FaDocker, color: '#2496ED' },
      ],
    },
    {
      titleAr: 'مهارات أخرى',
      titleEn: 'Other Skills',
      skills: [
        { name: 'Git', icon: FaGitAlt, color: '#F05032' },
        { name: 'Figma', icon: FaFigma, color: '#F24E1E' },
        { name: 'React Native', icon: FaMobile, color: '#61DAFB' },
        { name: 'SQL', icon: FaDatabase, color: '#4479A1' },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section id="skills" className="py-20 px-4 bg-gradient-to-b from-transparent to-gray-900/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold gradient-text mb-4">{t('مهاراتي', 'My Skills')}</h2>
          <p className="text-gray-400 text-lg">
            {t('التقنيات والأدوات التي أستخدمها في تطوير المشاريع', 'Technologies and tools I use in project development')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700"
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                {t(category.titleAr, category.titleEn)}
              </h3>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, x: 5 }}
                    className="flex items-center gap-4 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-all cursor-pointer"
                  >
                    <skill.icon
                      className="text-3xl"
                      style={{ color: skill.color }}
                    />
                    <span className="text-gray-300 font-medium">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Additional Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { number: '50+', labelAr: 'مشروع مكتمل', labelEn: 'Completed Projects' },
            { number: '30+', labelAr: 'عميل سعيد', labelEn: 'Happy Clients' },
            { number: '5+', labelAr: 'سنوات خبرة', labelEn: 'Years Experience' },
            { number: '100%', labelAr: 'جودة عالية', labelEn: 'High Quality' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl p-6 text-center border border-purple-600/30"
            >
              <h4 className="text-4xl font-bold gradient-text mb-2">
                {stat.number}
              </h4>
              <p className="text-gray-400">{t(stat.labelAr, stat.labelEn)}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
