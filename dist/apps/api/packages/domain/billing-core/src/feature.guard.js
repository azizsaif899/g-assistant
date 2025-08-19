"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureGuard = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const billing_service_1 = require("./billing.service");
let FeatureGuard = class FeatureGuard {
    constructor(reflector, billingService) {
        this.reflector = reflector;
        this.billingService = billingService;
    }
    async canActivate(context) {
        const feature = this.reflector.get('feature', context.getHandler());
        if (!feature) {
            return true; // No feature specified, allow access
        }
        const request = context.switchToHttp().getRequest();
        const userId = request.user.id; // Assuming user is available on the request
        return this.billingService.hasAccess(userId, feature);
    }
};
exports.FeatureGuard = FeatureGuard;
exports.FeatureGuard = FeatureGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [core_1.Reflector,
        billing_service_1.BillingService])
], FeatureGuard);
//# sourceMappingURL=feature.guard.js.map