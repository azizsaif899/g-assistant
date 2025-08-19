"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityTimeline = ActivityTimeline;
const jsx_runtime_1 = require("react/jsx-runtime");
const card_1 = require("@/components/ui/card");
const scroll_area_1 = require("@/components/ui/scroll-area");
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
function ActivityTimeline({ processedEvents, isLoading, }) {
    const [isTimelineCollapsed, setIsTimelineCollapsed] = (0, react_1.useState)(false);
    const getEventIcon = (title, index) => {
        if (index === 0 && isLoading && processedEvents.length === 0) {
            return (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-4 w-4 text-neutral-400 animate-spin" });
        }
        if (title.toLowerCase().includes("generating")) {
            return (0, jsx_runtime_1.jsx)(lucide_react_1.TextSearch, { className: "h-4 w-4 text-neutral-400" });
        }
        else if (title.toLowerCase().includes("thinking")) {
            return (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-4 w-4 text-neutral-400 animate-spin" });
        }
        else if (title.toLowerCase().includes("reflection")) {
            return (0, jsx_runtime_1.jsx)(lucide_react_1.Brain, { className: "h-4 w-4 text-neutral-400" });
        }
        else if (title.toLowerCase().includes("research")) {
            return (0, jsx_runtime_1.jsx)(lucide_react_1.Search, { className: "h-4 w-4 text-neutral-400" });
        }
        else if (title.toLowerCase().includes("finalizing")) {
            return (0, jsx_runtime_1.jsx)(lucide_react_1.Pen, { className: "h-4 w-4 text-neutral-400" });
        }
        return (0, jsx_runtime_1.jsx)(lucide_react_1.Activity, { className: "h-4 w-4 text-neutral-400" });
    };
    (0, react_1.useEffect)(() => {
        if (!isLoading && processedEvents.length !== 0) {
            setIsTimelineCollapsed(true);
        }
    }, [isLoading, processedEvents]);
    return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "border-none rounded-lg bg-neutral-700 max-h-96", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsx)(card_1.CardDescription, { className: "flex items-center justify-between", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-start text-sm w-full cursor-pointer gap-2 text-neutral-100", onClick: () => setIsTimelineCollapsed(!isTimelineCollapsed), children: ["Research", isTimelineCollapsed ? ((0, jsx_runtime_1.jsx)(lucide_react_1.ChevronDown, { className: "h-4 w-4 mr-2" })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.ChevronUp, { className: "h-4 w-4 mr-2" }))] }) }) }), !isTimelineCollapsed && ((0, jsx_runtime_1.jsx)(scroll_area_1.ScrollArea, { className: "max-h-96 overflow-y-auto", children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { children: [isLoading && processedEvents.length === 0 && ((0, jsx_runtime_1.jsxs)("div", { className: "relative pl-8 pb-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute left-3 top-3.5 h-full w-0.5 bg-neutral-800" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute left-0.5 top-2 h-5 w-5 rounded-full bg-neutral-800 flex items-center justify-center ring-4 ring-neutral-900", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-3 w-3 text-neutral-400 animate-spin" }) }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-neutral-300 font-medium", children: "Searching..." }) })] })), processedEvents.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-0", children: [processedEvents.map((eventItem, index) => ((0, jsx_runtime_1.jsxs)("div", { className: "relative pl-8 pb-4", children: [index < processedEvents.length - 1 ||
                                            (isLoading && index === processedEvents.length - 1) ? ((0, jsx_runtime_1.jsx)("div", { className: "absolute left-3 top-3.5 h-full w-0.5 bg-neutral-600" })) : null, (0, jsx_runtime_1.jsx)("div", { className: "absolute left-0.5 top-2 h-6 w-6 rounded-full bg-neutral-600 flex items-center justify-center ring-4 ring-neutral-700", children: getEventIcon(eventItem.title, index) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-neutral-200 font-medium mb-0.5", children: eventItem.title }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-neutral-300 leading-relaxed", children: typeof eventItem.data === "string"
                                                        ? eventItem.data
                                                        : Array.isArray(eventItem.data)
                                                            ? eventItem.data.join(", ")
                                                            : JSON.stringify(eventItem.data) })] })] }, index))), isLoading && processedEvents.length > 0 && ((0, jsx_runtime_1.jsxs)("div", { className: "relative pl-8 pb-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute left-0.5 top-2 h-5 w-5 rounded-full bg-neutral-600 flex items-center justify-center ring-4 ring-neutral-700", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-3 w-3 text-neutral-400 animate-spin" }) }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-neutral-300 font-medium", children: "Searching..." }) })] }))] })) : !isLoading ? ( // Only show "No activity" if not loading and no events
                        (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center justify-center h-full text-neutral-500 pt-10", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Info, { className: "h-6 w-6 mb-3" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm", children: "No activity to display." }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-neutral-600 mt-1", children: "Timeline will update during processing." })] })) : null] }) }))] }));
}
//# sourceMappingURL=ActivityTimeline.js.map