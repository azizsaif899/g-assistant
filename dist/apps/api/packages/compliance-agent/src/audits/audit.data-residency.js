"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditDataResidency = auditDataResidency;
const uuid_1 = require("uuid");
/**
 * فحص توطين البيانات
 */
async function auditDataResidency(gcp, kb) {
    const findings = [];
    try {
        // البحث عن قواعد توطين البيانات
        const pdplRules = kb.getRules().filter(r => r.code === 'PDPL-01');
        const gdprRules = kb.getRules().filter(r => r.code === 'GDPR-02');
        if (pdplRules.length === 0 && gdprRules.length === 0) {
            console.log('No data residency rules found');
            return findings;
        }
        const dataStores = await gcp.listDataStores();
        // فحص PDPL (السعودية)
        if (pdplRules.length > 0) {
            const allowedRegions = new Set(['me-central1', 'me-central2']);
            const violations = dataStores.filter(store => store.region && !allowedRegions.has(store.region));
            if (violations.length > 0) {
                findings.push({
                    id: (0, uuid_1.v4)(),
                    code: 'PDPL-01',
                    title: 'Saudi Data Residency Violation',
                    description: `Found ${violations.length} data stores outside approved Saudi regions.`,
                    severity: 'HIGH',
                    status: 'OPEN',
                    scope: 'DATA',
                    evidence: violations.map(v => ({
                        title: `${v.type}`,
                        details: `region=${v.region}, name=${v.name}`
                    })),
                    recommendation: 'Migrate data stores to me-central1 region.',
                    references: ['docs/governance/compliance_playbook.md#pdpl'],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                });
            }
        }
        console.log(`Data residency audit completed: ${findings.length} findings`);
        return findings;
    }
    catch (error) {
        console.error('Error in data residency audit:', error);
        return [];
    }
}
//# sourceMappingURL=audit.data-residency.js.map