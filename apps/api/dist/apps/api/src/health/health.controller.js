"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const json_rpc_client_1 = require("@azizsys/core/json-rpc-client");
const cache_client_1 = require("@azizsys/core/cache-client");
const error_handler_1 = require("@azizsys/core/error-handler");
let HealthController = class HealthController {
    constructor() {
        this.rpcClient = new json_rpc_client_1.JsonRpcClient({
            baseUrl: process.env.ODOO_URL || 'http://localhost:8070',
            database: process.env.ODOO_DB || 'azizsys_crm',
            username: process.env.ODOO_USER || 'admin',
            password: process.env.ODOO_PASSWORD || 'AzizSys2025!'
        });
        this.cache = new cache_client_1.CacheClient();
    }
    async healthCheck() {
        const checks = {
            timestamp: new Date().toISOString(),
            status: 'healthy',
            services: {
                api: true,
                odoo: false,
                redis: false
            }
        };
        try {
            await this.rpcClient.authenticate();
            checks.services.odoo = true;
            error_handler_1.logger.info('Odoo connection: OK');
        }
        catch (error) {
            error_handler_1.logger.error('Odoo connection failed:', error);
        }
        try {
            await this.cache.set('health:check', 'ok', 10);
            const result = await this.cache.get('health:check');
            checks.services.redis = result === 'ok';
            error_handler_1.logger.info('Redis connection: OK');
        }
        catch (error) {
            error_handler_1.logger.error('Redis connection failed:', error);
        }
        const allHealthy = Object.values(checks.services).every(Boolean);
        checks.status = allHealthy ? 'healthy' : 'degraded';
        return checks;
    }
    async readinessCheck() {
        return {
            status: 'ready',
            timestamp: new Date().toISOString()
        };
    }
};
exports.HealthController = HealthController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], HealthController.prototype, "healthCheck", null);
tslib_1.__decorate([
    (0, common_1.Get)('ready'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], HealthController.prototype, "readinessCheck", null);
exports.HealthController = HealthController = tslib_1.__decorate([
    (0, common_1.Controller)('health')
], HealthController);
//# sourceMappingURL=health.controller.js.map