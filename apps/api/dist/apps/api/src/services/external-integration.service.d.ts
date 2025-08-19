export declare class ExternalIntegrationService {
    processChat(message: string): Promise<{
        response: string;
        timestamp: Date;
    }>;
    processCFO(query: string): Promise<{
        analysis: string;
        data: string;
    }>;
    processDeveloper(code: string): Promise<{
        review: string;
        code: string;
    }>;
}
