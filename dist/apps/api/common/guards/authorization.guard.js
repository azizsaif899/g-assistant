"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationGuard = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
let AuthorizationGuard = class AuthorizationGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.get('roles', context.getHandler());
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user) {
            throw new common_1.ForbiddenException('User not authenticated');
        }
        const hasRole = requiredRoles.some(role => user.roles?.includes(role));
        if (!hasRole) {
            throw new common_1.ForbiddenException('Insufficient permissions');
        }
        return true;
    }
};
exports.AuthorizationGuard = AuthorizationGuard;
exports.AuthorizationGuard = AuthorizationGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [core_1.Reflector])
], AuthorizationGuard);
//# sourceMappingURL=authorization.guard.js.map