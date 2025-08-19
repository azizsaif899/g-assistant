"use strict";
/**
 * 🔄 WebSocket Client - TASK-004
 * عميل WebSocket للتحديثات الفورية
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketMessageTypes = exports.systemWebSocket = exports.createWebSocketClient = exports.WebSocketClient = void 0;
const event_bus_1 = require("./event-bus");
class WebSocketClient {
    constructor(config) {
        this.ws = null;
        this.reconnectAttempts = 0;
        this.isConnected = false;
        this.reconnectTimer = null;
        this.heartbeatTimer = null;
        this.config = {
            reconnectInterval: 5000,
            maxReconnectAttempts: 10,
            ...config
        };
    }
    /**
     * الاتصال بالخادم
     */
    connect() {
        return new Promise((resolve, reject) => {
            try {
                this.ws = new WebSocket(this.config.url);
                this.ws.onopen = () => {
                    console.log('✅ WebSocket connected');
                    this.isConnected = true;
                    this.reconnectAttempts = 0;
                    this.startHeartbeat();
                    // إرسال مصادقة إذا كان هناك API key
                    if (this.config.apiKey) {
                        this.send({
                            type: 'auth',
                            apiKey: this.config.apiKey
                        });
                    }
                    resolve();
                };
                this.ws.onmessage = (event) => {
                    this.handleMessage(event.data);
                };
                this.ws.onclose = (event) => {
                    console.log('🔌 WebSocket disconnected:', event.code, event.reason);
                    this.isConnected = false;
                    this.stopHeartbeat();
                    if (!event.wasClean && this.shouldReconnect()) {
                        this.scheduleReconnect();
                    }
                };
                this.ws.onerror = (error) => {
                    console.error('❌ WebSocket error:', error);
                    reject(error);
                };
            }
            catch (error) {
                reject(error);
            }
        });
    }
    /**
     * قطع الاتصال
     */
    disconnect() {
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }
        this.stopHeartbeat();
        if (this.ws) {
            this.ws.close(1000, 'Client disconnect');
            this.ws = null;
        }
        this.isConnected = false;
    }
    /**
     * إرسال رسالة
     */
    send(data) {
        if (!this.isConnected || !this.ws) {
            console.warn('⚠️ WebSocket not connected, message queued');
            return false;
        }
        try {
            this.ws.send(JSON.stringify(data));
            return true;
        }
        catch (error) {
            console.error('❌ Failed to send WebSocket message:', error);
            return false;
        }
    }
    /**
     * الاشتراك في قناة
     */
    subscribe(channel) {
        this.send({
            type: 'subscribe',
            channel
        });
    }
    /**
     * إلغاء الاشتراك من قناة
     */
    unsubscribe(channel) {
        this.send({
            type: 'unsubscribe',
            channel
        });
    }
    /**
     * معالجة الرسائل الواردة
     */
    handleMessage(data) {
        try {
            const message = JSON.parse(data);
            switch (message.type) {
                case 'event':
                    // نشر الحدث في Event Bus المحلي
                    event_bus_1.eventBus.emit(message.eventType, message.data);
                    break;
                case 'heartbeat':
                    // رد على heartbeat
                    this.send({ type: 'heartbeat_ack' });
                    break;
                case 'auth_success':
                    console.log('✅ WebSocket authenticated');
                    break;
                case 'auth_failed':
                    console.error('❌ WebSocket authentication failed');
                    break;
                case 'error':
                    console.error('❌ WebSocket server error:', message.error);
                    break;
                default:
                    console.log('📨 WebSocket message:', message);
            }
        }
        catch (error) {
            console.error('❌ Failed to parse WebSocket message:', error);
        }
    }
    /**
     * بدء heartbeat
     */
    startHeartbeat() {
        this.heartbeatTimer = setInterval(() => {
            if (this.isConnected) {
                this.send({ type: 'heartbeat' });
            }
        }, 30000); // كل 30 ثانية
    }
    /**
     * إيقاف heartbeat
     */
    stopHeartbeat() {
        if (this.heartbeatTimer) {
            clearInterval(this.heartbeatTimer);
            this.heartbeatTimer = null;
        }
    }
    /**
     * تحديد ما إذا كان يجب إعادة الاتصال
     */
    shouldReconnect() {
        return this.reconnectAttempts < (this.config.maxReconnectAttempts || 10);
    }
    /**
     * جدولة إعادة الاتصال
     */
    scheduleReconnect() {
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
        }
        const delay = Math.min((this.config.reconnectInterval || 5000) * Math.pow(2, this.reconnectAttempts), 30000 // حد أقصى 30 ثانية
        );
        console.log(`🔄 Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts + 1})`);
        this.reconnectTimer = setTimeout(() => {
            this.reconnectAttempts++;
            this.connect().catch(error => {
                console.error('❌ Reconnection failed:', error);
                if (this.shouldReconnect()) {
                    this.scheduleReconnect();
                }
            });
        }, delay);
    }
    /**
     * الحصول على حالة الاتصال
     */
    getConnectionState() {
        return {
            connected: this.isConnected,
            reconnectAttempts: this.reconnectAttempts,
            readyState: this.ws?.readyState
        };
    }
}
exports.WebSocketClient = WebSocketClient;
// إنشاء عميل WebSocket عام
const createWebSocketClient = (config) => {
    return new WebSocketClient(config);
};
exports.createWebSocketClient = createWebSocketClient;
// عميل WebSocket افتراضي للنظام
exports.systemWebSocket = new WebSocketClient({
    url: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001/ws',
    apiKey: process.env.NEXT_PUBLIC_WS_API_KEY
});
// تصدير أنواع الرسائل
exports.WebSocketMessageTypes = {
    AUTH: 'auth',
    SUBSCRIBE: 'subscribe',
    UNSUBSCRIBE: 'unsubscribe',
    EVENT: 'event',
    HEARTBEAT: 'heartbeat',
    ERROR: 'error'
};
//# sourceMappingURL=websocket-client.js.map