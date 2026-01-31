import { NextRequest, NextResponse } from 'next/server';
import knowledgeBase from '@/data/knowledge-base.json';
import axios from 'axios';

// Simple in-memory search function
function searchKnowledgeBase(query: string): any {
  const lowerQuery = query.toLowerCase();
  
  // Search in services
  const services = knowledgeBase.services;
  const results: any[] = [];
  
  // Search for pricing keywords
  if (lowerQuery.includes('سعر') || lowerQuery.includes('كم') || lowerQuery.includes('price')) {
    Object.entries(services).forEach(([serviceKey, service]: [string, any]) => {
      if (service.pricing) {
        results.push({
          type: 'pricing',
          service: service.name,
          data: service.pricing,
          confidence: 95
        });
      }
    });
  }
  
  // Search for logo
  if (lowerQuery.includes('لوغو') || lowerQuery.includes('logo') || lowerQuery.includes('شعار')) {
    results.push({
      type: 'service',
      service: services.logos.name,
      data: services.logos,
      confidence: 100
    });
  }
  
  // Search for website
  if (lowerQuery.includes('موقع') || lowerQuery.includes('website') || lowerQuery.includes('site')) {
    results.push({
      type: 'service',
      service: services.websites.name,
      data: services.websites,
      confidence: 100
    });
  }
  
  // Search for video
  if (lowerQuery.includes('فيديو') || lowerQuery.includes('video') || lowerQuery.includes('3d') || lowerQuery.includes('2d')) {
    results.push({
      type: 'service',
      service: services.videos.name,
      data: services.videos,
      confidence: 100
    });
  }
  
  // Search for mobile app
  if (lowerQuery.includes('تطبيق') || lowerQuery.includes('app') || lowerQuery.includes('موبايل') || lowerQuery.includes('mobile')) {
    results.push({
      type: 'service',
      service: services.mobile_apps.name,
      data: services.mobile_apps,
      confidence: 100
    });
  }
  
  // Search in FAQ
  const faqResults = knowledgeBase.faq.filter(item => 
    item.question.toLowerCase().includes(lowerQuery) ||
    item.answer.toLowerCase().includes(lowerQuery)
  );
  
  if (faqResults.length > 0) {
    results.push({
      type: 'faq',
      data: faqResults,
      confidence: 90
    });
  }
  
  return results;
}

// Free Web Search using DuckDuckGo (no API key needed)
async function webSearch(query: string): Promise<any[]> {
  try {
    // Use DuckDuckGo instant answer API (free, no key required)
    const searchQuery = encodeURIComponent(query + ' Kuwait design pricing');
    const response = await axios.get(`https://api.duckduckgo.com/?q=${searchQuery}&format=json&no_html=1&skip_disambig=1`, {
      timeout: 5000,
      headers: {
        'User-Agent': 'Q8NexDev-Bot/1.0'
      }
    });

    const results = [];
    
    // Get abstract if available
    if (response.data.Abstract) {
      results.push({
        title: response.data.Heading || 'DuckDuckGo Result',
        url: response.data.AbstractURL || 'https://duckduckgo.com',
        snippet: response.data.Abstract,
        confidence: 75
      });
    }

    // Get related topics
    if (response.data.RelatedTopics && response.data.RelatedTopics.length > 0) {
      response.data.RelatedTopics.slice(0, 2).forEach((topic: any) => {
        if (topic.Text && topic.FirstURL) {
          results.push({
            title: topic.Text.substring(0, 60),
            url: topic.FirstURL,
            snippet: topic.Text,
            confidence: 70
          });
        }
      });
    }

    return results;
  } catch (error) {
    console.error('Web search error:', error);
    return [];
  }
}

// Smart AI response generator (no external AI API needed)
function generateSmartResponse(query: string, kbResults: any[], webResults: any[], language: string): { message: string, confidence: number } {
  const isArabic = language === 'ar';
  let response = '';
  let confidence = 0;

  // Check if asking about pricing
  const isPricingQuery = query.match(/سعر|كم|price|cost|how much|تكلفة/i);
  const isComparisonQuery = query.match(/مقارنة|compare|أفضل|best|vs/i);
  
  if (kbResults.length > 0) {
    const pricingResult = kbResults.find(r => r.type === 'pricing');
    const serviceResult = kbResults.find(r => r.type === 'service');
    const faqResult = kbResults.find(r => r.type === 'faq');

    // Start with greeting
    response = isArabic ? '✨ ' : '✨ ';

    // Handle pricing queries
    if (pricingResult && isPricingQuery) {
      response += isArabic ? '**الأسعار المتوفرة:**\n\n' : '**Available Pricing:**\n\n';
      
      Object.entries(pricingResult.data).forEach(([key, pkg]: [string, any]) => {
        response += `📦 **${pkg.name || key}**\n`;
        response += `💰 ${pkg.price}\n`;
        if (pkg.features && pkg.features.length > 0) {
          pkg.features.slice(0, 3).forEach((feature: string) => {
            response += `   ✓ ${feature}\n`;
          });
        }
        response += '\n';
      });
      
      confidence = 100;
    }
    
    // Handle service queries
    else if (serviceResult) {
      response += `**${serviceResult.service}**\n\n`;
      response += `${serviceResult.data.description}\n\n`;
      
      if (serviceResult.data.pricing) {
        response += isArabic ? '**الباقات المتاحة:**\n\n' : '**Available Packages:**\n\n';
        Object.entries(serviceResult.data.pricing).forEach(([key, pkg]: [string, any]) => {
          response += `• ${pkg.name || key}: ${pkg.price}\n`;
        });
      }
      
      confidence = 100;
    }
    
    // Handle FAQ
    else if (faqResult) {
      response += isArabic ? '**إجابة من الأسئلة الشائعة:**\n\n' : '**Answer from FAQ:**\n\n';
      faqResult.data.forEach((item: any) => {
        response += `**س:** ${item.question}\n`;
        response += `**ج:** ${item.answer}\n\n`;
      });
      
      confidence = 95;
    }

    // Add market comparison if web results available
    if (webResults.length > 0 && isComparisonQuery) {
      response += isArabic ? '\n\n📊 **مقارنة السوق:**\n' : '\n\n📊 **Market Comparison:**\n';
      response += isArabic 
        ? 'بناءً على بحثنا، أسعارنا تنافسية جداً مقارنة بالسوق الكويتي.\n'
        : 'Based on our research, our prices are very competitive in the Kuwaiti market.\n';
      confidence = Math.min(confidence + 5, 100);
    }

    // Add contact info
    response += isArabic
      ? '\n\n📞 **للمزيد من المعلومات:**\n'
      : '\n\n📞 **For More Information:**\n';
    response += `📱 ${knowledgeBase.contact.phone}\n`;
    response += `📧 ${knowledgeBase.contact.email}\n`;
    
  } else {
    // No results found in KB
    response = isArabic
      ? `عذراً، لم أجد معلومات محددة عن "${query}" في قاعدة البيانات.\n\n` +
        `💡 يمكنك التواصل معنا مباشرة للحصول على معلومات مفصلة:\n` +
        `📱 ${knowledgeBase.contact.phone}\n` +
        `📧 ${knowledgeBase.contact.email}\n\n` +
        `أو يمكنك السؤال عن:\n` +
        `• أسعار الخدمات 💰\n` +
        `• تصميم اللوغو 🎨\n` +
        `• برمجة المواقع 💻\n` +
        `• الفيديوهات 2D/3D 🎬`
      : `Sorry, I couldn't find specific information about "${query}".\n\n` +
        `💡 Contact us directly:\n` +
        `📱 ${knowledgeBase.contact.phone}\n` +
        `📧 ${knowledgeBase.contact.email}`;
    
    confidence = 50;
  }

  return {
    message: response.trim(),
    confidence
  };
}

export async function POST(request: NextRequest) {
  try {
    const { message, language = 'ar' } = await request.json();
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }
    
    // Step 1: Search in local knowledge base
    const kbResults = searchKnowledgeBase(message);
    
    // Step 2: Free web search (DuckDuckGo - no API key needed)
    const webResults = await webSearch(message);
    
    // Step 3: Generate smart AI response (no external AI API needed)
    const aiResponse = generateSmartResponse(message, kbResults, webResults, language);
    
    // Step 4: Prepare sources
    const sources = [];
    
    if (kbResults.length > 0) {
      sources.push({
        title: language === 'ar' ? 'قاعدة معلومات Q8 NeX DeV' : 'Q8 NeX DeV Knowledge Base',
        url: 'https://q8nexdev.com',
        confidence: 100
      });
    }
    
    // Add web sources
    webResults.forEach(result => {
      sources.push({
        title: result.title,
        url: result.url,
        confidence: result.confidence
      });
    });
    
    return NextResponse.json({
      message: aiResponse.message,
      confidence: aiResponse.confidence,
      sources,
      timestamp: new Date().toISOString(),
      powered_by: 'Q8 NeX DeV Smart AI (100% Free)'
    });
    
  } catch (error) {
    console.error('AI Chat Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
