export declare class CRMController {
    getLeads(): Promise<{
        leads: {
            id: number;
            name: string;
            partner_name: string;
            email: string;
            source: string;
            stage: string;
            expected_revenue: number;
        }[];
        total: number;
    }>;
    syncWithMeta(): Promise<{
        success: boolean;
        synced: number;
    }>;
    syncWithBigQuery(): Promise<{
        success: boolean;
        message: string;
    }>;
    private createOdooLead;
}
