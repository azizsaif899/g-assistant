"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisMode = void 0;
class AnalysisMode {
    async process(query, agent) {
        const result = await agent.processQuery(query);
        return `[Analysis Mode] ${result} - تحليل عميق مطبق`;
    }
}
exports.AnalysisMode = AnalysisMode;
