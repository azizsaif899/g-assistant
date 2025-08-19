"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const ai_engine_1 = require("@g-assistant-nx/ai-engine");
let AIService = class AIService {
    constructor() {
        this.mlModelManager = new ai_engine_1.MLModelManager();
        this.nlpProcessor = new ai_engine_1.NLPProcessor();
        this.predictiveAnalyzer = new ai_engine_1.PredictiveAnalyzer();
        this.initializeModels();
    }
    initializeModels() {
        this.mlModelManager.registerModel({
            id: 'sentiment_classifier',
            name: 'Sentiment Analysis Model',
            type: 'classification',
            version: '1.0.0',
            accuracy: 0.89,
            status: 'ready',
            metadata: { language: 'multilingual', classes: ['positive', 'negative', 'neutral'] }
        });
        this.mlModelManager.registerModel({
            id: 'user_behavior_predictor',
            name: 'User Behavior Prediction Model',
            type: 'recommendation',
            version: '1.2.0',
            accuracy: 0.82,
            status: 'ready',
            metadata: { features: ['activity', 'engagement', 'preferences'] }
        });
        this.mlModelManager.registerModel({
            id: 'system_load_predictor',
            name: 'System Load Prediction Model',
            type: 'regression',
            version: '2.1.0',
            accuracy: 0.91,
            status: 'ready',
            metadata: { metrics: ['cpu', 'memory', 'requests'] }
        });
        this.predictiveAnalyzer.addTimeSeriesData('system_cpu', [
            { timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), value: 45 },
            { timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000), value: 52 },
            { timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000), value: 48 },
            { timestamp: new Date(Date.now() - 21 * 60 * 60 * 1000), value: 55 },
            { timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000), value: 61 }
        ]);
    }
    async processText(text, language) {
        return this.nlpProcessor.processText(text, language);
    }
    async translateText(text, targetLanguage, sourceLanguage) {
        return this.nlpProcessor.translateText(text, targetLanguage, sourceLanguage);
    }
    async generateText(prompt, maxLength) {
        return this.nlpProcessor.generateText(prompt, maxLength);
    }
    async predictTimeSeries(seriesId, forecastHorizon) {
        return this.predictiveAnalyzer.predictTimeSeries(seriesId, forecastHorizon);
    }
    async predictUserBehavior(userId, features) {
        return this.predictiveAnalyzer.predictUserBehavior(userId, features);
    }
    async predictSystemLoad(metrics) {
        return this.predictiveAnalyzer.predictSystemLoad(metrics);
    }
    detectAnomaly(seriesId, value, timestamp) {
        return this.predictiveAnalyzer.detectAnomaly(seriesId, value, timestamp);
    }
    async trainModel(modelId, trainingData) {
        const success = await this.mlModelManager.trainModel(modelId, trainingData);
        return { success, message: success ? 'Model trained successfully' : 'Training failed' };
    }
    async predict(modelId, input) {
        return this.mlModelManager.predict(modelId, input);
    }
    getModels(type, status) {
        return this.mlModelManager.getModels(type, status);
    }
    getModel(id) {
        return this.mlModelManager.getModel(id);
    }
    getModelPerformance(id) {
        return this.mlModelManager.getModelPerformance(id);
    }
    getAIStatistics() {
        const models = this.mlModelManager.getModels();
        const readyModels = models.filter(m => m.status === 'ready');
        const trainingModels = models.filter(m => m.status === 'training');
        const averageAccuracy = models.length > 0
            ? models.reduce((sum, m) => sum + m.accuracy, 0) / models.length
            : 0;
        return {
            totalModels: models.length,
            readyModels: readyModels.length,
            trainingModels: trainingModels.length,
            averageAccuracy: Math.round(averageAccuracy * 100),
            supportedLanguages: this.nlpProcessor.getSupportedLanguages(),
            entityTypes: this.nlpProcessor.getEntityTypes(),
            capabilities: {
                nlp: true,
                prediction: true,
                anomalyDetection: true,
                translation: true,
                textGeneration: true
            }
        };
    }
    async analyzeUserQuery(query, userId) {
        const nlpResult = await this.processText(query);
        const response = {
            originalQuery: query,
            analysis: nlpResult,
            suggestedActions: this.getSuggestedActions(nlpResult),
            confidence: nlpResult.sentiment.score
        };
        return response;
    }
    getSuggestedActions(nlpResult) {
        const actions = [];
        if (nlpResult.intent?.name === 'question') {
            actions.push('Provide detailed answer', 'Suggest related topics');
        }
        if (nlpResult.intent?.name === 'complaint') {
            actions.push('Escalate to support', 'Offer solution');
        }
        if (nlpResult.sentiment.label === 'negative') {
            actions.push('Improve user experience', 'Follow up');
        }
        if (nlpResult.entities.length > 0) {
            actions.push('Extract relevant information', 'Personalize response');
        }
        return actions;
    }
    async getRecommendations(userId, context) {
        const userBehavior = await this.predictUserBehavior(userId, context);
        const recommendations = [];
        if (userBehavior.churnProbability > 0.7) {
            recommendations.push('Send retention offer', 'Provide premium support');
        }
        if (userBehavior.engagementScore < 0.5) {
            recommendations.push('Send engagement content', 'Recommend popular features');
        }
        recommendations.push(...userBehavior.recommendations);
        return {
            userId,
            recommendations: [...new Set(recommendations)],
            churnRisk: userBehavior.churnProbability > 0.5 ? 'high' : 'low',
            engagementLevel: userBehavior.engagementScore > 0.7 ? 'high' : 'medium'
        };
    }
};
exports.AIService = AIService;
exports.AIService = AIService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], AIService);
//# sourceMappingURL=ai.service.js.map