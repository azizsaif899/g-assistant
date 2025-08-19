import { SecurityService } from './security.service';
export declare class SecurityController {
    private readonly securityService;
    constructor(securityService: SecurityService);
    getThreats(severity?: string, limit?: string): any;
    getBlockedIPs(): {
        blockedIPs: any;
        count: any;
    };
    unblockIP(ip: string): {
        success: any;
        message: string;
    };
    getComplianceStatus(standard?: string): any;
    updateCompliance(data: {
        standardId: string;
        controlId: string;
        implemented: boolean;
        evidence?: string;
    }): {
        success: any;
        message: string;
    };
    generateComplianceReport(standard: string): any;
    analyzeRequest(request: any, ip: string, headers: Record<string, string>): {
        allowed: any;
        threats: any;
        recommendation: string;
    };
    getSecurityEvents(severity?: string): any;
    getSecurityStatistics(): {
        threats: any;
        compliance: any;
        summary: {
            totalThreats: any;
            blockedIPs: any;
            averageCompliance: any;
            criticalFindings: any;
        };
    };
}
