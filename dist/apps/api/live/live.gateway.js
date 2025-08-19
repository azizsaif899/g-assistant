"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveGateway = void 0;
class LiveGateway {
    constructor() {
        this.clients = new Map();
    }
    handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
        this.clients.set(client.id, client);
    }
    handleDisconnection(client) {
        console.log(`Client disconnected: ${client.id}`);
        this.clients.delete(client.id);
    }
    joinSession(clientId, sessionId) {
        console.log(`Client ${clientId} joined session: ${sessionId}`);
    }
    broadcastToSession(sessionId, event, data) {
        console.log(`Broadcasting to session ${sessionId}: ${event}`);
    }
}
exports.LiveGateway = LiveGateway;
//# sourceMappingURL=live.gateway.js.map