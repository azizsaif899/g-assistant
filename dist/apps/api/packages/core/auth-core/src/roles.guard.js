"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGuard = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const rbac_service_1 = require("./rbac.service");
let RolesGuard = class RolesGuard {
    constructor(reflector, rbacService) {
        this.reflector = reflector;
        this.rbacService = rbacService;
    }
    async canActivate(context) {
        const requiredRoles = this.reflector.get('roles', context.getHandler());
        if (!requiredRoles) {
            return true; // No roles specified, allow access
        }
        const request = context.switchToHttp().getRequest();
        const userId = request.user.id; // Assuming user is available on the request
        const userRoles = await this.rbacService.getUserRoles(userId);
        return requiredRoles.some(role => userRoles.includes(role));
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [core_1.Reflector,
        rbac_service_1.RbacService])
], RolesGuard);
//# sourceMappingURL=roles.guard.js.map