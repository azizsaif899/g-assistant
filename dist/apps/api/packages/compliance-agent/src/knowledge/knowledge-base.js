"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeBase = void 0;
const tslib_1 = require("tslib");
const node_fs_1 = tslib_1.__importDefault(require("node:fs"));
const node_path_1 = tslib_1.__importDefault(require("node:path"));
const yaml_1 = tslib_1.__importDefault(require("yaml"));
/**
 * قاعدة المعرفة لإدارة سياسات الامتثال
 * Knowledge base for managing compliance policies
 */
class KnowledgeBase {
    constructor(policiesDir) {
        this.policiesDir = policiesDir;
        this.policies = [];
    }
    /**
     * تحميل جميع ملفات السياسات من المجلد المحدد
     * Load all policy files from the specified directory
     */
    load() {
        try {
            if (!node_fs_1.default.existsSync(this.policiesDir)) {
                console.warn(`Policies directory not found: ${this.policiesDir}`);
                return;
            }
            const files = node_fs_1.default.readdirSync(this.policiesDir)
                .filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));
            this.policies = files.map(f => {
                const filePath = node_path_1.default.join(this.policiesDir, f);
                const raw = node_fs_1.default.readFileSync(filePath, 'utf8');
                const parsed = yaml_1.default.parse(raw);
                console.log(`Loaded policy: ${parsed.name} with ${parsed.rules?.length || 0} rules`);
                return parsed;
            });
            console.log(`Successfully loaded ${this.policies.length} policy documents`);
        }
        catch (error) {
            console.error('Error loading policies:', error);
            this.policies = [];
        }
    }
    /**
     * الحصول على جميع القواعد من كل السياسات
     * Get all rules from all policies
     */
    getRules() {
        return this.policies.flatMap(p => p.rules ?? []);
    }
    /**
     * البحث عن قاعدة محددة بالكود
     * Find a specific rule by code
     */
    findRule(code) {
        return this.getRules().find(r => r.code === code);
    }
    /**
     * الحصول على جميع القواعد لسياسة محددة
     * Get all rules for a specific policy
     */
    getRulesByPolicy(policyName) {
        const policy = this.policies.find(p => p.name === policyName);
        return policy?.rules ?? [];
    }
    /**
     * الحصول على القواعد حسب درجة الخطورة
     * Get rules by severity level
     */
    getRulesBySeverity(severity) {
        return this.getRules().filter(r => r.severity?.toLowerCase() === severity.toLowerCase());
    }
    /**
     * الحصول على إحصائيات السياسات المحملة
     * Get statistics of loaded policies
     */
    getStats() {
        const rules = this.getRules();
        const rulesBySeverity = {};
        rules.forEach(rule => {
            const severity = rule.severity?.toLowerCase() || 'unknown';
            rulesBySeverity[severity] = (rulesBySeverity[severity] || 0) + 1;
        });
        return {
            totalPolicies: this.policies.length,
            totalRules: rules.length,
            rulesBySeverity
        };
    }
    /**
     * التحقق من صحة السياسات المحملة
     * Validate loaded policies
     */
    validate() {
        const errors = [];
        this.policies.forEach((policy, index) => {
            if (!policy.name) {
                errors.push(`Policy at index ${index} missing name`);
            }
            if (!policy.rules || !Array.isArray(policy.rules)) {
                errors.push(`Policy "${policy.name}" missing or invalid rules array`);
                return;
            }
            policy.rules.forEach((rule, ruleIndex) => {
                if (!rule.code) {
                    errors.push(`Rule at index ${ruleIndex} in policy "${policy.name}" missing code`);
                }
                if (!rule.title) {
                    errors.push(`Rule "${rule.code}" in policy "${policy.name}" missing title`);
                }
                if (!rule.description) {
                    errors.push(`Rule "${rule.code}" in policy "${policy.name}" missing description`);
                }
            });
        });
        return {
            isValid: errors.length === 0,
            errors
        };
    }
}
exports.KnowledgeBase = KnowledgeBase;
//# sourceMappingURL=knowledge-base.js.map