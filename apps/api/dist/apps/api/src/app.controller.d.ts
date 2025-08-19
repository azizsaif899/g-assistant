import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
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
