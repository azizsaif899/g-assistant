"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CohortAnalyzer = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let CohortAnalyzer = class CohortAnalyzer {
    async analyzeCohorts(startDate, endDate) {
        const cohorts = await this.generateCohortData(startDate, endDate);
        const averageRetention = this.calculateAverageRetention(cohorts);
        const insights = this.generateInsights(cohorts, averageRetention);
        return {
            cohorts,
            averageRetention,
            insights
        };
    }
    async generateCohortData(startDate, endDate) {
        // Simulate cohort data generation
        const cohorts = [];
        const months = this.getMonthsBetween(startDate, endDate);
        for (const month of months) {
            cohorts.push({
                cohortId: `cohort-${month}`,
                period: month,
                size: Math.floor(Math.random() * 1000) + 100,
                retentionRates: this.generateRetentionRates()
            });
        }
        return cohorts;
    }
    generateRetentionRates() {
        const rates = [100]; // Month 0 is always 100%
        let currentRate = 100;
        for (let i = 1; i <= 12; i++) {
            currentRate *= (0.7 + Math.random() * 0.25); // Decay with some randomness
            rates.push(Math.round(currentRate * 100) / 100);
        }
        return rates;
    }
    calculateAverageRetention(cohorts) {
        if (cohorts.length === 0)
            return [];
        const maxPeriods = Math.max(...cohorts.map(c => c.retentionRates.length));
        const averages = [];
        for (let i = 0; i < maxPeriods; i++) {
            const validRates = cohorts
                .map(c => c.retentionRates[i])
                .filter(rate => rate !== undefined);
            if (validRates.length > 0) {
                averages.push(validRates.reduce((sum, rate) => sum + rate, 0) / validRates.length);
            }
        }
        return averages;
    }
    generateInsights(cohorts, averageRetention) {
        const insights = [];
        // Retention insights
        if (averageRetention.length >= 2) {
            const month1Retention = averageRetention[1];
            if (month1Retention > 50) {
                insights.push('Strong month-1 retention indicates good product-market fit');
            }
            else {
                insights.push('Low month-1 retention suggests need for onboarding improvements');
            }
        }
        // Cohort size trends
        const recentCohorts = cohorts.slice(-3);
        const avgRecentSize = recentCohorts.reduce((sum, c) => sum + c.size, 0) / recentCohorts.length;
        const olderCohorts = cohorts.slice(0, 3);
        const avgOlderSize = olderCohorts.reduce((sum, c) => sum + c.size, 0) / olderCohorts.length;
        if (avgRecentSize > avgOlderSize * 1.2) {
            insights.push('Growing user acquisition trend detected');
        }
        else if (avgRecentSize < avgOlderSize * 0.8) {
            insights.push('Declining user acquisition needs attention');
        }
        return insights;
    }
    getMonthsBetween(startDate, endDate) {
        const months = [];
        const current = new Date(startDate);
        while (current <= endDate) {
            months.push(`${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`);
            current.setMonth(current.getMonth() + 1);
        }
        return months;
    }
};
exports.CohortAnalyzer = CohortAnalyzer;
exports.CohortAnalyzer = CohortAnalyzer = tslib_1.__decorate([
    (0, common_1.Injectable)()
], CohortAnalyzer);
//# sourceMappingURL=cohort-analyzer.js.map