"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let MemoryService = class MemoryService {
    constructor() {
        this.shortTermMemory = new Map();
        this.longTermMemory = new Map();
        this.contextMemory = new Map();
    }
    // Short-term memory for current session
    setShortTerm(key, value, ttl = 3600000) {
        const expiresAt = Date.now() + ttl;
        this.shortTermMemory.set(key, { value, expiresAt });
    }
    getShortTerm(key) {
        const item = this.shortTermMemory.get(key);
        if (!item)
            return null;
        if (Date.now() > item.expiresAt) {
            this.shortTermMemory.delete(key);
            return null;
        }
        return item.value;
    }
    // Long-term memory for persistent storage
    addToLongTerm(sessionId, interaction) {
        const history = this.longTermMemory.get(sessionId) || [];
        history.push({
            ...interaction,
            timestamp: new Date(),
            id: `mem_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        });
        // Keep only last 100 interactions per session
        if (history.length > 100) {
            history.splice(0, history.length - 100);
        }
        this.longTermMemory.set(sessionId, history);
    }
    getLongTermHistory(sessionId, limit = 10) {
        const history = this.longTermMemory.get(sessionId) || [];
        return history.slice(-limit);
    }
    // Context memory for maintaining conversation context
    setContext(sessionId, context) {
        this.contextMemory.set(sessionId, {
            ...context,
            lastUpdated: new Date()
        });
    }
    getContext(sessionId) {
        return this.contextMemory.get(sessionId);
    }
    updateContext(sessionId, updates) {
        const existing = this.getContext(sessionId) || {};
        this.setContext(sessionId, { ...existing, ...updates });
    }
    // Memory search and retrieval
    searchMemory(sessionId, query) {
        const history = this.longTermMemory.get(sessionId) || [];
        const queryLower = query.toLowerCase();
        return history.filter(item => (item.userInput && item.userInput.toLowerCase().includes(queryLower)) ||
            (item.aiResponse && item.aiResponse.toLowerCase().includes(queryLower)) ||
            (item.tags && item.tags.some((tag) => tag.toLowerCase().includes(queryLower))));
    }
    // Memory cleanup
    cleanupExpiredMemory() {
        const now = Date.now();
        // Clean short-term memory
        for (const [key, item] of this.shortTermMemory.entries()) {
            if (now > item.expiresAt) {
                this.shortTermMemory.delete(key);
            }
        }
        // Clean old context (older than 24 hours)
        const dayAgo = new Date(now - 24 * 60 * 60 * 1000);
        for (const [sessionId, context] of this.contextMemory.entries()) {
            if (context.lastUpdated < dayAgo) {
                this.contextMemory.delete(sessionId);
            }
        }
    }
    // Memory statistics
    getMemoryStats() {
        return {
            shortTermEntries: this.shortTermMemory.size,
            longTermSessions: this.longTermMemory.size,
            contextSessions: this.contextMemory.size,
            totalInteractions: Array.from(this.longTermMemory.values())
                .reduce((sum, history) => sum + history.length, 0)
        };
    }
    // Export/Import for persistence
    exportMemory(sessionId) {
        if (sessionId) {
            return {
                longTerm: this.longTermMemory.get(sessionId) || [],
                context: this.contextMemory.get(sessionId) || {}
            };
        }
        return {
            longTerm: Object.fromEntries(this.longTermMemory),
            context: Object.fromEntries(this.contextMemory)
        };
    }
    importMemory(data, sessionId) {
        if (sessionId) {
            if (data.longTerm)
                this.longTermMemory.set(sessionId, data.longTerm);
            if (data.context)
                this.contextMemory.set(sessionId, data.context);
        }
        else {
            if (data.longTerm) {
                for (const [id, history] of Object.entries(data.longTerm)) {
                    this.longTermMemory.set(id, history);
                }
            }
            if (data.context) {
                for (const [id, context] of Object.entries(data.context)) {
                    this.contextMemory.set(id, context);
                }
            }
        }
    }
};
exports.MemoryService = MemoryService;
exports.MemoryService = MemoryService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], MemoryService);
//# sourceMappingURL=memory-service.js.map