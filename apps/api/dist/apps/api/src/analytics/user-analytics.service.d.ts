interface AnalyticsEvent {
    userId: string;
    event: string;
    properties: Record<string, any>;
    timestamp: Date;
}
export declare class UserAnalyticsService {
    private events;
    trackEvent(event: AnalyticsEvent): Promise<void>;
    trackUserLogin(userId: string, ip: string): Promise<void>;
    trackConversation(userId: string, agent: string, mode: string): Promise<void>;
    getUserStats(userId: string): Promise<any>;
    getSystemStats(): Promise<any>;
}
export {};
