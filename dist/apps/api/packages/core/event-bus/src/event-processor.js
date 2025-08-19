"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventProcessor = exports.EventProcessor = void 0;
class EventProcessor {
    constructor() {
        this.handlers = new Map();
        this.eventQueue = [];
        this.isProcessing = false;
    }
    subscribe(eventType, handler) {
        if (!this.handlers.has(eventType)) {
            this.handlers.set(eventType, []);
        }
        this.handlers.get(eventType).push(handler);
        // Return unsubscribe function
        return () => {
            const handlers = this.handlers.get(eventType);
            if (handlers) {
                const index = handlers.indexOf(handler);
                if (index > -1) {
                    handlers.splice(index, 1);
                }
            }
        };
    }
    async publish(event) {
        this.eventQueue.push(event);
        if (!this.isProcessing) {
            await this.processQueue();
        }
    }
    async processQueue() {
        this.isProcessing = true;
        while (this.eventQueue.length > 0) {
            const event = this.eventQueue.shift();
            await this.processEvent(event);
        }
        this.isProcessing = false;
    }
    async processEvent(event) {
        const handlers = this.handlers.get(event.type) || [];
        const promises = handlers.map(async (handler) => {
            try {
                await handler(event);
            }
            catch (error) {
                console.error(`Error processing event ${event.type}:`, error);
            }
        });
        await Promise.all(promises);
    }
    getEventStats() {
        return {
            totalEvents: 0, // يمكن تتبعها لاحقاً
            queueSize: this.eventQueue.length,
            handlerCount: Array.from(this.handlers.values()).reduce((sum, handlers) => sum + handlers.length, 0)
        };
    }
}
exports.EventProcessor = EventProcessor;
exports.eventProcessor = new EventProcessor();
//# sourceMappingURL=event-processor.js.map