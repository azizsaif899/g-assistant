"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationMemoryService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let ConversationMemoryService = class ConversationMemoryService {
    constructor() {
        this.sessions = new Map();
        this.MAX_TURNS_PER_SESSION = 50;
        this.SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours
    }
    createSession(userId) {
        const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        this.sessions.set(sessionId, {
            sessionId,
            userId,
            turns: [],
            context: {
                topics: [],
                preferences: {},
                lastActivity: new Date()
            },
            metadata: {
                totalTurns: 0,
                avgResponseTime: 0
            }
        });
        return sessionId;
    }
    addTurn(sessionId, userMessage, aiResponse, context) {
        const session = this.sessions.get(sessionId);
        if (!session)
            return;
        const turn = {
            id: `turn_${Date.now()}`,
            userMessage,
            aiResponse,
            timestamp: new Date(),
            context,
            intent: this.extractIntent(userMessage),
            sentiment: this.analyzeSentiment(userMessage)
        };
        session.turns.push(turn);
        session.context.lastActivity = new Date();
        session.metadata.totalTurns++;
        // Update topics
        const topics = this.extractTopics(userMessage);
        session.context.topics = [...new Set([...session.context.topics, ...topics])];
        // Keep only recent turns
        if (session.turns.length > this.MAX_TURNS_PER_SESSION) {
            session.turns = session.turns.slice(-this.MAX_TURNS_PER_SESSION);
        }
        this.sessions.set(sessionId, session);
    }
    getContext(sessionId) {
        const session = this.sessions.get(sessionId);
        if (!session || session.turns.length === 0)
            return '';
        const recentTurns = session.turns.slice(-5); // Last 5 turns
        const contextParts = [
            `المواضيع المناقشة: ${session.context.topics.join(', ')}`,
            'المحادثات السابقة:',
            ...recentTurns.map(turn => `المستخدم: ${turn.userMessage}\nالمساعد: ${turn.aiResponse}`)
        ];
        return contextParts.join('\n');
    }
    getSession(sessionId) {
        return this.sessions.get(sessionId) || null;
    }
    updatePreference(sessionId, key, value) {
        const session = this.sessions.get(sessionId);
        if (session) {
            session.context.preferences[key] = value;
            this.sessions.set(sessionId, session);
        }
    }
    cleanupExpiredSessions() {
        const now = Date.now();
        for (const [sessionId, session] of this.sessions.entries()) {
            if (now - session.context.lastActivity.getTime() > this.SESSION_TIMEOUT) {
                this.sessions.delete(sessionId);
            }
        }
    }
    extractIntent(message) {
        const intents = {
            'question': ['ما', 'كيف', 'متى', 'أين', 'لماذا', 'هل'],
            'request': ['أريد', 'أحتاج', 'ممكن', 'يرجى'],
            'complaint': ['مشكلة', 'خطأ', 'لا يعمل', 'فشل'],
            'compliment': ['شكرا', 'ممتاز', 'رائع', 'جيد']
        };
        for (const [intent, keywords] of Object.entries(intents)) {
            if (keywords.some(keyword => message.includes(keyword))) {
                return intent;
            }
        }
        return 'general';
    }
    analyzeSentiment(message) {
        const positiveWords = ['شكرا', 'ممتاز', 'رائع', 'جيد', 'أحب', 'سعيد'];
        const negativeWords = ['سيء', 'مشكلة', 'خطأ', 'لا أحب', 'صعب', 'فشل'];
        const positiveCount = positiveWords.filter(word => message.includes(word)).length;
        const negativeCount = negativeWords.filter(word => message.includes(word)).length;
        if (positiveCount > negativeCount)
            return 'positive';
        if (negativeCount > positiveCount)
            return 'negative';
        return 'neutral';
    }
    extractTopics(message) {
        const topics = [];
        const topicKeywords = {
            'تقنية': ['برمجة', 'كمبيوتر', 'تطبيق', 'موقع', 'ذكاء اصطناعي'],
            'عمل': ['وظيفة', 'شركة', 'مشروع', 'عمل', 'مهنة'],
            'تعليم': ['دراسة', 'جامعة', 'كتاب', 'تعلم', 'دورة'],
            'صحة': ['طبيب', 'مرض', 'علاج', 'صحة', 'دواء']
        };
        for (const [topic, keywords] of Object.entries(topicKeywords)) {
            if (keywords.some(keyword => message.includes(keyword))) {
                topics.push(topic);
            }
        }
        return topics;
    }
    getStats() {
        return {
            totalSessions: this.sessions.size,
            activeSessions: Array.from(this.sessions.values()).filter(s => Date.now() - s.context.lastActivity.getTime() < 60 * 60 * 1000).length,
            totalTurns: Array.from(this.sessions.values()).reduce((sum, s) => sum + s.metadata.totalTurns, 0)
        };
    }
};
exports.ConversationMemoryService = ConversationMemoryService;
exports.ConversationMemoryService = ConversationMemoryService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], ConversationMemoryService);
//# sourceMappingURL=conversation-memory.service.js.map