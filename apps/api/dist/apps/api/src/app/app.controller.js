"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
class AppController {
    getHello() {
        return 'AzizSys API Server is running!';
    }
    getHealth() {
        return {
            status: 'healthy',
            service: 'azizsys-api',
            timestamp: new Date().toISOString()
        };
    }
}
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map