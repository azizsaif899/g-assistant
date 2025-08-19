export declare class AppService {
    getHello(): string;
    getHealth(): {
        status: string;
        timestamp: string;
        uptime: number;
        version: string;
        environment: string;
        services: {
            api: string;
            auth: string;
            query: string;
        };
    };
}
