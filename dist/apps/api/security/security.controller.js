"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const security_service_1 = require("./security.service");
let SecurityController = class SecurityController {
    constructor(securityService) {
        this.securityService = securityService;
    }
    getThreats(severity, limit) {
        const limitNum = limit ? parseInt(limit) : 100;
        return this.securityService.getThreats(severity, limitNum);
    }
    getBlockedIPs() {
        return this.securityService.getBlockedIPs();
    }
    unblockIP(ip) {
        return this.securityService.unblockIP(ip);
    }
    getComplianceStatus(standard) {
        return this.securityService.getComplianceStatus(standard);
    }
    updateCompliance(data) {
        return this.securityService.updateComplianceControl(data.standardId, data.controlId, data.implemented, data.evidence);
    }
    generateComplianceReport(standard) {
        return this.securityService.generateComplianceReport(standard);
    }
    analyzeRequest(request, ip, headers) {
        return this.securityService.analyzeRequest({
            ...request,
            ip,
            headers
        });
    }
    getSecurityEvents(severity) {
        return this.securityService.getSecurityEvents(severity);
    }
    getSecurityStatistics() {
        return this.securityService.getSecurityStatistics();
    }
};
exports.SecurityController = SecurityController;
tslib_1.__decorate([
    (0, common_1.Get)('threats'),
    tslib_1.__param(0, (0, common_1.Query)('severity')),
    tslib_1.__param(1, (0, common_1.Query)('limit')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", void 0)
], SecurityController.prototype, "getThreats", null);
tslib_1.__decorate([
    (0, common_1.Get)('blocked-ips'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], SecurityController.prototype, "getBlockedIPs", null);
tslib_1.__decorate([
    (0, common_1.Post)('unblock-ip'),
    tslib_1.__param(0, (0, common_1.Body)('ip')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], SecurityController.prototype, "unblockIP", null);
tslib_1.__decorate([
    (0, common_1.Get)('compliance'),
    tslib_1.__param(0, (0, common_1.Query)('standard')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], SecurityController.prototype, "getComplianceStatus", null);
tslib_1.__decorate([
    (0, common_1.Post)('compliance/update'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], SecurityController.prototype, "updateCompliance", null);
tslib_1.__decorate([
    (0, common_1.Get)('compliance/report'),
    tslib_1.__param(0, (0, common_1.Query)('standard')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], SecurityController.prototype, "generateComplianceReport", null);
tslib_1.__decorate([
    (0, common_1.Post)('analyze-request'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Ip)()),
    tslib_1.__param(2, (0, common_1.Headers)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], SecurityController.prototype, "analyzeRequest", null);
tslib_1.__decorate([
    (0, common_1.Get)('security-events'),
    tslib_1.__param(0, (0, common_1.Query)('severity')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], SecurityController.prototype, "getSecurityEvents", null);
tslib_1.__decorate([
    (0, common_1.Get)('statistics'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], SecurityController.prototype, "getSecurityStatistics", null);
exports.SecurityController = SecurityController = tslib_1.__decorate([
    (0, common_1.Controller)('security'),
    tslib_1.__metadata("design:paramtypes", [security_service_1.SecurityService])
], SecurityController);
//# sourceMappingURL=security.controller.js.map