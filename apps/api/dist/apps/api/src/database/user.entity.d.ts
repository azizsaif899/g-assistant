import { ConversationEntity } from './conversation.entity';
export declare class UserEntity {
    id: string;
    username: string;
    email: string;
    password: string;
    role: string;
    preferences: {
        language: string;
        theme: string;
        defaultAgent: string;
        defaultMode: string;
    };
    profile: {
        firstName?: string;
        lastName?: string;
        avatar?: string;
        bio?: string;
    };
    isActive: boolean;
    lastLoginAt: Date;
    lastLoginIp: string;
    createdAt: Date;
    updatedAt: Date;
    conversations: ConversationEntity[];
}
