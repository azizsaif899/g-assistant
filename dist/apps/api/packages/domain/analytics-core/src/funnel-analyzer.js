"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunnelAnalyzer = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let FunnelAnalyzer = class FunnelAnalyzer {
    async analyzeFunnel(funnelSteps, dateRange) {
        const steps = await this.calculateFunnelSteps(funnelSteps, dateRange);
        const overallConversion = this.calculateOverallConversion(steps);
        const bottlenecks = this.identifyBottlenecks(steps);
        const recommendations = this.generateRecommendations(steps, bottlenecks);
        return {
            steps,
            overallConversion,
            bottlenecks,
            recommendations
        };
    }
    async calculateFunnelSteps(stepNames, dateRange) {
        const steps = [];
        let previousUsers = 10000; // Starting with 10k users
        for (let i = 0; i < stepNames.length; i++) {
            // Simulate realistic conversion rates
            const conversionRate = this.getStepConversionRate(stepNames[i], i);
            const currentUsers = Math.floor(previousUsers * (conversionRate / 100));
            const dropoffRate = 100 - conversionRate;
            steps.push({
                name: stepNames[i],
                users: currentUsers,
                conversionRate: i === 0 ? 100 : conversionRate,
                dropoffRate: i === 0 ? 0 : dropoffRate
            });
            previousUsers = currentUsers;
        }
        return steps;
    }
    getStepConversionRate(stepName, index) {
        // Realistic conversion rates based on step type
        const baseRates = {
            'landing': 100,
            'signup': 25,
            'activation': 70,
            'trial': 60,
            'purchase': 15,
            'retention': 80
        };
        // Find matching step type
        const stepType = Object.keys(baseRates).find(type => stepName.toLowerCase().includes(type));
        if (stepType) {
            return baseRates[stepType];
        }
        // Default declining rates
        return Math.max(20, 90 - (index * 15));
    }
    calculateOverallConversion(steps) {
        if (steps.length === 0)
            return 0;
        const firstStep = steps[0];
        const lastStep = steps[steps.length - 1];
        return (lastStep.users / firstStep.users) * 100;
    }
    identifyBottlenecks(steps) {
        const bottlenecks = [];
        const averageConversion = steps
            .slice(1) // Skip first step (always 100%)
            .reduce((sum, step) => sum + step.conversionRate, 0) / (steps.length - 1);
        for (let i = 1; i < steps.length; i++) {
            const step = steps[i];
            if (step.conversionRate < averageConversion * 0.7) {
                bottlenecks.push(step.name);
            }
        }
        return bottlenecks;
    }
    generateRecommendations(steps, bottlenecks) {
        const recommendations = [];
        // General recommendations
        if (bottlenecks.length > 0) {
            recommendations.push(`Focus optimization efforts on: ${bottlenecks.join(', ')}`);
        }
        // Specific step recommendations
        for (const step of steps) {
            if (step.name.toLowerCase().includes('signup') && step.conversionRate < 20) {
                recommendations.push('Simplify signup process - consider social login options');
            }
            if (step.name.toLowerCase().includes('activation') && step.conversionRate < 60) {
                recommendations.push('Improve onboarding flow and initial user experience');
            }
            if (step.name.toLowerCase().includes('purchase') && step.conversionRate < 10) {
                recommendations.push('Review pricing strategy and payment flow friction');
            }
        }
        // Overall funnel health
        const overallConversion = this.calculateOverallConversion(steps);
        if (overallConversion < 2) {
            recommendations.push('Overall conversion is low - consider A/B testing major funnel changes');
        }
        else if (overallConversion > 10) {
            recommendations.push('Strong funnel performance - focus on scaling traffic');
        }
        return recommendations;
    }
    async compareFunnels(funnel1, funnel2) {
        const improvements = [];
        const regressions = [];
        const insights = [];
        // Compare overall conversion
        const conversionDiff = funnel2.overallConversion - funnel1.overallConversion;
        if (conversionDiff > 0.5) {
            improvements.push(`Overall conversion improved by ${conversionDiff.toFixed(2)}%`);
        }
        else if (conversionDiff < -0.5) {
            regressions.push(`Overall conversion decreased by ${Math.abs(conversionDiff).toFixed(2)}%`);
        }
        // Compare step-by-step
        const minSteps = Math.min(funnel1.steps.length, funnel2.steps.length);
        for (let i = 1; i < minSteps; i++) {
            const step1 = funnel1.steps[i];
            const step2 = funnel2.steps[i];
            const stepDiff = step2.conversionRate - step1.conversionRate;
            if (stepDiff > 2) {
                improvements.push(`${step2.name} conversion improved by ${stepDiff.toFixed(1)}%`);
            }
            else if (stepDiff < -2) {
                regressions.push(`${step2.name} conversion decreased by ${Math.abs(stepDiff).toFixed(1)}%`);
            }
        }
        // Generate insights
        if (improvements.length > regressions.length) {
            insights.push('Funnel optimization efforts are showing positive results');
        }
        else if (regressions.length > improvements.length) {
            insights.push('Recent changes may have negatively impacted conversion');
        }
        return { improvements, regressions, insights };
    }
};
exports.FunnelAnalyzer = FunnelAnalyzer;
exports.FunnelAnalyzer = FunnelAnalyzer = tslib_1.__decorate([
    (0, common_1.Injectable)()
], FunnelAnalyzer);
//# sourceMappingURL=funnel-analyzer.js.map