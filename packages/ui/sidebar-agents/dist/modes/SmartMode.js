"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartMode = void 0;
class SmartMode {
    async process(query, agent) {
        const result = await agent.processQuery(query);
        return `[Smart Mode] ${result} - تحليل ذكي مطبق`;
    }
}
exports.SmartMode = SmartMode;
