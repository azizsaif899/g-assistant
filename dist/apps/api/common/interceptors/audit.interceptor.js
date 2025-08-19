"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditInterceptor = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let AuditInterceptor = class AuditInterceptor {
    constructor() {
        this.logger = new common_1.Logger('AUDIT');
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const { method, url, user, ip } = request;
        const auditLog = {
            userId: user?.id || 'anonymous',
            userRole: user?.role || 'guest',
            action: `${method} ${url}`,
            ip: ip || request.connection.remoteAddress,
            timestamp: new Date().toISOString(),
            userAgent: request.headers['user-agent']
        };
        return next.handle().pipe((0, operators_1.tap)({
            next: (data) => {
                this.logger.log('Admin Action Completed', {
                    ...auditLog,
                    status: 'success',
                    responseSize: JSON.stringify(data).length
                });
            },
            error: (error) => {
                this.logger.error('Admin Action Failed', {
                    ...auditLog,
                    status: 'error',
                    error: error.message
                });
            }
        }));
    }
};
exports.AuditInterceptor = AuditInterceptor;
exports.AuditInterceptor = AuditInterceptor = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AuditInterceptor);
//# sourceMappingURL=audit.interceptor.js.map