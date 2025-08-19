"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityManager = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let SecurityManager = class SecurityManager {
    constructor() {
        this.securityConfig = {
            maxLoginAttempts: 5,
            lockoutDuration: 15 * 60 * 1000, // 15 minutes
            sessionTimeout: 30 * 60 * 1000, // 30 minutes
            passwordMinLength: 8
        };
        this.loginAttempts = new Map();
        this.lockedAccounts = new Map();
    }
    validatePassword(password) {
        return password.length >= this.securityConfig.passwordMinLength;
    }
    checkLoginAttempts(userId) {
        const attempts = this.loginAttempts.get(userId) || 0;
        const lockTime = this.lockedAccounts.get(userId);
        if (lockTime && Date.now() < lockTime) {
            return false; // Account is locked
        }
        if (lockTime && Date.now() >= lockTime) {
            // Unlock account
            this.lockedAccounts.delete(userId);
            this.loginAttempts.delete(userId);
        }
        return attempts < this.securityConfig.maxLoginAttempts;
    }
    recordFailedLogin(userId) {
        const attempts = (this.loginAttempts.get(userId) || 0) + 1;
        this.loginAttempts.set(userId, attempts);
        if (attempts >= this.securityConfig.maxLoginAttempts) {
            const lockUntil = Date.now() + this.securityConfig.lockoutDuration;
            this.lockedAccounts.set(userId, lockUntil);
        }
    }
    recordSuccessfulLogin(userId) {
        this.loginAttempts.delete(userId);
        this.lockedAccounts.delete(userId);
    }
    sanitizeInput(input) {
        return input
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/javascript:/gi, '')
            .replace(/on\w+\s*=/gi, '');
    }
    validateApiKey(apiKey) {
        // Basic API key validation
        return apiKey && apiKey.length >= 32 && /^[a-zA-Z0-9]+$/.test(apiKey);
    }
};
exports.SecurityManager = SecurityManager;
exports.SecurityManager = SecurityManager = tslib_1.__decorate([
    (0, common_1.Injectable)()
], SecurityManager);
//# sourceMappingURL=security-manager.js.map