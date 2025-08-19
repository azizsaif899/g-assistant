export declare class SecurityService {
    private securityManager;
    private threatDetector;
    private complianceChecker;
    constructor();
    private initializeSecurity;
    analyzeRequest(request: {
        ip: string;
        url: string;
        method: string;
        headers: Record<string, string>;
        body?: string;
        userAgent?: string;
    }): {
        allowed: any;
        threats: any;
        recommendation: string;
    };
    getThreats(severity?: 'low' | 'medium' | 'high' | 'critical', limit?: number): any;
    getBlockedIPs(): {
        blockedIPs: any;
        count: any;
    };
    unblockIP(ip: string): {
        success: any;
        message: string;
    };
    getComplianceStatus(standardId?: string): any;
    updateComplianceControl(standardId: string, controlId: string, implemented: boolean, evidence?: string): {
        success: any;
        message: string;
    };
    generateComplianceReport(standardId: string): any;
    getSecurityEvents(severity?: 'low' | 'medium' | 'high' | 'critical'): any;
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
    encryptData(data: string, key?: string): any;
    decryptData(encryptedData: string, key: string, iv: string, tag: string): any;
    generateToken(payload: Record<string, any>): any;
    verifyToken(token: string): any;
    sanitizeInput(input: string): any;
    generateSecureRandom(length: number): any;
}
