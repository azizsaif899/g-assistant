import { QueryDto } from './dto/query.dto';
import { AiCoreService } from '@g-assistant-nx/core-logic';
export declare class QueryService {
    private readonly aiCoreService;
    constructor(aiCoreService: AiCoreService);
    processQuery(queryDto: QueryDto): Promise<{
        success: any;
        query: string;
        response: any;
        timestamp: any;
        processingTime: any;
        confidence: any;
        context: string;
        sessionId: any;
    }>;
    analyzeData(data: any): Promise<{
        success: boolean;
        analysis: {
            dataPoints: number;
            summary: string;
            insights: string[];
            recommendations: string[];
        };
        timestamp: string;
    }>;
}
