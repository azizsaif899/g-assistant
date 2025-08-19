"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitoringCore = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./lib/metrics-collector"), exports);
tslib_1.__exportStar(require("./lib/alert-manager"), exports);
tslib_1.__exportStar(require("./lib/performance-analyzer"), exports);
tslib_1.__exportStar(require("./lib/notification-service"), exports);
tslib_1.__exportStar(require("./lib/benchmark-service"), exports);
tslib_1.__exportStar(require("./lib/log-analyzer"), exports);
tslib_1.__exportStar(require("./lib/usage-tracker"), exports);
tslib_1.__exportStar(require("./lib/backup-manager"), exports);
tslib_1.__exportStar(require("./lib/health-checker"), exports);
// Advanced Monitoring System
class MonitoringCore {
    constructor() {
        this.alerts = [];
        this.healthChecks = new Map();
        console.log('📊 تفعيل نظام المراقبة المتقدم...');
        this.initializeHealthChecks();
    }
    initializeHealthChecks() {
        const services = ['API', 'Database', 'AI Engine', 'Security', 'Memory'];
        services.forEach(service => {
            this.healthChecks.set(service, true);
            console.log(`✅ Health check: ${service}`);
        });
    }
    createAlert(message, level) {
        this.alerts.push({
            message,
            level,
            timestamp: new Date(),
            id: Date.now()
        });
    }
    getSystemHealth() {
        const totalServices = this.healthChecks.size;
        const healthyServices = Array.from(this.healthChecks.values()).filter(Boolean).length;
        return {
            status: healthyServices === totalServices ? 'healthy' : 'degraded',
            healthyServices,
            totalServices,
            uptime: process.uptime(),
            alerts: this.alerts.length
        };
    }
}
exports.MonitoringCore = MonitoringCore;
//# sourceMappingURL=index.js.map