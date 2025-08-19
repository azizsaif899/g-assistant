'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Providers = Providers;
const react_query_1 = require("@tanstack/react-query");
const react_1 = require("react");
const realtime_context_1 = require("../lib/realtime-context");
function Providers({ children }) {
    const [queryClient] = (0, react_1.useState)(() => new react_query_1.QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000, // 1 minute
                refetchOnWindowFocus: false,
            },
        },
    }));
    return (<react_query_1.QueryClientProvider client={queryClient}>
      <realtime_context_1.RealtimeProvider>
        {children}
      </realtime_context_1.RealtimeProvider>
    </react_query_1.QueryClientProvider>);
}
//# sourceMappingURL=providers.js.map