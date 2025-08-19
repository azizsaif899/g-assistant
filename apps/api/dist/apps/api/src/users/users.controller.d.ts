import { UsersService, User } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): {
        success: boolean;
        data: User[];
        count: number;
    };
    findOne(id: string): {
        success: boolean;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        data: User;
        message?: undefined;
    };
    create(userData: Partial<User>): {
        success: boolean;
        message: string;
        data: User;
    };
    update(id: string, userData: Partial<User>): {
        success: boolean;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        message: string;
        data: User;
    };
    remove(id: string): {
        success: boolean;
        message: string;
    };
}
