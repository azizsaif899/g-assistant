export declare class MetaAdsApiService {
    private accessToken;
    private apiVersion;
    private baseUrl;
    getCampaignInsights(campaignId: string): Promise<{
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
    }>;
    getAllCampaigns(): Promise<any[]>;
    getLeadAds(formId: string): Promise<any>;
    setupPixelTracking(pixelId: string, websiteUrl: string): Promise<{
        pixelCode: string;
        instructions: string[];
    }>;
    setupConversionsApi(pixelId: string, accessToken: string): Promise<any>;
    private processInsightsData;
    private processLeadData;
    private calculateConversionRate;
    generateUTMLinks(baseUrl: string, campaign: string, source?: string): Promise<string>;
    exportToBigQuery(campaignData: any[]): Promise<{
        success: boolean;
        rows: number;
    }>;
}
