"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QualityOptimizedStrategy = exports.CostOptimizedStrategy = void 0;
class CostOptimizedStrategy {
    async selectModel(prompt, options) {
        return { name: 'cost-optimized', cost: 0.001 };
    }
    evaluateModel(model, metrics) {
        return metrics.cost || 0;
    }
}
exports.CostOptimizedStrategy = CostOptimizedStrategy;
class QualityOptimizedStrategy {
    async selectModel(prompt, options) {
        return { name: 'quality-optimized', cost: 0.01 };
    }
    evaluateModel(model, metrics) {
        return metrics.quality || 0;
    }
}
exports.QualityOptimizedStrategy = QualityOptimizedStrategy;
//# sourceMappingURL=model-selection.strategy.js.map