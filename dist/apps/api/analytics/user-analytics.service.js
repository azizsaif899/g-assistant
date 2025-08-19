"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAnalyticsService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let UserAnalyticsService = class UserAnalyticsService {
    constructor() {
        this.events = [];
    }
    async trackEvent(event) {
        this.events.push({ ...event, timestamp: new Date() });
    }
    async trackUserLogin(userId, ip) {
        await this.trackEvent({
            userId,
            event: 'user_login',
            properties: { ip },
            timestamp: new Date()
        });
    }
    async trackConversation(userId, agent, mode) {
        await this.trackEvent({
            userId,
            event: 'conversation',
            properties: { agent, mode },
            timestamp: new Date()
        });
    }
    async getUserStats(userId) {
        const userEvents = this.events.filter(e => e.userId === userId);
        return {
            totalEvents: userEvents.length,
            conversations: userEvents.filter(e => e.event === 'conversation').length,
            lastActivity: userEvents.length > 0 ? userEvents[userEvents.length - 1].timestamp : null
        };
    }
    async getSystemStats() {
        const uniqueUsers = new Set(this.events.map(e => e.userId)).size;
        return {
            totalEvents: this.events.length,
            activeUsers: uniqueUsers
        };
    }
};
exports.UserAnalyticsService = UserAnalyticsService;
exports.UserAnalyticsService = UserAnalyticsService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], UserAnalyticsService);
//# sourceMappingURL=user-analytics.service.js.map