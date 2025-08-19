"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadBalancer = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let LoadBalancer = class LoadBalancer {
    constructor() {
        this.servers = ['server1', 'server2', 'server3'];
        this.currentIndex = 0;
    }
    getNextServer() {
        const server = this.servers[this.currentIndex];
        this.currentIndex = (this.currentIndex + 1) % this.servers.length;
        return server;
    }
    async checkHealth() {
        // Health check logic
        return true;
    }
};
exports.LoadBalancer = LoadBalancer;
exports.LoadBalancer = LoadBalancer = tslib_1.__decorate([
    (0, common_1.Injectable)()
], LoadBalancer);
//# sourceMappingURL=load-balancer.js.map