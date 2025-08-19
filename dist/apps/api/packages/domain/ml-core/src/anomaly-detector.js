"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnomalyDetector = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let AnomalyDetector = class AnomalyDetector {
    constructor() {
        this.models = new Map();
    }
    async trainAnomalyModel(modelId, normalData) {
        // Train isolation forest or one-class SVM
        const model = {
            mean: this.calculateMean(normalData),
            std: this.calculateStd(normalData),
            threshold: this.calculateThreshold(normalData)
        };
        this.models.set(modelId, model);
    }
    async detectAnomalies(modelId, data) {
        const model = this.models.get(modelId);
        if (!model) {
            throw new Error(`Model ${modelId} not found`);
        }
        return data.map((point, index) => ({
            index,
            data: point,
            isAnomaly: this.isAnomaly(point, model),
            anomalyScore: this.calculateAnomalyScore(point, model)
        }));
    }
    async detectTimeSeriesAnomalies(data, windowSize = 10) {
        const anomalies = [];
        for (let i = windowSize; i < data.length; i++) {
            const window = data.slice(i - windowSize, i);
            const predicted = this.predictNext(window);
            const actual = data[i];
            const error = Math.abs(actual - predicted);
            // Use statistical threshold for anomaly detection
            const threshold = this.calculateDynamicThreshold(window);
            if (error > threshold) {
                anomalies.push({
                    index: i,
                    actual,
                    predicted,
                    error,
                    isAnomaly: true
                });
            }
        }
        return anomalies;
    }
    async detectNetworkAnomalies(networkMetrics) {
        // Detect network anomalies based on traffic patterns
        return networkMetrics.map(metric => ({
            timestamp: metric.timestamp,
            isAnomaly: this.isNetworkAnomaly(metric),
            anomalyType: this.classifyNetworkAnomaly(metric),
            severity: this.calculateSeverity(metric)
        }));
    }
    calculateMean(data) {
        const dimensions = data[0].length;
        const mean = new Array(dimensions).fill(0);
        data.forEach(point => {
            point.forEach((value, dim) => {
                mean[dim] += value;
            });
        });
        return mean.map(sum => sum / data.length);
    }
    calculateStd(data) {
        const mean = this.calculateMean(data);
        const dimensions = data[0].length;
        const variance = new Array(dimensions).fill(0);
        data.forEach(point => {
            point.forEach((value, dim) => {
                variance[dim] += Math.pow(value - mean[dim], 2);
            });
        });
        return variance.map(v => Math.sqrt(v / data.length));
    }
    calculateThreshold(data) {
        // Calculate threshold based on statistical properties
        return 2.5; // 2.5 standard deviations
    }
    isAnomaly(point, model) {
        const distance = this.calculateMahalanobisDistance(point, model);
        return distance > model.threshold;
    }
    calculateAnomalyScore(point, model) {
        return this.calculateMahalanobisDistance(point, model);
    }
    calculateMahalanobisDistance(point, model) {
        // Simplified Mahalanobis distance calculation
        let distance = 0;
        for (let i = 0; i < point.length; i++) {
            const normalized = (point[i] - model.mean[i]) / model.std[i];
            distance += normalized * normalized;
        }
        return Math.sqrt(distance);
    }
    predictNext(window) {
        // Simple moving average prediction
        return window.reduce((sum, val) => sum + val, 0) / window.length;
    }
    calculateDynamicThreshold(window) {
        const mean = window.reduce((sum, val) => sum + val, 0) / window.length;
        const std = Math.sqrt(window.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / window.length);
        return 2 * std; // 2 standard deviations
    }
    isNetworkAnomaly(metric) {
        // Network anomaly detection logic
        return metric.bandwidth > 1000 || metric.latency > 500 || metric.packetLoss > 0.05;
    }
    classifyNetworkAnomaly(metric) {
        if (metric.bandwidth > 1000)
            return 'high_bandwidth';
        if (metric.latency > 500)
            return 'high_latency';
        if (metric.packetLoss > 0.05)
            return 'packet_loss';
        return 'normal';
    }
    calculateSeverity(metric) {
        if (metric.bandwidth > 2000 || metric.latency > 1000)
            return 'high';
        if (metric.bandwidth > 1500 || metric.latency > 750)
            return 'medium';
        return 'low';
    }
};
exports.AnomalyDetector = AnomalyDetector;
exports.AnomalyDetector = AnomalyDetector = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AnomalyDetector);
//# sourceMappingURL=anomaly-detector.js.map