"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OdooClient = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
class OdooClient {
    constructor(config) {
        this.config = config;
        this.sessionId = null;
        this.userId = null;
        this.client = axios_1.default.create({
            baseURL: `${config.url}/web/dataset`,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    async authenticate() {
        try {
            const response = await this.client.post('/call_kw', {
                service: 'common',
                method: 'authenticate',
                args: [this.config.database, this.config.username, this.config.password, {}]
            });
            if (response.data.result) {
                this.userId = response.data.result;
                this.sessionId = response.headers['set-cookie']?.[0];
                return true;
            }
            return false;
        }
        catch (error) {
            console.error('Odoo authentication failed:', error);
            return false;
        }
    }
    async createLead(leadData) {
        await this.ensureAuthenticated();
        const response = await this.client.post('/call_kw', {
            service: 'object',
            method: 'execute_kw',
            args: [
                this.config.database,
                this.userId,
                this.config.password,
                'crm.lead',
                'create',
                [leadData]
            ]
        });
        return response.data.result;
    }
    async findPartnerByEmail(email) {
        await this.ensureAuthenticated();
        const response = await this.client.post('/call_kw', {
            service: 'object',
            method: 'execute_kw',
            args: [
                this.config.database,
                this.userId,
                this.config.password,
                'res.partner',
                'search_read',
                [[['email', '=', email]]],
                { fields: ['id', 'name', 'email', 'phone'] }
            ]
        });
        return response.data.result?.[0] || null;
    }
    async findPartnerByPhone(phone) {
        await this.ensureAuthenticated();
        const response = await this.client.post('/call_kw', {
            service: 'object',
            method: 'execute_kw',
            args: [
                this.config.database,
                this.userId,
                this.config.password,
                'res.partner',
                'search_read',
                [[['phone', '=', phone]]],
                { fields: ['id', 'name', 'email', 'phone'] }
            ]
        });
        return response.data.result?.[0] || null;
    }
    async addContactNote(contactId, note) {
        await this.ensureAuthenticated();
        await this.client.post('/call_kw', {
            service: 'object',
            method: 'execute_kw',
            args: [
                this.config.database,
                this.userId,
                this.config.password,
                'mail.message',
                'create',
                [{
                        model: 'res.partner',
                        res_id: contactId,
                        body: note,
                        message_type: 'comment'
                    }]
            ]
        });
    }
    async getLeads(filters = []) {
        await this.ensureAuthenticated();
        const response = await this.client.post('/call_kw', {
            service: 'object',
            method: 'execute_kw',
            args: [
                this.config.database,
                this.userId,
                this.config.password,
                'crm.lead',
                'search_read',
                [filters],
                {
                    fields: [
                        'id', 'name', 'partner_name', 'email_from', 'phone',
                        'stage_id', 'user_id', 'team_id', 'expected_revenue',
                        'probability', 'create_date', 'write_date'
                    ]
                }
            ]
        });
        return response.data.result || [];
    }
    async updateLead(leadId, updateData) {
        await this.ensureAuthenticated();
        const response = await this.client.post('/call_kw', {
            service: 'object',
            method: 'execute_kw',
            args: [
                this.config.database,
                this.userId,
                this.config.password,
                'crm.lead',
                'write',
                [[leadId], updateData]
            ]
        });
        return response.data.result === true;
    }
    async ensureAuthenticated() {
        if (!this.userId) {
            const success = await this.authenticate();
            if (!success) {
                throw new Error('Failed to authenticate with Odoo');
            }
        }
    }
    // Health check method
    async isConnected() {
        try {
            return await this.authenticate();
        }
        catch {
            return false;
        }
    }
}
exports.OdooClient = OdooClient;
//# sourceMappingURL=odoo-client.js.map