"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMessagesView = ChatMessagesView;
const tslib_1 = require("tslib");
const scroll_area_1 = require("@/components/ui/scroll-area");
const lucide_react_1 = require("lucide-react");
const InputForm_1 = require("@/components/InputForm");
const button_1 = require("@/components/ui/button");
const react_1 = require("react");
const react_markdown_1 = tslib_1.__importDefault(require("react-markdown"));
const utils_1 = require("@/lib/utils");
const badge_1 = require("@/components/ui/badge");
const ActivityTimeline_1 = require("@/components/ActivityTimeline"); // Assuming ActivityTimeline is in the same dir or adjust path
// Markdown components (from former ReportView.tsx)
const mdComponents = {
    h1: ({ className, children, ...props }) => (<h1 className={(0, utils_1.cn)("text-2xl font-bold mt-4 mb-2", className)} {...props}>
      {children}
    </h1>),
    h2: ({ className, children, ...props }) => (<h2 className={(0, utils_1.cn)("text-xl font-bold mt-3 mb-2", className)} {...props}>
      {children}
    </h2>),
    h3: ({ className, children, ...props }) => (<h3 className={(0, utils_1.cn)("text-lg font-bold mt-3 mb-1", className)} {...props}>
      {children}
    </h3>),
    p: ({ className, children, ...props }) => (<p className={(0, utils_1.cn)("mb-3 leading-7", className)} {...props}>
      {children}
    </p>),
    a: ({ className, children, href, ...props }) => (<badge_1.Badge className="text-xs mx-0.5">
      <a className={(0, utils_1.cn)("text-blue-400 hover:text-blue-300 text-xs", className)} href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    </badge_1.Badge>),
    ul: ({ className, children, ...props }) => (<ul className={(0, utils_1.cn)("list-disc pl-6 mb-3", className)} {...props}>
      {children}
    </ul>),
    ol: ({ className, children, ...props }) => (<ol className={(0, utils_1.cn)("list-decimal pl-6 mb-3", className)} {...props}>
      {children}
    </ol>),
    li: ({ className, children, ...props }) => (<li className={(0, utils_1.cn)("mb-1", className)} {...props}>
      {children}
    </li>),
    blockquote: ({ className, children, ...props }) => (<blockquote className={(0, utils_1.cn)("border-l-4 border-neutral-600 pl-4 italic my-3 text-sm", className)} {...props}>
      {children}
    </blockquote>),
    code: ({ className, children, ...props }) => (<code className={(0, utils_1.cn)("bg-neutral-900 rounded px-1 py-0.5 font-mono text-xs", className)} {...props}>
      {children}
    </code>),
    pre: ({ className, children, ...props }) => (<pre className={(0, utils_1.cn)("bg-neutral-900 p-3 rounded-lg overflow-x-auto font-mono text-xs my-3", className)} {...props}>
      {children}
    </pre>),
    hr: ({ className, ...props }) => (<hr className={(0, utils_1.cn)("border-neutral-600 my-4", className)} {...props}/>),
    table: ({ className, children, ...props }) => (<div className="my-3 overflow-x-auto">
      <table className={(0, utils_1.cn)("border-collapse w-full", className)} {...props}>
        {children}
      </table>
    </div>),
    th: ({ className, children, ...props }) => (<th className={(0, utils_1.cn)("border border-neutral-600 px-3 py-2 text-left font-bold", className)} {...props}>
      {children}
    </th>),
    td: ({ className, children, ...props }) => (<td className={(0, utils_1.cn)("border border-neutral-600 px-3 py-2", className)} {...props}>
      {children}
    </td>),
};
// HumanMessageBubble Component
const HumanMessageBubble = ({ message, mdComponents, }) => {
    return (<div className={`text-white rounded-3xl break-words min-h-7 bg-neutral-700 max-w-[100%] sm:max-w-[90%] px-4 pt-3 rounded-br-lg`}>
      <react_markdown_1.default components={mdComponents}>
        {typeof message.content === "string"
            ? message.content
            : JSON.stringify(message.content)}
      </react_markdown_1.default>
    </div>);
};
// AiMessageBubble Component
const AiMessageBubble = ({ message, historicalActivity, liveActivity, isLastMessage, isOverallLoading, mdComponents, handleCopy, copiedMessageId, }) => {
    // Determine which activity events to show and if it's for a live loading message
    const activityForThisBubble = isLastMessage && isOverallLoading ? liveActivity : historicalActivity;
    const isLiveActivityForThisBubble = isLastMessage && isOverallLoading;
    return (<div className={`relative break-words flex flex-col`}>
      {activityForThisBubble && activityForThisBubble.length > 0 && (<div className="mb-3 border-b border-neutral-700 pb-3 text-xs">
          <ActivityTimeline_1.ActivityTimeline processedEvents={activityForThisBubble} isLoading={isLiveActivityForThisBubble}/>
        </div>)}
      <react_markdown_1.default components={mdComponents}>
        {typeof message.content === "string"
            ? message.content
            : JSON.stringify(message.content)}
      </react_markdown_1.default>
      <button_1.Button variant="default" className={`cursor-pointer bg-neutral-700 border-neutral-600 text-neutral-300 self-end ${message.content.length > 0 ? "visible" : "hidden"}`} onClick={() => handleCopy(typeof message.content === "string"
            ? message.content
            : JSON.stringify(message.content), message.id)}>
        {copiedMessageId === message.id ? "Copied" : "Copy"}
        {copiedMessageId === message.id ? <lucide_react_1.CopyCheck /> : <lucide_react_1.Copy />}
      </button_1.Button>
    </div>);
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
    return (<div className="flex flex-col h-full">
      <scroll_area_1.ScrollArea className="flex-1 overflow-y-auto" ref={scrollAreaRef}>
        <div className="p-4 md:p-6 space-y-2 max-w-4xl mx-auto pt-16">
          {messages.map((message, index) => {
            const isLast = index === messages.length - 1;
            return (<div key={message.id || `msg-${index}`} className="space-y-3">
                <div className={`flex items-start gap-3 ${message.type === "human" ? "justify-end" : ""}`}>
                  {message.type === "human" ? (<HumanMessageBubble message={message} mdComponents={mdComponents}/>) : (<AiMessageBubble message={message} historicalActivity={historicalActivities[message.id]} liveActivity={liveActivityEvents} // Pass global live events
                 isLastMessage={isLast} isOverallLoading={isLoading} // Pass global loading state
                 mdComponents={mdComponents} handleCopy={handleCopy} copiedMessageId={copiedMessageId}/>)}
                </div>
              </div>);
        })}
          {isLoading &&
            (messages.length === 0 ||
                messages[messages.length - 1].type === "human") && (<div className="flex items-start gap-3 mt-3">
                {" "}
                {/* AI message row structure */}
                <div className="relative group max-w-[85%] md:max-w-[80%] rounded-xl p-3 shadow-sm break-words bg-neutral-800 text-neutral-100 rounded-bl-none w-full min-h-[56px]">
                  {liveActivityEvents.length > 0 ? (<div className="text-xs">
                      <ActivityTimeline_1.ActivityTimeline processedEvents={liveActivityEvents} isLoading={true}/>
                    </div>) : (<div className="flex items-center justify-start h-full">
                      <lucide_react_1.Loader2 className="h-5 w-5 animate-spin text-neutral-400 mr-2"/>
                      <span>Processing...</span>
                    </div>)}
                </div>
              </div>)}
        </div>
      </scroll_area_1.ScrollArea>
      <InputForm_1.InputForm onSubmit={onSubmit} isLoading={isLoading} onCancel={onCancel} hasHistory={messages.length > 0}/>
    </div>);
}
//# sourceMappingURL=ChatMessagesView.js.map