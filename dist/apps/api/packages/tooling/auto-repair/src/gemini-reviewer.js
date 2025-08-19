#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiReviewer = void 0;
const tslib_1 = require("tslib");
const generative_ai_1 = require("@google/generative-ai");
const fs = tslib_1.__importStar(require("fs"));
const path = tslib_1.__importStar(require("path"));
class GeminiReviewer {
    constructor(isDryRun = false) {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey)
            throw new Error('GEMINI_API_KEY required');
        this.genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
        this.projectRoot = path.resolve(__dirname, '../../');
        this.isDryRun = isDryRun;
    }
    // مراجعة المشروع كاملاً
    async reviewProject() {
        console.log('🔍 مراجعة المشروع كاملاً...');
        const reports = this.loadAllReports();
        const monthlyPlan = this.loadMonthlyPlan();
        const dashboard = this.loadDashboardData();
        const fixLogs = this.loadFixLogs();
        if (this.isDryRun) {
            console.log('[DRY RUN] محاكاة مراجعة المشروع بواسطة Gemini.');
            return {
                projectHealth: 'HEALTHY',
                priorities: [
                    {
                        priority: 'HIGH',
                        task: 'مهمة محاكاة ذات أولوية عالية',
                        location: 'apps/some-app/src/main.ts',
                        action: 'FIX',
                        estimatedTime: '30m',
                        reason: 'تم إنشاؤها في وضع المحاكاة'
                    }
                ],
                dailyTasks: ['تنفيذ مهمة المحاكاة', 'التحقق من تقرير المحاكاة'],
                recommendations: ['تشغيل النظام في الوضع الفعلي بعد التحقق من المحاكاة']
            };
        }
        const prompt = this.buildReviewPrompt(reports, monthlyPlan, dashboard, fixLogs);
        const result = await this.model.generateContent(prompt);
        return this.parseReviewResult(result.response.text());
    }
    // تحليل بنية المشروع
    analyzeProjectStructure() {
        const structure = {
            apps: this.scanDirectory('apps'),
            packages: this.scanDirectory('packages'),
            docs: this.scanDirectory('docs'),
            scripts: this.scanDirectory('scripts')
        };
        return structure;
    }
    // مسح مجلد
    scanDirectory(dirName) {
        const dirPath = path.join(this.projectRoot, dirName);
        if (!fs.existsSync(dirPath))
            return [];
        return fs.readdirSync(dirPath, { withFileTypes: true })
            .map(dirent => ({
            name: dirent.name,
            type: dirent.isDirectory() ? 'folder' : 'file',
            path: path.join(dirName, dirent.name)
        }));
    }
    // تحميل جميع التقارير
    loadAllReports() {
        const reportsDir = path.join(this.projectRoot, 'docs/6_fixing/reports');
        const reports = {};
        if (fs.existsSync(reportsDir)) {
            fs.readdirSync(reportsDir)
                .filter(file => file.endsWith('.json'))
                .forEach(file => {
                try {
                    const content = fs.readFileSync(path.join(reportsDir, file), 'utf8');
                    reports[file] = JSON.parse(content);
                }
                catch (error) {
                    // Log the actual error for better debugging
                    console.error(`Could not read or parse report file: ${file}`, error);
                }
            });
        }
        return reports;
    }
    // تحميل الخطة الشهرية
    loadMonthlyPlan() {
        const planPath = path.join(this.projectRoot, 'docs/6_fixing/monthly_plans/MONTHLY_PLAN.md');
        if (fs.existsSync(planPath)) {
            return fs.readFileSync(planPath, 'utf8');
        }
        return 'لا توجد خطة شهرية';
    }
    // تحميل بيانات لوحة التحكم
    loadDashboardData() {
        const dashboardPath = path.join(this.projectRoot, 'docs/6_fixing/reports/central_dashboard.json');
        if (fs.existsSync(dashboardPath)) {
            try {
                const content = fs.readFileSync(dashboardPath, 'utf8');
                return JSON.parse(content);
            }
            catch (error) {
                // Log the actual error for better debugging
                console.error(`Could not read or parse central_dashboard.json`, error);
                return null;
            }
        }
        return null;
    }
    // تحميل سجلات الإصلاح
    loadFixLogs() {
        const logDir = path.join(this.projectRoot, 'docs/6_fixing/logs');
        if (fs.existsSync(logDir)) {
            // ملاحظة: هذا تبسيط. يمكن توسيع هذا الجزء لقراءة وتحليل السجلات بشكل أعمق.
            return "تم العثور على سجلات الإصلاح. يجب مراجعتها لتجنب تكرار المهام المكتملة أو الفاشلة.";
        }
        return "لم يتم العثور على مجلد السجلات.";
    }
    // استخلاص الأخطاء الحرجة من التقارير
    extractCriticalErrors(reports) {
        const errors = [];
        Object.values(reports).forEach((report) => {
            if (report.priorities) {
                const critical = report.priorities.filter(p => p.priority === 'HIGH' || p.priority === 'CRITICAL');
                errors.push(...critical);
            }
        });
        return errors;
    }
    // استخلاص المهام من الخطة الشهرية
    extractMonthlyTasks(monthlyPlan) {
        const tasks = monthlyPlan.split('\n')
            .filter(line => line.trim().startsWith('- [ ]') || line.trim().startsWith('*'))
            .map(line => line.replace(/(- \[[ \]]|\*)/, '').trim());
        return tasks.map(task => ({ task, source: 'MONTHLY_PLAN.md' }));
    }
    // بناء prompt المراجعة
    buildReviewPrompt(reports, monthlyPlan, dashboard, fixLogs) {
        const criticalErrors = this.extractCriticalErrors(reports);
        const monthlyTasks = this.extractMonthlyTasks(monthlyPlan);
        return `
أنت Gemini AI، المراجع الذكي في نظام G-Assistant NX.
مهمتك هي تحليل المدخلات التالية وتحديد الأولويات والمهام اليومية للمنفذ (Executor).
يجب أن تكون المهام دقيقة وقابلة للتنفيذ وفقًا لبروتوكول المنفذ الصارم (AI_Amazon_Executor_v2.md) الذي يمنعه من التفكير أو التخطيط.

المدخلات الأساسية لتحديد الأولويات:

1. الخطة الشهرية (الأهداف الاستراتيجية):
${JSON.stringify(monthlyTasks, null, 2)}

2. لوحة التحكم المركزية (الحالة الحالية والمهام المعلقة):
${JSON.stringify(dashboard, null, 2)}

3. التقارير والأخطاء المكتشفة (الأخطاء الحرجة):
${JSON.stringify(criticalErrors, null, 2)}

4. سجلات الإصلاح (لتجنب التكرار):
${fixLogs}

المطلوب:
1. تحليل شامل للمدخلات لتحديد صحة المشروع.
2. إنشاء قائمة مهام ذات أولوية (priorities) للمنفذ، مع تحديد الإجراء (FIX, UPDATE, DELETE) والموقع بدقة.
3. اقتراح قائمة مهام يومية (dailyTasks) واضحة وموجزة.
4. تقديم توصيات عامة لتحسين النظام.

أجب بـ JSON:
{
  "projectHealth": "HEALTHY|WARNING|CRITICAL",
  "priorities": [
    {
      "priority": "HIGH|MEDIUM|LOW",
      "task": "وصف المهمة",
      "location": "مسار الملف",
      "action": "FIX|UPDATE|DELETE",
      "estimatedTime": "الوقت المقدر",
      "reason": "سبب الأولوية"
    }
  ],
  "dailyTasks": ["مهمة 1", "مهمة 2"],
  "recommendations": ["توصية 1", "توصية 2"]
}
`;
    }
    // تحليل نتيجة المراجعة
    parseReviewResult(response) {
        try {
            const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[1]);
            }
            // محاولة تحليل مباشر
            return JSON.parse(response);
        }
        catch (error) {
            console.error('Failed to parse Gemini response. Response was:', response);
            return {
                projectHealth: 'WARNING',
                priorities: [],
                dailyTasks: ['مراجعة يدوية مطلوبة'],
                // Be more specific in the recommendation
                recommendations: ['Gemini response was not valid JSON. Manual check required.']
            };
        }
    }
    // حفظ تقرير المراجعة
    async saveReviewReport(review) {
        const timestamp = new Date().toISOString().split('T')[0];
        const reportPath = path.join(this.projectRoot, 'docs/6_fixing/reports', `gemini_review_${timestamp}.json`);
        const fullReport = {
            timestamp: new Date().toISOString(),
            reviewer: 'Gemini AI Reviewer',
            version: '2.0',
            ...review
        };
        fs.writeFileSync(reportPath, JSON.stringify(fullReport, null, 2));
        // إنشاء ملف المهام اليومية
        await this.createDailyTasksFile(review.dailyTasks || []);
        console.log(`📊 تم حفظ تقرير المراجعة: ${reportPath}`);
        return reportPath;
    }
    // إنشاء ملف المهام اليومية
    async createDailyTasksFile(tasks) {
        const timestamp = new Date().toISOString().split('T')[0];
        // تحديث DAILY_BOOT.md
        await this.updateDailyBoot(tasks);
        // إنشاء تقرير إضافي
        const tasksPath = path.join(this.projectRoot, 'docs/6_fixing/reports', `daily_tasks_${timestamp}.md`);
        const content = `# 📋 المهام اليومية - ${timestamp}

## 🎯 المهام المطلوبة:

${tasks.map((task, index) => `${index + 1}. ${task}`).join('\n')}

## ✅ حالة التنفيذ:
- [ ] مراجعة التقرير الشامل
- [ ] تنفيذ المهام حسب الأولوية
- [ ] تحديث التقارير

---
تم إنشاؤه بواسطة: Gemini AI Reviewer
`;
        fs.writeFileSync(tasksPath, content);
        console.log(`📋 تم إنشاء ملف المهام اليومية: ${tasksPath}`);
    }
    // تحديث DAILY_BOOT.md
    async updateDailyBoot(tasks) {
        const timestamp = new Date().toISOString().split('T')[0];
        const bootPath = path.join(this.projectRoot, 'docs/6_fixing/DAILY_BOOT.md');
        const reports = this.loadAllReports();
        const errorSources = this.analyzeErrorSources(reports);
        const content = `# 🚀 Daily Boot - ${timestamp}

## 📋 Today's Mission: G-Assistant NX Execution

**Main Goal**: Execute tasks from Gemini AI Reviewer

## 🎯 Priority Tasks

${this.formatTasksForBoot(tasks, errorSources)}

## 📊 Error Sources Analysis

${this.formatErrorSources(errorSources)}

## 📊 Status Updates

- **Gemini Review**: ✅ Completed
- **Amazon Executor**: ⏳ Ready to execute

---
*Generated by Gemini AI Reviewer at ${new Date().toLocaleString('ar-SA')}*`;
        fs.writeFileSync(bootPath, content);
        console.log(`🚀 تم تحديث DAILY_BOOT.md`);
    }
    // تحليل مصادر الأخطاء
    analyzeErrorSources(reports) {
        const sources = {};
        Object.entries(reports).forEach(([filename, report]) => {
            if (report.errors && Array.isArray(report.errors)) {
                report.errors.forEach((error) => {
                    const source = this.identifyErrorSource(error, filename);
                    if (!sources[source])
                        sources[source] = [];
                    sources[source].push({
                        file: error.file || 'unknown',
                        message: error.message,
                        severity: error.severity,
                        reportFile: filename
                    });
                });
            }
        });
        return sources;
    }
    // تحديد مصدر الخطأ
    identifyErrorSource(error, reportFile) {
        if (reportFile.includes('nx_monitor'))
            return 'nx_project_monitor.js';
        if (reportFile.includes('auto_fix'))
            return 'nx_auto_fix.js';
        if (reportFile.includes('detected_errors'))
            return 'detector.ts';
        if (error.source === 'build')
            return 'nx build system';
        return 'unknown script';
    }
    // تنسيق المهام
    formatTasksForBoot(tasks, errorSources) {
        return tasks.map((task, index) => `- [ ] **TASK-${index + 1}**: ${task}`).join('\n') || '- [ ] No tasks';
    }
    // تنسيق مصادر الأخطاء
    formatErrorSources(sources) {
        let formatted = '';
        Object.entries(sources).forEach(([source, errors]) => {
            formatted += `\n### 📝 ${source}: ${errors.length} errors\n`;
        });
        return formatted || 'No error sources';
    }
}
exports.GeminiReviewer = GeminiReviewer;
// تشغيل مباشر
if (require.main === module) {
    const reviewer = new GeminiReviewer();
    reviewer.reviewProject().then(review => {
        reviewer.saveReviewReport(review);
        console.log('🎉 تمت المراجعة الشاملة');
    });
}
//# sourceMappingURL=gemini-reviewer.js.map