"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeScanner = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
const path = tslib_1.__importStar(require("path"));
const glob_1 = require("glob");
class CodeScanner {
    constructor(projectRoot = process.cwd()) {
        this.patterns = ['**/*.ts', '**/*.js', '**/*.tsx', '**/*.jsx'];
        this.excludePatterns = ['**/node_modules/**', '**/dist/**', '**/*.d.ts'];
        this.projectRoot = projectRoot;
    }
    // مسح ملفات الكود
    async scanCodeFiles() {
        console.log('🔍 مسح ملفات الكود...');
        const files = [];
        for (const pattern of this.patterns) {
            const matches = await (0, glob_1.glob)(pattern, {
                cwd: this.projectRoot,
                ignore: this.excludePatterns,
                absolute: true
            });
            for (const filePath of matches) {
                try {
                    const stats = fs.statSync(filePath);
                    const content = fs.readFileSync(filePath, 'utf-8');
                    files.push({
                        path: path.relative(this.projectRoot, filePath),
                        content,
                        type: this.getFileType(filePath),
                        size: stats.size,
                        lastModified: stats.mtime
                    });
                }
                catch (error) {
                    console.warn(`⚠️ تعذر قراءة الملف: ${filePath}`);
                }
            }
        }
        console.log(`✅ تم مسح ${files.length} ملف`);
        return files;
    }
    // تحديد نوع الملف
    getFileType(filePath) {
        const ext = path.extname(filePath);
        switch (ext) {
            case '.ts':
            case '.tsx':
                return 'typescript';
            case '.js':
            case '.jsx':
                return 'javascript';
            case '.json':
                return 'json';
            default:
                return 'javascript';
        }
    }
    // مسح مجلدات محددة
    async scanSpecificPaths(paths) {
        console.log(`🎯 مسح مجلدات محددة: ${paths.join(', ')}`);
        const files = [];
        for (const targetPath of paths) {
            const fullPath = path.join(this.projectRoot, targetPath);
            if (!fs.existsSync(fullPath)) {
                console.warn(`⚠️ المجلد غير موجود: ${targetPath}`);
                continue;
            }
            for (const pattern of this.patterns) {
                const matches = await (0, glob_1.glob)(pattern, {
                    cwd: fullPath,
                    ignore: this.excludePatterns,
                    absolute: true
                });
                for (const filePath of matches) {
                    try {
                        const stats = fs.statSync(filePath);
                        const content = fs.readFileSync(filePath, 'utf-8');
                        files.push({
                            path: path.relative(this.projectRoot, filePath),
                            content,
                            type: this.getFileType(filePath),
                            size: stats.size,
                            lastModified: stats.mtime
                        });
                    }
                    catch (error) {
                        console.warn(`⚠️ تعذر قراءة الملف: ${filePath}`);
                    }
                }
            }
        }
        console.log(`✅ تم مسح ${files.length} ملف من المجلدات المحددة`);
        return files;
    }
    // حفظ نتائج المسح
    async saveResults(files, outputPath) {
        const results = {
            timestamp: new Date().toISOString(),
            totalFiles: files.length,
            totalSize: files.reduce((sum, f) => sum + f.size, 0),
            fileTypes: this.groupByType(files),
            files: files.map(f => ({
                path: f.path,
                type: f.type,
                size: f.size,
                lastModified: f.lastModified
            }))
        };
        fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
        console.log(`💾 تم حفظ نتائج المسح في: ${outputPath}`);
    }
    // تجميع الملفات حسب النوع
    groupByType(files) {
        return files.reduce((acc, file) => {
            acc[file.type] = (acc[file.type] || 0) + 1;
            return acc;
        }, {});
    }
}
exports.CodeScanner = CodeScanner;
// تشغيل المسح إذا تم استدعاء الملف مباشرة
if (require.main === module) {
    const scanner = new CodeScanner();
    scanner.scanCodeFiles().then(files => {
        const outputPath = path.join(__dirname, '../../docs/6_fixing/reports/scan_results.json');
        scanner.saveResults(files, outputPath);
    });
}
//# sourceMappingURL=scanner.js.map