"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoverageAnalyzer = void 0;
class CoverageAnalyzer {
    constructor() {
        this.coverageHistory = [];
    }
    analyzeCoverage(rawCoverage) {
        const summary = this.calculateSummary(rawCoverage);
        const files = this.analyzeFiles(rawCoverage);
        const trends = this.calculateTrends();
        const recommendations = this.generateRecommendations(summary, files);
        return {
            summary,
            files,
            trends,
            recommendations
        };
    }
    calculateSummary(rawCoverage) {
        // Simulate coverage calculation
        const statements = { covered: 920, total: 1000, percentage: 92.0 };
        const branches = { covered: 435, total: 500, percentage: 87.0 };
        const functions = { covered: 188, total: 200, percentage: 94.0 };
        const lines = { covered: 918, total: 1000, percentage: 91.8 };
        const overall = (statements.percentage + branches.percentage + functions.percentage + lines.percentage) / 4;
        return {
            statements,
            branches,
            functions,
            lines,
            overall: Math.round(overall * 100) / 100
        };
    }
    analyzeFiles(rawCoverage) {
        const files = new Map();
        // Simulate file analysis
        const sampleFiles = [
            'packages/core-logic/src/index.ts',
            'packages/ai-engine/src/nlp-processor.ts',
            'packages/security-core/src/security-manager.ts',
            'apps/api/src/app.controller.ts'
        ];
        sampleFiles.forEach(filePath => {
            files.set(filePath, {
                path: filePath,
                statements: { covered: 45, total: 50, percentage: 90.0 },
                branches: { covered: 18, total: 20, percentage: 90.0 },
                functions: { covered: 8, total: 10, percentage: 80.0 },
                lines: { covered: 48, total: 52, percentage: 92.3 },
                uncoveredLines: [15, 23, 45, 67],
                complexity: this.calculateComplexity(filePath)
            });
        });
        return files;
    }
    calculateComplexity(filePath) {
        // Simulate complexity calculation based on file type
        if (filePath.includes('controller'))
            return 8;
        if (filePath.includes('service'))
            return 12;
        if (filePath.includes('util'))
            return 4;
        return 6;
    }
    calculateTrends() {
        // Simulate trend calculation
        const trends = [];
        const now = new Date();
        for (let i = 30; i >= 0; i--) {
            const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
            const baseCoverage = 85;
            const variation = Math.sin(i / 5) * 5 + Math.random() * 3;
            const coverage = Math.max(75, Math.min(95, baseCoverage + variation));
            const previousCoverage = i === 30 ? coverage : trends[trends.length - 1].coverage;
            const change = coverage - previousCoverage;
            trends.push({
                date,
                coverage: Math.round(coverage * 100) / 100,
                change: Math.round(change * 100) / 100
            });
        }
        this.coverageHistory = trends;
        return trends;
    }
    generateRecommendations(summary, files) {
        const recommendations = [];
        // Overall coverage recommendations
        if (summary.overall < 90) {
            recommendations.push('Overall coverage is below 90%. Focus on increasing test coverage.');
        }
        // Specific metric recommendations
        if (summary.branches.percentage < 85) {
            recommendations.push('Branch coverage is low. Add tests for conditional logic and error paths.');
        }
        if (summary.functions.percentage < 90) {
            recommendations.push('Function coverage is low. Ensure all functions have dedicated tests.');
        }
        // File-specific recommendations
        const lowCoverageFiles = Array.from(files.entries())
            .filter(([_, detail]) => detail.statements.percentage < 80)
            .map(([path, _]) => path);
        if (lowCoverageFiles.length > 0) {
            recommendations.push(`Files with low coverage need attention: ${lowCoverageFiles.join(', ')}`);
        }
        // Complexity-based recommendations
        const complexFiles = Array.from(files.entries())
            .filter(([_, detail]) => detail.complexity > 10)
            .map(([path, _]) => path);
        if (complexFiles.length > 0) {
            recommendations.push(`High complexity files may need refactoring: ${complexFiles.join(', ')}`);
        }
        // Trend-based recommendations
        const recentTrend = this.getRecentTrend();
        if (recentTrend < -2) {
            recommendations.push('Coverage has been declining recently. Review recent changes and add missing tests.');
        }
        return recommendations;
    }
    getRecentTrend() {
        if (this.coverageHistory.length < 7)
            return 0;
        const recent = this.coverageHistory.slice(-7);
        const weekAgo = recent[0].coverage;
        const today = recent[recent.length - 1].coverage;
        return today - weekAgo;
    }
    generateDetailedReport(report) {
        let output = '\n📊 Detailed Coverage Analysis\n';
        output += '================================\n\n';
        // Summary
        output += '📈 Summary:\n';
        output += `Overall Coverage: ${report.summary.overall}%\n`;
        output += `Statements: ${report.summary.statements.percentage}% (${report.summary.statements.covered}/${report.summary.statements.total})\n`;
        output += `Branches: ${report.summary.branches.percentage}% (${report.summary.branches.covered}/${report.summary.branches.total})\n`;
        output += `Functions: ${report.summary.functions.percentage}% (${report.summary.functions.covered}/${report.summary.functions.total})\n`;
        output += `Lines: ${report.summary.lines.percentage}% (${report.summary.lines.covered}/${report.summary.lines.total})\n\n`;
        // Trends
        if (report.trends.length > 0) {
            const recentTrend = this.getRecentTrend();
            output += '📉 Trends:\n';
            output += `7-day trend: ${recentTrend > 0 ? '+' : ''}${recentTrend.toFixed(2)}%\n`;
            output += `Current: ${report.trends[report.trends.length - 1].coverage}%\n\n`;
        }
        // File details
        output += '📁 File Coverage:\n';
        const sortedFiles = Array.from(report.files.entries())
            .sort((a, b) => a[1].statements.percentage - b[1].statements.percentage);
        sortedFiles.forEach(([path, detail]) => {
            const status = detail.statements.percentage >= 90 ? '✅' :
                detail.statements.percentage >= 80 ? '⚠️' : '❌';
            output += `${status} ${path}: ${detail.statements.percentage}%\n`;
            if (detail.uncoveredLines.length > 0) {
                output += `   Uncovered lines: ${detail.uncoveredLines.join(', ')}\n`;
            }
        });
        // Recommendations
        if (report.recommendations.length > 0) {
            output += '\n💡 Recommendations:\n';
            report.recommendations.forEach((rec, index) => {
                output += `${index + 1}. ${rec}\n`;
            });
        }
        return output;
    }
    exportCoverageData(report) {
        return {
            timestamp: new Date().toISOString(),
            summary: report.summary,
            fileCount: report.files.size,
            trends: report.trends,
            recommendations: report.recommendations,
            files: Array.from(report.files.entries()).map(([path, detail]) => ({
                path,
                coverage: detail.statements.percentage,
                complexity: detail.complexity,
                uncoveredLines: detail.uncoveredLines.length
            }))
        };
    }
    compareCoverage(current, previous) {
        const summary = {
            statements: current.summary.statements.percentage - previous.summary.statements.percentage,
            branches: current.summary.branches.percentage - previous.summary.branches.percentage,
            functions: current.summary.functions.percentage - previous.summary.functions.percentage,
            lines: current.summary.lines.percentage - previous.summary.lines.percentage,
            overall: current.summary.overall - previous.summary.overall
        };
        const fileChanges = Array.from(current.files.entries()).map(([path, currentDetail]) => {
            const previousDetail = previous.files.get(path);
            if (!previousDetail) {
                return { path, change: currentDetail.statements.percentage, status: 'improved' };
            }
            const change = currentDetail.statements.percentage - previousDetail.statements.percentage;
            const status = change > 1 ? 'improved' : change < -1 ? 'degraded' : 'unchanged';
            return { path, change, status };
        });
        return { summary, fileChanges };
    }
}
exports.CoverageAnalyzer = CoverageAnalyzer;
//# sourceMappingURL=coverage-analyzer.js.map