"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoScaler = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let AutoScaler = class AutoScaler {
    constructor() {
        this.currentInstances = 3;
        this.minInstances = 2;
        this.maxInstances = 20;
    }
    async checkMetrics() {
        const cpuUsage = await this.getCPUUsage();
        const memoryUsage = await this.getMemoryUsage();
        const requestRate = await this.getRequestRate();
        if (cpuUsage > 80 || memoryUsage > 85 || requestRate > 1000) {
            await this.scaleUp();
        }
        else if (cpuUsage < 30 && memoryUsage < 40 && requestRate < 200) {
            await this.scaleDown();
        }
    }
    async scaleUp() {
        if (this.currentInstances < this.maxInstances) {
            this.currentInstances++;
            console.log(`Scaling up to ${this.currentInstances} instances`);
        }
    }
    async scaleDown() {
        if (this.currentInstances > this.minInstances) {
            this.currentInstances--;
            console.log(`Scaling down to ${this.currentInstances} instances`);
        }
    }
    async getCPUUsage() {
        return Math.random() * 100;
    }
    async getMemoryUsage() {
        return Math.random() * 100;
    }
    async getRequestRate() {
        return Math.random() * 2000;
    }
};
exports.AutoScaler = AutoScaler;
exports.AutoScaler = AutoScaler = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AutoScaler);
//# sourceMappingURL=auto-scaler.js.map