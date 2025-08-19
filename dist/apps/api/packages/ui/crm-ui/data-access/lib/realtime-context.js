'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRealtime = void 0;
exports.RealtimeProvider = RealtimeProvider;
const react_1 = require("react");
const RealtimeContext = (0, react_1.createContext)({
    isConnected: false,
    connectionStatus: 'disconnected',
    lastUpdate: null
});
function RealtimeProvider({ children }) {
    const [isConnected, setIsConnected] = (0, react_1.useState)(false);
    const [connectionStatus, setConnectionStatus] = (0, react_1.useState)('disconnected');
    const [lastUpdate, setLastUpdate] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        // Simulate WebSocket connection
        setConnectionStatus('connecting');
        const timer = setTimeout(() => {
            setIsConnected(true);
            setConnectionStatus('connected');
            setLastUpdate(new Date());
        }, 2000);
        // Simulate periodic updates
        const updateTimer = setInterval(() => {
            if (isConnected) {
                setLastUpdate(new Date());
            }
        }, 10000);
        return () => {
            clearTimeout(timer);
            clearInterval(updateTimer);
        };
    }, [isConnected]);
    return (<RealtimeContext.Provider value={{
            isConnected,
            connectionStatus,
            lastUpdate
        }}>
      {children}
    </RealtimeContext.Provider>);
}
const useRealtime = () => (0, react_1.useContext)(RealtimeContext);
exports.useRealtime = useRealtime;
//# sourceMappingURL=realtime-context.js.map