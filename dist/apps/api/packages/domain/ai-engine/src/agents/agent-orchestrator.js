"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentOrchestrator = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let AgentOrchestrator = class AgentOrchestrator {
    constructor() {
        this.agents = new Map();
        this.activeAgents = new Set();
        this.initializeAgents();
    }
    initializeAgents() {
        this.registerAgent('CFO', {
            name: 'المحلل المالي',
            capabilities: ['financial_analysis', 'reporting', 'budgeting'],
            priority: 'high',
            status: 'active'
        });
        this.registerAgent('Developer', {
            name: 'المطور',
            capabilities: ['code_review', 'debugging', 'architecture'],
            priority: 'high',
            status: 'active'
        });
        this.registerAgent('DatabaseManager', {
            name: 'مدير قاعدة البيانات',
            capabilities: ['data_analysis', 'query_optimization'],
            priority: 'medium',
            status: 'active'
        });
    }
    registerAgent(id, config) {
        this.agents.set(id, {
            id,
            ...config,
            registeredAt: new Date(),
            lastActive: new Date()
        });
        if (config.status === 'active') {
            this.activeAgents.add(id);
        }
    }
    async routeRequest(request) {
        const { message, preferredAgent } = request;
        const selectedAgent = this.selectBestAgent(message, preferredAgent);
        const result = await this.executeWithAgent(selectedAgent, request);
        return {
            ...result,
            agent: selectedAgent,
            agentInfo: this.agents.get(selectedAgent)
        };
    }
    selectBestAgent(message, preferredAgent) {
        if (preferredAgent && this.activeAgents.has(preferredAgent)) {
            return preferredAgent;
        }
        const messageLower = message.toLowerCase();
        if (messageLower.match(/مالي|تقرير|حساب|ميزانية/)) {
            return 'CFO';
        }
        if (messageLower.match(/كود|برمج|تطوير|خطأ/)) {
            return 'Developer';
        }
        if (messageLower.match(/بيانات|جدول|استعلام|تحليل/)) {
            return 'DatabaseManager';
        }
        return 'General';
    }
    async executeWithAgent(agentId, request) {
        const agent = this.agents.get(agentId);
        if (!agent) {
            throw new Error(`Agent ${agentId} not found`);
        }
        const result = await this.processWithAgentType(agentId, request);
        return {
            success: true,
            text: result.text,
            metadata: {
                agent: agentId,
                agentName: agent.name,
                processingTime: result.processingTime
            }
        };
    }
    async processWithAgentType(agentId, request) {
        const startTime = Date.now();
        const { message } = request;
        let response = '';
        switch (agentId) {
            case 'CFO':
                response = `💰 تحليل مالي: ${message}\n\nتم إعداد التحليل المالي المطلوب مع التوصيات.`;
                break;
            case 'Developer':
                response = `👨💻 تحليل تقني: ${message}\n\nتم مراجعة الكود وإعداد الحلول التقنية.`;
                break;
            case 'DatabaseManager':
                response = `🗄️ تحليل البيانات: ${message}\n\nتم تحليل البيانات وإعداد التقرير.`;
                break;
            default:
                response = `🤖 مساعدة عامة: ${message}\n\nتم معالجة طلبك.`;
        }
        return {
            text: response,
            processingTime: Date.now() - startTime
        };
    }
    getAgentStatus() {
        return Array.from(this.agents.values()).map(agent => ({
            id: agent.id,
            name: agent.name,
            status: this.activeAgents.has(agent.id) ? 'active' : 'inactive',
            capabilities: agent.capabilities,
            priority: agent.priority
        }));
    }
};
exports.AgentOrchestrator = AgentOrchestrator;
exports.AgentOrchestrator = AgentOrchestrator = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], AgentOrchestrator);
//# sourceMappingURL=agent-orchestrator.js.map