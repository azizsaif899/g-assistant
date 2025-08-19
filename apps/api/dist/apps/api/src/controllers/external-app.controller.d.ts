export declare class ExternalAppController {
    handleChat(body: {
        message: string;
    }): Promise<{
        response: string;
        timestamp: string;
    }>;
    cfoAgent(body: {
        query: string;
    }): Promise<{
        result: string;
        data: string;
    }>;
    developerAgent(body: {
        code: string;
    }): Promise<{
        analysis: string;
        code: string;
    }>;
    health(): Promise<{
        status: string;
        timestamp: string;
    }>;
}
