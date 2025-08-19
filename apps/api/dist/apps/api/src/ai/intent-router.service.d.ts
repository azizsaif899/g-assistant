export interface QueryIntent {
    type: 'general' | 'technical' | 'financial' | 'research' | 'analysis' | 'translation';
    confidence: number;
    parameters?: Record<string, any>;
    suggestedAgent?: string;
    suggestedMode?: string;
}
export interface RoutingResult {
    intent: QueryIntent;
    route: {
        service: string;
        endpoint: string;
        agent?: string;
        mode?: string;
    };
    preprocessing?: {
        cleanedQuery: string;
        extractedEntities: any[];
    };
}
export declare class IntentRouterService {
    private geminiClient;
    constructor();
    routeQuery(query: string, context?: string): Promise<RoutingResult>;
    private detectIntent;
    private detectIntentByRules;
    private determineRoute;
    private preprocessQuery;
    private mapTypeToAgent;
    private mapTypeToMode;
    getStats(): any;
}
