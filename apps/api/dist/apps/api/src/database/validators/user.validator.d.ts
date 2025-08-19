export declare class CreateUserDto {
    username: string;
    email: string;
    password: string;
    role?: string;
}
export declare class UpdateUserDto {
    username?: string;
    email?: string;
    isActive?: boolean;
}
export declare class UserPreferencesDto {
    language?: string;
    theme?: string;
    defaultAgent?: string;
    defaultMode?: string;
}
