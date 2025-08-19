"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityTimeline = ActivityTimeline;
const card_1 = require("@/components/ui/card");
const scroll_area_1 = require("@/components/ui/scroll-area");
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
function ActivityTimeline({ processedEvents, isLoading, }) {
    const [isTimelineCollapsed, setIsTimelineCollapsed] = (0, react_1.useState)(false);
    const getEventIcon = (title, index) => {
        if (index === 0 && isLoading && processedEvents.length === 0) {
            return <lucide_react_1.Loader2 className="h-4 w-4 text-neutral-400 animate-spin"/>;
        }
        if (title.toLowerCase().includes("generating")) {
            return <lucide_react_1.TextSearch className="h-4 w-4 text-neutral-400"/>;
        }
        else if (title.toLowerCase().includes("thinking")) {
            return <lucide_react_1.Loader2 className="h-4 w-4 text-neutral-400 animate-spin"/>;
        }
        else if (title.toLowerCase().includes("reflection")) {
            return <lucide_react_1.Brain className="h-4 w-4 text-neutral-400"/>;
        }
        else if (title.toLowerCase().includes("research")) {
            return <lucide_react_1.Search className="h-4 w-4 text-neutral-400"/>;
        }
        else if (title.toLowerCase().includes("finalizing")) {
            return <lucide_react_1.Pen className="h-4 w-4 text-neutral-400"/>;
        }
        return <lucide_react_1.Activity className="h-4 w-4 text-neutral-400"/>;
    };
    (0, react_1.useEffect)(() => {
        if (!isLoading && processedEvents.length !== 0) {
            setIsTimelineCollapsed(true);
        }
    }, [isLoading, processedEvents]);
    return (<card_1.Card className="border-none rounded-lg bg-neutral-700 max-h-96">
      <card_1.CardHeader>
        <card_1.CardDescription className="flex items-center justify-between">
          <div className="flex items-center justify-start text-sm w-full cursor-pointer gap-2 text-neutral-100" onClick={() => setIsTimelineCollapsed(!isTimelineCollapsed)}>
            Research
            {isTimelineCollapsed ? (<lucide_react_1.ChevronDown className="h-4 w-4 mr-2"/>) : (<lucide_react_1.ChevronUp className="h-4 w-4 mr-2"/>)}
          </div>
        </card_1.CardDescription>
      </card_1.CardHeader>
      {!isTimelineCollapsed && (<scroll_area_1.ScrollArea className="max-h-96 overflow-y-auto">
          <card_1.CardContent>
            {isLoading && processedEvents.length === 0 && (<div className="relative pl-8 pb-4">
                <div className="absolute left-3 top-3.5 h-full w-0.5 bg-neutral-800"/>
                <div className="absolute left-0.5 top-2 h-5 w-5 rounded-full bg-neutral-800 flex items-center justify-center ring-4 ring-neutral-900">
                  <lucide_react_1.Loader2 className="h-3 w-3 text-neutral-400 animate-spin"/>
                </div>
                <div>
                  <p className="text-sm text-neutral-300 font-medium">
                    Searching...
                  </p>
                </div>
              </div>)}
            {processedEvents.length > 0 ? (<div className="space-y-0">
                {processedEvents.map((eventItem, index) => (<div key={index} className="relative pl-8 pb-4">
                    {index < processedEvents.length - 1 ||
                        (isLoading && index === processedEvents.length - 1) ? (<div className="absolute left-3 top-3.5 h-full w-0.5 bg-neutral-600"/>) : null}
                    <div className="absolute left-0.5 top-2 h-6 w-6 rounded-full bg-neutral-600 flex items-center justify-center ring-4 ring-neutral-700">
                      {getEventIcon(eventItem.title, index)}
                    </div>
                    <div>
                      <p className="text-sm text-neutral-200 font-medium mb-0.5">
                        {eventItem.title}
                      </p>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        {typeof eventItem.data === "string"
                        ? eventItem.data
                        : Array.isArray(eventItem.data)
                            ? eventItem.data.join(", ")
                            : JSON.stringify(eventItem.data)}
                      </p>
                    </div>
                  </div>))}
                {isLoading && processedEvents.length > 0 && (<div className="relative pl-8 pb-4">
                    <div className="absolute left-0.5 top-2 h-5 w-5 rounded-full bg-neutral-600 flex items-center justify-center ring-4 ring-neutral-700">
                      <lucide_react_1.Loader2 className="h-3 w-3 text-neutral-400 animate-spin"/>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-300 font-medium">
                        Searching...
                      </p>
                    </div>
                  </div>)}
              </div>) : !isLoading ? ( // Only show "No activity" if not loading and no events
            <div className="flex flex-col items-center justify-center h-full text-neutral-500 pt-10">
                <lucide_react_1.Info className="h-6 w-6 mb-3"/>
                <p className="text-sm">No activity to display.</p>
                <p className="text-xs text-neutral-600 mt-1">
                  Timeline will update during processing.
                </p>
              </div>) : null}
          </card_1.CardContent>
        </scroll_area_1.ScrollArea>)}
    </card_1.Card>);
}
//# sourceMappingURL=ActivityTimeline.js.map