"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricsCollector = void 0;
class MetricsCollector {
    constructor() {
        this.metrics = new Map();
        this.configs = new Map();
    }
    registerMetric(config) {
        this.configs.set(config.name, config);
        if (!this.metrics.has(config.name)) {
            this.metrics.set(config.name, []);
        }
    }
    recordMetric(name, value, tags) {
        const config = this.configs.get(name);
        if (!config) {
            console.warn(`Metric ${name} not registered`);
            return;
        }
        const metric = {
            name,
            value,
            timestamp: new Date(),
            tags,
            type: config.type
        };
        const metricHistory = this.metrics.get(name) || [];
        metricHistory.push(metric);
        // Keep only last 1000 entries per metric
        if (metricHistory.length > 1000) {
            metricHistory.shift();
        }
        this.metrics.set(name, metricHistory);
    }
    getMetrics(name, since) {
        if (name) {
            const metrics = this.metrics.get(name) || [];
            return since ? metrics.filter(m => m.timestamp >= since) : metrics;
        }
        const allMetrics = [];
        for (const metrics of this.metrics.values()) {
            allMetrics.push(...metrics);
        }
        return since ? allMetrics.filter(m => m.timestamp >= since) : allMetrics;
    }
    getLatestValue(name) {
        const metrics = this.metrics.get(name);
        return metrics && metrics.length > 0 ? metrics[metrics.length - 1].value : null;
    }
    clearMetrics(name) {
        if (name) {
            this.metrics.set(name, []);
        }
        else {
            this.metrics.clear();
        }
    }
}
exports.MetricsCollector = MetricsCollector;
//# sourceMappingURL=metrics-collector.js.map