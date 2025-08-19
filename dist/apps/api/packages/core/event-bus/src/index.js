"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventBus = exports.EventBus = void 0;
const events_1 = require("events");
class EventBus extends events_1.EventEmitter {
    static getInstance() {
        if (!EventBus.instance) {
            EventBus.instance = new EventBus();
        }
        return EventBus.instance;
    }
    publish(event, data) {
        this.emit(event, data);
    }
    subscribe(event, handler) {
        this.on(event, handler);
    }
    unsubscribe(event, handler) {
        this.off(event, handler);
    }
}
exports.EventBus = EventBus;
exports.eventBus = EventBus.getInstance();
//# sourceMappingURL=index.js.map