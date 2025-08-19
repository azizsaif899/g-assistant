export declare class HealthController {
    private rpcClient;
    private cache;
    healthCheck(): Promise<{
        timestamp: string;
        status: string;
        services: {
            api: boolean;
            odoo: boolean;
            redis: boolean;
        };
    }>;
    readinessCheck(): Promise<{
        status: string;
        timestamp: string;
    }>;
}
