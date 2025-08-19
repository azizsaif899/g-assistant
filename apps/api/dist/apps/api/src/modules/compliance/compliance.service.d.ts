export declare class ComplianceService {
    runAudit(): Promise<{
        success: boolean;
        report: any;
        markdownFile: any;
        timestamp: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        timestamp: string;
        report?: undefined;
        markdownFile?: undefined;
    }>;
    healthCheck(): Promise<any>;
}
