"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsCore = void 0;
const tslib_1 = require("tslib");
// Analytics Core Package - Main Entry Point
tslib_1.__exportStar(require("./data-collector"), exports);
tslib_1.__exportStar(require("./metrics-processor"), exports);
tslib_1.__exportStar(require("./insight-generator"), exports);
tslib_1.__exportStar(require("./types"), exports);
// Enhanced Analytics System
class AnalyticsCore {
    constructor() {
        this.metrics = new Map();
        this.dashboards = ['Performance', 'Users', 'Security', 'AI Usage'];
        console.log('📊 تفعيل نظام التحليلات المتقدم...');
        this.initializeDashboards();
    }
    initializeDashboards() {
        this.dashboards.forEach(dashboard => {
            console.log(`📈 إنشاء dashboard: ${dashboard}`);
        });
    }
    collectMetric(name, value) {
        this.metrics.set(name, {
            value,
            timestamp: new Date(),
            type: typeof value
        });
    }
    getMetrics() {
        return Object.fromEntries(this.metrics);
    }
    generateReport() {
        return {
            totalMetrics: this.metrics.size,
            dashboards: this.dashboards.length,
            lastUpdated: new Date(),
            status: 'active'
        };
    }
}
exports.AnalyticsCore = AnalyticsCore;
//# sourceMappingURL=index.js.map