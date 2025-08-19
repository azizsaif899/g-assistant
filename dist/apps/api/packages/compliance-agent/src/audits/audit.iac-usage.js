"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditIacUsage = auditIacUsage;
const uuid_1 = require("uuid");
/**
 * فحص استخدام Infrastructure as Code
 */
async function auditIacUsage(gcp, tf) {
    const findings = [];
    try {
        const activeServices = await gcp.listActiveServices();
        const tfResources = tf.loadResources();
        // إنشاء مجموعة من أسماء الموارد في Terraform
        const tfNames = new Set(tfResources.map(r => `${r.type}.${r.name || ''}`));
        // البحث عن الموارد غير المدارة
        const unmanagedResources = activeServices.filter(service => !tfNames.has(`google_${service.type.replace('.googleapis.com', '')}.${service.name || ''}`));
        if (unmanagedResources.length > 0) {
            findings.push({
                id: (0, uuid_1.v4)(),
                code: 'IAC-001',
                title: 'Unmanaged Cloud Resources',
                description: `Found ${unmanagedResources.length} active services not declared in Terraform state.`,
                severity: 'MEDIUM',
                status: 'OPEN',
                scope: 'CLOUD',
                evidence: unmanagedResources.map(r => ({
                    title: `${r.type} ${r.name || ''}`,
                    details: `region=${r.region}`
                })),
                recommendation: 'Declare all resources in Terraform or remove manual resources.',
                references: ['docs/governance/compliance_playbook.md#iac'],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });
        }
        console.log(`IAC audit completed: ${findings.length} findings`);
        return findings;
    }
    catch (error) {
        console.error('Error in IAC audit:', error);
        return [];
    }
}
//# sourceMappingURL=audit.iac-usage.js.map