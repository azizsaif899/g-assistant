"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceMetrics = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let PerformanceMetrics = class PerformanceMetrics {
    async collectSystemMetrics() {
        const metrics = await this.gatherMetrics();
        const overall = this.calculateOverallHealth(metrics);
        const recommendations = this.generateRecommendations(metrics);
        return {
            overall,
            metrics,
            recommendations
        };
    }
    async gatherMetrics() {
        return [
            {
                name: 'Response Time',
                value: 245,
                unit: 'ms',
                threshold: 500,
                status: this.getStatus(245, 500, 1000)
            },
            {
                name: 'CPU Usage',
                value: 68,
                unit: '%',
                threshold: 80,
                status: this.getStatus(68, 80, 90)
            },
            {
                name: 'Memory Usage',
                value: 72,
                unit: '%',
                threshold: 85,
                status: this.getStatus(72, 85, 95)
            },
            {
                name: 'Database Connections',
                value: 45,
                unit: 'connections',
                threshold: 80,
                status: this.getStatus(45, 80, 100)
            },
            {
                name: 'Error Rate',
                value: 0.8,
                unit: '%',
                threshold: 1,
                status: this.getStatus(0.8, 1, 5, true)
            }
        ];
    }
    getStatus(value, warning, critical, inverse = false) {
        if (inverse) {
            if (value >= critical)
                return 'critical';
            if (value >= warning)
                return 'warning';
            return 'good';
        }
        else {
            if (value >= critical)
                return 'critical';
            if (value >= warning)
                return 'warning';
            return 'good';
        }
    }
    calculateOverallHealth(metrics) {
        const criticalCount = metrics.filter(m => m.status === 'critical').length;
        const warningCount = metrics.filter(m => m.status === 'warning').length;
        if (criticalCount > 0)
            return 'critical';
        if (warningCount > 2)
            return 'degraded';
        return 'healthy';
    }
    generateRecommendations(metrics) {
        const recommendations = [];
        metrics.forEach(metric => {
            if (metric.status === 'critical') {
                recommendations.push(`URGENT: ${metric.name} is critical at ${metric.value}${metric.unit}`);
            }
            else if (metric.status === 'warning') {
                recommendations.push(`Monitor ${metric.name} - approaching threshold`);
            }
        });
        return recommendations;
    }
};
exports.PerformanceMetrics = PerformanceMetrics;
exports.PerformanceMetrics = PerformanceMetrics = tslib_1.__decorate([
    (0, common_1.Injectable)()
], PerformanceMetrics);
//# sourceMappingURL=performance-metrics.js.map