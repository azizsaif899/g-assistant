export interface ConversationTurn {
    id: string;
    userMessage: string;
    aiResponse: string;
    timestamp: Date;
    context?: any;
    intent?: string;
    sentiment?: 'positive' | 'negative' | 'neutral';
}
export interface ConversationSession {
    sessionId: string;
    userId: string;
    turns: ConversationTurn[];
    context: {
        topics: string[];
        preferences: Record<string, any>;
        lastActivity: Date;
    };
    metadata: {
        totalTurns: number;
        avgResponseTime: number;
        satisfaction?: number;
    };
}
export declare class ConversationMemoryService {
    private sessions;
    private readonly MAX_TURNS_PER_SESSION;
    private readonly SESSION_TIMEOUT;
    createSession(userId: string): string;
    addTurn(sessionId: string, userMessage: string, aiResponse: string, context?: any): void;
    getContext(sessionId: string): string;
    getSession(sessionId: string): ConversationSession | null;
    updatePreference(sessionId: string, key: string, value: any): void;
    cleanupExpiredSessions(): void;
    private extractIntent;
    private analyzeSentiment;
    private extractTopics;
    getStats(): any;
}
