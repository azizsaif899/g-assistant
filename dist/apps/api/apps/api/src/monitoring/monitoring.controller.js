"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitoringController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const monitoring_service_1 = require("./monitoring.service");
let MonitoringController = class MonitoringController {
    constructor(monitoringService) {
        this.monitoringService = monitoringService;
    }
    getHealth() {
        return this.monitoringService.getHealthStatus();
    }
    getMetrics(name, since) {
        const sinceDate = since ? new Date(since) : undefined;
        return this.monitoringService.getMetrics(name, sinceDate);
    }
    getAlerts(level, resolved) {
        const resolvedBool = resolved === 'true' ? true : resolved === 'false' ? false : undefined;
        return this.monitoringService.getAlerts(level, resolvedBool);
    }
    getPerformanceReport(hours) {
        const hoursNum = hours ? parseInt(hours) : 24;
        return this.monitoringService.getPerformanceReport(hoursNum);
    }
    getBenchmarks() {
        return this.monitoringService.getBenchmarks();
    }
    getErrorAnalysis(hours) {
        const hoursNum = hours ? parseInt(hours) : 24;
        return this.monitoringService.getErrorAnalysis(hoursNum);
    }
    getUsageReport() {
        return this.monitoringService.getUsageReport();
    }
    getBackupStatus() {
        return this.monitoringService.getBackupStatus();
    }
    getDetailedHealth() {
        return this.monitoringService.getDetailedHealthStatus();
    }
};
exports.MonitoringController = MonitoringController;
tslib_1.__decorate([
    (0, common_1.Get)('health'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], MonitoringController.prototype, "getHealth", null);
tslib_1.__decorate([
    (0, common_1.Get)('metrics'),
    tslib_1.__param(0, (0, common_1.Query)('name')),
    tslib_1.__param(1, (0, common_1.Query)('since')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", void 0)
], MonitoringController.prototype, "getMetrics", null);
tslib_1.__decorate([
    (0, common_1.Get)('alerts'),
    tslib_1.__param(0, (0, common_1.Query)('level')),
    tslib_1.__param(1, (0, common_1.Query)('resolved')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", void 0)
], MonitoringController.prototype, "getAlerts", null);
tslib_1.__decorate([
    (0, common_1.Get)('performance'),
    tslib_1.__param(0, (0, common_1.Query)('hours')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], MonitoringController.prototype, "getPerformanceReport", null);
tslib_1.__decorate([
    (0, common_1.Get)('benchmarks'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], MonitoringController.prototype, "getBenchmarks", null);
tslib_1.__decorate([
    (0, common_1.Get)('errors'),
    tslib_1.__param(0, (0, common_1.Query)('hours')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], MonitoringController.prototype, "getErrorAnalysis", null);
tslib_1.__decorate([
    (0, common_1.Get)('usage'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], MonitoringController.prototype, "getUsageReport", null);
tslib_1.__decorate([
    (0, common_1.Get)('backup'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], MonitoringController.prototype, "getBackupStatus", null);
tslib_1.__decorate([
    (0, common_1.Get)('health/detailed'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], MonitoringController.prototype, "getDetailedHealth", null);
exports.MonitoringController = MonitoringController = tslib_1.__decorate([
    (0, common_1.Controller)('monitoring'),
    tslib_1.__metadata("design:paramtypes", [monitoring_service_1.MonitoringService])
], MonitoringController);
//# sourceMappingURL=monitoring.controller.js.map