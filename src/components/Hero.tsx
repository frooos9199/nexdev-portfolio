'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaCode, FaRocket, FaStar } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { language, t } = useLanguage();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Interactive Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div 
          style={{ 
            x: mousePosition.x * 0.02, 
            y: mousePosition.y * 0.02 
          }}
          className="absolute w-[600px] h-[600px] bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full blur-3xl -top-40 -right-40 float-animation"
        />
        <motion.div 
          style={{ 
            x: mousePosition.x * -0.02, 
            y: mousePosition.y * -0.02 
          }}
          className="absolute w-[600px] h-[600px] bg-gradient-to-r from-blue-600/30 to-cyan-600/30 rounded-full blur-3xl -bottom-40 -left-40 float-animation"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        {/* Floating Icons */}
        {[FaCode, FaRocket, FaStar].map((Icon, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              y: [100, -100],
              x: [0, 50, 0],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 15 + i * 3, 
              repeat: Infinity,
              delay: i * 2 
            }}
            className="absolute text-6xl text-purple-500/20"
            style={{ 
              left: `${20 + i * 30}%`,
              top: '50%'
            }}
          >
            <Icon />
          </motion.div>
        ))}
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ y, opacity }}
        className="container mx-auto px-4 z-10 text-center"
      >
        {/* Profile Image with 3D Effect */}
        <motion.div
          variants={itemVariants}
          whileHover={{ 
            scale: 1.1, 
            rotate: [0, -5, 5, -5, 0],
            transition: { duration: 0.5 }
          }}
          className="w-44 h-44 mx-auto mb-8 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-1 glow-effect relative"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center text-7xl relative overflow-hidden">
            <div className="shimmer absolute inset-0" />
            <span className="relative z-10">👨‍💻</span>
          </div>
          {/* Floating Particles Around Avatar */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              animate={{
                y: [0, -30, 0],
                x: [0, Math.sin(i * Math.PI / 4) * 30, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              style={{
                top: '50%',
                left: '50%',
              }}
            />
          ))}
        </motion.div>

        {/* Name with Split Text Animation */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-6 relative"
          dir="ltr"
        >
          {['N', 'e', 'x', 'D', 'e', 'v'].map((letter, i) => (
            <motion.span
              key={i}
              className="gradient-text inline-block"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.5 + i * 0.1,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ 
                scale: 1.2, 
                rotate: [0, -10, 10, 0],
                transition: { duration: 0.3 }
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        {/* By Line */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-500 mb-4"
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        >
          {t('بواسطة فراس العتيبي', 'by Feras Alotaibi')}
        </motion.p>

        {/* Title with Typing Effect */}
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-200 via-white to-gray-200 bg-clip-text text-transparent"
        >
          {t('مطور تطبيقات و مواقع احترافية', 'Professional Apps & Web Developer')}
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
        >
          {t(
            'أقوم بتصميم وتطوير تطبيقات ومواقع احترافية باستخدام أحدث التقنيات - أحول أفكارك إلى واقع رقمي مبتكر',
            'I design and develop professional applications and websites using the latest technologies - turning your ideas into innovative digital reality'
          )}
        </motion.p>

        {/* AI Assistant Box */}
        <motion.a
          href="/ai"
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.98 }}
          className="block max-w-md mx-auto mb-8 p-6 rounded-2xl bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-pink-900/40 backdrop-blur-lg border-2 border-purple-500/50 shadow-2xl hover:shadow-purple-500/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl"
            >
              🤖
            </motion.div>
            <h3 className="text-2xl font-bold gradient-text">
              {t('تحدث مع Q8 NeX DeV', 'Talk to Q8 NeX DeV')}
            </h3>
          </div>
          <p className="text-gray-300 text-center mb-2">
            {t(
              'احصل على استشارة فورية، تقدير أسعار، واستفسر عن خدماتنا',
              'Get instant consultation, price estimates, and inquire about our services'
            )}
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-purple-300">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>{t('متصل الآن ⚡', 'Online Now ⚡')}</span>
          </div>
        </motion.a>

        {/* CTA Buttons with Enhanced Effects */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          <motion.a
            href="#projects"
            whileHover={{ 
              scale: 1.08,
              boxShadow: "0 20px 40px rgba(102, 126, 234, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-10 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full text-white font-bold text-lg overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <FaRocket className="group-hover:rotate-12 transition-transform" />
              {t('شاهد أعمالي', 'View My Work')}
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ 
              scale: 1.08,
              backgroundColor: "rgba(102, 126, 234, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            className="group px-10 py-4 border-2 border-purple-600 rounded-full text-white font-bold text-lg glass-effect relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <FaEnvelope className="group-hover:scale-110 transition-transform" />
              {t('تواصل معي', 'Contact Me')}
            </span>
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-6"
        >
          {[
            { icon: FaGithub, href: '#', color: 'hover:text-gray-400' },
            { icon: FaLinkedin, href: '#', color: 'hover:text-blue-500' },
            { icon: FaTwitter, href: '#', color: 'hover:text-blue-400' },
            { icon: FaEnvelope, href: '#contact', color: 'hover:text-purple-500' },
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              whileHover={{ scale: 1.2, y: -5 }}
              className={`text-3xl text-gray-400 ${social.color} transition-colors`}
            >
              <social.icon />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
