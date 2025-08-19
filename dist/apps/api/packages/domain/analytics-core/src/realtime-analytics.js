"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealtimeAnalytics = void 0;
class RealtimeAnalytics {
    constructor() {
        this.eventStream = new Map();
        this.subscribers = new Map();
    }
    startStreaming() {
        setInterval(() => {
            this.processRealtimeData();
        }, 1000);
    }
    subscribe(metric, callback) {
        if (!this.subscribers.has(metric)) {
            this.subscribers.set(metric, []);
        }
        this.subscribers.get(metric).push(callback);
    }
    trackEvent(event) {
        const key = `${event.type}_${event.timestamp.getMinutes()}`;
        if (!this.eventStream.has(key)) {
            this.eventStream.set(key, []);
        }
        this.eventStream.get(key).push(event);
    }
    getCurrentMetrics() {
        const now = new Date();
        const currentMinute = now.getMinutes();
        return {
            activeUsers: this.getActiveUsers(currentMinute),
            requestsPerSecond: this.getRequestsPerSecond(currentMinute),
            errorRate: this.getErrorRate(currentMinute),
            responseTime: this.getAverageResponseTime(currentMinute),
            timestamp: now
        };
    }
    processRealtimeData() {
        const metrics = this.getCurrentMetrics();
        this.subscribers.forEach((callbacks, metric) => {
            callbacks.forEach(callback => {
                callback(metrics);
            });
        });
    }
    getActiveUsers(minute) {
        return 150 + Math.floor(Math.random() * 50);
    }
    getRequestsPerSecond(minute) {
        return 45 + Math.floor(Math.random() * 20);
    }
    getErrorRate(minute) {
        return Math.random() * 2;
    }
    getAverageResponseTime(minute) {
        return 200 + Math.floor(Math.random() * 100);
    }
}
exports.RealtimeAnalytics = RealtimeAnalytics;
//# sourceMappingURL=realtime-analytics.js.map