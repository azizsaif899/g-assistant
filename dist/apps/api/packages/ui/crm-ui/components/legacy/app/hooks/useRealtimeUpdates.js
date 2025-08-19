'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRealtimeUpdates = useRealtimeUpdates;
const react_1 = require("react");
const react_query_1 = require("@tanstack/react-query");
function useRealtimeUpdates() {
    const [isConnected, setIsConnected] = (0, react_1.useState)(false);
    const { data, isLoading, error } = (0, react_query_1.useQuery)({
        queryKey: ['pulse-data'],
        queryFn: async () => {
            // Mock data - replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            return {
                revenue: 1200000,
                pipelineVelocity: 25,
                winRate: 28,
                newLeads: 156,
                lastUpdated: new Date().toISOString()
            };
        },
        refetchInterval: 30000, // Refetch every 30 seconds
    });
    (0, react_1.useEffect)(() => {
        // Simulate WebSocket connection
        const timer = setTimeout(() => {
            setIsConnected(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);
    return {
        data,
        isLoading,
        error,
        isConnected
    };
}
//# sourceMappingURL=useRealtimeUpdates.js.map