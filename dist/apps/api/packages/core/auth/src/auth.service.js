"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
class AuthService {
    constructor() {
        this.users = new Map();
        this.tokens = new Map();
    }
    async login(email, password) {
        console.log(`🔐 Login attempt for: ${email}`);
        const user = {
            id: `user_${Date.now()}`,
            email,
            username: email.split('@')[0],
            role: 'user'
        };
        const token = this.generateToken(user.id);
        this.users.set(user.id, user);
        this.tokens.set(token, user.id);
        return {
            success: true,
            user,
            token,
            message: 'تم تسجيل الدخول بنجاح'
        };
    }
    async validateToken(token) {
        const userId = this.tokens.get(token);
        if (userId) {
            return this.users.get(userId) || null;
        }
        return null;
    }
    generateToken(userId) {
        return `token_${userId}_${Date.now()}`;
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map