"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImpactCalculator = void 0;
const event_bus_1 = require("./event-bus");
class ImpactCalculator {
    constructor() {
        this.eventBus = event_bus_1.EventBus.getInstance();
        this.impactWeights = new Map([
            ['revenue', 0.3],
            ['costs', 0.25],
            ['efficiency', 0.2],
            ['customer_satisfaction', 0.15],
            ['market_share', 0.1]
        ]);
    }
    calculateImpact(scenario, variables) {
        const impactBreakdown = [];
        let totalImpact = 0;
        variables.forEach(variable => {
            const weight = this.impactWeights.get(variable.name) || 0.1;
            const impact = this.calculateVariableImpact(variable);
            const contribution = impact * weight;
            impactBreakdown.push({
                variable: variable.name,
                impact,
                weight,
                contribution
            });
            totalImpact += contribution;
        });
        const riskAdjustedImpact = this.adjustForRisk(totalImpact, scenario);
        const confidence = this.calculateConfidence(scenario, variables);
        const calculation = {
            scenarioId: scenario.id,
            totalImpact,
            impactBreakdown,
            riskAdjustedImpact,
            confidence
        };
        this.eventBus.emit('impact:calculated', calculation);
        return calculation;
    }
    calculateVariableImpact(variable) {
        const range = variable.suggestedRange[1] - variable.suggestedRange[0];
        const position = (variable.currentValue - variable.suggestedRange[0]) / range;
        return position * variable.impact;
    }
    adjustForRisk(impact, scenario) {
        const riskMultipliers = {
            low: 0.9,
            medium: 0.8,
            high: 0.6,
            critical: 0.4
        };
        return impact * riskMultipliers[scenario.impact];
    }
    calculateConfidence(scenario, variables) {
        const baseConfidence = scenario.probability;
        const variableConfidence = variables.reduce((acc, v) => acc + v.impact, 0) / variables.length;
        return (baseConfidence + variableConfidence) / 2;
    }
    updateImpactWeights(weights) {
        Object.entries(weights).forEach(([key, value]) => {
            this.impactWeights.set(key, value);
        });
        this.eventBus.emit('impact:weights:updated', weights);
    }
}
exports.ImpactCalculator = ImpactCalculator;
//# sourceMappingURL=impact-calculator.js.map