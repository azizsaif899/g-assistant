const fs = require('fs');
const path = require('path');

class UltimateScanner {
    constructor() {
        this.projectPath = path.resolve(__dirname, '../../..');
        this.issues = [];
        this.stats = { filesScanned: 0, linesScanned: 0, startTime: Date.now() };
        this.rules = this.initRules();
    }

    initRules() {
        return {
            security: [
                { pattern: /dangerouslySetInnerHTML/g, severity: 'CRITICAL', msg: 'XSS: dangerouslySetInnerHTML خطر أمني', fix: 'استخدم sanitization' },
                { pattern: /eval\s*\(/g, severity: 'CRITICAL', msg: 'Code Injection: eval() خطر جداً', fix: 'تجنب eval تماماً' },
                { pattern: /innerHTML\s*=.*\+/g, severity: 'HIGH', msg: 'XSS: innerHTML مع concatenation', fix: 'استخدم textContent' },
                { pattern: /SELECT.*FROM.*\+/g, severity: 'CRITICAL', msg: 'SQL Injection: استعلام مدمج', fix: 'استخدم prepared statements' },
                { pattern: /localStorage\.|sessionStorage\./g, severity: 'MEDIUM', msg: 'تخزين بيانات حساسة محلياً', fix: 'شفّر البيانات' }
            ],
            quality: [
                { pattern: /console\.(log|warn|error)/g, severity: 'LOW', msg: 'Console statements في الكود', fix: 'استخدم logger' },
                { pattern: /debugger/g, severity: 'MEDIUM', msg: 'debugger statement متروك', fix: 'احذف debugger' },
                { pattern: /var\s+/g, severity: 'MEDIUM', msg: 'استخدام var بدلاً من let/const', fix: 'استخدم let/const' },
                { pattern: /\b\d{4,}\b/g, severity: 'MEDIUM', msg: 'Magic numbers كبيرة', fix: 'استخدم constants' },
                { pattern: /[^=!]==\s*[^=]/g, severity: 'MEDIUM', msg: 'مقارنة == بدلاً من ===', fix: 'استخدم ===' }
            ],
            performance: [
                { pattern: /fs\.\w+Sync\(/g, severity: 'HIGH', msg: 'عملية FS متزامنة تبطئ الخادم', fix: 'استخدم async/await' },
                { pattern: /for\s*\([^)]*\.length/g, severity: 'MEDIUM', msg: 'حلقة غير محسنة', fix: 'احفظ length في متغير' },
                { pattern: /\+\s*""/g, severity: 'LOW', msg: 'تحويل نص غير فعال', fix: 'استخدم String()' }
            ],
            typescript: [
                { pattern: /:\s*any\b/g, severity: 'MEDIUM', msg: 'TypeScript: استخدام any يلغي type safety', fix: 'حدد نوع دقيق' },
                { pattern: /@ts-ignore/g, severity: 'HIGH', msg: 'TypeScript: @ts-ignore يخفي أخطاء', fix: 'أصلح الخطأ' }
            ]
        };
    }

    async scan() {
        console.log('🚀 Ultimate Scanner - الفاحص الشامل النهائي');
        console.log('='.repeat(60));
        
        const files = this.getAllFiles();
        console.log(`📁 فحص ${files.length} ملف...`);

        for (const file of files) {
            await this.scanFile(file);
            this.stats.filesScanned++;
            if (this.stats.filesScanned % 50 === 0) {
                process.stdout.write(`\r📄 معالج: ${this.stats.filesScanned}/${files.length}`);
            }
        }

        console.log(`\n✅ اكتمل فحص ${files.length} ملف`);
        
        const report = this.generateReport();
        await this.createHtmlReport(report);
        this.displayResults(report);
        
        return report;
    }

    getAllFiles() {
        const extensions = ['.js', '.ts', '.jsx', '.tsx', '.json', '.md', '.vue', '.py'];
        return this.walkDir(this.projectPath, extensions);
    }

    walkDir(dir, extensions) {
        let files = [];
        try {
            const items = fs.readdirSync(dir);
            for (const item of items) {
                const fullPath = path.join(dir, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory() && !['node_modules', '.git', 'dist', 'build', '.nx', 'coverage'].includes(item)) {
                    files = files.concat(this.walkDir(fullPath, extensions));
                } else if (stat.isFile() && extensions.some(ext => item.endsWith(ext))) {
                    files.push(fullPath);
                }
            }
        } catch (e) {}
        return files;
    }

    async scanFile(filePath) {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const lines = content.split('\n');
            this.stats.linesScanned += lines.length;

            // تطبيق جميع القواعد
            Object.entries(this.rules).forEach(([category, rules]) => {
                this.applyRules(filePath, content, lines, rules, category.toUpperCase());
            });

            // فحص الملفات الكبيرة
            if (content.length > 100000) {
                this.addIssue(filePath, 1, 'SIZE', 'HIGH', `ملف كبير: ${Math.round(content.length/1000)}KB`, 'قسم الملف');
            }

            // فحص التعقيد
            const complexity = this.calculateComplexity(content);
            if (complexity > 15) {
                this.addIssue(filePath, 1, 'COMPLEXITY', 'HIGH', `تعقيد عالي: ${complexity}`, 'بسط الكود');
            }
            
        } catch (e) {
            this.addIssue(filePath, 1, 'ERROR', 'HIGH', 'خطأ في قراءة الملف', e.message);
        }
    }

    applyRules(filePath, content, lines, rules, category) {
        rules.forEach(({ pattern, severity, msg, fix }) => {
            let match;
            while ((match = pattern.exec(content)) !== null) {
                const lineNum = content.substring(0, match.index).split('\n').length;
                const code = lines[lineNum - 1]?.trim() || '';
                this.addIssue(filePath, lineNum, category, severity, msg, fix, code);
            }
        });
    }

    calculateComplexity(content) {
        const patterns = [/if\s*\(/g, /else/g, /while\s*\(/g, /for\s*\(/g, /switch\s*\(/g, /&&/g, /\|\|/g, /\?/g];
        return patterns.reduce((complexity, pattern) => {
            const matches = content.match(pattern);
            return complexity + (matches ? matches.length : 0);
        }, 1);
    }

    addIssue(file, line, category, severity, message, suggestion, code = '') {
        this.issues.push({
            id: `${category}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            file, line, category, severity, message, suggestion, code,
            timestamp: new Date().toISOString()
        });
    }

    generateReport() {
        const endTime = Date.now();
        const duration = endTime - this.stats.startTime;
        
        const bySeverity = this.groupBy('severity');
        const byCategory = this.groupBy('category');
        const byFile = this.issues.reduce((acc, issue) => {
            const fileName = path.basename(issue.file);
            acc[fileName] = (acc[fileName] || 0) + 1;
            return acc;
        }, {});

        const topFiles = Object.entries(byFile)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 15)
            .map(([file, count]) => ({ file, count }));

        const healthScore = this.calculateHealthScore(bySeverity, byCategory);
        const qualityMetrics = this.calculateQualityMetrics();

        return {
            timestamp: new Date().toISOString(),
            scanner: 'Ultimate Scanner v4.0',
            projectPath: this.projectPath,
            duration: Math.round(duration / 1000),
            stats: { ...this.stats, duration },
            totals: { issues: this.issues.length, bySeverity, byCategory },
            topFiles, healthScore, qualityMetrics,
            issues: this.issues
        };
    }

    calculateHealthScore(bySeverity, byCategory) {
        const severityWeights = { CRITICAL: 20, HIGH: 10, MEDIUM: 5, LOW: 2 };
        let totalPenalty = 0;
        Object.entries(bySeverity).forEach(([sev, count]) => {
            totalPenalty += (severityWeights[sev] || 1) * count;
        });
        return Math.max(0, Math.min(100, 100 - Math.min(100, totalPenalty / 2)));
    }

    calculateQualityMetrics() {
        const securityIssues = this.issues.filter(i => i.category === 'SECURITY').length;
        const performanceIssues = this.issues.filter(i => i.category === 'PERFORMANCE').length;
        const qualityIssues = this.issues.filter(i => i.category === 'QUALITY').length;
        
        return {
            securityScore: Math.max(0, 100 - securityIssues * 10),
            performanceScore: Math.max(0, 100 - performanceIssues * 5),
            qualityScore: Math.max(0, 100 - qualityIssues * 2),
            maintainabilityScore: Math.max(0, 100 - (this.issues.filter(i => i.severity === 'HIGH').length * 8))
        };
    }

    groupBy(field) {
        return this.issues.reduce((acc, issue) => {
            acc[issue[field]] = (acc[issue[field]] || 0) + 1;
            return acc;
        }, {});
    }

    async createHtmlReport(report) {
        const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ultimate Scanner Report</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; }
        .container { max-width: 1400px; margin: 0 auto; padding: 20px; }
        .header { background: rgba(255,255,255,0.95); color: #2c3e50; padding: 40px; border-radius: 20px; margin-bottom: 30px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
        .header h1 { font-size: 3rem; margin-bottom: 15px; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; margin-bottom: 30px; }
        .stat-card { background: rgba(255,255,255,0.95); padding: 30px; border-radius: 15px; box-shadow: 0 15px 35px rgba(0,0,0,0.1); text-align: center; transition: transform 0.3s; }
        .stat-card:hover { transform: translateY(-10px); }
        .stat-number { font-size: 2.5rem; font-weight: bold; margin-bottom: 10px; }
        .health-score { color: ${report.healthScore > 80 ? '#27ae60' : report.healthScore > 60 ? '#f39c12' : '#e74c3c'}; }
        .section { background: rgba(255,255,255,0.95); border-radius: 15px; padding: 30px; margin-bottom: 25px; box-shadow: 0 15px 35px rgba(0,0,0,0.1); }
        .section h2 { color: #2c3e50; margin-bottom: 25px; font-size: 1.8rem; border-bottom: 3px solid #ecf0f1; padding-bottom: 15px; }
        .severity-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 20px; }
        .severity-card { padding: 20px; border-radius: 12px; text-align: center; font-weight: bold; transition: transform 0.3s; }
        .severity-card:hover { transform: scale(1.05); }
        .sev-CRITICAL { background: linear-gradient(135deg, #ff6b6b, #ee5a52); color: white; }
        .sev-HIGH { background: linear-gradient(135deg, #ffa726, #ff9800); color: white; }
        .sev-MEDIUM { background: linear-gradient(135deg, #ffee58, #fdd835); color: #333; }
        .sev-LOW { background: linear-gradient(135deg, #66bb6a, #4caf50); color: white; }
        .quality-metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
        .quality-metric { text-align: center; padding: 20px; background: #f8f9fa; border-radius: 10px; }
        .issues-table { width: 100%; border-collapse: collapse; margin-top: 25px; }
        .issues-table th, .issues-table td { padding: 15px; text-align: right; border-bottom: 1px solid #ecf0f1; }
        .issues-table th { background: linear-gradient(135deg, #667eea, #764ba2); color: white; }
        .issues-table tr:hover { background: #e3f2fd; }
        .file-path { font-family: 'Courier New', monospace; font-size: 0.9rem; color: #6c757d; }
        .suggestion { background: #e8f5e8; color: #2e7d32; padding: 8px; border-radius: 6px; font-size: 0.9rem; margin-top: 5px; }
        .top-files { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 20px; }
        .file-item { background: #f8f9fa; padding: 20px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; }
        .file-count { background: #e74c3c; color: white; padding: 8px 15px; border-radius: 25px; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 Ultimate Scanner Report</h1>
            <div>الفاحص الشامل النهائي | ${new Date(report.timestamp).toLocaleString('ar-SA')}</div>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number">${report.stats.filesScanned}</div>
                <div>ملف تم فحصه</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${report.stats.linesScanned.toLocaleString()}</div>
                <div>سطر تم فحصه</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${report.totals.issues}</div>
                <div>مشكلة مكتشفة</div>
            </div>
            <div class="stat-card">
                <div class="stat-number health-score">${report.healthScore}%</div>
                <div>نقاط الصحة</div>
            </div>
        </div>

        <div class="section">
            <h2>📊 مقاييس الجودة</h2>
            <div class="quality-metrics">
                <div class="quality-metric">
                    <div style="font-size: 2rem; color: #e74c3c;">${report.qualityMetrics.securityScore}%</div>
                    <div>نقاط الأمان</div>
                </div>
                <div class="quality-metric">
                    <div style="font-size: 2rem; color: #f39c12;">${report.qualityMetrics.performanceScore}%</div>
                    <div>نقاط الأداء</div>
                </div>
                <div class="quality-metric">
                    <div style="font-size: 2rem; color: #3498db;">${report.qualityMetrics.qualityScore}%</div>
                    <div>نقاط الجودة</div>
                </div>
                <div class="quality-metric">
                    <div style="font-size: 2rem; color: #9b59b6;">${report.qualityMetrics.maintainabilityScore}%</div>
                    <div>قابلية الصيانة</div>
                </div>
            </div>
        </div>

        <div class="section">
            <h2>⚠️ توزيع المشاكل</h2>
            <div class="severity-grid">
                ${Object.entries(report.totals.bySeverity).map(([sev, count]) => `
                    <div class="severity-card sev-${sev}">
                        <div style="font-size: 2rem;">${count}</div>
                        <div>${sev}</div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="section">
            <h2>📁 أكثر الملفات مشاكل</h2>
            <div class="top-files">
                ${report.topFiles.map(item => `
                    <div class="file-item">
                        <div>${item.file}</div>
                        <div class="file-count">${item.count}</div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="section">
            <h2>🔍 تفاصيل المشاكل</h2>
            <table class="issues-table">
                <thead>
                    <tr><th>الملف</th><th>السطر</th><th>الفئة</th><th>الخطورة</th><th>الوصف والحل</th></tr>
                </thead>
                <tbody>
                    ${report.issues.slice(0, 200).map(issue => `
                        <tr>
                            <td class="file-path">${path.basename(issue.file)}</td>
                            <td>${issue.line}</td>
                            <td>${issue.category}</td>
                            <td><span class="severity-card sev-${issue.severity}" style="padding: 6px 12px; font-size: 0.8rem;">${issue.severity}</span></td>
                            <td>
                                <div>${issue.message}</div>
                                ${issue.suggestion ? `<div class="suggestion">💡 ${issue.suggestion}</div>` : ''}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>

        <div style="text-align: center; color: rgba(255,255,255,0.8); margin-top: 50px; padding: 30px;">
            <p>⚡ تم إنشاء التقرير في ${report.duration} ثانية | Ultimate Scanner v4.0</p>
        </div>
    </div>
</body>
</html>`;

        const reportPath = path.join(__dirname, `ultimate-scan-report-${Date.now()}.html`);
        fs.writeFileSync(reportPath, html);
        console.log(`\n🌐 تقرير HTML: ${reportPath}`);
        
        // حفظ JSON أيضاً
        const jsonPath = path.join(__dirname, `ultimate-scan-report-${Date.now()}.json`);
        fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
        console.log(`📄 تقرير JSON: ${jsonPath}`);
        
        // فتح التقرير
        const { exec } = require('child_process');
        exec(`start "" "${reportPath}"`);
        
        return reportPath;
    }

    displayResults(report) {
        console.log('\n🎯 نتائج الفحص الشامل:');
        console.log('='.repeat(40));
        console.log(`📁 ملفات: ${report.stats.filesScanned}`);
        console.log(`📄 أسطر: ${report.stats.linesScanned.toLocaleString()}`);
        console.log(`🔍 مشاكل: ${report.totals.issues}`);
        console.log(`💚 نقاط الصحة: ${report.healthScore}%`);
        console.log(`⏱️ المدة: ${report.duration} ثانية`);
        
        console.log('\n📊 مقاييس الجودة:');
        console.log(`🔒 أمان: ${report.qualityMetrics.securityScore}%`);
        console.log(`⚡ أداء: ${report.qualityMetrics.performanceScore}%`);
        console.log(`✨ جودة: ${report.qualityMetrics.qualityScore}%`);
        console.log(`🔧 صيانة: ${report.qualityMetrics.maintainabilityScore}%`);
        
        console.log('\n⚠️ حسب الخطورة:');
        Object.entries(report.totals.bySeverity).forEach(([sev, count]) => {
            const icon = { CRITICAL: '🔴', HIGH: '🟠', MEDIUM: '🟡', LOW: '🟢' }[sev];
            console.log(`   ${icon} ${sev}: ${count}`);
        });
    }
}

async function main() {
    const scanner = new UltimateScanner();
    await scanner.scan();
}

main().catch(console.error);