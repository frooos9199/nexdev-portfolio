'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaRobot, FaUser, FaSearch, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: Array<{ title: string; url: string; confidence: number }>;
  confidence?: number;
}

const AIPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'مرحباً! أنا Q8NeXDeV-AI - المساعد الذكي الكويتي المطور من قبل فراس العتيبي. كيف يمكنني مساعدتك اليوم؟ يمكنني الإجابة عن الخدمات، الأسعار، وأي استفسارات أخرى.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call AI API
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: input,
          language: language 
        }),
      });

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
        sources: data.sources,
        confidence: data.confidence,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'عذراً، حدث خطأ. الرجاء المحاولة مرة أخرى.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    t('ما هي أسعار الخدمات؟', 'What are the service prices?'),
    t('كم مدة تسليم لوغو؟', 'How long for logo delivery?'),
    t('هل تصمم فيديو 3D؟', 'Do you design 3D videos?'),
    t('كيف أبدأ مشروع؟', 'How to start a project?'),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl"
            >
              🤖
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">
              Q8NeXDeV-AI
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            {t(
              'المساعد الذكي الكويتي - بواسطة فراس العتيبي',
              'Kuwaiti AI Assistant - by Feras Alotaibi'
            )}
          </p>
          <Link href="/">
            <button className="mt-4 text-purple-400 hover:text-purple-300 transition-colors">
              ← {t('العودة للصفحة الرئيسية', 'Back to Home')}
            </button>
          </Link>
        </motion.div>

        {/* Chat Container */}
        <div className="bg-gray-900/50 backdrop-blur-lg rounded-3xl border border-purple-500/30 shadow-2xl overflow-hidden">
          {/* Messages Area */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-gray-800">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {/* Avatar */}
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-blue-600 to-purple-600'
                        : 'bg-gradient-to-br from-purple-600 to-pink-600'
                    }`}
                  >
                    {message.role === 'user' ? <FaUser /> : <FaRobot />}
                  </div>

                  {/* Message Content */}
                  <div className={`flex-1 max-w-[80%] ${message.role === 'user' ? 'text-right' : ''}`}>
                    <div
                      className={`p-4 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-blue-600 to-purple-600'
                          : 'bg-gray-800/80 border border-purple-500/20'
                      }`}
                    >
                      <p className="text-white whitespace-pre-wrap">{message.content}</p>
                      
                      {/* Confidence Badge */}
                      {message.confidence && (
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-700">
                          <FaCheckCircle className="text-green-400" />
                          <span className="text-sm text-gray-300">
                            {t('دقة', 'Accuracy')}: {message.confidence}%
                          </span>
                        </div>
                      )}

                      {/* Sources */}
                      {message.sources && message.sources.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-700">
                          <div className="flex items-center gap-2 mb-2 text-sm text-gray-400">
                            <FaSearch className="text-purple-400" />
                            <span>{t('المصادر', 'Sources')}:</span>
                          </div>
                          <div className="space-y-1">
                            {message.sources.map((source, idx) => (
                              <a
                                key={idx}
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-sm text-purple-300 hover:text-purple-200 transition-colors"
                              >
                                📌 {source.title} ({source.confidence}%)
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1 px-2" suppressHydrationWarning>
                      {message.timestamp.toLocaleTimeString('ar-SA', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading Indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <FaRobot />
                </div>
                <div className="bg-gray-800/80 border border-purple-500/20 p-4 rounded-2xl">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="px-6 py-3 bg-gray-800/50 border-t border-gray-700">
            <p className="text-xs text-gray-400 mb-2">{t('أسئلة سريعة:', 'Quick Questions:')}</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(question)}
                  className="px-3 py-1 text-sm bg-gray-700/50 hover:bg-purple-600/30 text-gray-300 rounded-full transition-all border border-purple-500/20 hover:border-purple-500/50"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-6 bg-gray-800/50 border-t border-gray-700">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('اكتب رسالتك هنا...', 'Type your message here...')}
                className="flex-1 px-4 py-3 bg-gray-900/80 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all"
                disabled={isLoading}
              />
              <motion.button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-purple-500/50"
              >
                <FaPaperPlane />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <motion.div
            whileHover={{ y: -5 }}
            className="p-4 bg-gray-900/50 backdrop-blur-lg rounded-xl border border-green-500/30"
          >
            <FaCheckCircle className="text-3xl text-green-400 mb-2" />
            <h3 className="font-bold text-white mb-1">{t('إجابات دقيقة', 'Accurate Answers')}</h3>
            <p className="text-sm text-gray-400">{t('مدعوم بالذكاء الاصطناعي المتقدم', 'Powered by advanced AI')}</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="p-4 bg-gray-900/50 backdrop-blur-lg rounded-xl border border-purple-500/30"
          >
            <FaSearch className="text-3xl text-purple-400 mb-2" />
            <h3 className="font-bold text-white mb-1">{t('بحث ذكي', 'Smart Search')}</h3>
            <p className="text-sm text-gray-400">{t('يبحث في الإنترنت للحصول على أفضل الإجابات', 'Searches the web for best answers')}</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="p-4 bg-gray-900/50 backdrop-blur-lg rounded-xl border border-blue-500/30"
          >
            <FaExclamationTriangle className="text-3xl text-blue-400 mb-2" />
            <h3 className="font-bold text-white mb-1">{t('نسب ثقة', 'Confidence Scores')}</h3>
            <p className="text-sm text-gray-400">{t('يعرض مدى دقة كل إجابة', 'Shows accuracy of each answer')}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AIPage;
