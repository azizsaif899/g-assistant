"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoverageAnalyzer = void 0;
class CoverageAnalyzer {
    constructor() {
        this.coverageData = new Map();
    }
    analyzeCoverage(filePath, executedLines, totalLines) {
        const coverage = {
            filePath,
            totalLines,
            coveredLines: executedLines.length,
            coveragePercentage: (executedLines.length / totalLines) * 100,
            uncoveredLines: this.getUncoveredLines(executedLines, totalLines)
        };
        this.coverageData.set(filePath, coverage);
        return coverage;
    }
    generateReport() {
        const files = Array.from(this.coverageData.values());
        const totalLines = files.reduce((sum, file) => sum + file.totalLines, 0);
        const coveredLines = files.reduce((sum, file) => sum + file.coveredLines, 0);
        return {
            overallCoverage: (coveredLines / totalLines) * 100,
            totalFiles: files.length,
            totalLines,
            coveredLines,
            files,
            thresholds: {
                statements: 95,
                branches: 90,
                functions: 95,
                lines: 95
            }
        };
    }
    checkThresholds(report) {
        return {
            passed: report.overallCoverage >= report.thresholds.lines,
            details: {
                statements: report.overallCoverage >= report.thresholds.statements,
                branches: report.overallCoverage >= report.thresholds.branches,
                functions: report.overallCoverage >= report.thresholds.functions,
                lines: report.overallCoverage >= report.thresholds.lines
            }
        };
    }
    getUncoveredLines(executedLines, totalLines) {
        const uncovered = [];
        for (let i = 1; i <= totalLines; i++) {
            if (!executedLines.includes(i)) {
                uncovered.push(i);
            }
        }
        return uncovered;
    }
}
exports.CoverageAnalyzer = CoverageAnalyzer;
//# sourceMappingURL=coverage-analyzer.js.map