"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.users = [
            { id: 1, username: 'admin', password: '$2b$10$rQZ8kHqZ8kHqZ8kHqZ8kHO', role: 'admin' },
            { id: 2, username: 'user', password: '$2b$10$rQZ8kHqZ8kHqZ8kHqZ8kHO', role: 'user' }
        ];
    }
    async login(loginDto) {
        const { username, password } = loginDto;
        const user = await this.validateUser(username, password);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { username: user.username, sub: user.id, role: user.role };
        const token = this.jwtService.sign(payload);
        return {
            success: true,
            message: 'Login successful',
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            },
            token,
            expiresIn: this.configService.get('JWT_EXPIRES_IN', '24h')
        };
    }
    async logout() {
        return {
            success: true,
            message: 'Logout successful'
        };
    }
    async validateToken(token) {
        try {
            const payload = this.jwtService.verify(token);
            return {
                success: true,
                message: 'Token is valid',
                user: {
                    id: payload.sub,
                    username: payload.username,
                    role: payload.role
                }
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
    async validateUser(username, password) {
        // Simple validation for demo (replace with real password check)
        if (username === 'admin' && password === 'azizsys2025') {
            return { id: 1, username: 'admin', role: 'admin' };
        }
        if (username === 'user' && password === 'user123') {
            return { id: 2, username: 'user', role: 'user' };
        }
        return null;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map