import { UserEntity } from './user.entity';
export declare class SessionEntity {
    id: string;
    token: string;
    userId: string;
    expiresAt: Date;
    ipAddress: string;
    userAgent: string;
    isActive: boolean;
    createdAt: Date;
    user: UserEntity;
}
