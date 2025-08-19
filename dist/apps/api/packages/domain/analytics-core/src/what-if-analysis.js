"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatIfAnalysis = void 0;
const core_logic_1 = require("@azizsys/core-logic");
const ml_core_1 = require("@azizsys/ml-core");
class WhatIfAnalysis {
    constructor() {
        this.eventBus = core_logic_1.EventBus.getInstance();
        this.predictionModels = new ml_core_1.PredictionModels();
    }
    async analyzeScenarios(request) {
        const scenarios = [];
        for (const scenarioConfig of request.scenarios) {
            const scenario = await this.analyzeScenario({
                ...scenarioConfig,
                baselineData: request.baselineData,
                timeframe: request.timeframe,
                analysisType: request.analysisType
            });
            scenarios.push(scenario);
        }
        this.eventBus.emit('whatif:analysis:completed', { scenarios, request });
        return scenarios;
    }
    async analyzeScenario(config) {
        const modifiedData = { ...config.baselineData };
        // Apply changes to baseline data
        Object.entries(config.changes).forEach(([key, change]) => {
            if (modifiedData[key] !== undefined) {
                modifiedData[key] = modifiedData[key] * (1 + change / 100);
            }
        });
        const projectedOutcomes = await this.calculateOutcomes(config.baselineData, modifiedData, config.timeframe);
        const confidence = this.calculateConfidence(config.changes, projectedOutcomes);
        const riskLevel = this.assessRiskLevel(projectedOutcomes);
        return {
            id: `scenario_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: config.name,
            description: this.generateDescription(config.changes),
            baselineMetrics: config.baselineData,
            changes: config.changes,
            projectedOutcomes,
            confidence,
            riskLevel
        };
    }
    async calculateOutcomes(baseline, modified, timeframe) {
        const outcomes = [];
        for (const [metric, baselineValue] of Object.entries(baseline)) {
            const modifiedValue = modified[metric] || baselineValue;
            // Use prediction models for more accurate projections
            const features = Object.values(modified);
            const prediction = await this.predictionModels.predictRevenue({
                features,
                timeframe,
                context: { baseline, modified }
            });
            const projectedValue = prediction.value;
            const absoluteChange = projectedValue - baselineValue;
            const percentageChange = (absoluteChange / baselineValue) * 100;
            outcomes.push({
                metric,
                baselineValue,
                projectedValue,
                absoluteChange,
                percentageChange,
                impact: this.determineImpact(percentageChange)
            });
        }
        return outcomes;
    }
    calculateConfidence(changes, outcomes) {
        // Base confidence starts high for small changes
        const changesMagnitude = Object.values(changes)
            .reduce((sum, change) => sum + Math.abs(change), 0) / Object.keys(changes).length;
        let baseConfidence = Math.max(0.3, 1 - (changesMagnitude / 100));
        // Adjust based on outcome consistency
        const outcomeVariance = this.calculateOutcomeVariance(outcomes);
        const consistencyFactor = Math.max(0.5, 1 - outcomeVariance);
        return Math.min(0.95, baseConfidence * consistencyFactor);
    }
    calculateOutcomeVariance(outcomes) {
        const changes = outcomes.map(o => Math.abs(o.percentageChange));
        const mean = changes.reduce((a, b) => a + b, 0) / changes.length;
        const variance = changes.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / changes.length;
        return Math.sqrt(variance) / 100; // Normalize to 0-1 range
    }
    assessRiskLevel(outcomes) {
        const negativeOutcomes = outcomes.filter(o => o.impact === 'negative');
        const maxNegativeChange = Math.max(...negativeOutcomes.map(o => Math.abs(o.percentageChange)), 0);
        if (maxNegativeChange > 50)
            return 'critical';
        if (maxNegativeChange > 25)
            return 'high';
        if (maxNegativeChange > 10)
            return 'medium';
        return 'low';
    }
    determineImpact(percentageChange) {
        if (Math.abs(percentageChange) < 2)
            return 'neutral';
        return percentageChange > 0 ? 'positive' : 'negative';
    }
    generateDescription(changes) {
        const changeDescriptions = Object.entries(changes).map(([key, value]) => {
            const direction = value > 0 ? 'increase' : 'decrease';
            return `${Math.abs(value)}% ${direction} in ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
        });
        return `Scenario with ${changeDescriptions.join(', ')}`;
    }
    async compareScenarios(scenarios) {
        // Calculate overall score for each scenario
        const scoredScenarios = scenarios.map(scenario => {
            const positiveOutcomes = scenario.projectedOutcomes.filter(o => o.impact === 'positive');
            const score = positiveOutcomes.reduce((sum, outcome) => sum + outcome.percentageChange, 0);
            return { scenario, score };
        });
        const bestScenario = scoredScenarios.reduce((best, current) => current.score > best.score ? current : best).scenario;
        const worstScenario = scoredScenarios.reduce((worst, current) => current.score < worst.score ? current : worst).scenario;
        // Create comparison matrix
        const allMetrics = [...new Set(scenarios.flatMap(s => s.projectedOutcomes.map(o => o.metric)))];
        const comparison = allMetrics.map(metric => {
            const scenarioValues = scenarios.map(scenario => {
                const outcome = scenario.projectedOutcomes.find(o => o.metric === metric);
                return {
                    name: scenario.name,
                    value: outcome?.projectedValue || 0
                };
            }).sort((a, b) => b.value - a.value);
            return {
                metric,
                scenarios: scenarioValues.map((sv, index) => ({
                    ...sv,
                    rank: index + 1
                }))
            };
        });
        return { bestScenario, worstScenario, comparison };
    }
}
exports.WhatIfAnalysis = WhatIfAnalysis;
//# sourceMappingURL=what-if-analysis.js.map