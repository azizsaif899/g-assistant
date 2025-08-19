interface CacheEntry {
    key: string;
    response: string;
    timestamp: Date;
    hitCount: number;
    expiresAt: Date;
    metadata?: {
        queryType: string;
        responseTime: number;
        confidence: number;
    };
}
export declare class ResponseCacheService {
    private cache;
    private readonly DEFAULT_TTL;
    private readonly MAX_CACHE_SIZE;
    private readonly CLEANUP_INTERVAL;
    constructor();
    generateCacheKey(query: string, context?: string): string;
    get(query: string, context?: string): Promise<string | null>;
    set(query: string, response: string, context?: string, ttl?: number, metadata?: CacheEntry['metadata']): Promise<void>;
    invalidate(query: string, context?: string): Promise<boolean>;
    invalidatePattern(pattern: string): Promise<number>;
    clear(): Promise<void>;
    private normalizeQuery;
    private evictLeastUsed;
    private startCleanupTimer;
    private cleanup;
    getStats(): any;
    getTopQueries(limit?: number): Array<{
        query: string;
        hits: number;
    }>;
    warmCache(commonQueries: Array<{
        query: string;
        response: string;
        context?: string;
    }>): Promise<void>;
    exportCache(): any;
    importCache(data: any): void;
}
export {};
