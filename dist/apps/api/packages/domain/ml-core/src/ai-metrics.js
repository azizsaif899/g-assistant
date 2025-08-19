"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIMetrics = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let AIMetrics = class AIMetrics {
    constructor() {
        this.metrics = new Map();
    }
    async recordMetric(modelId, metricType, value) {
        const key = `${modelId}:${metricType}`;
        const history = this.metrics.get(key) || [];
        history.push({
            value,
            timestamp: new Date(),
            modelId,
            metricType
        });
        this.metrics.set(key, history);
    }
    async getMetrics(modelId, metricType) {
        if (metricType) {
            return this.metrics.get(`${modelId}:${metricType}`) || [];
        }
        const allMetrics = [];
        for (const [key, values] of this.metrics.entries()) {
            if (key.startsWith(`${modelId}:`)) {
                allMetrics.push(...values);
            }
        }
        return allMetrics;
    }
    async calculateAccuracy(modelId) {
        const accuracyMetrics = this.metrics.get(`${modelId}:accuracy`) || [];
        if (accuracyMetrics.length === 0)
            return 0;
        const sum = accuracyMetrics.reduce((acc, metric) => acc + metric.value, 0);
        return sum / accuracyMetrics.length;
    }
    async getPerformanceReport(modelId) {
        const accuracy = await this.calculateAccuracy(modelId);
        const precision = await this.calculatePrecision(modelId);
        const recall = await this.calculateRecall(modelId);
        return {
            modelId,
            accuracy,
            precision,
            recall,
            f1Score: this.calculateF1Score(precision, recall),
            generatedAt: new Date()
        };
    }
    async calculatePrecision(modelId) {
        const precisionMetrics = this.metrics.get(`${modelId}:precision`) || [];
        if (precisionMetrics.length === 0)
            return 0;
        const sum = precisionMetrics.reduce((acc, metric) => acc + metric.value, 0);
        return sum / precisionMetrics.length;
    }
    async calculateRecall(modelId) {
        const recallMetrics = this.metrics.get(`${modelId}:recall`) || [];
        if (recallMetrics.length === 0)
            return 0;
        const sum = recallMetrics.reduce((acc, metric) => acc + metric.value, 0);
        return sum / recallMetrics.length;
    }
    calculateF1Score(precision, recall) {
        if (precision + recall === 0)
            return 0;
        return 2 * (precision * recall) / (precision + recall);
    }
};
exports.AIMetrics = AIMetrics;
exports.AIMetrics = AIMetrics = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AIMetrics);
//# sourceMappingURL=ai-metrics.js.map