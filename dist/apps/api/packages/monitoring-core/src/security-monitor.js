"use strict";
var SecurityMonitor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityMonitor = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let SecurityMonitor = SecurityMonitor_1 = class SecurityMonitor {
    constructor() {
        this.logger = new common_1.Logger(SecurityMonitor_1.name);
        this.suspiciousActivities = new Map();
        this.blockedIPs = new Set();
    }
    async monitorRequest(ip, endpoint, statusCode) {
        // Monitor failed authentication attempts
        if (endpoint.includes('/auth/login') && statusCode === 401) {
            this.trackFailedLogin(ip);
        }
        // Monitor suspicious patterns
        if (this.isSuspiciousPattern(endpoint)) {
            this.trackSuspiciousActivity(ip, endpoint);
        }
        // Monitor high error rates
        if (statusCode >= 400) {
            this.trackErrorRate(ip);
        }
    }
    trackFailedLogin(ip) {
        const key = `failed_login:${ip}`;
        const count = (this.suspiciousActivities.get(key) || 0) + 1;
        this.suspiciousActivities.set(key, count);
        if (count >= 5) {
            this.blockIP(ip, 'Multiple failed login attempts');
        }
    }
    trackSuspiciousActivity(ip, endpoint) {
        const key = `suspicious:${ip}`;
        const count = (this.suspiciousActivities.get(key) || 0) + 1;
        this.suspiciousActivities.set(key, count);
        this.logger.warn(`Suspicious activity detected from ${ip}: ${endpoint}`);
        if (count >= 10) {
            this.blockIP(ip, 'Suspicious activity pattern');
        }
    }
    trackErrorRate(ip) {
        const key = `errors:${ip}`;
        const count = (this.suspiciousActivities.get(key) || 0) + 1;
        this.suspiciousActivities.set(key, count);
        if (count >= 50) {
            this.blockIP(ip, 'High error rate');
        }
    }
    isSuspiciousPattern(endpoint) {
        const suspiciousPatterns = [
            '/admin',
            '/wp-admin',
            '/.env',
            '/config',
            'SELECT',
            'UNION',
            '<script>',
            'javascript:'
        ];
        return suspiciousPatterns.some(pattern => endpoint.toLowerCase().includes(pattern.toLowerCase()));
    }
    blockIP(ip, reason) {
        this.blockedIPs.add(ip);
        this.logger.error(`IP ${ip} blocked: ${reason}`);
        // Send alert (implement your alerting mechanism)
        this.sendSecurityAlert(ip, reason);
    }
    sendSecurityAlert(ip, reason) {
        // Implement alerting (email, Slack, etc.)
        this.logger.error(`SECURITY ALERT: ${reason} from IP ${ip}`);
    }
    isBlocked(ip) {
        return this.blockedIPs.has(ip);
    }
    unblockIP(ip) {
        this.blockedIPs.delete(ip);
        this.logger.log(`IP ${ip} unblocked`);
    }
};
exports.SecurityMonitor = SecurityMonitor;
exports.SecurityMonitor = SecurityMonitor = SecurityMonitor_1 = tslib_1.__decorate([
    (0, common_1.Injectable)()
], SecurityMonitor);
//# sourceMappingURL=security-monitor.js.map