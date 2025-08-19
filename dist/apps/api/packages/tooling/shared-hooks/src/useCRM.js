"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHealthCheck = exports.useCreateLead = exports.useActivities = exports.useLeads = void 0;
const react_query_1 = require("@tanstack/react-query");
const json_rpc_client_1 = require("@azizsys/json-rpc-client");
const cache_client_1 = require("@azizsys/cache-client");
const rpcClient = new json_rpc_client_1.JsonRpcClient({
    baseUrl: 'http://localhost:8070',
    database: 'azizsys_crm',
    username: 'admin',
    password: 'AzizSys2025!'
});
const cache = new cache_client_1.CacheClient();
// CRM Data Hooks with caching
const useLeads = () => {
    return (0, react_query_1.useQuery)({
        queryKey: ['leads'],
        queryFn: async () => {
            return cache.cacheOdooCall('leads:all', () => rpcClient.getLeads(), 300 // 5 minutes cache
            );
        },
        refetchInterval: 30000,
    });
};
exports.useLeads = useLeads;
const useActivities = (leadId) => {
    return (0, react_query_1.useQuery)({
        queryKey: ['activities', leadId],
        queryFn: async () => {
            // Mock activities for now
            return { success: true, data: [] };
        },
        enabled: !!leadId,
        refetchInterval: 15000,
    });
};
exports.useActivities = useActivities;
const useCreateLead = () => {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: async (leadData) => {
            const result = await rpcClient.createLead(leadData);
            // Clear cache on successful creation
            if (result.success) {
                await cache.del('leads:all');
            }
            return result;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['leads'] });
        },
    });
};
exports.useCreateLead = useCreateLead;
// Health check hook
const useHealthCheck = () => {
    return (0, react_query_1.useQuery)({
        queryKey: ['health'],
        queryFn: async () => {
            try {
                await rpcClient.authenticate();
                const cacheHealthy = await cache.exists('health:check');
                await cache.set('health:check', 'ok', 60);
                return {
                    odoo: true,
                    redis: true,
                    timestamp: new Date()
                };
            }
            catch (error) {
                return {
                    odoo: false,
                    redis: false,
                    error: error instanceof Error ? error.message : 'Unknown error'
                };
            }
        },
        refetchInterval: 60000, // Check every minute
    });
};
exports.useHealthCheck = useHealthCheck;
//# sourceMappingURL=useCRM.js.map