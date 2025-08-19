"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseCacheService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let ResponseCacheService = class ResponseCacheService {
    constructor() {
        this.cache = new Map();
        this.DEFAULT_TTL = 24 * 60 * 60 * 1000; // 24 hours
        this.MAX_CACHE_SIZE = 1000;
        this.CLEANUP_INTERVAL = 60 * 60 * 1000; // 1 hour
        this.startCleanupTimer();
    }
    generateCacheKey(query, context) {
        const normalizedQuery = this.normalizeQuery(query);
        const contextHash = context ? (0, crypto_1.createHash)('md5').update(context).digest('hex').substring(0, 8) : '';
        return (0, crypto_1.createHash)('md5').update(normalizedQuery + contextHash).digest('hex');
    }
    async get(query, context) {
        const key = this.generateCacheKey(query, context);
        const entry = this.cache.get(key);
        if (!entry)
            return null;
        // Check if expired
        if (new Date() > entry.expiresAt) {
            this.cache.delete(key);
            return null;
        }
        // Update hit count and access time
        entry.hitCount++;
        entry.timestamp = new Date();
        this.cache.set(key, entry);
        console.log(`Cache HIT for query: ${query.substring(0, 50)}...`);
        return entry.response;
    }
    async set(query, response, context, ttl, metadata) {
        const key = this.generateCacheKey(query, context);
        const expiresAt = new Date(Date.now() + (ttl || this.DEFAULT_TTL));
        const entry = {
            key,
            response,
            timestamp: new Date(),
            hitCount: 0,
            expiresAt,
            metadata
        };
        // Check cache size limit
        if (this.cache.size >= this.MAX_CACHE_SIZE) {
            this.evictLeastUsed();
        }
        this.cache.set(key, entry);
        console.log(`Cache SET for query: ${query.substring(0, 50)}...`);
    }
    async invalidate(query, context) {
        const key = this.generateCacheKey(query, context);
        return this.cache.delete(key);
    }
    async invalidatePattern(pattern) {
        let count = 0;
        const regex = new RegExp(pattern, 'i');
        for (const [key, entry] of this.cache.entries()) {
            if (regex.test(key) || regex.test(entry.response)) {
                this.cache.delete(key);
                count++;
            }
        }
        return count;
    }
    async clear() {
        this.cache.clear();
        console.log('Cache cleared');
    }
    normalizeQuery(query) {
        return query
            .toLowerCase()
            .trim()
            .replace(/\s+/g, ' ')
            .replace(/[^\w\s\u0600-\u06FF]/g, ''); // Keep Arabic and alphanumeric
    }
    evictLeastUsed() {
        if (this.cache.size === 0)
            return;
        // Find entry with lowest hit count and oldest timestamp
        let leastUsedKey = '';
        let minScore = Infinity;
        for (const [key, entry] of this.cache.entries()) {
            // Score based on hit count and age (lower is worse)
            const ageHours = (Date.now() - entry.timestamp.getTime()) / (1000 * 60 * 60);
            const score = entry.hitCount / (ageHours + 1);
            if (score < minScore) {
                minScore = score;
                leastUsedKey = key;
            }
        }
        if (leastUsedKey) {
            this.cache.delete(leastUsedKey);
            console.log(`Evicted least used cache entry: ${leastUsedKey}`);
        }
    }
    startCleanupTimer() {
        setInterval(() => {
            this.cleanup();
        }, this.CLEANUP_INTERVAL);
    }
    cleanup() {
        const now = new Date();
        let expiredCount = 0;
        for (const [key, entry] of this.cache.entries()) {
            if (now > entry.expiresAt) {
                this.cache.delete(key);
                expiredCount++;
            }
        }
        if (expiredCount > 0) {
            console.log(`Cleaned up ${expiredCount} expired cache entries`);
        }
    }
    // Analytics and monitoring
    getStats() {
        const entries = Array.from(this.cache.values());
        const now = new Date();
        const totalHits = entries.reduce((sum, entry) => sum + entry.hitCount, 0);
        const avgHits = entries.length > 0 ? totalHits / entries.length : 0;
        const expiredCount = entries.filter(entry => now > entry.expiresAt).length;
        const activeCount = entries.length - expiredCount;
        const hitDistribution = entries.reduce((acc, entry) => {
            const bucket = entry.hitCount === 0 ? '0' :
                entry.hitCount <= 5 ? '1-5' :
                    entry.hitCount <= 20 ? '6-20' : '20+';
            acc[bucket] = (acc[bucket] || 0) + 1;
            return acc;
        }, {});
        return {
            totalEntries: this.cache.size,
            activeEntries: activeCount,
            expiredEntries: expiredCount,
            totalHits,
            averageHits: Math.round(avgHits * 100) / 100,
            hitDistribution,
            cacheUtilization: Math.round((this.cache.size / this.MAX_CACHE_SIZE) * 100),
            oldestEntry: entries.length > 0 ?
                Math.min(...entries.map(e => e.timestamp.getTime())) : null,
            newestEntry: entries.length > 0 ?
                Math.max(...entries.map(e => e.timestamp.getTime())) : null
        };
    }
    getTopQueries(limit = 10) {
        return Array.from(this.cache.values())
            .sort((a, b) => b.hitCount - a.hitCount)
            .slice(0, limit)
            .map(entry => ({
            query: entry.key.substring(0, 50) + '...',
            hits: entry.hitCount
        }));
    }
    // Cache warming - preload common queries
    async warmCache(commonQueries) {
        console.log(`Warming cache with ${commonQueries.length} common queries...`);
        for (const item of commonQueries) {
            await this.set(item.query, item.response, item.context, this.DEFAULT_TTL * 7); // 7 days for common queries
        }
        console.log('Cache warming completed');
    }
    // Export/Import for persistence
    exportCache() {
        return {
            timestamp: new Date().toISOString(),
            entries: Array.from(this.cache.entries()).map(([key, entry]) => ({
                key,
                ...entry,
                timestamp: entry.timestamp.toISOString(),
                expiresAt: entry.expiresAt.toISOString()
            }))
        };
    }
    importCache(data) {
        if (!data.entries || !Array.isArray(data.entries))
            return;
        this.cache.clear();
        for (const item of data.entries) {
            const entry = {
                ...item,
                timestamp: new Date(item.timestamp),
                expiresAt: new Date(item.expiresAt)
            };
            // Only import non-expired entries
            if (new Date() < entry.expiresAt) {
                this.cache.set(item.key, entry);
            }
        }
        console.log(`Imported ${this.cache.size} cache entries`);
    }
};
exports.ResponseCacheService = ResponseCacheService;
exports.ResponseCacheService = ResponseCacheService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], ResponseCacheService);
//# sourceMappingURL=response-cache.service.js.map