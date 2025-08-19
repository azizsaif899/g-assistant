"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const ai_service_1 = require("./ai.service");
let AIController = class AIController {
    constructor(aiService) {
        this.aiService = aiService;
    }
    async processText(data) {
        return this.aiService.processText(data.text, data.language);
    }
    async translateText(data) {
        return this.aiService.translateText(data.text, data.targetLanguage, data.sourceLanguage);
    }
    async generateText(data) {
        return this.aiService.generateText(data.prompt, data.maxLength);
    }
    async predictTimeSeries(data) {
        return this.aiService.predictTimeSeries(data.seriesId, data.forecastHorizon);
    }
    async predictUserBehavior(data) {
        return this.aiService.predictUserBehavior(data.userId, data.features);
    }
    async predictSystemLoad(data) {
        return this.aiService.predictSystemLoad(data.metrics);
    }
    async detectAnomaly(data) {
        const timestamp = data.timestamp ? new Date(data.timestamp) : new Date();
        return this.aiService.detectAnomaly(data.seriesId, data.value, timestamp);
    }
    async trainModel(data) {
        return this.aiService.trainModel(data.modelId, data.trainingData);
    }
    async predict(data) {
        return this.aiService.predict(data.modelId, data.input);
    }
    getModels(type, status) {
        return this.aiService.getModels(type, status);
    }
    getModel(id) {
        return this.aiService.getModel(id);
    }
    getModelPerformance(id) {
        return this.aiService.getModelPerformance(id);
    }
    getAIStatistics() {
        return this.aiService.getAIStatistics();
    }
};
exports.AIController = AIController;
tslib_1.__decorate([
    (0, common_1.Post)('nlp/process'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AIController.prototype, "processText", null);
tslib_1.__decorate([
    (0, common_1.Post)('nlp/translate'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AIController.prototype, "translateText", null);
tslib_1.__decorate([
    (0, common_1.Post)('nlp/generate'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AIController.prototype, "generateText", null);
tslib_1.__decorate([
    (0, common_1.Post)('predict/timeseries'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AIController.prototype, "predictTimeSeries", null);
tslib_1.__decorate([
    (0, common_1.Post)('predict/user-behavior'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AIController.prototype, "predictUserBehavior", null);
tslib_1.__decorate([
    (0, common_1.Post)('predict/system-load'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AIController.prototype, "predictSystemLoad", null);
tslib_1.__decorate([
    (0, common_1.Post)('anomaly/detect'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AIController.prototype, "detectAnomaly", null);
tslib_1.__decorate([
    (0, common_1.Post)('models/train'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AIController.prototype, "trainModel", null);
tslib_1.__decorate([
    (0, common_1.Post)('models/predict'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AIController.prototype, "predict", null);
tslib_1.__decorate([
    (0, common_1.Get)('models'),
    tslib_1.__param(0, (0, common_1.Query)('type')),
    tslib_1.__param(1, (0, common_1.Query)('status')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", void 0)
], AIController.prototype, "getModels", null);
tslib_1.__decorate([
    (0, common_1.Get)('models/:id'),
    tslib_1.__param(0, (0, common_1.Query)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], AIController.prototype, "getModel", null);
tslib_1.__decorate([
    (0, common_1.Get)('models/:id/performance'),
    tslib_1.__param(0, (0, common_1.Query)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], AIController.prototype, "getModelPerformance", null);
tslib_1.__decorate([
    (0, common_1.Get)('statistics'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AIController.prototype, "getAIStatistics", null);
exports.AIController = AIController = tslib_1.__decorate([
    (0, common_1.Controller)('ai'),
    tslib_1.__metadata("design:paramtypes", [ai_service_1.AIService])
], AIController);
//# sourceMappingURL=ai.controller.js.map