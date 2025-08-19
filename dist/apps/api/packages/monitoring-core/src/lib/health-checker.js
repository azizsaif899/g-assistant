"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthChecker = void 0;
class HealthChecker {
    constructor() {
        this.checks = new Map();
        this.results = new Map();
        this.intervals = new Map();
    }
    addHealthCheck(check) {
        this.checks.set(check.name, check);
        this.startHealthCheck(check);
    }
    startHealthCheck(check) {
        const intervalId = setInterval(async () => {
            await this.executeHealthCheck(check);
        }, check.interval);
        this.intervals.set(check.name, intervalId);
        // Execute immediately
        this.executeHealthCheck(check);
    }
    async executeHealthCheck(check) {
        const startTime = Date.now();
        let result;
        try {
            switch (check.type) {
                case 'http':
                    result = await this.checkHttp(check);
                    break;
                case 'database':
                    result = await this.checkDatabase(check);
                    break;
                case 'service':
                    result = await this.checkService(check);
                    break;
                default:
                    result = await this.checkCustom(check);
            }
        }
        catch (error) {
            result = {
                name: check.name,
                status: 'unhealthy',
                responseTime: Date.now() - startTime,
                timestamp: new Date(),
                message: error.message
            };
        }
        this.storeResult(check.name, result);
        return result;
    }
    async checkHttp(check) {
        const startTime = Date.now();
        try {
            const response = await fetch(check.config.url, {
                method: check.config.method || 'GET',
                timeout: check.timeout
            });
            const responseTime = Date.now() - startTime;
            const status = response.ok ? 'healthy' : 'unhealthy';
            return {
                name: check.name,
                status,
                responseTime,
                timestamp: new Date(),
                details: {
                    statusCode: response.status,
                    url: check.config.url
                }
            };
        }
        catch (error) {
            return {
                name: check.name,
                status: 'unhealthy',
                responseTime: Date.now() - startTime,
                timestamp: new Date(),
                message: error.message
            };
        }
    }
    async checkDatabase(check) {
        const startTime = Date.now();
        // Simulate database check
        return new Promise((resolve) => {
            setTimeout(() => {
                const responseTime = Date.now() - startTime;
                const isHealthy = Math.random() > 0.05; // 95% success rate
                resolve({
                    name: check.name,
                    status: isHealthy ? 'healthy' : 'unhealthy',
                    responseTime,
                    timestamp: new Date(),
                    details: {
                        connectionPool: isHealthy ? 'available' : 'exhausted',
                        activeConnections: Math.floor(Math.random() * 100)
                    }
                });
            }, Math.random() * 1000);
        });
    }
    async checkService(check) {
        const startTime = Date.now();
        // Simulate service check
        const isHealthy = Math.random() > 0.1; // 90% success rate
        const responseTime = Date.now() - startTime + Math.random() * 500;
        return {
            name: check.name,
            status: isHealthy ? 'healthy' : 'degraded',
            responseTime,
            timestamp: new Date(),
            details: {
                service: check.config.serviceName,
                version: '1.0.0'
            }
        };
    }
    async checkCustom(check) {
        // Custom health check implementation
        return {
            name: check.name,
            status: 'healthy',
            responseTime: Math.random() * 100,
            timestamp: new Date(),
            message: 'Custom check passed'
        };
    }
    storeResult(checkName, result) {
        let results = this.results.get(checkName);
        if (!results) {
            results = [];
            this.results.set(checkName, results);
        }
        results.push(result);
        // Keep only last 100 results per check
        if (results.length > 100) {
            results.shift();
        }
    }
    getHealthStatus() {
        const latestResults = [];
        for (const [checkName, results] of this.results.entries()) {
            if (results.length > 0) {
                latestResults.push(results[results.length - 1]);
            }
        }
        const summary = {
            total: latestResults.length,
            healthy: latestResults.filter(r => r.status === 'healthy').length,
            unhealthy: latestResults.filter(r => r.status === 'unhealthy').length,
            degraded: latestResults.filter(r => r.status === 'degraded').length
        };
        let overall = 'healthy';
        if (summary.unhealthy > 0) {
            overall = 'unhealthy';
        }
        else if (summary.degraded > 0) {
            overall = 'degraded';
        }
        return {
            overall,
            checks: latestResults,
            summary
        };
    }
    getCheckHistory(checkName, limit = 50) {
        const results = this.results.get(checkName) || [];
        return results.slice(-limit);
    }
    removeHealthCheck(name) {
        const interval = this.intervals.get(name);
        if (interval) {
            clearInterval(interval);
            this.intervals.delete(name);
        }
        this.results.delete(name);
        return this.checks.delete(name);
    }
}
exports.HealthChecker = HealthChecker;
//# sourceMappingURL=health-checker.js.map