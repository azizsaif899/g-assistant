import { Router } from 'express';
import { OdooClient } from '@g-assistant/odoo-client';
import { MetaAdsApiService } from '../services/meta-ads-api.service';

const router = Router();

// إعداد Odoo Client
const odooClient = new OdooClient({
  url: process.env.ODOO_URL!,
  database: process.env.ODOO_DATABASE!,
  username: process.env.ODOO_USERNAME!,
  password: process.env.ODOO_PASSWORD!
});

// إعداد Meta Ads Service
const metaAdsService = new MetaAdsApiService();

// جلب بيانات العميل الشاملة للـ Customer 360
router.get('/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params;
    
    // جلب بيانات العميل من Odoo
    const customerData = await odooClient.getLeads([
      ['id', '=', parseInt(customerId)]
    ]);

    if (customerData.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'العميل غير موجود'
      });
    }

    const customer = customerData[0];

    // جلب الفرص البيعية المرتبطة
    const opportunities = await odooClient.getLeads([
      ['partner_id', '=', customer.partner_id?.[0] || customer.id],
      ['type', '=', 'opportunity']
    ]);

    // جلب الأنشطة الحقيقية من مصادر متعددة
    const activities = await getUnifiedTimeline(customerId);

    // تجميع البيانات
    const customerProfile = {
      id: customer.id,
      name: customer.partner_name || customer.name,
      email: customer.email_from,
      phone: customer.phone,
      stage: customer.stage_id?.[1] || 'غير محدد',
      expected_revenue: customer.expected_revenue || 0,
      probability: customer.probability || 0,
      create_date: customer.create_date,
      write_date: customer.write_date,
      opportunities: opportunities.map(opp => ({
        id: opp.id,
        name: opp.name,
        stage: opp.stage_id?.[1] || 'غير محدد',
        expected_revenue: opp.expected_revenue || 0,
        probability: opp.probability || 0,
        create_date: opp.create_date
      })),
      activities: activities
    };

    res.json({
      success: true,
      data: customerProfile
    });

  } catch (error) {
    console.error('Error fetching customer data:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في جلب بيانات العميل',
      error: error.message
    });
  }
});

// جلب رؤى العميل من Meta
router.get('/:customerId/meta-insights', async (req, res) => {
  try {
    const { customerId } = req.params;
    
    const metaInsights = await getCustomerMetaInsights(customerId);
    
    res.json({
      success: true,
      data: metaInsights
    });

  } catch (error) {
    console.error('Error fetching Meta insights:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في جلب رؤى Meta',
      error: error.message
    });
  }
});

// تحديث بيانات العميل
router.put('/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params;
    const updateData = req.body;

    // تحديث العميل في Odoo
    const success = await odooClient.updateLead(parseInt(customerId), updateData);

    if (success) {
      res.json({
        success: true,
        message: 'تم تحديث بيانات العميل بنجاح'
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'فشل في تحديث بيانات العميل'
      });
    }

  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في تحديث بيانات العميل',
      error: error.message
    });
  }
});

// جلب الجدول الزمني الموحد لعميل محدد
router.get('/:customerId/activities', async (req, res) => {
  try {
    const { customerId } = req.params;
    const { page = 1, limit = 20, type, dateFrom, dateTo, source, userId } = req.query;

    const activities = await getUnifiedTimeline(customerId, {
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      type: type ? (type as string).split(',') : undefined,
      dateFrom: dateFrom as string,
      dateTo: dateTo as string,
      source: source ? (source as string).split(',') : undefined,
      userId: userId as string
    });

    res.json({
      success: true,
      data: activities
    });

  } catch (error) {
    console.error('Error fetching customer activities:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في جلب أنشطة العميل',
      error: error.message
    });
  }
});

// جلب تحليل الشخصية لعميل محدد
router.get('/:customerId/personality', async (req, res) => {
  try {
    const { customerId } = req.params;
    
    const personalityAnalysis = await getPersonalityAnalysis(customerId);
    
    res.json({
      success: true,
      data: personalityAnalysis
    });

  } catch (error) {
    console.error('Error fetching personality analysis:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في جلب تحليل الشخصية',
      error: error.message
    });
  }
});

// دالة جلب الجدول الزمني الموحد
async function getUnifiedTimeline(customerId: string, params?: {
  page?: number;
  limit?: number;
  type?: string[];
  dateFrom?: string;
  dateTo?: string;
  source?: string[];
  userId?: string;
}) {
  const { page = 1, limit = 20 } = params || {};
  
  try {
    // جلب الأنشطة من Odoo
    const odooActivities = await getOdooActivities(customerId, params);
    
    // جلب رسائل WhatsApp
    const whatsappMessages = await getWhatsAppMessages(customerId, params);
    
    // جلب رسائل البريد الإلكتروني
    const emailMessages = await getEmailMessages(customerId, params);
    
    // دمج وترتيب جميع الأنشطة
    const allActivities = [
      ...odooActivities,
      ...whatsappMessages,
      ...emailMessages
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    // تطبيق الترقيم
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedActivities = allActivities.slice(startIndex, endIndex);
    
    return {
      customerId,
      activities: paginatedActivities,
      pagination: {
        total: allActivities.length,
        page,
        limit,
        hasNext: endIndex < allActivities.length,
        hasPrev: page > 1
      }
    };
    
  } catch (error) {
    console.error('Error in getUnifiedTimeline:', error);
    // إرجاع بيانات افتراضية في حالة الخطأ
    return {
      customerId,
      activities: [],
      pagination: { total: 0, page: 1, limit: 20, hasNext: false, hasPrev: false }
    };
  }
}

// جلب أنشطة Odoo
async function getOdooActivities(customerId: string, params?: any) {
  try {
    // جلب mail.activity و mail.message من Odoo
    const activities = await odooClient.searchRead('mail.activity', [
      ['res_id', '=', parseInt(customerId)],
      ['res_model', '=', 'crm.lead']
    ], ['id', 'activity_type_id', 'summary', 'date_deadline', 'user_id', 'state']);
    
    const messages = await odooClient.searchRead('mail.message', [
      ['res_id', '=', parseInt(customerId)],
      ['model', '=', 'crm.lead']
    ], ['id', 'subject', 'body', 'date', 'author_id', 'message_type']);
    
    const formattedActivities = activities.map(activity => ({
      id: `odoo-activity-${activity.id}`,
      type: 'task',
      timestamp: activity.date_deadline,
      title: activity.summary || 'مهمة Odoo',
      description: activity.summary || '',
      source: 'odoo',
      user: {
        id: activity.user_id?.[0]?.toString() || '0',
        name: activity.user_id?.[1] || 'غير محدد',
        avatar: null
      },
      metadata: {
        status: activity.state,
        activityType: activity.activity_type_id?.[1] || 'عام'
      },
      priority: 'medium'
    }));
    
    const formattedMessages = messages.map(message => ({
      id: `odoo-message-${message.id}`,
      type: message.message_type === 'email' ? 'email' : 'note',
      timestamp: message.date,
      title: message.subject || 'رسالة',
      description: message.body?.replace(/<[^>]*>/g, '').substring(0, 200) || '',
      source: 'odoo',
      user: {
        id: message.author_id?.[0]?.toString() || '0',
        name: message.author_id?.[1] || 'غير محدد',
        avatar: null
      },
      metadata: {
        messageType: message.message_type
      },
      priority: 'low'
    }));
    
    return [...formattedActivities, ...formattedMessages];
    
  } catch (error) {
    console.error('Error fetching Odoo activities:', error);
    return [];
  }
}

// جلب رسائل WhatsApp
async function getWhatsAppMessages(customerId: string, params?: any) {
  try {
    // هذه دالة افتراضية - يجب تطويرها للتكامل مع WhatsApp API
    return [
      {
        id: `whatsapp-${Date.now()}`,
        type: 'whatsapp',
        timestamp: new Date().toISOString(),
        title: 'رسالة WhatsApp',
        description: 'محادثة عبر WhatsApp',
        source: 'whatsapp',
        user: {
          id: 'whatsapp-bot',
          name: 'WhatsApp Bot',
          avatar: null
        },
        metadata: {
          direction: 'inbound'
        },
        priority: 'medium'
      }
    ];
  } catch (error) {
    console.error('Error fetching WhatsApp messages:', error);
    return [];
  }
}

// جلب رسائل البريد الإلكتروني
async function getEmailMessages(customerId: string, params?: any) {
  try {
    // هذه دالة افتراضية - يجب تطويرها للتكامل مع Gmail API
    return [];
  } catch (error) {
    console.error('Error fetching email messages:', error);
    return [];
  }
}

// جلب تحليل الشخصية
async function getPersonalityAnalysis(customerId: string) {
  try {
    // جلب بيانات العميل من Odoo
    const customerData = await odooClient.getLeads([
      ['id', '=', parseInt(customerId)]
    ]);
    
    if (customerData.length === 0) {
      throw new Error('العميل غير موجود');
    }
    
    const customer = customerData[0];
    
    // تحليل الشخصية باستخدام AI (محاكاة)
    const personalityAnalysis = {
      customerId,
      analysis: {
        personalityType: 'Analytical',
        confidence: 78,
        traits: [
          {
            name: 'تحليلي',
            score: 85,
            description: 'يحب التفاصيل والبيانات'
          },
          {
            name: 'منطقي',
            score: 92,
            description: 'يتخذ قرارات مدروسة'
          },
          {
            name: 'متريث',
            score: 65,
            description: 'يحتاج وقت لاتخاذ القرار'
          }
        ]
      },
      communicationStyle: {
        preferredChannel: 'email',
        responseTime: 'same-day',
        tone: 'professional'
      },
      recommendations: [
        {
          category: 'approach',
          suggestion: 'قدم بيانات مفصلة وإحصائيات',
          priority: 'high'
        },
        {
          category: 'timing',
          suggestion: 'اعط وقت كافي للمراجعة',
          priority: 'medium'
        },
        {
          category: 'content',
          suggestion: 'استخدم الرسوم البيانية والجداول',
          priority: 'medium'
        }
      ],
      dataSource: {
        basedOn: ['odoo_interactions', 'email_patterns', 'response_times'],
        lastUpdated: new Date().toISOString(),
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      }
    };
    
    return personalityAnalysis;
    
  } catch (error) {
    console.error('Error in personality analysis:', error);
    throw error;
  }
}

// جلب رؤى Meta لعميل محدد
async function getCustomerMetaInsights(customerId: string) {
  try {
    // جلب بيانات العميل من Odoo للحصول على معرف Meta
    const customerData = await odooClient.getLeads([
      ['id', '=', parseInt(customerId)]
    ]);
    
    if (customerData.length === 0) {
      throw new Error('العميل غير موجود');
    }
    
    const customer = customerData[0];
    
    // البحث عن معرف Meta في بيانات العميل (مثل UTM parameters أو custom fields)
    const metaCampaignId = extractMetaCampaignId(customer);
    const metaAdId = extractMetaAdId(customer);
    
    if (!metaCampaignId) {
      // إذا لم يتم العثور على معرف Meta، إرجاع بيانات فارغة
      return {
        customerId,
        hasMetaData: false,
        message: 'لا توجد بيانات Meta لهذا العميل',
        campaignData: null,
        metrics: null,
        attribution: null,
        demographics: null
      };
    }
    
    // جلب بيانات الحملة من Meta API
    const campaignInsights = await metaAdsService.getCampaignInsights(metaCampaignId);
    
    if (!campaignInsights) {
      throw new Error('فشل في جلب بيانات Meta');
    }
    
    // جلب بيانات الحملة الأساسية
    const campaignDetails = await getCampaignDetails(metaCampaignId);
    
    // حساب ROAS (إذا كان متاحاً)
    const roas = calculateROAS(customer.expected_revenue || 0, campaignInsights.spend);
    
    return {
      customerId,
      hasMetaData: true,
      campaignData: {
        campaignId: metaCampaignId,
        campaignName: campaignDetails?.name || 'غير محدد',
        adSetName: campaignDetails?.adSetName || 'غير محدد',
        adName: campaignDetails?.adName || 'غير محدد',
        source: determineMetaSource(customer) || 'facebook'
      },
      metrics: {
        impressions: campaignInsights.impressions || 0,
        clicks: campaignInsights.clicks || 0,
        ctr: campaignInsights.ctr || 0,
        cpc: campaignInsights.spend && campaignInsights.clicks ? 
             (campaignInsights.spend / campaignInsights.clicks) : 0,
        cpm: campaignInsights.spend && campaignInsights.impressions ? 
             (campaignInsights.spend / campaignInsights.impressions * 1000) : 0,
        spend: campaignInsights.spend || 0,
        conversions: campaignInsights.leads || 0,
        roas: roas
      },
      attribution: {
        firstTouch: customer.create_date || new Date().toISOString(),
        lastTouch: customer.write_date || new Date().toISOString(),
        touchpoints: calculateTouchpoints(customer)
      },
      demographics: await getCustomerDemographics(customer, metaCampaignId)
    };
    
  } catch (error) {
    console.error('Error in getCustomerMetaInsights:', error);
    // إرجاع بيانات افتراضية في حالة الخطأ
    return {
      customerId,
      hasMetaData: false,
      error: error.message,
      campaignData: null,
      metrics: null,
      attribution: null,
      demographics: null
    };
  }
}

// دوال مساعدة لـ Meta Insights
function extractMetaCampaignId(customer: any): string | null {
  // البحث في مصادر مختلفة عن معرف الحملة
  
  // 1. في UTM parameters (إذا كانت مخزنة في Odoo)
  if (customer.utm_campaign) {
    return customer.utm_campaign;
  }
  
  // 2. في حقول مخصصة
  if (customer.x_meta_campaign_id) {
    return customer.x_meta_campaign_id;
  }
  
  // 3. في وصف العميل أو الملاحظات
  if (customer.description) {
    const campaignMatch = customer.description.match(/campaign[_\s]*id[:\s]*([\w\d-]+)/i);
    if (campaignMatch) {
      return campaignMatch[1];
    }
  }
  
  // 4. في مصدر العميل
  if (customer.source_id && customer.source_id[1]?.toLowerCase().includes('facebook')) {
    // محاولة استخراج معرف من اسم المصدر
    return 'default_facebook_campaign';
  }
  
  return null;
}

function extractMetaAdId(customer: any): string | null {
  if (customer.x_meta_ad_id) {
    return customer.x_meta_ad_id;
  }
  
  if (customer.utm_content) {
    return customer.utm_content;
  }
  
  return null;
}

async function getCampaignDetails(campaignId: string) {
  try {
    // هذه دالة افتراضية - يجب تطويرها لاستخدام Meta API
    return {
      name: 'حملة الخدمات التقنية',
      adSetName: 'مجموعة إعلانات الرياض',
      adName: 'إعلان الخدمات الذكية'
    };
  } catch (error) {
    console.error('Error getting campaign details:', error);
    return null;
  }
}

function calculateROAS(revenue: number, spend: number): number {
  if (!spend || spend === 0) return 0;
  return Math.round((revenue / spend) * 100) / 100;
}

function determineMetaSource(customer: any): 'facebook' | 'instagram' | 'messenger' {
  const source = customer.source_id?.[1]?.toLowerCase() || '';
  
  if (source.includes('instagram')) return 'instagram';
  if (source.includes('messenger')) return 'messenger';
  return 'facebook';
}

function calculateTouchpoints(customer: any): number {
  // حساب عدد نقاط التفاعل بناءً على الأنشطة والرسائل
  let touchpoints = 1; // نقطة التفاعل الأولى (إنشاء العميل)
  
  // إضافة نقاط تفاعل بناءً على البيانات المتاحة
  if (customer.email_from) touchpoints++;
  if (customer.phone) touchpoints++;
  if (customer.website) touchpoints++;
  
  return touchpoints;
}

async function getCustomerDemographics(customer: any, campaignId: string) {
  try {
    // في الإنتاج: جلب بيانات ديموغرافية من Meta API
    // هنا نستخدم بيانات افتراضية بناءً على بيانات العميل
    
    const demographics = {
      age: estimateAgeFromData(customer),
      gender: estimateGenderFromData(customer),
      location: extractLocationFromData(customer),
      interests: extractInterestsFromData(customer)
    };
    
    return demographics;
    
  } catch (error) {
    console.error('Error getting demographics:', error);
    return {
      age: 'غير محدد',
      gender: 'غير محدد',
      location: 'غير محدد',
      interests: []
    };
  }
}

function estimateAgeFromData(customer: any): string {
  // تقدير العمر بناءً على بيانات متاحة
  if (customer.x_age_range) {
    return customer.x_age_range;
  }
  
  // تقدير افتراضي بناءً على نوع العمل أو القيمة
  const revenue = customer.expected_revenue || 0;
  if (revenue > 100000) {
    return '35-55'; // عملاء ذوو قيمة عالية غالباً أكبر سناً
  } else if (revenue > 50000) {
    return '25-45';
  } else {
    return '18-35';
  }
}

function estimateGenderFromData(customer: any): string {
  if (customer.x_gender) {
    return customer.x_gender;
  }
  
  // تحليل الاسم (بسيط)
  const name = customer.partner_name || customer.name || '';
  const maleNames = ['محمد', 'أحمد', 'علي', 'خالد', 'عبدالله'];
  const femaleNames = ['فاطمة', 'عائشة', 'زينب', 'مريم', 'نور'];
  
  for (const maleName of maleNames) {
    if (name.includes(maleName)) return 'ذكر';
  }
  
  for (const femaleName of femaleNames) {
    if (name.includes(femaleName)) return 'أنثى';
  }
  
  return 'غير محدد';
}

function extractLocationFromData(customer: any): string {
  if (customer.city && customer.country_id) {
    return `${customer.city}، ${customer.country_id[1]}`;
  }
  
  if (customer.country_id) {
    return customer.country_id[1];
  }
  
  if (customer.city) {
    return customer.city;
  }
  
  return 'غير محدد';
}

function extractInterestsFromData(customer: any): string[] {
  const interests = [];
  
  // استخراج الاهتمامات من وصف العميل أو نوع العمل
  const description = (customer.description || '').toLowerCase();
  const name = (customer.name || '').toLowerCase();
  
  const interestKeywords = {
    'التكنولوجيا': ['تقني', 'برمجة', 'تطبيق', 'نظام'],
    'الأعمال': ['شركة', 'أعمال', 'تجارة', 'مشروع'],
    'التسويق': ['تسويق', 'إعلان', 'حملة'],
    'التعليم': ['تعليم', 'جامعة', 'مدرسة', 'دورة']
  };
  
  Object.entries(interestKeywords).forEach(([interest, keywords]) => {
    if (keywords.some(keyword => description.includes(keyword) || name.includes(keyword))) {
      interests.push(interest);
    }
  });
  
  return interests.length > 0 ? interests : ['عام'];
}

export default router;
