"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OdooWebSocketGateway = void 0;
class OdooWebSocketGateway {
    constructor() {
        this.clients = new Map();
        this.rooms = new Map();
    }
    handleConnection(client) {
        console.log(`🔌 Client connected to Odoo updates: ${client.id}`);
        this.clients.set(client.id, client);
    }
    handleDisconnection(client) {
        console.log(`🔌 Client disconnected from Odoo updates: ${client.id}`);
        this.clients.delete(client.id);
        // Remove from all rooms
        this.rooms.forEach((clientSet, room) => {
            clientSet.delete(client.id);
        });
    }
    joinRoom(clientId, room) {
        console.log(`👥 Client ${clientId} joined room: ${room}`);
        if (!this.rooms.has(room)) {
            this.rooms.set(room, new Set());
        }
        this.rooms.get(room)?.add(clientId);
    }
    leaveRoom(clientId, room) {
        console.log(`👥 Client ${clientId} left room: ${room}`);
        this.rooms.get(room)?.delete(clientId);
    }
    broadcastLeadUpdate(leadData) {
        const message = {
            type: 'lead_update',
            data: {
                id: leadData.id,
                name: leadData.name,
                partner_name: leadData.partner_name,
                stage: leadData.stage,
                expected_revenue: leadData.expected_revenue,
                probability: leadData.probability,
                action: leadData.action || 'update'
            },
            timestamp: new Date().toISOString()
        };
        this.broadcastToRoom('crm_leads', message);
        console.log(`📋 Broadcasted lead update: ${leadData.id}`);
    }
    broadcastOrderUpdate(orderData) {
        const message = {
            type: 'order_update',
            data: {
                id: orderData.id,
                name: orderData.name,
                partner_name: orderData.partner_name,
                amount_total: orderData.amount_total,
                state: orderData.state,
                action: orderData.action || 'update'
            },
            timestamp: new Date().toISOString()
        };
        this.broadcastToRoom('sale_orders', message);
        console.log(`📊 Broadcasted order update: ${orderData.id}`);
    }
    broadcastCustomerUpdate(customerData) {
        const message = {
            type: 'customer_update',
            data: {
                id: customerData.id,
                name: customerData.name,
                email: customerData.email,
                phone: customerData.phone,
                action: customerData.action || 'update'
            },
            timestamp: new Date().toISOString()
        };
        this.broadcastToRoom('customers', message);
        console.log(`👤 Broadcasted customer update: ${customerData.id}`);
    }
    broadcastToRoom(room, message) {
        const clientsInRoom = this.rooms.get(room);
        if (!clientsInRoom)
            return;
        clientsInRoom.forEach(clientId => {
            const client = this.clients.get(clientId);
            if (client) {
                client.emit('odoo_update', message);
            }
        });
        console.log(`📡 Broadcasted to ${clientsInRoom.size} clients in room: ${room}`);
    }
    broadcastSystemNotification(notification) {
        const message = {
            type: 'system_notification',
            data: notification,
            timestamp: new Date().toISOString()
        };
        this.clients.forEach(client => {
            client.emit('system_notification', message);
        });
        console.log(`🔔 Broadcasted system notification: ${notification.title}`);
    }
    getConnectedClients() {
        return this.clients.size;
    }
    getRoomStats() {
        const stats = {};
        this.rooms.forEach((clients, room) => {
            stats[room] = clients.size;
        });
        return stats;
    }
}
exports.OdooWebSocketGateway = OdooWebSocketGateway;
//# sourceMappingURL=odoo-websocket.gateway.js.map