'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWebSocket = useWebSocket;
const react_1 = require("react");
const websocket_client_1 = require("../lib/websocket-client");
function useWebSocket() {
    const [connectionState, setConnectionState] = (0, react_1.useState)('disconnected');
    const [lastMessage, setLastMessage] = (0, react_1.useState)(null);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const connectWS = async () => {
            try {
                await websocket_client_1.wsClient.connect();
            }
            catch (err) {
                setError(err instanceof Error ? err.message : 'Connection failed');
            }
        };
        connectWS();
        // Subscribe to connection events
        const unsubscribeConnected = websocket_client_1.wsClient.subscribe('connected', () => {
            setConnectionState('connected');
            setError(null);
        });
        const unsubscribeDisconnected = websocket_client_1.wsClient.subscribe('disconnected', () => {
            setConnectionState('disconnected');
        });
        const unsubscribeError = websocket_client_1.wsClient.subscribe('error', ({ error }) => {
            setError(error.message || 'WebSocket error');
        });
        // Update connection state periodically
        const stateInterval = setInterval(() => {
            setConnectionState(websocket_client_1.wsClient.getConnectionState());
        }, 1000);
        return () => {
            unsubscribeConnected();
            unsubscribeDisconnected();
            unsubscribeError();
            clearInterval(stateInterval);
        };
    }, []);
    const subscribe = (0, react_1.useCallback)((eventType, handler) => {
        return websocket_client_1.wsClient.subscribe(eventType, (data) => {
            setLastMessage({ type: eventType, data, timestamp: new Date() });
            handler(data);
        });
    }, []);
    const send = (0, react_1.useCallback)((data) => {
        websocket_client_1.wsClient.send(data);
    }, []);
    return {
        connectionState,
        lastMessage,
        error,
        subscribe,
        send,
        isConnected: connectionState === 'connected'
    };
}
//# sourceMappingURL=useWebSocket.js.map