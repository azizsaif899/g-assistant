/**
 * Frontend Components للـ Gemini Research Agent
 */
export interface GeminiActivityTimelineProps {
    activities: GeminiActivity[];
    isLoading?: boolean;
}
export interface GeminiActivity {
    id: string;
    type: 'query' | 'search' | 'reflection' | 'answer';
    title: string;
    description: string;
    timestamp: Date;
    status: 'pending' | 'running' | 'completed' | 'error';
    data?: any;
}
export interface GeminiChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    sources?: any[];
    citations?: any[];
}
export interface GeminiChatMessagesViewProps {
    messages: GeminiChatMessage[];
    isLoading?: boolean;
    onSourceClick?: (source: any) => void;
}
export interface GeminiInputFormProps {
    onSubmit: (query: string) => void;
    isLoading?: boolean;
    placeholder?: string;
    disabled?: boolean;
}
export interface GeminiWelcomeScreenProps {
    onGetStarted: () => void;
    examples?: string[];
}
//# sourceMappingURL=index.d.ts.map