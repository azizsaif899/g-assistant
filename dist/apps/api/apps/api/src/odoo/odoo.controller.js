"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OdooController = void 0;
const odoo_websocket_gateway_1 = require("../live/odoo-websocket.gateway");
const bigquery_client_1 = require("@azizsys/integrations/bigquery-client");
class OdooController {
    constructor() {
        this.websocketGateway = new odoo_websocket_gateway_1.OdooWebSocketGateway();
        this.bigQueryPipeline = new bigquery_client_1.OdooBigQueryPipeline({
            projectId: 'azizsys-project',
            datasetId: 'odoo_data'
        });
    }
    async handleWebhook(payload, signature) {
        console.log('📨 Received Odoo webhook:', payload.model, payload.action);
        if (!this.verifySignature(payload, signature)) {
            throw new Error('Invalid signature');
        }
        try {
            await this.processWebhook(payload);
            // Send to BigQuery
            await this.bigQueryPipeline.processWebhookData({
                id: payload.record_id,
                model: payload.model,
                data: payload.data,
                timestamp: payload.timestamp,
                action: payload.action
            });
            // Broadcast via WebSocket
            this.broadcastUpdate(payload);
            return { success: true, message: 'Webhook processed successfully' };
        }
        catch (error) {
            console.error('❌ Webhook processing failed:', error);
            throw new Error('Webhook processing failed');
        }
    }
    async convertLead(leadId) {
        console.log(`🔄 Converting lead ${leadId} to opportunity...`);
        try {
            // Mock conversion - in production would use OdooClient
            const result = true;
            return { success: true, leadId, converted: result };
        }
        catch (error) {
            console.error('❌ Lead conversion failed:', error);
            throw new Error('Lead conversion failed');
        }
    }
    async syncLeads() {
        console.log('🔄 Syncing leads from Odoo...');
        try {
            // Mock sync - in production would use OdooClient
            const leads = [
                { id: 1, name: 'Lead 1', partner_name: 'Ahmed Ali' },
                { id: 2, name: 'Lead 2', partner_name: 'Sara Mohammed' }
            ];
            return { success: true, count: leads.length, leads };
        }
        catch (error) {
            console.error('❌ Lead sync failed:', error);
            throw new Error('Lead sync failed');
        }
    }
    async processWebhook(payload) {
        switch (payload.model) {
            case 'crm.lead':
                await this.handleLeadWebhook(payload);
                break;
            case 'sale.order':
                await this.handleSaleOrderWebhook(payload);
                break;
            default:
                console.log(`ℹ️ Unhandled model: ${payload.model}`);
        }
    }
    async handleLeadWebhook(payload) {
        console.log(`📋 Processing lead ${payload.action}: ${payload.record_id}`);
        // Process lead webhook
    }
    async handleSaleOrderWebhook(payload) {
        console.log(`📊 Processing sale order ${payload.action}: ${payload.record_id}`);
        // Process sale order webhook
    }
    broadcastUpdate(payload) {
        switch (payload.model) {
            case 'crm.lead':
                this.websocketGateway.broadcastLeadUpdate({
                    ...payload.data,
                    action: payload.action
                });
                break;
            case 'sale.order':
                this.websocketGateway.broadcastOrderUpdate({
                    ...payload.data,
                    action: payload.action
                });
                break;
        }
    }
    verifySignature(payload, signature) {
        const expectedSignature = 'sha256=mock_signature';
        return signature === expectedSignature || !signature;
    }
    getWebSocketStats() {
        return {
            connectedClients: this.websocketGateway.getConnectedClients(),
            roomStats: this.websocketGateway.getRoomStats()
        };
    }
}
exports.OdooController = OdooController;
//# sourceMappingURL=odoo.controller.js.map