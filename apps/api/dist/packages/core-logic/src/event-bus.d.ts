import { EventEmitter } from 'events';
export interface SystemEvent {
    id: string;
    type: string;
    source: string;
    data: any;
    timestamp: Date;
    userId?: string;
}
export declare class EventBus extends EventEmitter {
    private redis;
    private isConnected;
    constructor();
    private setupRedisListeners;
    publish(event: Omit<SystemEvent, 'id' | 'timestamp'>): Promise<void>;
    subscribe(eventType: string, callback: (event: SystemEvent) => void): void;
    subscribeAll(callback: (event: SystemEvent) => void): void;
    unsubscribe(eventType: string, callback: (event: SystemEvent) => void): void;
    startConsuming(): Promise<void>;
    getEventHistory(eventType?: string, limit?: number): Promise<SystemEvent[]>;
    getEventStats(): Promise<{
        total: number;
        byType: Record<string, number>;
    }>;
    private generateEventId;
    close(): Promise<void>;
}
export declare const eventBus: EventBus;
export declare const EventTypes: {
    readonly LEAD_CREATED: "crm.lead.created";
    readonly LEAD_UPDATED: "crm.lead.updated";
    readonly LEAD_STAGE_CHANGED: "crm.lead.stage_changed";
    readonly OPPORTUNITY_WON: "crm.opportunity.won";
    readonly OPPORTUNITY_LOST: "crm.opportunity.lost";
    readonly USER_LOGIN: "user.login";
    readonly USER_ACTION: "user.action";
    readonly USER_LOGOUT: "user.logout";
    readonly SYSTEM_HEALTH: "system.health";
    readonly SYSTEM_ERROR: "system.error";
    readonly SYSTEM_WARNING: "system.warning";
    readonly AI_RECOMMENDATION: "ai.recommendation";
    readonly AI_ANALYSIS_COMPLETE: "ai.analysis.complete";
    readonly AI_PREDICTION: "ai.prediction";
    readonly WHATSAPP_MESSAGE_RECEIVED: "whatsapp.message.received";
    readonly WHATSAPP_MESSAGE_SENT: "whatsapp.message.sent";
};
