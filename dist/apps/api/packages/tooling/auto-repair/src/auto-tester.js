"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoTester = void 0;
const tslib_1 = require("tslib");
const child_process_1 = require("child_process");
const fs = tslib_1.__importStar(require("fs"));
const path = tslib_1.__importStar(require("path"));
class AutoTester {
    constructor(projectRoot = process.cwd()) {
        this.projectRoot = projectRoot;
    }
    // اختبار إصلاح واحد
    async testFix(fix, filePath) {
        console.log(`🧪 اختبار الإصلاح: ${fix.errorId}`);
        const results = [];
        // اختبار البناء
        const buildResult = await this.testBuild(fix.errorId, filePath);
        results.push(buildResult);
        // اختبار ESLint إذا نجح البناء
        if (buildResult.passed) {
            const lintResult = await this.testLint(fix.errorId, filePath);
            results.push(lintResult);
        }
        // اختبار الوحدة إذا مطلوب
        if (fix.testRequired && buildResult.passed) {
            const unitResult = await this.testUnit(fix.errorId, filePath);
            results.push(unitResult);
        }
        return results;
    }
    // اختبار البناء
    async testBuild(fixId, filePath) {
        const startTime = Date.now();
        try {
            // تحديد المشروع المتأثر
            const project = this.getProjectFromPath(filePath);
            let command;
            if (project) {
                command = `nx build ${project}`;
            }
            else {
                command = 'npx tsc --noEmit';
            }
            const output = (0, child_process_1.execSync)(command, {
                cwd: this.projectRoot,
                encoding: 'utf8',
                stdio: 'pipe'
            });
            return {
                fixId,
                passed: true,
                testType: 'build',
                output: output.toString(),
                duration: Date.now() - startTime
            };
        }
        catch (error) {
            return {
                fixId,
                passed: false,
                testType: 'build',
                output: error.stdout?.toString() || error.stderr?.toString() || error.message,
                duration: Date.now() - startTime
            };
        }
    }
    // اختبار ESLint
    async testLint(fixId, filePath) {
        const startTime = Date.now();
        try {
            const output = (0, child_process_1.execSync)(`npx eslint "${filePath}"`, {
                cwd: this.projectRoot,
                encoding: 'utf8',
                stdio: 'pipe'
            });
            return {
                fixId,
                passed: true,
                testType: 'lint',
                output: output.toString(),
                duration: Date.now() - startTime
            };
        }
        catch (error) {
            // ESLint يعيد exit code غير صفر عند وجود أخطاء
            const output = error.stdout?.toString() || error.stderr?.toString() || '';
            const hasErrors = output.includes('error') || error.status === 1;
            return {
                fixId,
                passed: !hasErrors,
                testType: 'lint',
                output,
                duration: Date.now() - startTime
            };
        }
    }
    // اختبار الوحدة
    async testUnit(fixId, filePath) {
        const startTime = Date.now();
        try {
            // البحث عن ملف اختبار مقابل
            const testFile = this.findTestFile(filePath);
            let command;
            if (testFile) {
                command = `npx jest "${testFile}"`;
            }
            else {
                // تشغيل اختبارات المشروع
                const project = this.getProjectFromPath(filePath);
                command = project ? `nx test ${project}` : 'npm test';
            }
            const output = (0, child_process_1.execSync)(command, {
                cwd: this.projectRoot,
                encoding: 'utf8',
                stdio: 'pipe'
            });
            return {
                fixId,
                passed: true,
                testType: 'unit',
                output: output.toString(),
                duration: Date.now() - startTime
            };
        }
        catch (error) {
            return {
                fixId,
                passed: false,
                testType: 'unit',
                output: error.stdout?.toString() || error.stderr?.toString() || error.message,
                duration: Date.now() - startTime
            };
        }
    }
    // اختبار شامل للمشروع
    async testProject() {
        console.log('🧪 اختبار شامل للمشروع...');
        const results = [];
        const startTime = Date.now();
        // اختبار البناء الشامل
        try {
            const buildOutput = (0, child_process_1.execSync)('nx run-many --target=build --all', {
                cwd: this.projectRoot,
                encoding: 'utf8',
                stdio: 'pipe'
            });
            results.push({
                fixId: 'project-build',
                passed: true,
                testType: 'build',
                output: buildOutput.toString(),
                duration: Date.now() - startTime
            });
        }
        catch (error) {
            results.push({
                fixId: 'project-build',
                passed: false,
                testType: 'build',
                output: error.stdout?.toString() || error.stderr?.toString() || error.message,
                duration: Date.now() - startTime
            });
        }
        // اختبار ESLint الشامل
        try {
            const lintOutput = (0, child_process_1.execSync)('nx run-many --target=lint --all', {
                cwd: this.projectRoot,
                encoding: 'utf8',
                stdio: 'pipe'
            });
            results.push({
                fixId: 'project-lint',
                passed: true,
                testType: 'lint',
                output: lintOutput.toString(),
                duration: Date.now() - startTime
            });
        }
        catch (error) {
            results.push({
                fixId: 'project-lint',
                passed: false,
                testType: 'lint',
                output: error.stdout?.toString() || error.stderr?.toString() || error.message,
                duration: Date.now() - startTime
            });
        }
        return results;
    }
    // العثور على ملف الاختبار المقابل
    findTestFile(filePath) {
        const dir = path.dirname(filePath);
        const name = path.basename(filePath, path.extname(filePath));
        const possibleTestFiles = [
            path.join(dir, `${name}.test.ts`),
            path.join(dir, `${name}.test.js`),
            path.join(dir, `${name}.spec.ts`),
            path.join(dir, `${name}.spec.js`),
            path.join(dir, '__tests__', `${name}.test.ts`),
            path.join(dir, '__tests__', `${name}.test.js`)
        ];
        for (const testFile of possibleTestFiles) {
            if (fs.existsSync(testFile)) {
                return testFile;
            }
        }
        return null;
    }
    // تحديد المشروع من المسار
    getProjectFromPath(filePath) {
        const relativePath = path.relative(this.projectRoot, filePath);
        // تحقق من مجلد apps
        if (relativePath.startsWith('apps/')) {
            const parts = relativePath.split('/');
            return parts[1]; // اسم التطبيق
        }
        // تحقق من مجلد packages
        if (relativePath.startsWith('packages/')) {
            const parts = relativePath.split('/');
            return parts[1]; // اسم المكتبة
        }
        return null;
    }
    // توليد اختبار تلقائي باستخدام AI
    async generateTest(filePath, functionName) {
        console.log(`🤖 توليد اختبار لـ: ${functionName} في ${filePath}`);
        try {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            // هنا يمكن إضافة تكامل مع Gemini لتوليد الاختبارات
            // للآن سنعيد قالب بسيط
            const testTemplate = `
import { ${functionName} } from './${path.basename(filePath, path.extname(filePath))}';

describe('${functionName}', () => {
  it('should work correctly', () => {
    // TODO: إضافة اختبارات
    expect(${functionName}).toBeDefined();
  });
});
`;
            return testTemplate;
        }
        catch (error) {
            console.error(`❌ فشل توليد الاختبار لـ ${functionName}:`, error);
            return null;
        }
    }
    // حفظ تقرير الاختبارات
    async saveTestReport(results, outputPath) {
        const report = {
            timestamp: new Date().toISOString(),
            totalTests: results.length,
            passedTests: results.filter(r => r.passed).length,
            failedTests: results.filter(r => r.passed === false).length,
            averageDuration: results.reduce((sum, r) => sum + r.duration, 0) / results.length,
            testsByType: this.groupTestsByType(results),
            results
        };
        fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
        console.log(`📊 تم حفظ تقرير الاختبارات: ${outputPath}`);
    }
    // تجميع الاختبارات حسب النوع
    groupTestsByType(results) {
        return results.reduce((acc, result) => {
            if (!acc[result.testType]) {
                acc[result.testType] = { total: 0, passed: 0, failed: 0 };
            }
            acc[result.testType].total++;
            if (result.passed) {
                acc[result.testType].passed++;
            }
            else {
                acc[result.testType].failed++;
            }
            return acc;
        }, {});
    }
}
exports.AutoTester = AutoTester;
// تشغيل مباشر للاختبار
if (require.main === module) {
    const tester = new AutoTester();
    tester.testProject().then(results => {
        console.log(`📊 نتائج الاختبار: ${results.length} اختبار`);
        results.forEach(result => {
            const status = result.passed ? '✅' : '❌';
            console.log(`${status} ${result.testType}: ${result.fixId}`);
        });
    });
}
//# sourceMappingURL=auto-tester.js.map