"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthMonitor = exports.HealthMonitor = void 0;
class HealthMonitor {
    constructor() {
        this.checks = new Map();
        this.interval = null;
    }
    start() {
        this.interval = setInterval(() => {
            this.runHealthChecks();
        }, 30000); // كل 30 ثانية
    }
    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
    async runHealthChecks() {
        const services = ['api', 'database', 'websocket', 'cache'];
        for (const service of services) {
            try {
                const startTime = Date.now();
                await this.checkService(service);
                const responseTime = Date.now() - startTime;
                this.checks.set(service, {
                    service,
                    status: responseTime < 1000 ? 'healthy' : 'degraded',
                    responseTime,
                    lastCheck: new Date()
                });
            }
            catch (error) {
                this.checks.set(service, {
                    service,
                    status: 'unhealthy',
                    responseTime: -1,
                    lastCheck: new Date(),
                    details: error
                });
            }
        }
    }
    async checkService(service) {
        // محاكاة فحص الخدمة
        await new Promise(resolve => setTimeout(resolve, Math.random() * 500));
        if (Math.random() < 0.1) {
            throw new Error(`Service ${service} is down`);
        }
    }
    getHealthStatus() {
        return Array.from(this.checks.values());
    }
    getOverallHealth() {
        const statuses = Array.from(this.checks.values()).map(check => check.status);
        if (statuses.includes('unhealthy'))
            return 'unhealthy';
        if (statuses.includes('degraded'))
            return 'degraded';
        return 'healthy';
    }
}
exports.HealthMonitor = HealthMonitor;
exports.healthMonitor = new HealthMonitor();
//# sourceMappingURL=health-monitor.js.map