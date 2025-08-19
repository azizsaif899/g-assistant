import { UserEntity } from './user.entity';
export declare class ConversationEntity {
    id: string;
    sessionId: string;
    userId: string;
    userMessage: string;
    aiResponse: string;
    intent: string;
    sentiment: string;
    agent: string;
    mode: string;
    context: {
        topics?: string[];
        entities?: any[];
        confidence?: number;
        responseTime?: number;
    };
    metadata: {
        ip?: string;
        userAgent?: string;
        platform?: string;
        language?: string;
    };
    isArchived: boolean;
    createdAt: Date;
    updatedAt: Date;
    user: UserEntity;
}
