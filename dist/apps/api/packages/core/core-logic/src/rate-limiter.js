"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimiter = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let RateLimiter = class RateLimiter {
    constructor() {
        this.requests = new Map();
    }
    async isAllowed(clientId, limit = 100, window = 3600) {
        const now = Date.now();
        const clientRequests = this.requests.get(clientId) || [];
        // Remove old requests
        const validRequests = clientRequests.filter(time => now - time < window * 1000);
        if (validRequests.length >= limit) {
            return false;
        }
        validRequests.push(now);
        this.requests.set(clientId, validRequests);
        return true;
    }
};
exports.RateLimiter = RateLimiter;
exports.RateLimiter = RateLimiter = tslib_1.__decorate([
    (0, common_1.Injectable)()
], RateLimiter);
//# sourceMappingURL=rate-limiter.js.map