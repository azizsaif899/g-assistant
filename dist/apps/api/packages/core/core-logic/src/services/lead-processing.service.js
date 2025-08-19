"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadProcessingService = void 0;
class LeadProcessingService {
    constructor(odooClient) {
        this.odooClient = odooClient;
    }
    async processWebhookEvent(payload) {
        console.log(`Processing ${payload.event_type} from ${payload.source}`);
        switch (payload.event_type) {
            case 'lead_created':
                await this.handleNewLead(payload);
                break;
            case 'lead_updated':
                await this.handleLeadUpdate(payload);
                break;
            default:
                console.log(`Unknown event type: ${payload.event_type}`);
        }
    }
    async handleNewLead(payload) {
        if (payload.source === 'Meta') {
            await this.processMetaLead(payload.data);
        }
        else if (payload.source === 'WhatsApp') {
            await this.processWhatsAppLead(payload.data);
        }
    }
    async handleLeadUpdate(payload) {
        if (payload.source === 'Odoo') {
            await this.syncOdooUpdate(payload.data);
        }
    }
    async processMetaLead(metaData) {
        try {
            // جلب تفاصيل العميل المحتمل من Meta API
            const leadDetails = await this.fetchMetaLeadDetails(metaData.leadgen_id);
            // تحويل البيانات إلى تنسيق موحد
            const leadData = this.convertMetaToLeadData(leadDetails, metaData);
            // معالجة العميل المحتمل
            await this.processNewLead(leadData);
        }
        catch (error) {
            console.error('Error processing Meta lead:', error);
            throw error;
        }
    }
    async processWhatsAppLead(whatsappData) {
        const leadData = {
            source: 'WhatsApp',
            firstName: whatsappData.contact_name?.split(' ')[0],
            lastName: whatsappData.contact_name?.split(' ').slice(1).join(' '),
            phone: whatsappData.phone,
            raw_data: whatsappData
        };
        await this.processNewLead(leadData);
    }
    async processNewLead(leadData) {
        try {
            // 1. تنقية وتوحيد البيانات
            const cleanData = this.sanitizeAndNormalize(leadData);
            // 2. التحقق من التكرار
            const existingContact = await this.findExistingContact(cleanData);
            if (existingContact) {
                // إضافة ملاحظة للعميل الحالي
                await this.addNoteToExistingContact(existingContact.id, cleanData);
                console.log(`Added note to existing contact: ${existingContact.id}`);
            }
            else {
                // 3. إنشاء عميل محتمل جديد
                const newLeadId = await this.createNewLead(cleanData);
                console.log(`Created new lead: ${newLeadId}`);
            }
            // 4. تسجيل النشاط للتحليلات
            await this.logLeadActivity(cleanData);
        }
        catch (error) {
            console.error('Error processing new lead:', error);
            throw error;
        }
    }
    sanitizeAndNormalize(leadData) {
        return {
            ...leadData,
            email: leadData.email?.toLowerCase().trim(),
            phone: leadData.phone?.replace(/[^\d+]/g, ''),
            firstName: leadData.firstName?.trim(),
            lastName: leadData.lastName?.trim(),
            company: leadData.company?.trim()
        };
    }
    async findExistingContact(leadData) {
        if (leadData.email) {
            return await this.odooClient.findPartnerByEmail(leadData.email);
        }
        if (leadData.phone) {
            return await this.odooClient.findPartnerByPhone(leadData.phone);
        }
        return null;
    }
    async createNewLead(leadData) {
        const leadPayload = {
            name: `Lead from ${leadData.source} - ${leadData.firstName || 'Unknown'}`,
            contact_name: `${leadData.firstName || ''} ${leadData.lastName || ''}`.trim(),
            email_from: leadData.email,
            phone: leadData.phone,
            partner_name: leadData.company,
            source_id: await this.getSourceId(leadData.source),
            description: this.buildLeadDescription(leadData),
            tag_ids: await this.getLeadTags(leadData)
        };
        return await this.odooClient.createLead(leadPayload);
    }
    async addNoteToExistingContact(contactId, leadData) {
        const note = `New contact attempt from ${leadData.source} on ${new Date().toISOString()}`;
        await this.odooClient.addContactNote(contactId, note);
    }
    buildLeadDescription(leadData) {
        let description = `Lead captured from ${leadData.source}`;
        if (leadData.leadgen_id) {
            description += `\nMeta Lead ID: ${leadData.leadgen_id}`;
        }
        if (leadData.ad_id) {
            description += `\nAd ID: ${leadData.ad_id}`;
        }
        if (leadData.campaign_id) {
            description += `\nCampaign ID: ${leadData.campaign_id}`;
        }
        return description;
    }
    async getSourceId(source) {
        const sourceMap = {
            'Meta': 1,
            'WhatsApp': 2,
            'Manual': 3
        };
        return sourceMap[source] || 1;
    }
    async getLeadTags(leadData) {
        const tags = [];
        if (leadData.source === 'Meta')
            tags.push(1); // Meta tag
        if (leadData.source === 'WhatsApp')
            tags.push(2); // WhatsApp tag
        return tags;
    }
    async fetchMetaLeadDetails(leadgenId) {
        // استدعاء Meta Graph API لجلب تفاصيل العميل المحتمل
        const response = await fetch(`https://graph.facebook.com/v18.0/${leadgenId}?access_token=${process.env.META_ACCESS_TOKEN}`);
        return await response.json();
    }
    convertMetaToLeadData(leadDetails, metaData) {
        const fieldData = leadDetails.field_data || [];
        const leadData = {
            source: 'Meta',
            leadgen_id: metaData.leadgen_id,
            ad_id: metaData.ad_id,
            campaign_id: metaData.campaign_id,
            raw_data: { leadDetails, metaData }
        };
        // استخراج البيانات من field_data
        fieldData.forEach((field) => {
            switch (field.name.toLowerCase()) {
                case 'first_name':
                    leadData.firstName = field.values[0];
                    break;
                case 'last_name':
                    leadData.lastName = field.values[0];
                    break;
                case 'email':
                    leadData.email = field.values[0];
                    break;
                case 'phone_number':
                    leadData.phone = field.values[0];
                    break;
                case 'company_name':
                    leadData.company = field.values[0];
                    break;
            }
        });
        return leadData;
    }
    async syncOdooUpdate(odooData) {
        // مزامنة التحديثات من Odoo مع الأنظمة الأخرى
        console.log('Syncing Odoo update:', odooData);
        // يمكن إضافة منطق لإرسال التحديثات إلى BigQuery أو أنظمة أخرى
    }
    async logLeadActivity(leadData) {
        // تسجيل النشاط للتحليلات في BigQuery
        const activityLog = {
            timestamp: new Date().toISOString(),
            source: leadData.source,
            event_type: 'lead_processed',
            lead_data: leadData
        };
        // إرسال إلى BigQuery أو نظام التحليلات
        console.log('Lead activity logged:', activityLog);
    }
}
exports.LeadProcessingService = LeadProcessingService;
//# sourceMappingURL=lead-processing.service.js.map