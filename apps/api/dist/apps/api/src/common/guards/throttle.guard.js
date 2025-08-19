"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThrottleGuard = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let ThrottleGuard = class ThrottleGuard {
    constructor() {
        this.requests = new Map();
        this.maxRequests = 100;
        this.windowMs = 15 * 60 * 1000;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const clientIp = request.ip || request.connection.remoteAddress;
        const now = Date.now();
        const clientRequests = this.requests.get(clientIp) || [];
        const validRequests = clientRequests.filter(time => now - time < this.windowMs);
        if (validRequests.length >= this.maxRequests) {
            throw new common_1.HttpException('Too Many Requests', common_1.HttpStatus.TOO_MANY_REQUESTS);
        }
        validRequests.push(now);
        this.requests.set(clientIp, validRequests);
        return true;
    }
};
exports.ThrottleGuard = ThrottleGuard;
exports.ThrottleGuard = ThrottleGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], ThrottleGuard);
//# sourceMappingURL=throttle.guard.js.map