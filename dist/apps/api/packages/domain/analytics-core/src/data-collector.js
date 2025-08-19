"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataCollector = void 0;
const events_1 = require("events");
class DataCollector extends events_1.EventEmitter {
    constructor() {
        super();
        this.events = [];
        this.batchSize = 100;
        this.flushInterval = 5000; // 5 seconds
        this.startBatchProcessor();
    }
    async collect(event) {
        // Validate event
        if (!this.validateEvent(event)) {
            throw new Error('Invalid event data');
        }
        // Add timestamp if not provided
        if (!event.timestamp) {
            event.timestamp = new Date();
        }
        // Store event
        this.events.push(event);
        // Emit for real-time processing
        this.emit('event', event);
        // Flush if batch is full
        if (this.events.length >= this.batchSize) {
            await this.flush();
        }
    }
    async getUserEvents(userId, timeRange) {
        let filtered = this.events.filter(event => event.userId === userId);
        if (timeRange) {
            filtered = filtered.filter(event => event.timestamp >= timeRange.start &&
                event.timestamp <= timeRange.end);
        }
        return filtered.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    }
    async getEventsByType(eventType, timeRange) {
        let filtered = this.events.filter(event => event.eventType === eventType);
        if (timeRange) {
            filtered = filtered.filter(event => event.timestamp >= timeRange.start &&
                event.timestamp <= timeRange.end);
        }
        return filtered;
    }
    async getEventsInTimeRange(timeRange) {
        return this.events.filter(event => event.timestamp >= timeRange.start &&
            event.timestamp <= timeRange.end);
    }
    validateEvent(event) {
        return !!(event.id &&
            event.userId &&
            event.eventType &&
            typeof event.properties === 'object');
    }
    startBatchProcessor() {
        this.timer = setInterval(async () => {
            if (this.events.length > 0) {
                await this.flush();
            }
        }, this.flushInterval);
    }
    async flush() {
        if (this.events.length === 0)
            return;
        const batch = [...this.events];
        this.events = [];
        // Emit batch for processing
        this.emit('batch', batch);
        // Here you would typically send to a database or external service
        console.log(`Flushed ${batch.length} events`);
    }
    destroy() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.removeAllListeners();
    }
}
exports.DataCollector = DataCollector;
//# sourceMappingURL=data-collector.js.map