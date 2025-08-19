"use strict";
var LoggingInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let LoggingInterceptor = LoggingInterceptor_1 = class LoggingInterceptor {
    constructor() {
        this.logger = new common_1.Logger(LoggingInterceptor_1.name);
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const { method, url, body, headers } = request;
        const sanitizedBody = this.maskSensitiveData(body);
        const sanitizedHeaders = this.maskSensitiveHeaders(headers);
        this.logger.log(`Request: ${method} ${url}`, {
            body: sanitizedBody,
            headers: sanitizedHeaders,
            timestamp: new Date().toISOString()
        });
        return next.handle().pipe((0, operators_1.tap)(data => {
            const sanitizedResponse = this.maskSensitiveData(data);
            this.logger.log(`Response: ${method} ${url}`, {
                data: sanitizedResponse,
                timestamp: new Date().toISOString()
            });
        }));
    }
    maskSensitiveData(data) {
        if (!data)
            return data;
        const sensitiveFields = ['password', 'token', 'apiKey', 'secret', 'authorization'];
        const masked = { ...data };
        sensitiveFields.forEach(field => {
            if (masked[field]) {
                masked[field] = '***MASKED***';
            }
        });
        return masked;
    }
    maskSensitiveHeaders(headers) {
        const masked = { ...headers };
        if (masked.authorization) {
            masked.authorization = '***MASKED***';
        }
        return masked;
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = LoggingInterceptor_1 = tslib_1.__decorate([
    (0, common_1.Injectable)()
], LoggingInterceptor);
//# sourceMappingURL=logging.interceptor.js.map