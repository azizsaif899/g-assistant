"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wsClient = exports.WebSocketClient = void 0;
class WebSocketClient {
    constructor(config) {
        this.ws = null;
        this.reconnectAttempts = 0;
        this.reconnectTimer = null;
        this.heartbeatTimer = null;
        this.messageHandlers = new Map();
        this.connectionState = 'disconnected';
        this.config = {
            reconnectInterval: 5000,
            maxReconnectAttempts: 10,
            heartbeatInterval: 30000,
            ...config
        };
    }
    async connect() {
        if (this.connectionState === 'connected' || this.connectionState === 'connecting') {
            return;
        }
        this.connectionState = 'connecting';
        try {
            this.ws = new WebSocket(this.config.url);
            this.ws.onopen = () => {
                console.log('WebSocket connected');
                this.connectionState = 'connected';
                this.reconnectAttempts = 0;
                this.startHeartbeat();
                this.emit('connected', {});
            };
            this.ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    this.handleMessage(data);
                }
                catch (error) {
                    console.error('Failed to parse WebSocket message:', error);
                }
            };
            this.ws.onclose = () => {
                console.log('WebSocket disconnected');
                this.connectionState = 'disconnected';
                this.stopHeartbeat();
                this.emit('disconnected', {});
                this.attemptReconnect();
            };
            this.ws.onerror = (error) => {
                console.error('WebSocket error:', error);
                this.emit('error', { error });
            };
        }
        catch (error) {
            this.connectionState = 'disconnected';
            throw error;
        }
    }
    handleMessage(data) {
        if (data.type === 'pong') {
            // Heartbeat response
            return;
        }
        const handlers = this.messageHandlers.get(data.type) || [];
        handlers.forEach(handler => {
            try {
                handler(data);
            }
            catch (error) {
                console.error(`Error in WebSocket handler for ${data.type}:`, error);
            }
        });
    }
    attemptReconnect() {
        if (this.reconnectAttempts >= this.config.maxReconnectAttempts) {
            console.error('Max reconnection attempts reached');
            return;
        }
        this.connectionState = 'reconnecting';
        this.reconnectAttempts++;
        console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.config.maxReconnectAttempts})`);
        this.reconnectTimer = setTimeout(() => {
            this.connect().catch(error => {
                console.error('Reconnection failed:', error);
            });
        }, this.config.reconnectInterval);
    }
    startHeartbeat() {
        this.heartbeatTimer = setInterval(() => {
            if (this.ws?.readyState === WebSocket.OPEN) {
                this.ws.send(JSON.stringify({ type: 'ping' }));
            }
        }, this.config.heartbeatInterval);
    }
    stopHeartbeat() {
        if (this.heartbeatTimer) {
            clearInterval(this.heartbeatTimer);
            this.heartbeatTimer = null;
        }
    }
    subscribe(eventType, handler) {
        if (!this.messageHandlers.has(eventType)) {
            this.messageHandlers.set(eventType, []);
        }
        this.messageHandlers.get(eventType).push(handler);
        return () => {
            const handlers = this.messageHandlers.get(eventType);
            if (handlers) {
                const index = handlers.indexOf(handler);
                if (index > -1) {
                    handlers.splice(index, 1);
                }
            }
        };
    }
    emit(eventType, data) {
        const handlers = this.messageHandlers.get(eventType) || [];
        handlers.forEach(handler => handler(data));
    }
    send(data) {
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(data));
        }
        else {
            console.warn('WebSocket is not connected');
        }
    }
    disconnect() {
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }
        this.stopHeartbeat();
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
        this.connectionState = 'disconnected';
        this.messageHandlers.clear();
    }
    getConnectionState() {
        return this.connectionState;
    }
}
exports.WebSocketClient = WebSocketClient;
// إنشاء عميل WebSocket عام
exports.wsClient = new WebSocketClient({
    url: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001/ws'
});
//# sourceMappingURL=websocket-client.js.map