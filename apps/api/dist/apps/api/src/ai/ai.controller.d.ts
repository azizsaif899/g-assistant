import { AIService } from './ai.service';
export declare class AIController {
    private readonly aiService;
    constructor(aiService: AIService);
    processText(data: {
        text: string;
        language?: string;
    }): Promise<any>;
    translateText(data: {
        text: string;
        targetLanguage: string;
        sourceLanguage?: string;
    }): Promise<any>;
    generateText(data: {
        prompt: string;
        maxLength?: number;
    }): Promise<any>;
    predictTimeSeries(data: {
        seriesId: string;
        forecastHorizon: number;
    }): Promise<any>;
    predictUserBehavior(data: {
        userId: string;
        features: Record<string, number>;
    }): Promise<any>;
    predictSystemLoad(data: {
        metrics: Record<string, number>;
    }): Promise<any>;
    detectAnomaly(data: {
        seriesId: string;
        value: number;
        timestamp?: string;
    }): Promise<any>;
    trainModel(data: {
        modelId: string;
        trainingData: any;
    }): Promise<{
        success: any;
        message: string;
    }>;
    predict(data: {
        modelId: string;
        input: any;
    }): Promise<any>;
    getModels(type?: string, status?: string): any;
    getModel(id: string): any;
    getModelPerformance(id: string): any;
    getAIStatistics(): {
        totalModels: any;
        readyModels: any;
        trainingModels: any;
        averageAccuracy: number;
        supportedLanguages: any;
        entityTypes: any;
        capabilities: {
            nlp: boolean;
            prediction: boolean;
            anomalyDetection: boolean;
            translation: boolean;
            textGeneration: boolean;
        };
    };
}
