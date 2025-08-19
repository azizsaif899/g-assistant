#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const scanner_1 = require("./scanner");
const detector_1 = require("./detector");
const gemini_reviewer_1 = require("./gemini-reviewer");
const amazon_executor_1 = require("./amazon-executor");
const path = tslib_1.__importStar(require("path"));
const fs = tslib_1.__importStar(require("fs"));
/**
 * منسق AutoRepairSuite - يدير العملية الكاملة
 */
class AutoRepairOrchestrator {
    constructor(isDryRun = false) {
        this.projectRoot = path.resolve(__dirname, '../../');
        this.reportsDir = path.join(this.projectRoot, 'docs/6_fixing/reports');
        this.isDryRun = isDryRun;
        // إنشاء مجلد التقارير إذا لم يكن موجوداً
        if (!fs.existsSync(this.reportsDir)) {
            fs.mkdirSync(this.reportsDir, { recursive: true });
        }
    }
    // تشغيل العملية الكاملة
    async run() {
        if (this.isDryRun) {
            console.log('🤖 بدء تشغيل AutoRepairSuite في وضع المحاكاة (Dry Run)...');
        }
        else {
            console.log('🤖 بدء تشغيل AutoRepairSuite...');
        }
        console.log('=====================================');
        try {
            // المرحلة 1: مسح الكود
            console.log('\n📡 المرحلة 1: مسح ملفات الكود');
            const scanner = new scanner_1.CodeScanner(this.projectRoot);
            const codeFiles = await scanner.scanSpecificPaths(['apps', 'packages']);
            const scanResultsPath = path.join(this.reportsDir, 'scan_results.json');
            await scanner.saveResults(codeFiles, scanResultsPath);
            // المرحلة 2: اكتشاف الأخطاء
            console.log('\n🔍 المرحلة 2: اكتشاف الأخطاء');
            const detector = new detector_1.ErrorDetector(this.projectRoot);
            const errors = await detector.detectAllErrors();
            const errorsPath = path.join(this.reportsDir, 'detected_errors.json');
            await detector.saveErrors(errors, errorsPath);
            // المرحلة 3: مراجعة المشروع بواسطة AI
            console.log('\n🧠 المرحلة 3: مراجعة المشروع بواسطة AI');
            const reviewer = new gemini_reviewer_1.GeminiReviewer(this.isDryRun);
            const review = await reviewer.reviewProject();
            await reviewer.saveReviewReport(review);
            const tasks = review.priorities || [];
            // المرحلة 4: تحديث اللوحة المركزية
            console.log('\n📊 المرحلة 4: تحديث اللوحة المركزية');
            await this.updateCentralDashboard(codeFiles.length, errors.length, review);
            // المرحلة 5: تنفيذ المهام الموجهة من المراجع
            if (tasks.length > 0) {
                console.log(`\n🚀 المرحلة 5: تنفيذ ${tasks.length} مهمة ذات أولوية`);
                await this.executeReviewerTasks(tasks);
            }
            else {
                console.log('\n✅ لا توجد مهام ذات أولوية من المراجع.');
            }
            // المرحلة 6: توليد التقرير النهائي
            console.log('\n📋 المرحلة 6: توليد التقرير النهائي');
            await this.generateFinalReport(codeFiles, errors, tasks);
            console.log('\n🎉 تم إكمال AutoRepairSuite بنجاح!');
            console.log(`📁 التقارير محفوظة في: ${this.reportsDir}`);
        }
        catch (error) {
            console.error('❌ خطأ في تشغيل AutoRepairSuite:', error);
            process.exit(1);
        }
    }
    // تحديث اللوحة المركزية
    async updateCentralDashboard(totalFiles, totalErrors, review) {
        const dashboardPath = path.join(this.reportsDir, 'nx_central_dashboard.json');
        const dashboard = {
            lastUpdate: new Date().toISOString(),
            project: 'g-assistant-nx',
            status: review?.projectHealth || (totalErrors === 0 ? 'HEALTHY' : totalErrors < 10 ? 'WARNING' : 'CRITICAL'),
            autoRepair: {
                lastRun: new Date().toISOString(),
                filesScanned: totalFiles,
                errorsDetected: totalErrors,
                tasksFromReview: review?.priorities?.length || 0,
                status: 'COMPLETED',
            },
            tasks: {
                pending: review?.priorities?.map((p, i) => ({
                    id: p.taskId || `TASK-${Date.now()}-${i}`,
                    title: p.task,
                    priority: p.priority,
                    location: p.location,
                    action: p.action,
                    createdAt: new Date().toISOString(),
                    source: 'GeminiReviewer'
                })) || [],
                completed: [{
                        id: 'AUTO_SCAN_COMPLETED',
                        title: 'مسح تلقائي للمشروع',
                        completedAt: new Date().toISOString(),
                        status: 'SUCCESS'
                    }]
            },
            metrics: {
                healthScore: Math.max(0, 100 - (totalErrors * 2)),
                totalFiles: totalFiles,
                totalErrors: totalErrors,
                lastHealthCheck: new Date().toISOString()
            }
        };
        fs.writeFileSync(dashboardPath, JSON.stringify(dashboard, null, 2));
        console.log('✅ تم تحديث اللوحة المركزية');
    }
    // تنفيذ المهام الموجهة من المراجع
    async executeReviewerTasks(tasks) {
        try {
            const executor = new amazon_executor_1.AmazonExecutor(this.isDryRun);
            const results = [];
            for (const task of tasks) {
                const result = await executor.executeTask(task);
                results.push(result);
            }
            await executor.generateGitHubReport(tasks, results);
        }
        catch (error) {
            console.error('❌ فشل في تنفيذ المهام الموجهة:', error);
        }
    }
    // استعادة من النسخة الاحتياطية
    restoreBackup(filePath) {
        const backupFiles = require('fs').readdirSync(path.dirname(filePath))
            .filter((f) => f.startsWith(path.basename(filePath) + '.backup.'))
            .sort()
            .reverse();
        if (backupFiles.length > 0) {
            const latestBackup = path.join(path.dirname(filePath), backupFiles[0]);
            require('fs').copyFileSync(latestBackup, filePath);
            console.log(`💾 تم استعادة ${filePath} من النسخة الاحتياطية`);
        }
    }
    // توليد التقرير النهائي
    async generateFinalReport(codeFiles, errors, executedTasks) {
        const timestamp = new Date().toISOString().split('T')[0];
        const reportPath = path.join(this.reportsDir, `auto_repair_report_${timestamp}.json`);
        const report = {
            timestamp: new Date().toISOString(),
            project: 'g-assistant-nx',
            summary: {
                totalFiles: codeFiles.length,
                totalErrors: errors.length,
                tasksExecuted: executedTasks.length,
                healthScore: Math.max(0, 100 - (errors.length * 2)),
                status: errors.length === 0 ? 'HEALTHY' : errors.length < 10 ? 'WARNING' : 'CRITICAL'
            },
            breakdown: {
                fileTypes: this.groupFilesByType(codeFiles),
                errorSeverity: this.groupErrorsBySeverity(errors),
                errorSources: this.groupErrorsBySource(errors)
            },
            recommendations: this.generateRecommendations(errors),
            nextSteps: [
                'مراجعة الأخطاء عالية الأولوية',
                'تشغيل الإصلاح التلقائي للأخطاء البسيطة',
                'تحديث التبعيات إذا لزم الأمر',
                'إجراء اختبارات شاملة بعد الإصلاح'
            ]
        };
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        console.log(`✅ تم توليد التقرير النهائي: ${reportPath}`);
    }
    // تجميع الملفات حسب النوع
    groupFilesByType(files) {
        return files.reduce((acc, file) => {
            acc[file.type] = (acc[file.type] || 0) + 1;
            return acc;
        }, {});
    }
    // تجميع الأخطاء حسب الخطورة
    groupErrorsBySeverity(errors) {
        return errors.reduce((acc, error) => {
            acc[error.severity] = (acc[error.severity] || 0) + 1;
            return acc;
        }, {});
    }
    // تجميع الأخطاء حسب المصدر
    groupErrorsBySource(errors) {
        return errors.reduce((acc, error) => {
            acc[error.source] = (acc[error.source] || 0) + 1;
            return acc;
        }, {});
    }
    // توليد التوصيات
    generateRecommendations(errors) {
        const recommendations = [];
        if (errors.length === 0) {
            recommendations.push('🎉 المشروع في حالة ممتازة - لا توجد أخطاء');
            return recommendations;
        }
        const criticalErrors = errors.filter(e => e.severity === 'error').length;
        const warnings = errors.filter(e => e.severity === 'warning').length;
        if (criticalErrors > 0) {
            recommendations.push(`🔴 إصلاح ${criticalErrors} خطأ حرج فوراً`);
        }
        if (warnings > 5) {
            recommendations.push(`🟡 مراجعة ${warnings} تحذير لتحسين جودة الكود`);
        }
        if (errors.some(e => e.source === 'typescript')) {
            recommendations.push('📝 مراجعة تكوين TypeScript');
        }
        if (errors.some(e => e.source === 'eslint')) {
            recommendations.push('🔧 تشغيل ESLint --fix للإصلاحات التلقائية');
        }
        return recommendations;
    }
}
// تشغيل المنسق
if (require.main === module) {
    const isDryRun = process.argv.includes('--dry-run');
    const orchestrator = new AutoRepairOrchestrator(isDryRun);
    orchestrator.run();
}
exports.default = AutoRepairOrchestrator;
//# sourceMappingURL=orchestrator.js.map