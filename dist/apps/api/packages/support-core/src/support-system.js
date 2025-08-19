"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportSystem = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let SupportSystem = class SupportSystem {
    constructor() {
        this.tickets = new Map();
    }
    async createTicket(userId, subject, description, priority) {
        const ticketId = `TICKET-${Date.now()}`;
        this.tickets.set(ticketId, {
            id: ticketId,
            userId,
            subject,
            description,
            priority,
            status: 'open',
            createdAt: new Date(),
            assignedTo: null
        });
        await this.notifySupport(ticketId);
        return ticketId;
    }
    async assignTicket(ticketId, agentId) {
        const ticket = this.tickets.get(ticketId);
        if (ticket) {
            ticket.assignedTo = agentId;
            ticket.status = 'assigned';
        }
    }
    async updateTicketStatus(ticketId, status) {
        const ticket = this.tickets.get(ticketId);
        if (ticket) {
            ticket.status = status;
            ticket.updatedAt = new Date();
        }
    }
    async getTicket(ticketId) {
        return this.tickets.get(ticketId);
    }
    async notifySupport(ticketId) {
        console.log(`New support ticket created: ${ticketId}`);
    }
};
exports.SupportSystem = SupportSystem;
exports.SupportSystem = SupportSystem = tslib_1.__decorate([
    (0, common_1.Injectable)()
], SupportSystem);
//# sourceMappingURL=support-system.js.map