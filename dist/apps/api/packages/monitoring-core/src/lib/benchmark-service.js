"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BenchmarkService = void 0;
class BenchmarkService {
    constructor() {
        this.benchmarks = new Map();
        this.trendData = new Map();
    }
    setBenchmark(name, target, unit) {
        this.benchmarks.set(name, {
            name,
            target,
            current: 0,
            unit,
            status: 'good'
        });
    }
    updateBenchmark(name, value) {
        const benchmark = this.benchmarks.get(name);
        if (!benchmark)
            return;
        benchmark.current = value;
        benchmark.status = this.calculateStatus(value, benchmark.target, name);
        this.updateTrend(name, value);
    }
    calculateStatus(current, target, metric) {
        const isLowerBetter = ['response_time', 'error_rate', 'cpu_usage'].includes(metric);
        if (isLowerBetter) {
            if (current <= target)
                return 'good';
            if (current <= target * 1.5)
                return 'warning';
            return 'critical';
        }
        else {
            if (current >= target)
                return 'good';
            if (current >= target * 0.8)
                return 'warning';
            return 'critical';
        }
    }
    updateTrend(metric, value) {
        let trend = this.trendData.get(metric);
        if (!trend) {
            trend = {
                metric,
                values: [],
                trend: 'stable',
                changePercent: 0
            };
            this.trendData.set(metric, trend);
        }
        trend.values.push({ timestamp: new Date(), value });
        // Keep only last 100 values
        if (trend.values.length > 100) {
            trend.values.shift();
        }
        // Calculate trend
        if (trend.values.length >= 10) {
            const recent = trend.values.slice(-10);
            const older = trend.values.slice(-20, -10);
            if (older.length > 0) {
                const recentAvg = recent.reduce((sum, v) => sum + v.value, 0) / recent.length;
                const olderAvg = older.reduce((sum, v) => sum + v.value, 0) / older.length;
                const change = ((recentAvg - olderAvg) / olderAvg) * 100;
                trend.changePercent = change;
                if (Math.abs(change) < 5) {
                    trend.trend = 'stable';
                }
                else {
                    trend.trend = change > 0 ? 'up' : 'down';
                }
            }
        }
    }
    getBenchmarks() {
        return Array.from(this.benchmarks.values());
    }
    getTrends() {
        return Array.from(this.trendData.values());
    }
    getBenchmark(name) {
        return this.benchmarks.get(name);
    }
}
exports.BenchmarkService = BenchmarkService;
//# sourceMappingURL=benchmark-service.js.map