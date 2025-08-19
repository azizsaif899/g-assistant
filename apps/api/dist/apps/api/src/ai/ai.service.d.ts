export declare class AIService {
    private mlModelManager;
    private nlpProcessor;
    private predictiveAnalyzer;
    constructor();
    private initializeModels;
    processText(text: string, language?: string): Promise<any>;
    translateText(text: string, targetLanguage: string, sourceLanguage?: string): Promise<any>;
    generateText(prompt: string, maxLength?: number): Promise<any>;
    predictTimeSeries(seriesId: string, forecastHorizon: number): Promise<any>;
    predictUserBehavior(userId: string, features: Record<string, number>): Promise<any>;
    predictSystemLoad(metrics: Record<string, number>): Promise<any>;
    detectAnomaly(seriesId: string, value: number, timestamp: Date): any;
    trainModel(modelId: string, trainingData: any): Promise<{
        success: any;
        message: string;
    }>;
    predict(modelId: string, input: any): Promise<any>;
    getModels(type?: any, status?: any): any;
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
    analyzeUserQuery(query: string, userId?: string): Promise<{
        originalQuery: string;
        analysis: any;
        suggestedActions: string[];
        confidence: any;
    }>;
    private getSuggestedActions;
    getRecommendations(userId: string, context: Record<string, any>): Promise<{
        userId: string;
        recommendations: any[];
        churnRisk: string;
        engagementLevel: string;
    }>;
}
