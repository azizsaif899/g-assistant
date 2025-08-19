"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const crypto = tslib_1.__importStar(require("crypto"));
let SessionService = class SessionService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.activeSessions = new Map();
        this.refreshTokens = new Map();
    }
    async createSession(userId, userRole) {
        const sessionId = crypto.randomUUID();
        const accessToken = this.jwtService.sign({ userId, role: userRole, sessionId }, { expiresIn: '15m' });
        const refreshToken = crypto.randomBytes(32).toString('hex');
        const session = {
            userId,
            role: userRole,
            sessionId,
            createdAt: new Date(),
            lastActivity: new Date(),
            isActive: true
        };
        this.activeSessions.set(sessionId, session);
        this.refreshTokens.set(refreshToken, sessionId);
        return { accessToken, refreshToken, sessionId };
    }
    async refreshSession(refreshToken) {
        const sessionId = this.refreshTokens.get(refreshToken);
        if (!sessionId) {
            throw new Error('Invalid refresh token');
        }
        const session = this.activeSessions.get(sessionId);
        if (!session || !session.isActive) {
            throw new Error('Session expired');
        }
        // Generate new tokens
        const newAccessToken = this.jwtService.sign({ userId: session.userId, role: session.role, sessionId }, { expiresIn: '15m' });
        const newRefreshToken = crypto.randomBytes(32).toString('hex');
        // Update session
        session.lastActivity = new Date();
        this.refreshTokens.delete(refreshToken);
        this.refreshTokens.set(newRefreshToken, sessionId);
        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }
    async invalidateSession(sessionId) {
        const session = this.activeSessions.get(sessionId);
        if (session) {
            session.isActive = false;
        }
        // Remove refresh token
        for (const [token, id] of this.refreshTokens.entries()) {
            if (id === sessionId) {
                this.refreshTokens.delete(token);
                break;
            }
        }
    }
    async validateSession(sessionId) {
        const session = this.activeSessions.get(sessionId);
        return session && session.isActive;
    }
};
exports.SessionService = SessionService;
exports.SessionService = SessionService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [jwt_1.JwtService])
], SessionService);
//# sourceMappingURL=session.service.js.map