"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceTester = void 0;
class PerformanceTester {
    async runLoadTest(config) {
        const results = {
            totalRequests: config.requests,
            successfulRequests: 0,
            failedRequests: 0,
            averageResponseTime: 0,
            maxResponseTime: 0,
            minResponseTime: Infinity,
            requestsPerSecond: 0,
            startTime: new Date(),
            endTime: new Date()
        };
        const startTime = Date.now();
        const promises = [];
        for (let i = 0; i < config.requests; i++) {
            promises.push(this.makeRequest(config.url, config.method));
        }
        const responses = await Promise.allSettled(promises);
        const endTime = Date.now();
        responses.forEach(response => {
            if (response.status === 'fulfilled') {
                results.successfulRequests++;
                const responseTime = response.value.responseTime;
                results.averageResponseTime += responseTime;
                results.maxResponseTime = Math.max(results.maxResponseTime, responseTime);
                results.minResponseTime = Math.min(results.minResponseTime, responseTime);
            }
            else {
                results.failedRequests++;
            }
        });
        results.averageResponseTime /= results.successfulRequests;
        results.requestsPerSecond = config.requests / ((endTime - startTime) / 1000);
        results.endTime = new Date(endTime);
        return results;
    }
    async makeRequest(url, method) {
        const start = Date.now();
        try {
            await fetch(url, { method });
            return { responseTime: Date.now() - start };
        }
        catch (error) {
            throw new Error(`Request failed: ${error.message}`);
        }
    }
}
exports.PerformanceTester = PerformanceTester;
//# sourceMappingURL=performance-tester.js.map