"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorDetector = void 0;
const tslib_1 = require("tslib");
const child_process_1 = require("child_process");
const fs = tslib_1.__importStar(require("fs"));
const path = tslib_1.__importStar(require("path"));
class ErrorDetector {
    constructor(projectRoot = process.cwd()) {
        this.projectRoot = projectRoot;
    }
    // اكتشاف جميع الأخطاء
    async detectAllErrors() {
        console.log('🔍 اكتشاف الأخطاء...');
        const errors = [];
        // أخطاء ESLint
        const eslintErrors = await this.detectESLintErrors();
        errors.push(...eslintErrors);
        // أخطاء TypeScript
        const tsErrors = await this.detectTypeScriptErrors();
        errors.push(...tsErrors);
        // أخطاء البناء
        const buildErrors = await this.detectBuildErrors();
        errors.push(...buildErrors);
        console.log(`🎯 تم اكتشاف ${errors.length} خطأ`);
        return errors;
    }
    // اكتشاف أخطاء ESLint
    async detectESLintErrors() {
        console.log('🔧 فحص أخطاء ESLint...');
        try {
            const output = (0, child_process_1.execSync)('npx eslint . --format=json', {
                cwd: this.projectRoot,
                encoding: 'utf8'
            });
            const results = JSON.parse(output);
            const errors = [];
            for (const result of results) {
                for (const message of result.messages) {
                    errors.push({
                        id: `eslint-${Date.now()}-${Math.random()}`,
                        file: path.relative(this.projectRoot, result.filePath),
                        line: message.line,
                        column: message.column,
                        severity: message.severity === 2 ? 'error' : 'warning',
                        message: message.message,
                        rule: message.ruleId,
                        source: 'eslint',
                        context: this.getLineContext(result.filePath, message.line)
                    });
                }
            }
            console.log(`   📊 ESLint: ${errors.length} مشكلة`);
            return errors;
        }
        catch (error) {
            console.log('   ⚠️ تعذر تشغيل ESLint');
            return [];
        }
    }
    // اكتشاف أخطاء TypeScript
    async detectTypeScriptErrors() {
        console.log('📝 فحص أخطاء TypeScript...');
        try {
            (0, child_process_1.execSync)('npx tsc --noEmit', {
                cwd: this.projectRoot,
                stdio: 'pipe'
            });
            console.log('   ✅ لا توجد أخطاء TypeScript');
            return [];
        }
        catch (error) {
            const output = error.stdout?.toString() || error.stderr?.toString() || '';
            const errors = this.parseTSOutput(output);
            console.log(`   📊 TypeScript: ${errors.length} خطأ`);
            return errors;
        }
    }
    // اكتشاف أخطاء البناء
    async detectBuildErrors() {
        console.log('🏗️ فحص أخطاء البناء...');
        try {
            (0, child_process_1.execSync)('nx run-many --target=build --all', {
                cwd: this.projectRoot,
                stdio: 'pipe'
            });
            console.log('   ✅ البناء ناجح');
            return [];
        }
        catch (error) {
            const output = error.stdout?.toString() || error.stderr?.toString() || '';
            const errors = this.parseBuildOutput(output);
            console.log(`   📊 البناء: ${errors.length} خطأ`);
            return errors;
        }
    }
    // تحليل مخرجات TypeScript
    parseTSOutput(output) {
        const errors = [];
        const lines = output.split('\n');
        for (const line of lines) {
            const match = line.match(/(.+)\((\d+),(\d+)\): error TS(\d+): (.+)/);
            if (match) {
                const [, filePath, lineNum, colNum, errorCode, message] = match;
                errors.push({
                    id: `ts-${errorCode}-${Date.now()}`,
                    file: path.relative(this.projectRoot, filePath),
                    line: parseInt(lineNum),
                    column: parseInt(colNum),
                    severity: 'error',
                    message: message.trim(),
                    rule: `TS${errorCode}`,
                    source: 'typescript',
                    context: this.getLineContext(filePath, parseInt(lineNum))
                });
            }
        }
        return errors;
    }
    // تحليل مخرجات البناء
    parseBuildOutput(output) {
        const errors = [];
        const lines = output.split('\n');
        for (const line of lines) {
            if (line.includes('ERROR') || line.includes('Error')) {
                errors.push({
                    id: `build-${Date.now()}-${Math.random()}`,
                    file: 'unknown',
                    line: 0,
                    column: 0,
                    severity: 'error',
                    message: line.trim(),
                    source: 'build',
                    context: ''
                });
            }
        }
        return errors;
    }
    // الحصول على سياق السطر
    getLineContext(filePath, lineNumber) {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const lines = content.split('\n');
            const targetLine = lines[lineNumber - 1];
            return targetLine ? targetLine.trim() : '';
        }
        catch {
            return '';
        }
    }
    // حفظ الأخطاء المكتشفة
    async saveErrors(errors, outputPath) {
        const report = {
            timestamp: new Date().toISOString(),
            totalErrors: errors.length,
            errorsBySeverity: this.groupBySeverity(errors),
            errorsBySource: this.groupBySource(errors),
            errors
        };
        fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
        console.log(`💾 تم حفظ تقرير الأخطاء في: ${outputPath}`);
    }
    // تجميع حسب الخطورة
    groupBySeverity(errors) {
        return errors.reduce((acc, error) => {
            acc[error.severity] = (acc[error.severity] || 0) + 1;
            return acc;
        }, {});
    }
    // تجميع حسب المصدر
    groupBySource(errors) {
        return errors.reduce((acc, error) => {
            acc[error.source] = (acc[error.source] || 0) + 1;
            return acc;
        }, {});
    }
}
exports.ErrorDetector = ErrorDetector;
// تشغيل الكاشف إذا تم استدعاء الملف مباشرة
if (require.main === module) {
    const detector = new ErrorDetector();
    detector.detectAllErrors().then(errors => {
        const outputPath = path.join(__dirname, '../../docs/6_fixing/reports/detected_errors.json');
        detector.saveErrors(errors, outputPath);
    });
}
//# sourceMappingURL=detector.js.map