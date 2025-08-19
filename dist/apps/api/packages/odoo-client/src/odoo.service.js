"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OdooService = void 0;
const odoo_client_1 = require("./odoo-client");
class OdooService {
    constructor(config) {
        this.client = new odoo_client_1.OdooClient(config);
    }
    async initialize() {
        console.log('🚀 Initializing Odoo service...');
        const authenticated = await this.client.authenticate();
        if (authenticated) {
            console.log('✅ Odoo service initialized successfully');
        }
        else {
            console.error('❌ Failed to initialize Odoo service');
        }
        return authenticated;
    }
    async getLeadsSummary() {
        const leads = await this.client.getLeads(50);
        const summary = {
            total: leads.length,
            leads,
            totalRevenue: leads.reduce((sum, lead) => sum + (lead.expected_revenue || 0), 0),
            averageProbability: leads.length > 0
                ? leads.reduce((sum, lead) => sum + (lead.probability || 0), 0) / leads.length
                : 0
        };
        console.log(`📊 Leads summary: ${summary.total} leads, $${summary.totalRevenue} total revenue`);
        return summary;
    }
    async getSalesSummary() {
        const orders = await this.client.getSaleOrders(50);
        const summary = {
            total: orders.length,
            orders,
            totalAmount: orders.reduce((sum, order) => sum + (order.amount_total || 0), 0)
        };
        console.log(`💰 Sales summary: ${summary.total} orders, $${summary.totalAmount} total amount`);
        return summary;
    }
    async createLeadFromChat(chatData) {
        console.log('📝 Creating lead from chat interaction...');
        const leadData = {
            name: `Chat Lead: ${chatData.name}`,
            partner_name: chatData.name,
            email_from: chatData.email,
            phone: chatData.phone,
            description: chatData.message,
            expected_revenue: 0,
            probability: 25 // Default probability for chat leads
        };
        const leadId = await this.client.createLead(leadData);
        if (leadId) {
            console.log(`✅ Chat lead created with ID: ${leadId}`);
        }
        return leadId;
    }
    async getLeadById(leadId) {
        try {
            const leads = await this.client.getLeads(1000);
            const lead = leads.find(l => l.id === leadId);
            if (lead) {
                console.log(`📋 Found lead: ${lead.name}`);
            }
            else {
                console.log(`❌ Lead ${leadId} not found`);
            }
            return lead || null;
        }
        catch (error) {
            console.error(`❌ Error fetching lead ${leadId}:`, error);
            return null;
        }
    }
    async convertLeadToOpportunity(leadId) {
        console.log(`🔄 Converting lead ${leadId} to opportunity...`);
        const result = await this.client.convertLeadToOpportunity(leadId);
        if (result) {
            console.log(`✅ Lead ${leadId} successfully converted to opportunity`);
        }
        else {
            console.error(`❌ Failed to convert lead ${leadId}`);
        }
        return result;
    }
    async getTopLeads(limit = 10) {
        const leads = await this.client.getLeads(100);
        // Sort by expected revenue and probability
        const topLeads = leads
            .sort((a, b) => {
            const scoreA = (a.expected_revenue || 0) * (a.probability || 0) / 100;
            const scoreB = (b.expected_revenue || 0) * (b.probability || 0) / 100;
            return scoreB - scoreA;
        })
            .slice(0, limit);
        console.log(`🏆 Top ${limit} leads by potential value`);
        return topLeads;
    }
    async getRecentActivity(days = 7) {
        // Mock recent activity - in production would filter by date
        const leads = await this.client.getLeads(100);
        const orders = await this.client.getSaleOrders(100);
        const activity = {
            newLeads: Math.floor(leads.length * 0.3), // 30% are recent
            convertedLeads: Math.floor(leads.length * 0.1), // 10% converted
            newOrders: Math.floor(orders.length * 0.2), // 20% are recent
            totalRevenue: orders.reduce((sum, order) => sum + order.amount_total, 0) * 0.2
        };
        console.log(`📈 Recent activity (${days} days): ${activity.newLeads} new leads, ${activity.newOrders} new orders`);
        return activity;
    }
}
exports.OdooService = OdooService;
//# sourceMappingURL=odoo.service.js.map