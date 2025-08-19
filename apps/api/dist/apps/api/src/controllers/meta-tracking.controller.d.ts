import { MetaAdsApiService } from '../services/meta-ads-api.service';
export declare class MetaTrackingController {
    private metaAdsService;
    constructor(metaAdsService: MetaAdsApiService);
    getCampaigns(): Promise<{
        success: boolean;
        campaigns: any[];
        total: number;
        summary: {
            total_campaigns: number;
            total_spend: any;
            total_leads: any;
            total_impressions: any;
            total_clicks: any;
            avg_cpl: number;
            avg_ctr: number;
        };
    }>;
    syncCampaigns(): Promise<{
        success: boolean;
        synced: number;
        message: string;
    }>;
    getPixelSetup(pixelId: string, website: string): Promise<{
        success: boolean;
        pixelId: string;
        website: string;
        setup: {
            pixelCode: string;
            instructions: string[];
        };
    }>;
    setupConversionsApi(body: {
        pixelId: string;
        accessToken: string;
    }): Promise<{
        success: boolean;
        message: string;
        result: any;
    }>;
    generateUTMLinks(body: {
        baseUrl: string;
        campaign: string;
        source?: string;
    }): Promise<{
        success: boolean;
        original_url: string;
        utm_link: string;
        parameters: {
            utm_source: string;
            utm_medium: string;
            utm_campaign: string;
        };
    }>;
    getLeadAds(formId: string): Promise<{
        success: boolean;
        form_id: string;
        leads: any;
        total: any;
    }>;
    getCampaignInsights(campaignId: string): Promise<{
        success: boolean;
        campaign_id: string;
        insights: {
            impressions?: undefined;
            clicks?: undefined;
            ctr?: undefined;
            spend?: undefined;
            leads?: undefined;
            cost_per_lead?: undefined;
            conversion_rate?: undefined;
        } | {
            impressions: number;
            clicks: number;
            ctr: number;
            spend: number;
            leads: number;
            cost_per_lead: number;
            conversion_rate: number;
        };
        kpis: {
            cpl?: undefined;
            ctr?: undefined;
            conversion_rate?: undefined;
            roas?: undefined;
            quality_score?: undefined;
        } | {
            cpl: any;
            ctr: any;
            conversion_rate: any;
            roas: number;
            quality_score: number;
        };
    }>;
    handleLeadgenWebhook(body: any): Promise<{
        status: string;
    }>;
    private calculateSummary;
    private calculateKPIs;
    private calculateAvgCPL;
    private calculateAvgCTR;
    private calculateROAS;
    private calculateQualityScore;
    private processNewLead;
}
