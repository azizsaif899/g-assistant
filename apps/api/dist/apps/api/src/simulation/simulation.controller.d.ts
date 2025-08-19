export declare class SimulationController {
    generateScenarios(context: {
        businessType: string;
        currentMetrics: Record<string, number>;
        goals: string[];
        constraints: string[];
    }): Promise<{
        scenarios: any[];
        message: string;
    }>;
    performWhatIfAnalysis(request: {
        baselineData: Record<string, number>;
        scenarios: Array<{
            name: string;
            changes: Record<string, number>;
        }>;
        timeframe: number;
    }): Promise<{
        analysis: any[];
        message: string;
    }>;
    assessRisks(context: {
        businessType: string;
        currentMetrics: Record<string, number>;
        plannedChanges: Record<string, any>;
    }): Promise<{
        risks: any[];
        overallRisk: string;
    }>;
    predictRevenue(): Promise<{
        prediction: number;
        confidence: number;
        trend: string;
    }>;
}
