"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoverageMonitor = void 0;
class CoverageMonitor {
    constructor() {
        this.thresholds = {
            statements: 90,
            branches: 85,
            functions: 90,
            lines: 90
        };
    }
    async generateCoverageReport() {
        const coverage = await this.collectCoverageData();
        const report = {
            overall: this.calculateOverallCoverage(coverage),
            byFile: coverage,
            thresholds: this.thresholds,
            passed: this.checkThresholds(coverage),
            timestamp: new Date()
        };
        await this.saveCoverageReport(report);
        return report;
    }
    async monitorCoverageChanges() {
        const current = await this.collectCoverageData();
        const previous = await this.loadPreviousCoverage();
        return this.compareCoverage(current, previous);
    }
    async collectCoverageData() {
        // Mock coverage data collection
        return [
            { file: 'src/user.service.ts', statements: 95, branches: 90, functions: 100, lines: 95 },
            { file: 'src/auth.service.ts', statements: 88, branches: 82, functions: 90, lines: 87 },
            { file: 'src/data.service.ts', statements: 92, branches: 88, functions: 95, lines: 91 }
        ];
    }
    calculateOverallCoverage(coverage) {
        const totals = coverage.reduce((acc, file) => ({
            statements: acc.statements + file.statements,
            branches: acc.branches + file.branches,
            functions: acc.functions + file.functions,
            lines: acc.lines + file.lines
        }), { statements: 0, branches: 0, functions: 0, lines: 0 });
        const count = coverage.length;
        return {
            statements: totals.statements / count,
            branches: totals.branches / count,
            functions: totals.functions / count,
            lines: totals.lines / count
        };
    }
    checkThresholds(coverage) {
        const overall = this.calculateOverallCoverage(coverage);
        return overall.statements >= this.thresholds.statements &&
            overall.branches >= this.thresholds.branches &&
            overall.functions >= this.thresholds.functions &&
            overall.lines >= this.thresholds.lines;
    }
    async saveCoverageReport(report) {
        console.log('Coverage report saved:', report.overall);
    }
    async loadPreviousCoverage() {
        // Mock previous coverage
        return [
            { file: 'src/user.service.ts', statements: 93, branches: 88, functions: 98, lines: 92 }
        ];
    }
    compareCoverage(current, previous) {
        return current.map(curr => {
            const prev = previous.find(p => p.file === curr.file);
            if (!prev)
                return { file: curr.file, change: 'new', delta: 0 };
            const delta = curr.statements - prev.statements;
            return {
                file: curr.file,
                change: delta > 0 ? 'improved' : delta < 0 ? 'decreased' : 'unchanged',
                delta
            };
        });
    }
}
exports.CoverageMonitor = CoverageMonitor;
//# sourceMappingURL=coverage-monitor.js.map