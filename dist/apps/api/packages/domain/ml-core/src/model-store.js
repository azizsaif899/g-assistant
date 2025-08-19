"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelStore = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let ModelStore = class ModelStore {
    constructor() {
        this.models = new Map();
        this.modelMetadata = new Map();
    }
    async saveModel(modelId, modelData, metadata) {
        this.models.set(modelId, modelData);
        this.modelMetadata.set(modelId, {
            ...metadata,
            savedAt: new Date(),
            version: this.getNextVersion(modelId)
        });
    }
    async loadModel(modelId) {
        const model = this.models.get(modelId);
        if (!model) {
            throw new Error(`Model ${modelId} not found`);
        }
        return model;
    }
    async getModelMetadata(modelId) {
        return this.modelMetadata.get(modelId);
    }
    async listModels() {
        const modelList = [];
        for (const [id, metadata] of this.modelMetadata.entries()) {
            modelList.push({ id, ...metadata });
        }
        return modelList;
    }
    async deleteModel(modelId) {
        this.models.delete(modelId);
        this.modelMetadata.delete(modelId);
    }
    getNextVersion(modelId) {
        const existing = this.modelMetadata.get(modelId);
        return existing ? existing.version + 1 : 1;
    }
};
exports.ModelStore = ModelStore;
exports.ModelStore = ModelStore = tslib_1.__decorate([
    (0, common_1.Injectable)()
], ModelStore);
//# sourceMappingURL=model-store.js.map