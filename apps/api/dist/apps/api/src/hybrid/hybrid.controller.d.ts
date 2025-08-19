export declare class HybridController {
    getGeminiResearch(query: string): Promise<{
        success: boolean;
        query: string;
        results: {
            title: string;
            content: string;
            source: string;
            confidence: number;
        }[];
        citations: string[];
        timestamp: string;
    }>;
    getLangGraphWorkflow(workflowData: any): Promise<{
        success: boolean;
        workflowId: string;
        status: string;
        steps: {
            step: number;
            action: string;
            status: string;
        }[];
        result: string;
        timestamp: string;
    }>;
    healthCheck(): Promise<{
        status: string;
        services: {
            'gemini-research-agent': string;
            'langgraph-workflow': string;
            'october-implementation': string;
        };
        timestamp: string;
    }>;
}
