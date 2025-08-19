export declare class MetaIntegrationService {
    setupWebhook(): Promise<{
        webhook_url: string;
        verify_token: string;
        status: string;
    }>;
    processLeadAd(leadData: any): Promise<{
        name: string;
        partner_name: any;
        email: any;
        phone: any;
        source: string;
        campaign_id: any;
        ad_id: any;
    }>;
    private sendToOdoo;
    private sendToBigQuery;
    getCampaignStats(): Promise<{
        campaigns: {
            id: string;
            name: string;
            platform: string;
            leads_count: number;
            cost: number;
            conversion_rate: number;
            status: string;
        }[];
        total_leads: number;
        total_cost: number;
    }>;
}
