export * from './agents/CFOAgent';
export * from './agents/DeveloperAgent';
export * from './agents/DatabaseManagerAgent';
export * from './agents/OperationsAgent';
export * from './agents/GeneralAgent';
export * from './modes/SmartMode';
export * from './modes/IterativeMode';
export * from './modes/AnalysisMode';
export declare class SidebarSystem {
    private agents;
    private modes;
    processQuery(agentType: string, mode: string, query: string): Promise<string>;
    getAgents(): string[];
    getModes(): string[];
    getStatus(): {
        agents: number;
        modes: number;
        active: boolean;
    };
}
