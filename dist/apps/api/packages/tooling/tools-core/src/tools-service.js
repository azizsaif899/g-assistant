"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let ToolsService = class ToolsService {
    constructor() {
        this.tools = new Map();
    }
    registerTool(name, tool) {
        this.tools.set(name, {
            ...tool,
            registeredAt: new Date()
        });
    }
    getTool(name) {
        return this.tools.get(name);
    }
    getAllTools() {
        return Array.from(this.tools.entries()).map(([name, tool]) => ({
            name,
            ...tool
        }));
    }
    executeTool(name, params) {
        const tool = this.tools.get(name);
        if (!tool) {
            throw new Error(`Tool ${name} not found`);
        }
        if (typeof tool.execute !== 'function') {
            throw new Error(`Tool ${name} does not have execute method`);
        }
        return tool.execute(params);
    }
    createSheetsReport(data, sheetName) {
        return {
            type: 'sheets_report',
            sheetName,
            data,
            createdAt: new Date()
        };
    }
    analyzeCode(code, language = 'javascript') {
        const issues = [];
        if (code.includes('console.log')) {
            issues.push({
                type: 'warning',
                message: 'Console.log statements found - consider removing for production',
                line: code.split('\n').findIndex(line => line.includes('console.log')) + 1
            });
        }
        if (code.includes('var ')) {
            issues.push({
                type: 'suggestion',
                message: 'Consider using let or const instead of var',
                line: code.split('\n').findIndex(line => line.includes('var ')) + 1
            });
        }
        return {
            language,
            issues,
            linesOfCode: code.split('\n').length,
            analyzedAt: new Date()
        };
    }
    generateFunction(description, language = 'javascript') {
        const functionName = description.toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '_');
        const template = language === 'javascript'
            ? `function ${functionName}() {\n  // TODO: Implement ${description}\n  return null;\n}`
            : `def ${functionName}():\n    # TODO: Implement ${description}\n    return None`;
        return {
            functionName,
            template,
            description,
            language,
            generatedAt: new Date()
        };
    }
    getProjectInsights(projectData) {
        const insights = [];
        if (projectData.files) {
            const fileCount = projectData.files.length;
            insights.push({
                type: 'info',
                message: `Project contains ${fileCount} files`
            });
            const jsFiles = projectData.files.filter((f) => f.endsWith('.js')).length;
            const tsFiles = projectData.files.filter((f) => f.endsWith('.ts')).length;
            if (jsFiles > 0) {
                insights.push({
                    type: 'info',
                    message: `${jsFiles} JavaScript files found`
                });
            }
            if (tsFiles > 0) {
                insights.push({
                    type: 'info',
                    message: `${tsFiles} TypeScript files found`
                });
            }
        }
        return {
            insights,
            analyzedAt: new Date(),
            projectData
        };
    }
    intelligentSearch(query, context) {
        const queryLower = query.toLowerCase();
        return context.filter(item => {
            const searchText = JSON.stringify(item).toLowerCase();
            return searchText.includes(queryLower);
        }).slice(0, 10);
    }
};
exports.ToolsService = ToolsService;
exports.ToolsService = ToolsService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], ToolsService);
//# sourceMappingURL=tools-service.js.map