"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let AnalyticsService = class AnalyticsService {
    constructor() {
        this.events = [];
        this.userSessions = new Map();
    }
    trackEvent(eventName, userId, properties = {}) {
        const event = {
            eventName,
            userId,
            properties,
            timestamp: new Date(),
            sessionId: this.getOrCreateSession(userId)
        };
        this.events.push(event);
        this.processEvent(event);
    }
    trackPageView(userId, page, referrer) {
        this.trackEvent('page_view', userId, { page, referrer });
    }
    trackUserAction(userId, action, target) {
        this.trackEvent('user_action', userId, { action, target });
    }
    getAnalytics(timeRange = '7d') {
        const cutoff = this.getTimeRangeCutoff(timeRange);
        const filteredEvents = this.events.filter(e => e.timestamp >= cutoff);
        return {
            totalEvents: filteredEvents.length,
            uniqueUsers: new Set(filteredEvents.map(e => e.userId)).size,
            topEvents: this.getTopEvents(filteredEvents),
            userEngagement: this.calculateEngagement(filteredEvents),
            timeRange
        };
    }
    getUserAnalytics(userId) {
        const userEvents = this.events.filter(e => e.userId === userId);
        const session = this.userSessions.get(userId);
        return {
            totalEvents: userEvents.length,
            lastActivity: userEvents.length > 0 ? userEvents[userEvents.length - 1].timestamp : null,
            sessionDuration: session ? Date.now() - session.startTime : 0,
            topActions: this.getTopEvents(userEvents)
        };
    }
    getOrCreateSession(userId) {
        let session = this.userSessions.get(userId);
        if (!session || Date.now() - session.lastActivity > 30 * 60 * 1000) {
            session = {
                sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                startTime: Date.now(),
                lastActivity: Date.now()
            };
            this.userSessions.set(userId, session);
        }
        else {
            session.lastActivity = Date.now();
        }
        return session.sessionId;
    }
    processEvent(event) {
        // Process event for real-time analytics
        console.log(`Analytics: ${event.eventName} by ${event.userId}`);
    }
    getTimeRangeCutoff(timeRange) {
        const now = new Date();
        switch (timeRange) {
            case '1d': return new Date(now.getTime() - 24 * 60 * 60 * 1000);
            case '7d': return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            case '30d': return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            default: return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        }
    }
    getTopEvents(events) {
        const eventCounts = events.reduce((acc, event) => {
            acc[event.eventName] = (acc[event.eventName] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(eventCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10)
            .map(([name, count]) => ({ name, count }));
    }
    calculateEngagement(events) {
        const sessions = new Set(events.map(e => e.sessionId));
        return sessions.size > 0 ? events.length / sessions.size : 0;
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AnalyticsService);
//# sourceMappingURL=analytics-service.js.map