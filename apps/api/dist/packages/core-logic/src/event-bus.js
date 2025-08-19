"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventTypes = exports.eventBus = exports.EventBus = void 0;
const ioredis_1 = require("ioredis");
const events_1 = require("events");
class EventBus extends events_1.EventEmitter {
    constructor() {
        super();
        this.isConnected = false;
        this.redis = new ioredis_1.default({
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT || '6379'),
            retryDelayOnFailover: 100,
            maxRetriesPerRequest: 3
        });
        this.setupRedisListeners();
    }
    setupRedisListeners() {
        this.redis.on('connect', () => {
            this.isConnected = true;
            console.log('✅ Event Bus connected to Redis');
        });
        this.redis.on('error', (error) => {
            console.error('❌ Event Bus Redis error:', error);
            this.isConnected = false;
        });
    }
    async publish(event) {
        const fullEvent = {
            ...event,
            id: this.generateEventId(),
            timestamp: new Date()
        };
        try {
            await this.redis.xadd('system-events', '*', 'event', JSON.stringify(fullEvent));
            this.emit(event.type, fullEvent);
            this.emit('*', fullEvent);
            console.log(`📡 Event published: ${event.type}`);
        }
        catch (error) {
            console.error('❌ Failed to publish event:', error);
            throw error;
        }
    }
    subscribe(eventType, callback) {
        this.on(eventType, callback);
    }
    subscribeAll(callback) {
        this.on('*', callback);
    }
    unsubscribe(eventType, callback) {
        this.off(eventType, callback);
    }
    async startConsuming() {
        if (!this.isConnected) {
            throw new Error('Event Bus not connected to Redis');
        }
        console.log('🎧 Starting event consumption...');
        while (true) {
            try {
                const results = await this.redis.xread('BLOCK', 1000, 'STREAMS', 'system-events', '$');
                if (results) {
                    for (const [stream, messages] of results) {
                        for (const [id, fields] of messages) {
                            const eventData = JSON.parse(fields[1]);
                            this.emit(eventData.type, eventData);
                            this.emit('*', eventData);
                        }
                    }
                }
            }
            catch (error) {
                console.error('❌ Error consuming events:', error);
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        }
    }
    async getEventHistory(eventType, limit = 100) {
        try {
            const results = await this.redis.xrevrange('system-events', '+', '-', 'COUNT', limit);
            return results
                .map(([id, fields]) => JSON.parse(fields[1]))
                .filter(event => !eventType || event.type === eventType);
        }
        catch (error) {
            console.error('❌ Failed to get event history:', error);
            return [];
        }
    }
    async getEventStats() {
        try {
            const events = await this.getEventHistory();
            const byType = {};
            events.forEach(event => {
                byType[event.type] = (byType[event.type] || 0) + 1;
            });
            return {
                total: events.length,
                byType
            };
        }
        catch (error) {
            console.error('❌ Failed to get event stats:', error);
            return { total: 0, byType: {} };
        }
    }
    generateEventId() {
        return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    async close() {
        await this.redis.quit();
        this.isConnected = false;
        console.log('🔌 Event Bus disconnected');
    }
}
exports.EventBus = EventBus;
exports.eventBus = new EventBus();
exports.EventTypes = {
    LEAD_CREATED: 'crm.lead.created',
    LEAD_UPDATED: 'crm.lead.updated',
    LEAD_STAGE_CHANGED: 'crm.lead.stage_changed',
    OPPORTUNITY_WON: 'crm.opportunity.won',
    OPPORTUNITY_LOST: 'crm.opportunity.lost',
    USER_LOGIN: 'user.login',
    USER_ACTION: 'user.action',
    USER_LOGOUT: 'user.logout',
    SYSTEM_HEALTH: 'system.health',
    SYSTEM_ERROR: 'system.error',
    SYSTEM_WARNING: 'system.warning',
    AI_RECOMMENDATION: 'ai.recommendation',
    AI_ANALYSIS_COMPLETE: 'ai.analysis.complete',
    AI_PREDICTION: 'ai.prediction',
    WHATSAPP_MESSAGE_RECEIVED: 'whatsapp.message.received',
    WHATSAPP_MESSAGE_SENT: 'whatsapp.message.sent'
};
//# sourceMappingURL=event-bus.js.map