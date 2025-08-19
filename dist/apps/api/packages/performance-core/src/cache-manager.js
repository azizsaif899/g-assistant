"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheManager = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let CacheManager = class CacheManager {
    constructor() {
        this.cache = new Map();
    }
    async get(key) {
        return this.cache.get(key);
    }
    async set(key, value, ttl = 3600) {
        this.cache.set(key, value);
        setTimeout(() => this.cache.delete(key), ttl * 1000);
    }
    async invalidate(pattern) {
        for (const key of this.cache.keys()) {
            if (key.includes(pattern)) {
                this.cache.delete(key);
            }
        }
    }
};
exports.CacheManager = CacheManager;
exports.CacheManager = CacheManager = tslib_1.__decorate([
    (0, common_1.Injectable)()
], CacheManager);
//# sourceMappingURL=cache-manager.js.map