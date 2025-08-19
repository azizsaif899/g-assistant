"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIEngine = exports.PredictiveAnalyzer = exports.NLPProcessor = exports.MLModelManager = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./embedding.service"), exports);
tslib_1.__exportStar(require("./model-optimizer"), exports);
tslib_1.__exportStar(require("./dynamic-model-selector"), exports);
tslib_1.__exportStar(require("./advanced-chatbot"), exports);
tslib_1.__exportStar(require("./advanced-core"), exports);
tslib_1.__exportStar(require("./long-context.service"), exports);
tslib_1.__exportStar(require("./tool-use.orchestrator"), exports);
// Missing exports for API
class MLModelManager {
    async loadModel(name) { return { name, loaded: true }; }
    async predict(data) { return { prediction: 'mock' }; }
}
exports.MLModelManager = MLModelManager;
class NLPProcessor {
    async processText(text) { return { processed: text, tokens: text.split(' ') }; }
    async analyze(text) { return { sentiment: 'positive', entities: [] }; }
}
exports.NLPProcessor = NLPProcessor;
class PredictiveAnalyzer {
    async analyze(data) { return { prediction: 'mock', confidence: 0.95 }; }
    async forecast(data) { return { forecast: [1, 2, 3], accuracy: 0.9 }; }
}
exports.PredictiveAnalyzer = PredictiveAnalyzer;
const dynamic_model_selector_1 = require("./dynamic-model-selector");
const model_optimizer_1 = require("./model-optimizer");
const embedding_service_1 = require("./embedding.service");
class AIEngine {
    constructor(apiKey) {
        this.modelSelector = new dynamic_model_selector_1.DynamicModelSelector();
        this.optimizer = new model_optimizer_1.ModelOptimizer();
        this.embeddingService = new embedding_service_1.EmbeddingService(apiKey);
    }
    async processQuery(prompt, options = {}) {
        console.log('🤖 AI Engine processing query...');
        const selection = await this.modelSelector.selectBestModel(prompt, options);
        console.log(`✅ Selected model: ${selection.model.name}`);
        console.log(`💡 Reason: ${selection.reason}`);
        console.log(`💰 Cost: $${selection.metrics.cost.toFixed(4)}`);
        return {
            model: selection.model.name,
            response: `Mock response using ${selection.model.name}`,
            metrics: selection.metrics,
            reason: selection.reason
        };
    }
    async generateEmbedding(text, taskType = 'SEMANTIC_SIMILARITY') {
        return await this.embeddingService.generateEmbedding(text, taskType);
    }
    getModelStats() {
        return this.modelSelector.getModelStats();
    }
}
exports.AIEngine = AIEngine;
//# sourceMappingURL=index.js.map