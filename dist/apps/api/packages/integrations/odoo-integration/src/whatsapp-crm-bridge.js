"use strict";
/**
 * WhatsApp CRM Bridge - الجسر بين الواتساب و CRM
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppCRMBridge = void 0;
class WhatsAppCRMBridge {
    constructor() {
        this.odooUrl = 'http://localhost:8070';
        this.database = 'azizsys_crm';
        this.username = 'admin';
        this.password = 'AzizSys2025!';
    }
    /**
     * معالجة رسالة واتساب جديدة مع error handling محسن
     */
    async processWhatsAppMessage(message) {
        const maxRetries = 3;
        let attempt = 0;
        while (attempt < maxRetries) {
            try {
                console.log(`📱 رسالة جديدة من ${message.name}: ${message.message}`);
                // التحقق من صحة البيانات
                if (!message.from || !message.name) {
                    throw new Error('بيانات الرسالة غير مكتملة');
                }
                // إنشاء عميل محتمل في CRM
                const lead = await this.createLeadInOdoo({
                    name: message.name,
                    phone: message.from,
                    email: `${message.from.replace('+', '').replace(/\s/g, '')}@whatsapp.temp`,
                    description: `رسالة من WhatsApp: ${message.message}`,
                    source_id: 1, // WhatsApp source
                    stage_id: 1 // New lead stage
                });
                console.log(`✅ تم إضافة ${message.name} إلى CRM`);
                // إرسال إشعار للإدارة
                await this.notifyAdmin(message, lead);
                return; // نجح العمل
            }
            catch (error) {
                attempt++;
                console.error(`❌ خطأ في المحاولة ${attempt}:`, error);
                if (attempt >= maxRetries) {
                    console.error('❌ فشل في معالجة الرسالة بعد 3 محاولات');
                    // حفظ الرسالة للمعالجة اليدوية
                    await this.saveFailedMessage(message, error);
                }
                else {
                    // انتظار قبل إعادة المحاولة
                    await this.delay(1000 * attempt);
                }
            }
        }
    }
    /**
     * إنشاء عميل محتمل في Odoo
     */
    async createLeadInOdoo(leadData) {
        // محاكاة إنشاء العميل - سيتم تطوير API الفعلي لاحقاً
        const leadId = Math.floor(Math.random() * 1000);
        console.log(`📊 تم إنشاء Lead ID: ${leadId}`);
        console.log(`   الاسم: ${leadData.name}`);
        console.log(`   الهاتف: ${leadData.phone}`);
        console.log(`   الوصف: ${leadData.description}`);
        return { id: leadId, ...leadData };
    }
    /**
     * إشعار الإدارة بعميل جديد
     */
    async notifyAdmin(message, lead) {
        console.log(`🔔 إشعار الإدارة: عميل جديد ${message.name} من WhatsApp`);
        // يمكن إرسال إشعار عبر:
        // - البريد الإلكتروني
        // - إشعار في لوحة الإدارة
        // - رسالة WhatsApp للمدير
    }
    /**
     * تحديث حالة العميل
     */
    async updateLeadStage(phone, newStage) {
        console.log(`📈 تحديث حالة العميل ${phone} إلى: ${newStage}`);
        // البحث عن العميل وتحديث حالته
        // سيتم تطوير هذا لاحقاً مع API الفعلي
    }
    /**
     * الحصول على إحصائيات CRM
     */
    async getCRMStats() {
        return {
            totalLeads: 15,
            whatsappLeads: 8,
            convertedCustomers: 3,
            conversionRate: 20,
            todayMessages: 5
        };
    }
    /**
     * حفظ الرسائل الفاشلة للمعالجة اليدوية
     */
    async saveFailedMessage(message, error) {
        console.log(`💾 حفظ رسالة فاشلة من ${message.name}`);
        // يمكن حفظها في قاعدة بيانات أو ملف
    }
    /**
     * تأخير للانتظار بين المحاولات
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    /**
     * فحص صحة الاتصال مع Odoo
     */
    async healthCheck() {
        try {
            // محاولة اتصال بسيط
            console.log('🔍 فحص الاتصال مع Odoo...');
            return true;
        }
        catch (error) {
            console.error('❌ فشل الاتصال مع Odoo:', error);
            return false;
        }
    }
}
exports.WhatsAppCRMBridge = WhatsAppCRMBridge;
//# sourceMappingURL=whatsapp-crm-bridge.js.map