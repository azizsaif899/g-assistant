import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private jwtService;
    private configService;
    private readonly users;
    constructor(jwtService: JwtService, configService: ConfigService);
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
    validateToken(token: string): Promise<{
        success: boolean;
        message: string;
        user: {
            id: any;
            username: any;
            role: any;
        };
    }>;
    private validateUser;
}
