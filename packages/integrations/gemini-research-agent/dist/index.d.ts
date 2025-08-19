/**
 * Gemini Research Agent - نظام البحث الذكي المتقدم
 * تحويل من Python LangGraph إلى TypeScript مع الحفاظ على جميع الوظائف
 */
export * from './typescript-agent/GeminiResearchAgent';
export * from './typescript-agent/types';
export * from './typescript-agent/utils';
export { default as PythonBackendService } from './services/PythonBackendService';
export * from './frontend-components';
export { GeminiResearchAgent as default } from './typescript-agent/GeminiResearchAgent';
export interface GeminiResearchConfig {
    geminiApiKey: string;
    googleSearchApiKey?: string;
    maxResearchLoops?: number;
    initialQueryCount?: number;
    enablePythonBackend?: boolean;
    enableReactFrontend?: boolean;
}
export interface ResearchResult {
    answer: string;
    sources: Source[];
    searchQueries: string[];
    researchLoops: number;
    confidence: number;
    timestamp: Date;
}
export interface Source {
    url: string;
    title: string;
    snippet: string;
    shortUrl?: string;
    relevanceScore: number;
}
export interface SearchQuery {
    query: string;
    id: number;
    results?: SearchResult[];
}
export interface SearchResult {
    title: string;
    url: string;
    snippet: string;
    metadata?: any;
}
export declare class GeminiResearchSystem {
    private config;
    private pythonService?;
    private typescriptAgent?;
    constructor(config: GeminiResearchConfig);
    initialize(): Promise<void>;
    research(query: string): Promise<ResearchResult>;
}
//# sourceMappingURL=index.d.ts.map