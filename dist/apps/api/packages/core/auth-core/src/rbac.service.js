"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RbacService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let RbacService = class RbacService {
    constructor() {
        this.userRoles = new Map();
        // Mock data
        this.userRoles.set('user-123', ['Admin', 'User']);
        this.userRoles.set('user-456', ['User']);
        this.userRoles.set('user-789', ['Billing Manager']);
    }
    async getUserRoles(userId) {
        return this.userRoles.get(userId) || [];
    }
};
exports.RbacService = RbacService;
exports.RbacService = RbacService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], RbacService);
//# sourceMappingURL=rbac.service.js.map