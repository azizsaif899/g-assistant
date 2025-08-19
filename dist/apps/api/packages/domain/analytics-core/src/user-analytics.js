"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAnalytics = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let UserAnalytics = class UserAnalytics {
    async analyzeUserBehavior(userId) {
        const behavior = await this.getUserBehavior(userId);
        return { userId, behavior };
    }
    async getUserBehavior(userId) {
        return {
            sessions: 25,
            avgSessionTime: 480,
            features: ['chat', 'reports']
        };
    }
};
exports.UserAnalytics = UserAnalytics;
exports.UserAnalytics = UserAnalytics = tslib_1.__decorate([
    (0, common_1.Injectable)()
], UserAnalytics);
//# sourceMappingURL=user-analytics.js.map