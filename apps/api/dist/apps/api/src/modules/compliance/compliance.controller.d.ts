import { ComplianceService } from './compliance.service';
export declare class ComplianceController {
    private readonly complianceService;
    constructor(complianceService: ComplianceService);
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
    getStatus(): Promise<{
        service: string;
        version: string;
        status: string;
        timestamp: string;
    }>;
}
