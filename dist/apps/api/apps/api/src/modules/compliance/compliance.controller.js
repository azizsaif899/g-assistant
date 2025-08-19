"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplianceController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const compliance_service_1 = require("./compliance.service");
let ComplianceController = class ComplianceController {
    constructor(complianceService) {
        this.complianceService = complianceService;
    }
    async runAudit() {
        return this.complianceService.runAudit();
    }
    async healthCheck() {
        return this.complianceService.healthCheck();
    }
    async getStatus() {
        return {
            service: 'Al-Raqib Compliance Agent',
            version: '1.0.0',
            status: 'active',
            timestamp: new Date().toISOString()
        };
    }
};
exports.ComplianceController = ComplianceController;
tslib_1.__decorate([
    (0, common_1.Post)('run'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ComplianceController.prototype, "runAudit", null);
tslib_1.__decorate([
    (0, common_1.Get)('health'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ComplianceController.prototype, "healthCheck", null);
tslib_1.__decorate([
    (0, common_1.Get)('status'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ComplianceController.prototype, "getStatus", null);
exports.ComplianceController = ComplianceController = tslib_1.__decorate([
    (0, common_1.Controller)('compliance'),
    tslib_1.__metadata("design:paramtypes", [compliance_service_1.ComplianceService])
], ComplianceController);
//# sourceMappingURL=compliance.controller.js.map