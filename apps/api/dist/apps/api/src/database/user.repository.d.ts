import { Repository, DataSource } from 'typeorm';
import { UserEntity } from './user.entity';
export declare class UserRepository extends Repository<UserEntity> {
    private dataSource;
    constructor(dataSource: DataSource);
    createUser(userData: {
        username: string;
        email: string;
        password: string;
        role?: string;
    }): Promise<UserEntity>;
    findByUsername(username: string): Promise<UserEntity | null>;
    findByEmail(email: string): Promise<UserEntity | null>;
    validatePassword(user: UserEntity, password: string): Promise<boolean>;
    updateLastLogin(userId: string, ip: string): Promise<void>;
    updatePreferences(userId: string, preferences: Partial<UserEntity['preferences']>): Promise<void>;
    getActiveUsers(): Promise<UserEntity[]>;
    getUserStats(): Promise<any>;
}
