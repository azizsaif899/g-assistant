"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionManager = void 0;
class SessionManager {
    constructor() {
        this.sessions = new Map();
    }
    createSession(userId) {
        const session = {
            id: `session_${Date.now()}`,
            userId,
            status: 'active',
            createdAt: new Date(),
            data: {}
        };
        this.sessions.set(session.id, session);
        console.log(`🔴 Live session created: ${session.id}`);
        return session;
    }
    getSession(sessionId) {
        return this.sessions.get(sessionId) || null;
    }
    endSession(sessionId) {
        const session = this.sessions.get(sessionId);
        if (session) {
            session.status = 'ended';
            console.log(`⏹️ Live session ended: ${sessionId}`);
        }
    }
    getActiveSessions() {
        return Array.from(this.sessions.values()).filter(s => s.status === 'active');
    }
}
exports.SessionManager = SessionManager;
//# sourceMappingURL=session.manager.js.map