"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RBACManager = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let RBACManager = class RBACManager {
    constructor() {
        this.roles = new Map();
        this.permissions = new Map();
    }
    async assignRole(userId, role) {
        const userRoles = this.roles.get(userId) || [];
        userRoles.push(role);
        this.roles.set(userId, userRoles);
    }
    async checkPermission(userId, permission) {
        const userRoles = this.roles.get(userId) || [];
        return userRoles.some(role => {
            const rolePermissions = this.permissions.get(role) || [];
            return rolePermissions.includes(permission);
        });
    }
    async createRole(roleName, permissions) {
        this.permissions.set(roleName, permissions);
    }
};
exports.RBACManager = RBACManager;
exports.RBACManager = RBACManager = tslib_1.__decorate([
    (0, common_1.Injectable)()
], RBACManager);
//# sourceMappingURL=rbac-manager.js.map