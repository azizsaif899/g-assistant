"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityHeadersMiddleware = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let SecurityHeadersMiddleware = class SecurityHeadersMiddleware {
    use(req, res, next) {
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;");
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
        res.removeHeader('X-Powered-By');
        next();
    }
};
exports.SecurityHeadersMiddleware = SecurityHeadersMiddleware;
exports.SecurityHeadersMiddleware = SecurityHeadersMiddleware = tslib_1.__decorate([
    (0, common_1.Injectable)()
], SecurityHeadersMiddleware);
//# sourceMappingURL=security-headers.middleware.js.map