import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        success: boolean;
        message: string;
        user: {
            id: number;
            username: string;
            role: string;
        };
        token: string;
        expiresIn: string;
    }>;
    logout(): Promise<{
        success: boolean;
        message: string;
    }>;
    validateToken(body: {
        token: string;
    }): Promise<{
        success: boolean;
        message: string;
        user: {
            id: any;
            username: any;
            role: any;
        };
    }>;
}
