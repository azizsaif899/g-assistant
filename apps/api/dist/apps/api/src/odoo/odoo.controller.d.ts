export interface OdooWebhookPayload {
    model: string;
    record_id: number;
    action: 'create' | 'write' | 'unlink';
    data: any;
    timestamp: string;
}
export declare class OdooController {
    private websocketGateway;
    private bigQueryPipeline;
    constructor();
    handleWebhook(payload: OdooWebhookPayload, signature: string): Promise<{
        success: boolean;
        message: string;
    }>;
    convertLead(leadId: number): Promise<{
        success: boolean;
        leadId: number;
        converted: boolean;
    }>;
    syncLeads(): Promise<{
        success: boolean;
        count: number;
        leads: {
            id: number;
            name: string;
            partner_name: string;
        }[];
    }>;
    private processWebhook;
    private handleLeadWebhook;
    private handleSaleOrderWebhook;
    private broadcastUpdate;
    private verifySignature;
    getWebSocketStats(): {
        connectedClients: number;
        roomStats: Record<string, number>;
    };
}
