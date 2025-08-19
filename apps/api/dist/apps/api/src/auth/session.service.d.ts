import { JwtService } from '@nestjs/jwt';
export declare class SessionService {
    private jwtService;
    private activeSessions;
    private refreshTokens;
    constructor(jwtService: JwtService);
    createSession(userId: string, userRole: string): Promise<any>;
    refreshSession(refreshToken: string): Promise<any>;
    invalidateSession(sessionId: string): Promise<void>;
    validateSession(sessionId: string): Promise<boolean>;
}
