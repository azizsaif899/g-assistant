"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GDPRService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let GDPRService = class GDPRService {
    async exportUserData(userId) {
        return {
            user: { id: userId, username: 'user', email: 'user@example.com' },
            conversations: [],
            analytics: [],
            exportedAt: new Date()
        };
    }
    async deleteUserData(userId) {
        console.log(`🗑️ Deleting all data for user: ${userId}`);
    }
    async getUserConsent(userId) {
        return {
            userId,
            dataProcessing: true,
            marketing: false,
            analytics: true,
            consentDate: new Date()
        };
    }
};
exports.GDPRService = GDPRService;
exports.GDPRService = GDPRService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], GDPRService);
//# sourceMappingURL=gdpr.service.js.map