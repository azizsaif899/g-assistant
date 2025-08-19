/**
 * Python Backend Service - واجهة للتفاعل مع Python Backend
 */
import { ResearchResult } from '../typescript-agent/types';
export declare class PythonBackendService {
    private baseUrl;
    private apiKey;
    constructor(baseUrl: string | undefined, apiKey: string);
    research(query: string): Promise<ResearchResult>;
    healthCheck(): Promise<boolean>;
}
export default PythonBackendService;
//# sourceMappingURL=PythonBackendService.d.ts.map