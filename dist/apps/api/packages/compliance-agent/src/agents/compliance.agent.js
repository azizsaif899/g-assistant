"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplianceAuditorAgent = void 0;
const audit_iac_usage_1 = require("../audits/audit.iac-usage");
const audit_data_residency_1 = require("../audits/audit.data-residency");
/**
 * وكيل الرقيب - مراقب الامتثال والجودة
 */
class ComplianceAuditorAgent {
    constructor(kb, gcp, gh, tf) {
        this.kb = kb;
        this.gcp = gcp;
        this.gh = gh;
        this.tf = tf;
    }
    /**
     * تشغيل فحص شامل للامتثال
     */
    async runFullAudit() {
        const startedAt = new Date().toISOString();
        console.log('🔍 Starting comprehensive compliance audit...');
        try {
            // تحميل قاعدة المعرفة
            this.kb.load();
            const stats = this.kb.getStats();
            console.log(`Loaded ${stats.totalPolicies} policies with ${stats.totalRules} rules`);
            // تشغيل فحوصات متوازية
            const auditPromises = [
                (0, audit_iac_usage_1.auditIacUsage)(this.gcp, this.tf),
                (0, audit_data_residency_1.auditDataResidency)(this.gcp, this.kb),
            ];
            const results = await Promise.all(auditPromises);
            const allFindings = results.flat();
            // حساب الملخص
            const summary = this.calculateSummary(allFindings);
            const finishedAt = new Date().toISOString();
            const report = {
                startedAt,
                finishedAt,
                findings: allFindings,
                summary
            };
            console.log(`✅ Audit completed: ${allFindings.length} findings, score: ${summary.complianceScore}%`);
            return report;
        }
        catch (error) {
            console.error('❌ Audit failed:', error);
            throw error;
        }
    }
    /**
     * حساب ملخص التقرير
     */
    calculateSummary(findings) {
        const totals = { LOW: 0, MEDIUM: 0, HIGH: 0, CRITICAL: 0 };
        findings.forEach(finding => {
            totals[finding.severity]++;
        });
        // حساب نقاط الامتثال
        const penalty = totals.CRITICAL * 30 + totals.HIGH * 20 + totals.MEDIUM * 10 + totals.LOW * 5;
        const complianceScore = Math.max(0, 100 - penalty);
        // أهم المخاطر
        const topRisks = findings
            .filter(f => f.severity === 'CRITICAL' || f.severity === 'HIGH')
            .slice(0, 5)
            .map(f => `${f.code}: ${f.title}`);
        return {
            totals,
            topRisks,
            complianceScore
        };
    }
    /**
     * فحص سريع للحالة
     */
    async quickHealthCheck() {
        try {
            const report = await this.runFullAudit();
            const criticalIssues = report.findings.filter(f => f.severity === 'CRITICAL').length;
            const highIssues = report.findings.filter(f => f.severity === 'HIGH').length;
            let status = 'healthy';
            if (criticalIssues > 0)
                status = 'critical';
            else if (highIssues > 2)
                status = 'warning';
            return {
                status,
                issues: report.findings.length,
                lastCheck: new Date().toISOString()
            };
        }
        catch (error) {
            return {
                status: 'critical',
                issues: -1,
                lastCheck: new Date().toISOString()
            };
        }
    }
}
exports.ComplianceAuditorAgent = ComplianceAuditorAgent;
//# sourceMappingURL=compliance.agent.js.map