"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let AppService = class AppService {
    getHello() {
        return '🤖 AzizSys AI Assistant API Gateway is running!';
    }
    getHealth() {
        return {
            status: 'healthy',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            version: '1.0.0',
            environment: process.env.NODE_ENV || 'development',
            services: {
                api: 'operational',
                auth: 'ready',
                query: 'ready'
            }
        };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map