"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogAnalyzer = void 0;
class LogAnalyzer {
    constructor() {
        this.patterns = [];
        this.logs = [];
        this.maxLogs = 10000;
        this.initializePatterns();
    }
    initializePatterns() {
        this.patterns = [
            {
                pattern: /error|exception|failed|failure/i,
                type: 'error',
                description: 'General errors',
                count: 0,
                lastSeen: new Date()
            },
            {
                pattern: /timeout|slow|performance/i,
                type: 'warning',
                description: 'Performance issues',
                count: 0,
                lastSeen: new Date()
            },
            {
                pattern: /unauthorized|forbidden|access denied/i,
                type: 'error',
                description: 'Security issues',
                count: 0,
                lastSeen: new Date()
            },
            {
                pattern: /database|connection|query/i,
                type: 'warning',
                description: 'Database issues',
                count: 0,
                lastSeen: new Date()
            }
        ];
    }
    addLog(level, message) {
        const log = {
            timestamp: new Date(),
            level: level.toLowerCase(),
            message
        };
        this.logs.push(log);
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }
        this.analyzeLog(log);
    }
    analyzeLog(log) {
        for (const pattern of this.patterns) {
            if (pattern.pattern.test(log.message)) {
                pattern.count++;
                pattern.lastSeen = log.timestamp;
            }
        }
    }
    getErrorAnalysis(hours = 24) {
        const since = new Date(Date.now() - hours * 60 * 60 * 1000);
        const recentLogs = this.logs.filter(log => log.timestamp >= since);
        const errorLogs = recentLogs.filter(log => log.level === 'error');
        const errorTypes = new Map();
        const errorMessages = new Map();
        errorLogs.forEach(log => {
            // Categorize by pattern
            for (const pattern of this.patterns) {
                if (pattern.type === 'error' && pattern.pattern.test(log.message)) {
                    errorTypes.set(pattern.description, (errorTypes.get(pattern.description) || 0) + 1);
                }
            }
            // Count specific messages
            const shortMessage = log.message.substring(0, 100);
            errorMessages.set(shortMessage, (errorMessages.get(shortMessage) || 0) + 1);
        });
        const topErrors = Array.from(errorMessages.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([message, count]) => ({ message, count }));
        const errorRate = recentLogs.length > 0 ? (errorLogs.length / recentLogs.length) * 100 : 0;
        return {
            totalErrors: errorLogs.length,
            errorTypes,
            topErrors,
            errorRate,
            trends: this.calculateErrorTrend(hours)
        };
    }
    calculateErrorTrend(hours) {
        const now = new Date();
        const halfPeriod = hours / 2;
        const firstHalf = this.logs.filter(log => log.timestamp >= new Date(now.getTime() - hours * 60 * 60 * 1000) &&
            log.timestamp < new Date(now.getTime() - halfPeriod * 60 * 60 * 1000) &&
            log.level === 'error').length;
        const secondHalf = this.logs.filter(log => log.timestamp >= new Date(now.getTime() - halfPeriod * 60 * 60 * 1000) &&
            log.level === 'error').length;
        if (Math.abs(secondHalf - firstHalf) < 2)
            return 'stable';
        return secondHalf > firstHalf ? 'increasing' : 'decreasing';
    }
    getPatterns() {
        return this.patterns;
    }
    clearLogs() {
        this.logs = [];
        this.patterns.forEach(p => p.count = 0);
    }
}
exports.LogAnalyzer = LogAnalyzer;
//# sourceMappingURL=log-analyzer.js.map