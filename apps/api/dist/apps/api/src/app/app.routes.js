"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRoutes = void 0;
exports.apiRoutes = {
    '/api/v2/health': {
        method: 'GET',
        handler: () => ({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            version: '2.0'
        })
    },
    '/api/hybrid/research': {
        method: 'POST',
        handler: (data) => ({
            success: true,
            query: data.query,
            results: [
                {
                    title: 'Research Result',
                    content: 'Mock research content',
                    source: 'gemini-research-agent'
                }
            ]
        })
    },
    '/api/hybrid/workflow': {
        method: 'POST',
        handler: (data) => ({
            success: true,
            workflowId: `wf_${Date.now()}`,
            status: 'completed'
        })
    },
    '/api/agents/cfo': {
        method: 'POST',
        handler: (data) => ({
            agent: 'cfo',
            response: 'CFO Agent response',
            analysis: 'Financial analysis completed'
        })
    },
    '/api/agents/developer': {
        method: 'POST',
        handler: (data) => ({
            agent: 'developer',
            response: 'Developer Agent response',
            codeReview: 'Code review completed'
        })
    },
    '/api/agents/database': {
        method: 'POST',
        handler: (data) => ({
            agent: 'database',
            response: 'Database Agent response',
            query: 'Database query executed'
        })
    },
    '/api/agents/operations': {
        method: 'POST',
        handler: (data) => ({
            agent: 'operations',
            response: 'Operations Agent response',
            monitoring: 'System monitoring active'
        })
    },
    '/api/agents/general': {
        method: 'POST',
        handler: (data) => ({
            agent: 'general',
            response: 'General Agent response',
            assistance: 'General assistance provided'
        })
    }
};
exports.default = exports.apiRoutes;
//# sourceMappingURL=app.routes.js.map