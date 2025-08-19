"use strict";
var TelemetryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelemetryService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let TelemetryService = TelemetryService_1 = class TelemetryService {
    constructor() {
        this.logger = new common_1.Logger(TelemetryService_1.name);
        this.metrics = [];
        this.errors = [];
        this.performance = [];
    }
    logError(error, context, metadata) {
        const errorEntry = {
            timestamp: new Date(),
            message: typeof error === 'string' ? error : error.message,
            stack: typeof error === 'object' ? error.stack : undefined,
            context: context || 'Unknown',
            metadata: metadata || {},
            level: 'error'
        };
        this.errors.push(errorEntry);
        this.logger.error(errorEntry.message, errorEntry.stack, context);
        if (this.errors.length > 1000) {
            this.errors.splice(0, this.errors.length - 1000);
        }
    }
    trackPerformance(operation, duration, metadata) {
        const perfEntry = {
            timestamp: new Date(),
            operation,
            duration,
            metadata: metadata || {}
        };
        this.performance.push(perfEntry);
        if (duration > 5000) {
            this.logger.warn(`Slow operation detected: ${operation} took ${duration}ms`);
        }
        if (this.performance.length > 500) {
            this.performance.splice(0, this.performance.length - 500);
        }
    }
    recordMetric(name, value, tags) {
        const metric = {
            timestamp: new Date(),
            name,
            value,
            tags: tags || {}
        };
        this.metrics.push(metric);
        if (this.metrics.length > 1000) {
            this.metrics.splice(0, this.metrics.length - 1000);
        }
    }
    getSystemHealth() {
        const now = Date.now();
        const oneHourAgo = now - 60 * 60 * 1000;
        const recentErrors = this.errors.filter(e => new Date(e.timestamp).getTime() > oneHourAgo);
        const recentPerf = this.performance.filter(p => new Date(p.timestamp).getTime() > oneHourAgo);
        const avgResponseTime = recentPerf.length > 0
            ? recentPerf.reduce((sum, p) => sum + p.duration, 0) / recentPerf.length
            : 0;
        return {
            status: recentErrors.length < 10 && avgResponseTime < 2000 ? 'healthy' : 'degraded',
            errorCount: recentErrors.length,
            averageResponseTime: Math.round(avgResponseTime),
            totalRequests: recentPerf.length,
            timestamp: new Date()
        };
    }
    getTelemetryData(type, limit = 100) {
        switch (type) {
            case 'errors':
                return this.errors.slice(-limit);
            case 'performance':
                return this.performance.slice(-limit);
            case 'metrics':
                return this.metrics.slice(-limit);
            default:
                return {
                    errors: this.errors.slice(-limit),
                    performance: this.performance.slice(-limit),
                    metrics: this.metrics.slice(-limit)
                };
        }
    }
};
exports.TelemetryService = TelemetryService;
exports.TelemetryService = TelemetryService = TelemetryService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)()
], TelemetryService);
//# sourceMappingURL=telemetry-service.js.map