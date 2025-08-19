"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRMController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let CRMController = class CRMController {
    async getLeads() {
        return {
            leads: [
                {
                    id: 1,
                    name: 'Lead from Meta',
                    partner_name: 'أحمد علي',
                    email: 'ahmed@example.com',
                    source: 'Meta',
                    stage: 'جديد',
                    expected_revenue: 50000
                }
            ],
            total: 1
        };
    }
    async syncWithMeta() {
        console.log('🔄 Syncing with Meta...');
        const metaLeads = [
            {
                name: 'John Doe',
                email: 'john@example.com',
                phone: '+1234567890'
            }
        ];
        for (const lead of metaLeads) {
            await this.createOdooLead(lead);
        }
        return { success: true, synced: metaLeads.length };
    }
    async syncWithBigQuery() {
        console.log('📊 Syncing with BigQuery...');
        return { success: true, message: 'Data synced to BigQuery' };
    }
    async createOdooLead(leadData) {
        console.log('Creating Odoo lead:', leadData);
        return { id: Math.random(), ...leadData };
    }
};
exports.CRMController = CRMController;
tslib_1.__decorate([
    (0, common_1.Get)('leads'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CRMController.prototype, "getLeads", null);
tslib_1.__decorate([
    (0, common_1.Post)('sync-meta'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CRMController.prototype, "syncWithMeta", null);
tslib_1.__decorate([
    (0, common_1.Post)('sync-bigquery'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CRMController.prototype, "syncWithBigQuery", null);
exports.CRMController = CRMController = tslib_1.__decorate([
    (0, common_1.Controller)('crm')
], CRMController);
//# sourceMappingURL=crm.controller.js.map