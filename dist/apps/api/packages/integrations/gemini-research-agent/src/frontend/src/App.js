"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
const react_1 = require("@langchain/langgraph-sdk/react");
const react_2 = require("react");
const WelcomeScreen_1 = require("@/components/WelcomeScreen");
const ChatMessagesView_1 = require("@/components/ChatMessagesView");
const button_1 = require("@/components/ui/button");
function App() {
    const [processedEventsTimeline, setProcessedEventsTimeline] = (0, react_2.useState)([]);
    const [historicalActivities, setHistoricalActivities] = (0, react_2.useState)({});
    const scrollAreaRef = (0, react_2.useRef)(null);
    const hasFinalizeEventOccurredRef = (0, react_2.useRef)(false);
    const [error, setError] = (0, react_2.useState)(null);
    const thread = (0, react_1.useStream)({
        apiUrl: import.meta.env.DEV
            ? "http://localhost:2024"
            : "http://localhost:8123",
        assistantId: "agent",
        messagesKey: "messages",
        onUpdateEvent: (event) => {
            let processedEvent = null;
            if (event.generate_query) {
                processedEvent = {
                    title: "Generating Search Queries",
                    data: event.generate_query?.search_query?.join(", ") || "",
                };
            }
            else if (event.web_research) {
                const sources = event.web_research.sources_gathered || [];
                const numSources = sources.length;
                const uniqueLabels = [
                    ...new Set(sources.map((s) => s.label).filter(Boolean)),
                ];
                const exampleLabels = uniqueLabels.slice(0, 3).join(", ");
                processedEvent = {
                    title: "Web Research",
                    data: `Gathered ${numSources} sources. Related to: ${exampleLabels || "N/A"}.`,
                };
            }
            else if (event.reflection) {
                processedEvent = {
                    title: "Reflection",
                    data: "Analysing Web Research Results",
                };
            }
            else if (event.finalize_answer) {
                processedEvent = {
                    title: "Finalizing Answer",
                    data: "Composing and presenting the final answer.",
                };
                hasFinalizeEventOccurredRef.current = true;
            }
            if (processedEvent) {
                setProcessedEventsTimeline((prevEvents) => [
                    ...prevEvents,
                    processedEvent,
                ]);
            }
        },
        onError: (error) => {
            setError(error.message);
        },
    });
    (0, react_2.useEffect)(() => {
        if (scrollAreaRef.current) {
            const scrollViewport = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]");
            if (scrollViewport) {
                scrollViewport.scrollTop = scrollViewport.scrollHeight;
            }
        }
    }, [thread.messages]);
    (0, react_2.useEffect)(() => {
        if (hasFinalizeEventOccurredRef.current &&
            !thread.isLoading &&
            thread.messages.length > 0) {
            const lastMessage = thread.messages[thread.messages.length - 1];
            if (lastMessage && lastMessage.type === "ai" && lastMessage.id) {
                setHistoricalActivities((prev) => ({
                    ...prev,
                    [lastMessage.id]: [...processedEventsTimeline],
                }));
            }
            hasFinalizeEventOccurredRef.current = false;
        }
    }, [thread.messages, thread.isLoading, processedEventsTimeline]);
    const handleSubmit = (0, react_2.useCallback)((submittedInputValue, effort, model) => {
        if (!submittedInputValue.trim())
            return;
        setProcessedEventsTimeline([]);
        hasFinalizeEventOccurredRef.current = false;
        // convert effort to, initial_search_query_count and max_research_loops
        // low means max 1 loop and 1 query
        // medium means max 3 loops and 3 queries
        // high means max 10 loops and 5 queries
        let initial_search_query_count = 0;
        let max_research_loops = 0;
        switch (effort) {
            case "low":
                initial_search_query_count = 1;
                max_research_loops = 1;
                break;
            case "medium":
                initial_search_query_count = 3;
                max_research_loops = 3;
                break;
            case "high":
                initial_search_query_count = 5;
                max_research_loops = 10;
                break;
        }
        const newMessages = [
            ...(thread.messages || []),
            {
                type: "human",
                content: submittedInputValue,
                id: Date.now().toString(),
            },
        ];
        thread.submit({
            messages: newMessages,
            initial_search_query_count: initial_search_query_count,
            max_research_loops: max_research_loops,
            reasoning_model: model,
        });
    }, [thread]);
    const handleCancel = (0, react_2.useCallback)(() => {
        thread.stop();
        window.location.reload();
    }, [thread]);
    return (<div className="flex h-screen bg-neutral-800 text-neutral-100 font-sans antialiased">
      <main className="h-full w-full max-w-4xl mx-auto">
          {thread.messages.length === 0 ? (<WelcomeScreen_1.WelcomeScreen handleSubmit={handleSubmit} isLoading={thread.isLoading} onCancel={handleCancel}/>) : error ? (<div className="flex flex-col items-center justify-center h-full">
              <div className="flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl text-red-400 font-bold">Error</h1>
                <p className="text-red-400">{JSON.stringify(error)}</p>

                <button_1.Button variant="destructive" onClick={() => window.location.reload()}>
                  Retry
                </button_1.Button>
              </div>
            </div>) : (<ChatMessagesView_1.ChatMessagesView messages={thread.messages} isLoading={thread.isLoading} scrollAreaRef={scrollAreaRef} onSubmit={handleSubmit} onCancel={handleCancel} liveActivityEvents={processedEventsTimeline} historicalActivities={historicalActivities}/>)}
      </main>
    </div>);
}
//# sourceMappingURL=App.js.map