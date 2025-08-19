"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaTrackingController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const meta_ads_api_service_1 = require("../services/meta-ads-api.service");
let MetaTrackingController = class MetaTrackingController {
    constructor(metaAdsService) {
        this.metaAdsService = metaAdsService;
    }
    async getCampaigns() {
        const campaigns = await this.metaAdsService.getAllCampaigns();
        return {
            success: true,
            campaigns,
            total: campaigns.length,
            summary: this.calculateSummary(campaigns)
        };
    }
    async syncCampaigns() {
        console.log('🔄 Syncing campaigns from Meta Ads API...');
        const campaigns = await this.metaAdsService.getAllCampaigns();
        // حفظ في قاعدة البيانات
        // await this.saveCampaignsToDatabase(campaigns);
        // تصدير إلى BigQuery
        await this.metaAdsService.exportToBigQuery(campaigns);
        return {
            success: true,
            synced: campaigns.length,
            message: 'تم مزامنة الحملات بنجاح'
        };
    }
    async getPixelSetup(pixelId, website) {
        const pixelSetup = await this.metaAdsService.setupPixelTracking(pixelId, website);
        return {
            success: true,
            pixelId,
            website,
            setup: pixelSetup
        };
    }
    async setupConversionsApi(body) {
        const result = await this.metaAdsService.setupConversionsApi(body.pixelId, body.accessToken);
        return {
            success: true,
            message: 'تم إعداد Conversions API بنجاح',
            result
        };
    }
    async generateUTMLinks(body) {
        const utmLink = await this.metaAdsService.generateUTMLinks(body.baseUrl, body.campaign, body.source);
        return {
            success: true,
            original_url: body.baseUrl,
            utm_link: utmLink,
            parameters: {
                utm_source: body.source || 'facebook',
                utm_medium: 'social',
                utm_campaign: body.campaign
            }
        };
    }
    async getLeadAds(formId) {
        const leads = await this.metaAdsService.getLeadAds(formId);
        return {
            success: true,
            form_id: formId,
            leads,
            total: leads.length
        };
    }
    async getCampaignInsights(campaignId) {
        const insights = await this.metaAdsService.getCampaignInsights(campaignId);
        return {
            success: true,
            campaign_id: campaignId,
            insights,
            kpis: this.calculateKPIs(insights)
        };
    }
    async handleLeadgenWebhook(body) {
        console.log('📨 Received Meta Leadgen webhook:', body);
        if (body.object === 'page') {
            for (const entry of body.entry) {
                for (const change of entry.changes) {
                    if (change.field === 'leadgen') {
                        const leadgenId = change.value.leadgen_id;
                        const formId = change.value.form_id;
                        // جلب بيانات Lead
                        const leads = await this.metaAdsService.getLeadAds(formId);
                        const newLead = leads.find(lead => lead.id === leadgenId);
                        if (newLead) {
                            // معالجة Lead الجديد
                            await this.processNewLead(newLead);
                        }
                    }
                }
            }
        }
        return { status: 'ok' };
    }
    calculateSummary(campaigns) {
        return {
            total_campaigns: campaigns.length,
            total_spend: campaigns.reduce((sum, c) => sum + (c.spend || 0), 0),
            total_leads: campaigns.reduce((sum, c) => sum + (c.leads || 0), 0),
            total_impressions: campaigns.reduce((sum, c) => sum + (c.impressions || 0), 0),
            total_clicks: campaigns.reduce((sum, c) => sum + (c.clicks || 0), 0),
            avg_cpl: this.calculateAvgCPL(campaigns),
            avg_ctr: this.calculateAvgCTR(campaigns)
        };
    }
    calculateKPIs(insights) {
        if (!insights)
            return {};
        return {
            cpl: insights.cost_per_lead || 0,
            ctr: insights.ctr || 0,
            conversion_rate: insights.conversion_rate || 0,
            roas: this.calculateROAS(insights),
            quality_score: this.calculateQualityScore(insights)
        };
    }
    calculateAvgCPL(campaigns) {
        const totalSpend = campaigns.reduce((sum, c) => sum + (c.spend || 0), 0);
        const totalLeads = campaigns.reduce((sum, c) => sum + (c.leads || 0), 0);
        return totalLeads > 0 ? totalSpend / totalLeads : 0;
    }
    calculateAvgCTR(campaigns) {
        const avgCTR = campaigns.reduce((sum, c) => sum + (c.ctr || 0), 0) / campaigns.length;
        return avgCTR || 0;
    }
    calculateROAS(insights) {
        // ROAS = Revenue / Ad Spend
        // افتراض متوسط قيمة العميل المحتمل = $200
        const avgLeadValue = 200;
        const revenue = (insights.leads || 0) * avgLeadValue;
        const spend = insights.spend || 0;
        return spend > 0 ? revenue / spend : 0;
    }
    calculateQualityScore(insights) {
        // حساب نقاط الجودة بناءً على الأداء
        let score = 5; // نقطة البداية
        if (insights.ctr > 2)
            score += 1;
        if (insights.conversion_rate > 5)
            score += 1;
        if (insights.cost_per_lead < 50)
            score += 1;
        if (insights.conversion_rate > 10)
            score += 1;
        if (insights.ctr > 3)
            score += 1;
        return Math.min(score, 10);
    }
    async processNewLead(lead) {
        console.log('📝 Processing new lead:', lead);
        // إرسال إلى Odoo CRM
        // await this.sendToOdoo(lead);
        // إرسال إلى BigQuery
        // await this.sendToBigQuery(lead);
        // إرسال إشعار
        // await this.sendNotification(lead);
    }
};
exports.MetaTrackingController = MetaTrackingController;
tslib_1.__decorate([
    (0, common_1.Get)('campaigns'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], MetaTrackingController.prototype, "getCampaigns", null);
tslib_1.__decorate([
    (0, common_1.Post)('sync-campaigns'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], MetaTrackingController.prototype, "syncCampaigns", null);
tslib_1.__decorate([
    (0, common_1.Get)('pixel/setup'),
    tslib_1.__param(0, (0, common_1.Query)('pixelId')),
    tslib_1.__param(1, (0, common_1.Query)('website')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], MetaTrackingController.prototype, "getPixelSetup", null);
tslib_1.__decorate([
    (0, common_1.Post)('conversions-api/setup'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MetaTrackingController.prototype, "setupConversionsApi", null);
tslib_1.__decorate([
    (0, common_1.Post)('utm/generate'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MetaTrackingController.prototype, "generateUTMLinks", null);
tslib_1.__decorate([
    (0, common_1.Get)('leads/:formId'),
    tslib_1.__param(0, (0, common_1.Query)('formId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], MetaTrackingController.prototype, "getLeadAds", null);
tslib_1.__decorate([
    (0, common_1.Get)('insights/:campaignId'),
    tslib_1.__param(0, (0, common_1.Query)('campaignId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], MetaTrackingController.prototype, "getCampaignInsights", null);
tslib_1.__decorate([
    (0, common_1.Post)('webhook/leadgen'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MetaTrackingController.prototype, "handleLeadgenWebhook", null);
exports.MetaTrackingController = MetaTrackingController = tslib_1.__decorate([
    (0, common_1.Controller)('meta'),
    tslib_1.__metadata("design:paramtypes", [meta_ads_api_service_1.MetaAdsApiService])
], MetaTrackingController);
//# sourceMappingURL=meta-tracking.controller.js.map