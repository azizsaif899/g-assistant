"use strict";
/**
 * 🚀 Event Bus المركزي - TASK-001
 * ناقل الأحداث المركزي للنظام الحقيقي
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventTypes = exports.eventBus = exports.EventBus = void 0;
const tslib_1 = require("tslib");
const ioredis_1 = tslib_1.__importDefault(require("ioredis"));
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
    /**
     * نشر حدث في النظام
     */
    async publish(event) {
        const fullEvent = {
            ...event,
            id: this.generateEventId(),
            timestamp: new Date()
        };
        try {
            // نشر في Redis Stream
            await this.redis.xadd('system-events', '*', 'event', JSON.stringify(fullEvent));
            // إشعار المستمعين المحليين
            this.emit(event.type, fullEvent);
            this.emit('*', fullEvent);
            console.log(`📡 Event published: ${event.type}`);
        }
        catch (error) {
            console.error('❌ Failed to publish event:', error);
            throw error;
        }
    }
    /**
     * الاستماع لنوع معين من الأحداث
     */
    subscribe(eventType, callback) {
        this.on(eventType, callback);
    }
    /**
     * الاستماع لجميع الأحداث
     */
    subscribeAll(callback) {
        this.on('*', callback);
    }
    /**
     * إلغاء الاستماع
     */
    unsubscribe(eventType, callback) {
        this.off(eventType, callback);
    }
    /**
     * بدء استهلاك الأحداث من Redis Stream
     */
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
    /**
     * الحصول على تاريخ الأحداث
     */
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
    /**
     * إحصائيات الأحداث
     */
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
    /**
     * إغلاق الاتصال
     */
    async close() {
        await this.redis.quit();
        this.isConnected = false;
        console.log('🔌 Event Bus disconnected');
    }
}
exports.EventBus = EventBus;
// Singleton instance
exports.eventBus = new EventBus();
// أنواع الأحداث المعرفة مسبقاً
exports.EventTypes = {
    // CRM Events
    LEAD_CREATED: 'crm.lead.created',
    LEAD_UPDATED: 'crm.lead.updated',
    LEAD_STAGE_CHANGED: 'crm.lead.stage_changed',
    OPPORTUNITY_WON: 'crm.opportunity.won',
    OPPORTUNITY_LOST: 'crm.opportunity.lost',
    // User Events
    USER_LOGIN: 'user.login',
    USER_ACTION: 'user.action',
    USER_LOGOUT: 'user.logout',
    // System Events
    SYSTEM_HEALTH: 'system.health',
    SYSTEM_ERROR: 'system.error',
    SYSTEM_WARNING: 'system.warning',
    // AI Events
    AI_RECOMMENDATION: 'ai.recommendation',
    AI_ANALYSIS_COMPLETE: 'ai.analysis.complete',
    AI_PREDICTION: 'ai.prediction',
    // WhatsApp Events
    WHATSAPP_MESSAGE_RECEIVED: 'whatsapp.message.received',
    WHATSAPP_MESSAGE_SENT: 'whatsapp.message.sent'
};
//# sourceMappingURL=event-bus.js.map