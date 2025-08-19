"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SanitizationPipe = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let SanitizationPipe = class SanitizationPipe {
    transform(value) {
        if (typeof value === 'string') {
            return this.sanitizeString(value);
        }
        if (typeof value === 'object' && value !== null) {
            return this.sanitizeObject(value);
        }
        return value;
    }
    sanitizeString(input) {
        const sqlPatterns = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/gi;
        if (sqlPatterns.test(input)) {
            throw new common_1.BadRequestException('Invalid input detected');
        }
        return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/javascript:/gi, '')
            .replace(/on\w+\s*=/gi, '');
    }
    sanitizeObject(obj) {
        const sanitized = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                sanitized[key] = this.transform(obj[key]);
            }
        }
        return sanitized;
    }
};
exports.SanitizationPipe = SanitizationPipe;
exports.SanitizationPipe = SanitizationPipe = tslib_1.__decorate([
    (0, common_1.Injectable)()
], SanitizationPipe);
//# sourceMappingURL=sanitization.pipe.js.map