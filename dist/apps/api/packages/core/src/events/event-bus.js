"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventBus = exports.EventBus = void 0;
class EventBus {
    constructor() {
        this.listeners = new Map();
    }
    on(event, listener) {
        const eventListeners = this.listeners.get(event) || [];
        eventListeners.push(listener);
        this.listeners.set(event, eventListeners);
    }
    emit(event, data) {
        const eventListeners = this.listeners.get(event) || [];
        eventListeners.forEach(listener => {
            try {
                listener(data);
            }
            catch (error) {
                console.error(`Error in event listener for ${event}:`, error);
            }
        });
    }
    removeAllListeners() {
        this.listeners.clear();
    }
}
exports.EventBus = EventBus;
exports.eventBus = new EventBus();
//# sourceMappingURL=event-bus.js.map