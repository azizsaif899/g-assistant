export declare const apiRoutes: {
    '/api/v2/health': {
        method: string;
        handler: () => {
            status: string;
            timestamp: string;
            version: string;
        };
    };
    '/api/hybrid/research': {
        method: string;
        handler: (data: any) => {
            success: boolean;
            query: any;
            results: {
                title: string;
                content: string;
                source: string;
            }[];
        };
    };
    '/api/hybrid/workflow': {
        method: string;
        handler: (data: any) => {
            success: boolean;
            workflowId: string;
            status: string;
        };
    };
    '/api/agents/cfo': {
        method: string;
        handler: (data: any) => {
            agent: string;
            response: string;
            analysis: string;
        };
    };
    '/api/agents/developer': {
        method: string;
        handler: (data: any) => {
            agent: string;
            response: string;
            codeReview: string;
        };
    };
    '/api/agents/database': {
        method: string;
        handler: (data: any) => {
            agent: string;
            response: string;
            query: string;
        };
    };
    '/api/agents/operations': {
        method: string;
        handler: (data: any) => {
            agent: string;
            response: string;
            monitoring: string;
        };
    };
    '/api/agents/general': {
        method: string;
        handler: (data: any) => {
            agent: string;
            response: string;
            assistance: string;
        };
    };
};
export default apiRoutes;
