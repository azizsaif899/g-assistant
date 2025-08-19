"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRunner = void 0;
class TestRunner {
    constructor() {
        this.testSuites = new Map();
    }
    addTestSuite(name, suite) {
        this.testSuites.set(name, suite);
    }
    async runAll() {
        const results = {
            totalTests: 0,
            passedTests: 0,
            failedTests: 0,
            coverage: 0,
            duration: 0,
            suites: []
        };
        const startTime = Date.now();
        for (const [name, suite] of this.testSuites) {
            const suiteResult = await this.runSuite(name, suite);
            results.suites.push(suiteResult);
            results.totalTests += suiteResult.totalTests;
            results.passedTests += suiteResult.passedTests;
            results.failedTests += suiteResult.failedTests;
        }
        results.duration = Date.now() - startTime;
        results.coverage = this.calculateCoverage();
        return results;
    }
    async runSuite(name, suite) {
        const result = {
            name,
            totalTests: suite.tests.length,
            passedTests: 0,
            failedTests: 0,
            tests: []
        };
        for (const test of suite.tests) {
            try {
                await test.run();
                result.passedTests++;
                result.tests.push({ name: test.name, status: 'passed' });
            }
            catch (error) {
                result.failedTests++;
                result.tests.push({ name: test.name, status: 'failed', error: error.message });
            }
        }
        return result;
    }
    calculateCoverage() {
        // Mock coverage calculation
        return 95.5;
    }
}
exports.TestRunner = TestRunner;
//# sourceMappingURL=test-runner.js.map