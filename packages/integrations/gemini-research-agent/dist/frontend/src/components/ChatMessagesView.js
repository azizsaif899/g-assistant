"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMessagesView = ChatMessagesView;
const jsx_runtime_1 = require("react/jsx-runtime");
const scroll_area_1 = require("@/components/ui/scroll-area");
const lucide_react_1 = require("lucide-react");
const InputForm_1 = require("@/components/InputForm");
const button_1 = require("@/components/ui/button");
const react_1 = require("react");
const react_markdown_1 = __importDefault(require("react-markdown"));
const utils_1 = require("@/lib/utils");
const badge_1 = require("@/components/ui/badge");
const ActivityTimeline_1 = require("@/components/ActivityTimeline"); // Assuming ActivityTimeline is in the same dir or adjust path
// Markdown components (from former ReportView.tsx)
const mdComponents = {
    h1: ({ className, children, ...props }) => ((0, jsx_runtime_1.jsx)("h1", { className: (0, utils_1.cn)("text-2xl font-bold mt-4 mb-2", className), ...props, children: children })),
    h2: ({ className, children, ...props }) => ((0, jsx_runtime_1.jsx)("h2", { className: (0, utils_1.cn)("text-xl font-bold mt-3 mb-2", className), ...props, children: children })),
    h3: ({ className, children, ...props }) => ((0, jsx_runtime_1.jsx)("h3", { className: (0, utils_1.cn)("text-lg font-bold mt-3 mb-1", className), ...props, children: children })),
    p: ({ className, children, ...props }) => ((0, jsx_runtime_1.jsx)("p", { className: (0, utils_1.cn)("mb-3 leading-7", className), ...props, children: children })),
    a: ({ className, children, href, ...props }) => ((0, jsx_runtime_1.jsx)(badge_1.Badge, { className: "text-xs mx-0.5", children: (0, jsx_runtime_1.jsx)("a", { className: (0, utils_1.cn)("text-blue-400 hover:text-blue-300 text-xs", className), href: href, target: "_blank", rel: "noopener noreferrer", ...props, children: children }) })),
    ul: ({ className, children, ...props }) => ((0, jsx_runtime_1.jsx)("ul", { className: (0, utils_1.cn)("list-disc pl-6 mb-3", className), ...props, children: children })),
    ol: ({ className, children, ...props }) => ((0, jsx_runtime_1.jsx)("ol", { className: (0, utils_1.cn)("list-decimal pl-6 mb-3", className), ...props, children: children })),
    li: ({ className, children, ...props }) => ((0, jsx_runtime_1.jsx)("li", { className: (0, utils_1.cn)("mb-1", className), ...props, children: children })),
    blockquote: ({ className, children, ...props }) => ((0, jsx_runtime_1.jsx)("blockquote", { className: (0, utils_1.cn)("border-l-4 border-neutral-600 pl-4 italic my-3 text-sm", className), ...props, children: children })),
    code: ({ className, children, ...props }) => ((0, jsx_runtime_1.jsx)("code", { className: (0, utils_1.cn)("bg-neutral-900 rounded px-1 py-0.5 font-mono text-xs", className), ...props, children: children })),
    pre: ({ className, children, ...props }) => ((0, jsx_runtime_1.jsx)("pre", { className: (0, utils_1.cn)("bg-neutral-900 p-3 rounded-lg overflow-x-auto font-mono text-xs my-3", className), ...props, children: children })),
    hr: ({ className, ...props }) => ((0, jsx_runtime_1.jsx)("hr", { className: (0, utils_1.cn)("border-neutral-600 my-4", className), ...props })),
    table: ({ className, children, ...props }) => ((0, jsx_runtime_1.jsx)("div", { className: "my-3 overflow-x-auto", children: (0, jsx_runtime_1.jsx)("table", { className: (0, utils_1.cn)("border-collapse w-full", className), ...props, children: children }) })),
    th: ({ className, children, ...props }) => ((0, jsx_runtime_1.jsx)("th", { className: (0, utils_1.cn)("border border-neutral-600 px-3 py-2 text-left font-bold", className), ...props, children: children })),
    td: ({ className, children, ...props }) => ((0, jsx_runtime_1.jsx)("td", { className: (0, utils_1.cn)("border border-neutral-600 px-3 py-2", className), ...props, children: children })),
};
// HumanMessageBubble Component
const HumanMessageBubble = ({ message, mdComponents, }) => {
    return ((0, jsx_runtime_1.jsx)("div", { className: `text-white rounded-3xl break-words min-h-7 bg-neutral-700 max-w-[100%] sm:max-w-[90%] px-4 pt-3 rounded-br-lg`, children: (0, jsx_runtime_1.jsx)(react_markdown_1.default, { components: mdComponents, children: typeof message.content === "string"
                ? message.content
                : JSON.stringify(message.content) }) }));
};
// AiMessageBubble Component
const AiMessageBubble = ({ message, historicalActivity, liveActivity, isLastMessage, isOverallLoading, mdComponents, handleCopy, copiedMessageId, }) => {
    // Determine which activity events to show and if it's for a live loading message
    const activityForThisBubble = isLastMessage && isOverallLoading ? liveActivity : historicalActivity;
    const isLiveActivityForThisBubble = isLastMessage && isOverallLoading;
    return ((0, jsx_runtime_1.jsxs)("div", { className: `relative break-words flex flex-col`, children: [activityForThisBubble && activityForThisBubble.length > 0 && ((0, jsx_runtime_1.jsx)("div", { className: "mb-3 border-b border-neutral-700 pb-3 text-xs", children: (0, jsx_runtime_1.jsx)(ActivityTimeline_1.ActivityTimeline, { processedEvents: activityForThisBubble, isLoading: isLiveActivityForThisBubble }) })), (0, jsx_runtime_1.jsx)(react_markdown_1.default, { components: mdComponents, children: typeof message.content === "string"
                    ? message.content
                    : JSON.stringify(message.content) }), (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "default", className: `cursor-pointer bg-neutral-700 border-neutral-600 text-neutral-300 self-end ${message.content.length > 0 ? "visible" : "hidden"}`, onClick: () => handleCopy(typeof message.content === "string"
                    ? message.content
                    : JSON.stringify(message.content), message.id), children: [copiedMessageId === message.id ? "Copied" : "Copy", copiedMessageId === message.id ? (0, jsx_runtime_1.jsx)(lucide_react_1.CopyCheck, {}) : (0, jsx_runtime_1.jsx)(lucide_react_1.Copy, {})] })] }));
};
function ChatMessagesView({ messages, isLoading, scrollAreaRef, onSubmit, onCancel, liveActivityEvents, historicalActivities, }) {
    const [copiedMessageId, setCopiedMessageId] = (0, react_1.useState)(null);
    const handleCopy = async (text, messageId) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedMessageId(messageId);
            setTimeout(() => setCopiedMessageId(null), 2000); // Reset after 2 seconds
        }
        catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col h-full", children: [(0, jsx_runtime_1.jsx)(scroll_area_1.ScrollArea, { className: "flex-1 overflow-y-auto", ref: scrollAreaRef, children: (0, jsx_runtime_1.jsxs)("div", { className: "p-4 md:p-6 space-y-2 max-w-4xl mx-auto pt-16", children: [messages.map((message, index) => {
                            const isLast = index === messages.length - 1;
                            return ((0, jsx_runtime_1.jsx)("div", { className: "space-y-3", children: (0, jsx_runtime_1.jsx)("div", { className: `flex items-start gap-3 ${message.type === "human" ? "justify-end" : ""}`, children: message.type === "human" ? ((0, jsx_runtime_1.jsx)(HumanMessageBubble, { message: message, mdComponents: mdComponents })) : ((0, jsx_runtime_1.jsx)(AiMessageBubble, { message: message, historicalActivity: historicalActivities[message.id], liveActivity: liveActivityEvents, isLastMessage: isLast, isOverallLoading: isLoading, mdComponents: mdComponents, handleCopy: handleCopy, copiedMessageId: copiedMessageId })) }) }, message.id || `msg-${index}`));
                        }), isLoading &&
                            (messages.length === 0 ||
                                messages[messages.length - 1].type === "human") && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-3 mt-3", children: [" ", (0, jsx_runtime_1.jsx)("div", { className: "relative group max-w-[85%] md:max-w-[80%] rounded-xl p-3 shadow-sm break-words bg-neutral-800 text-neutral-100 rounded-bl-none w-full min-h-[56px]", children: liveActivityEvents.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "text-xs", children: (0, jsx_runtime_1.jsx)(ActivityTimeline_1.ActivityTimeline, { processedEvents: liveActivityEvents, isLoading: true }) })) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-start h-full", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-5 w-5 animate-spin text-neutral-400 mr-2" }), (0, jsx_runtime_1.jsx)("span", { children: "Processing..." })] })) })] }))] }) }), (0, jsx_runtime_1.jsx)(InputForm_1.InputForm, { onSubmit: onSubmit, isLoading: isLoading, onCancel: onCancel, hasHistory: messages.length > 0 })] }));
}
//# sourceMappingURL=ChatMessagesView.js.map