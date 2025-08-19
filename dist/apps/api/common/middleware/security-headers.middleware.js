"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityHeadersMiddleware = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let SecurityHeadersMiddleware = class SecurityHeadersMiddleware {
    use(req, res, next) {
        // HSTS - Force HTTPS
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        // CSP - Content Security Policy
        res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;");
        // X-Frame-Options - Prevent clickjacking
        res.setHeader('X-Frame-Options', 'DENY');
        // X-Content-Type-Options - Prevent MIME sniffing
        res.setHeader('X-Content-Type-Options', 'nosniff');
        // X-XSS-Protection
        res.setHeader('X-XSS-Protection', '1; mode=block');
        // Referrer Policy
        res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
        // Remove server information
        res.removeHeader('X-Powered-By');
        next();
    }
};
exports.SecurityHeadersMiddleware = SecurityHeadersMiddleware;
exports.SecurityHeadersMiddleware = SecurityHeadersMiddleware = tslib_1.__decorate([
    (0, common_1.Injectable)()
], SecurityHeadersMiddleware);
//# sourceMappingURL=security-headers.middleware.js.map