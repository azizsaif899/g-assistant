"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IterativeMode = void 0;
class IterativeMode {
    async process(query, agent) {
        const result = await agent.processQuery(query);
        return `[Iterative Mode] ${result} - تحسين مستمر مطبق`;
    }
}
exports.IterativeMode = IterativeMode;
