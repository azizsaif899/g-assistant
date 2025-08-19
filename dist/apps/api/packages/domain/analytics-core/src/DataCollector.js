"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataCollector = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const uuid_1 = require("uuid");
class DataCollector {
    constructor(storage) {
        this.storage = storage;
        this.eventStream = new rxjs_1.Subject();
        this.config = new rxjs_1.BehaviorSubject({
            enableRealtime: true,
            batchSize: 100,
            retentionDays: 90,
            enablePredictive: true
        });
    }
    // جمع الأحداث
    track(eventType, userId, properties = {}) {
        const event = {
            id: (0, uuid_1.v4)(),
            userId,
            eventType,
            timestamp: new Date(),
            properties,
            sessionId: this.getSessionId(userId)
        };
        this.eventStream.next(event);
    }
    // معالجة الأحداث بالدفعات
    getBatchedEvents() {
        return this.eventStream.pipe((0, operators_1.buffer)(this.eventStream.pipe((0, operators_1.debounceTime)(1000))), (0, operators_1.filter)(events => events.length > 0));
    }
    // الأحداث المباشرة
    getRealTimeEvents() {
        return this.eventStream.asObservable();
    }
    // تتبع أحداث المستخدم
    trackUserAction(userId, action, data) {
        this.track('user_action', userId, { action, ...data });
    }
    // تتبع أحداث النظام
    trackSystemEvent(eventType, data) {
        this.track('system_event', 'system', { eventType, ...data });
    }
    // تتبع أحداث الأعمال
    trackBusinessEvent(eventType, userId, value, data) {
        this.track('business_event', userId, { eventType, value, ...data });
    }
    getSessionId(userId) {
        // منطق بسيط لإدارة الجلسات
        const sessionKey = `session_${userId}`;
        let sessionId = localStorage.getItem(sessionKey);
        if (!sessionId) {
            sessionId = (0, uuid_1.v4)();
            localStorage.setItem(sessionKey, sessionId);
        }
        return sessionId;
    }
    // حفظ الأحداث
    async saveEvents(events) {
        await this.storage.saveEvents(events);
    }
    // استرجاع الأحداث
    async getEvents(userId, timeRange) {
        return this.storage.getEvents(userId, timeRange);
    }
}
exports.DataCollector = DataCollector;
//# sourceMappingURL=DataCollector.js.map