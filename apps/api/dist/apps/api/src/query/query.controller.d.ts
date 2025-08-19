import { QueryService } from './query.service';
import { QueryDto } from './dto/query.dto';
export declare class QueryController {
    private readonly queryService;
    constructor(queryService: QueryService);
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
