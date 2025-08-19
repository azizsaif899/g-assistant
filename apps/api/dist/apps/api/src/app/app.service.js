"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
class AppService {
    getHello() {
        return 'Hello API!';
    }
    getSystemStatus() {
        return {
            api: 'running',
            database: 'connected',
            cache: 'active',
            timestamp: new Date().toISOString()
        };
    }
}
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map