"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const security_core_1 = require("@azizsys/domain/security-core");
let SecurityService = class SecurityService {
    constructor() {
        this.securityManager = new security_core_1.SecurityManager();
        this.threatDetector = new security_core_1.ThreatDetector();
        this.complianceChecker = new security_core_1.ComplianceChecker();
        this.initializeSecurity();
    }
    initializeSecurity() {
        // Initialize some compliance controls as implemented
        this.complianceChecker.updateControlStatus('owasp_top10', 'owasp_a02_1', true, 'AES-256 encryption implemented');
        this.complianceChecker.updateControlStatus('gdpr', 'gdpr_32_1', true, 'Personal data encryption in place');
    }
    analyzeRequest(request) {
        const analysis = this.threatDetector.analyzeRequest(request);
        return {
            allowed: analysis.allowed,
            threats: analysis.threats,
            recommendation: analysis.allowed ? 'Request allowed' : 'Request blocked due to security threats'
        };
    }
    getThreats(severity, limit = 100) {
        return this.threatDetector.getThreatEvents(severity, limit);
    }
    getBlockedIPs() {
        return {
            blockedIPs: this.threatDetector.getBlockedIPs(),
            count: this.threatDetector.getBlockedIPs().length
        };
    }
    unblockIP(ip) {
        const success = this.threatDetector.unblockIP(ip);
        return {
            success,
            message: success ? `IP ${ip} unblocked successfully` : `Failed to unblock IP ${ip}`
        };
    }
    getComplianceStatus(standardId) {
        if (standardId) {
            return this.complianceChecker.getComplianceStatus(standardId);
        }
        return this.complianceChecker.getComplianceSummary();
    }
    updateComplianceControl(standardId, controlId, implemented, evidence) {
        const success = this.complianceChecker.updateControlStatus(standardId, controlId, implemented, evidence);
        return {
            success,
            message: success ? 'Control status updated successfully' : 'Failed to update control status'
        };
    }
    generateComplianceReport(standardId) {
        return this.complianceChecker.generateComplianceReport(standardId);
    }
    getSecurityEvents(severity) {
        return this.securityManager.getSecurityEvents(severity);
    }
    getSecurityStatistics() {
        const threatStats = this.threatDetector.getThreatStatistics();
        const complianceStats = this.complianceChecker.getComplianceSummary();
        return {
            threats: threatStats,
            compliance: complianceStats,
            summary: {
                totalThreats: threatStats.totalThreats,
                blockedIPs: threatStats.blockedIPs,
                averageCompliance: complianceStats.averageCompliance,
                criticalFindings: complianceStats.criticalFindings
            }
        };
    }
    // Encryption services
    encryptData(data, key) {
        return this.securityManager.encrypt(data, key);
    }
    decryptData(encryptedData, key, iv, tag) {
        return this.securityManager.decrypt(encryptedData, key, iv, tag);
    }
    // Token services
    generateToken(payload) {
        return this.securityManager.generateToken(payload);
    }
    verifyToken(token) {
        return this.securityManager.verifyToken(token);
    }
    // Utility services
    sanitizeInput(input) {
        return this.securityManager.sanitizeInput(input);
    }
    generateSecureRandom(length) {
        return this.securityManager.generateSecureRandom(length);
    }
};
exports.SecurityService = SecurityService;
exports.SecurityService = SecurityService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], SecurityService);
//# sourceMappingURL=security.service.js.map