"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRMService = void 0;
class CRMService {
    constructor() {
        this.leads = new Map();
    }
    async createLead(leadData) {
        const lead = {
            id: `lead_${Date.now()}`,
            createdAt: new Date(),
            ...leadData
        };
        this.leads.set(lead.id, lead);
        console.log(`📝 New lead created: ${lead.name}`);
        return lead;
    }
    async updateLeadStatus(leadId, status) {
        const lead = this.leads.get(leadId);
        if (lead) {
            lead.status = status;
            console.log(`📊 Lead status updated: ${status}`);
        }
    }
    async getConversionRate() {
        const totalLeads = this.leads.size;
        const convertedLeads = Array.from(this.leads.values()).filter(lead => lead.status === 'converted').length;
        return totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;
    }
}
exports.CRMService = CRMService;
//# sourceMappingURL=crm.service.js.map