"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsageTracker = void 0;
class UsageTracker {
    constructor() {
        this.sessions = new Map();
        this.featureUsage = new Map();
        this.dailyStats = [];
    }
    startSession(userId, sessionId) {
        const session = {
            userId,
            sessionId,
            startTime: new Date(),
            lastActivity: new Date(),
            features: [],
            actions: 0
        };
        this.sessions.set(sessionId, session);
        this.updateDailyStats();
    }
    trackFeatureUsage(sessionId, feature) {
        const session = this.sessions.get(sessionId);
        if (!session)
            return;
        session.lastActivity = new Date();
        session.actions++;
        if (!session.features.includes(feature)) {
            session.features.push(feature);
        }
        this.updateFeatureUsage(feature, session.userId);
    }
    updateFeatureUsage(feature, userId) {
        let usage = this.featureUsage.get(feature);
        if (!usage) {
            usage = {
                feature,
                users: new Set(),
                totalUsage: 0,
                avgSessionTime: 0,
                popularTimes: new Array(24).fill(0)
            };
            this.featureUsage.set(feature, usage);
        }
        usage.users.add(userId);
        usage.totalUsage++;
        usage.popularTimes[new Date().getHours()]++;
    }
    endSession(sessionId) {
        const session = this.sessions.get(sessionId);
        if (!session)
            return;
        const duration = session.lastActivity.getTime() - session.startTime.getTime();
        // Update feature session times
        session.features.forEach(feature => {
            const usage = this.featureUsage.get(feature);
            if (usage) {
                const currentAvg = usage.avgSessionTime;
                const userCount = usage.users.size;
                usage.avgSessionTime = (currentAvg * (userCount - 1) + duration) / userCount;
            }
        });
        this.sessions.delete(sessionId);
    }
    updateDailyStats() {
        const today = new Date().toDateString();
        let todayStats = this.dailyStats.find(s => s.date === today);
        if (!todayStats) {
            todayStats = { date: today, users: 0, sessions: 0 };
            this.dailyStats.push(todayStats);
        }
        const uniqueUsers = new Set(Array.from(this.sessions.values()).map(s => s.userId));
        todayStats.users = uniqueUsers.size;
        todayStats.sessions = this.sessions.size;
        // Keep only last 30 days
        if (this.dailyStats.length > 30) {
            this.dailyStats.shift();
        }
    }
    generateUsageReport() {
        const activeSessions = Array.from(this.sessions.values());
        const activeUsers = new Set(activeSessions.map(s => s.userId)).size;
        const sessionDurations = activeSessions.map(s => s.lastActivity.getTime() - s.startTime.getTime());
        const avgSessionDuration = sessionDurations.length > 0
            ? sessionDurations.reduce((sum, d) => sum + d, 0) / sessionDurations.length
            : 0;
        const topFeatures = Array.from(this.featureUsage.entries())
            .sort((a, b) => b[1].totalUsage - a[1].totalUsage)
            .slice(0, 10)
            .map(([feature, usage]) => ({ feature, usage: usage.totalUsage }));
        const peakHours = this.calculatePeakHours();
        const userRetention = this.calculateRetention();
        return {
            totalUsers: this.getTotalUsers(),
            activeUsers,
            avgSessionDuration: avgSessionDuration / (1000 * 60), // Convert to minutes
            topFeatures,
            userRetention,
            peakHours
        };
    }
    calculatePeakHours() {
        const hourlyUsage = new Array(24).fill(0);
        this.featureUsage.forEach(usage => {
            usage.popularTimes.forEach((count, hour) => {
                hourlyUsage[hour] += count;
            });
        });
        return hourlyUsage
            .map((usage, hour) => ({ hour, usage }))
            .sort((a, b) => b.usage - a.usage)
            .slice(0, 3)
            .map(item => item.hour);
    }
    calculateRetention() {
        if (this.dailyStats.length < 7)
            return 0;
        const lastWeek = this.dailyStats.slice(-7);
        const thisWeek = this.dailyStats.slice(-14, -7);
        if (thisWeek.length === 0)
            return 0;
        const lastWeekUsers = lastWeek.reduce((sum, day) => sum + day.users, 0) / 7;
        const thisWeekUsers = thisWeek.reduce((sum, day) => sum + day.users, 0) / 7;
        return thisWeekUsers > 0 ? (lastWeekUsers / thisWeekUsers) * 100 : 0;
    }
    getTotalUsers() {
        const allUsers = new Set();
        this.sessions.forEach(session => allUsers.add(session.userId));
        this.featureUsage.forEach(usage => {
            usage.users.forEach(user => allUsers.add(user));
        });
        return allUsers.size;
    }
    getFeatureUsage() {
        return Array.from(this.featureUsage.values());
    }
}
exports.UsageTracker = UsageTracker;
//# sourceMappingURL=usage-tracker.js.map