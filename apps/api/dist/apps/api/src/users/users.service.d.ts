export interface User {
    id: number;
    username: string;
    role: string;
    email?: string;
    createdAt: string;
    lastLogin?: string;
}
export declare class UsersService {
    private users;
    findAll(): User[];
    findOne(id: number): User | undefined;
    findByUsername(username: string): User | undefined;
    create(userData: Partial<User>): User;
    update(id: number, userData: Partial<User>): User | null;
    remove(id: number): boolean;
}
