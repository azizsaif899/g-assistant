"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartMemory = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./memory-service"), exports);
// Smart Memory System Enhanced
class SmartMemory {
    constructor() {
        this.conversations = new Map();
        this.contexts = new Map();
        console.log('🧠 تهيئة نظام الذاكرة الذكي...');
    }
    saveConversation(userId, message) {
        if (!this.conversations.has(userId)) {
            this.conversations.set(userId, []);
        }
        this.conversations.get(userId).push({
            ...message,
            timestamp: new Date()
        });
    }
    getConversationHistory(userId) {
        return this.conversations.get(userId) || [];
    }
    saveContext(userId, context) {
        this.contexts.set(userId, { ...context, lastUpdated: new Date() });
    }
    getContext(userId) {
        return this.contexts.get(userId) || {};
    }
    getStats() {
        return {
            conversations: this.conversations.size,
            contexts: this.contexts.size
        };
    }
}
exports.SmartMemory = SmartMemory;
//# sourceMappingURL=index.js.map