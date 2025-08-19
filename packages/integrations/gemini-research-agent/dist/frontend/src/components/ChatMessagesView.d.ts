import type React from "react";
import type { Message } from "@langchain/langgraph-sdk";
import { ProcessedEvent } from "@/components/ActivityTimeline";
interface ChatMessagesViewProps {
    messages: Message[];
    isLoading: boolean;
    scrollAreaRef: React.RefObject<HTMLDivElement | null>;
    onSubmit: (inputValue: string, effort: string, model: string) => void;
    onCancel: () => void;
    liveActivityEvents: ProcessedEvent[];
    historicalActivities: Record<string, ProcessedEvent[]>;
}
export declare function ChatMessagesView({ messages, isLoading, scrollAreaRef, onSubmit, onCancel, liveActivityEvents, historicalActivities, }: ChatMessagesViewProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ChatMessagesView.d.ts.map