export interface OdooWebSocketMessage {
    type: 'lead_update' | 'order_update' | 'customer_update';
    data: any;
    timestamp: string;
}
export declare class OdooWebSocketGateway {
    private clients;
    private rooms;
    handleConnection(client: any): void;
    handleDisconnection(client: any): void;
    joinRoom(clientId: string, room: string): void;
    leaveRoom(clientId: string, room: string): void;
    broadcastLeadUpdate(leadData: any): void;
    broadcastOrderUpdate(orderData: any): void;
    broadcastCustomerUpdate(customerData: any): void;
    private broadcastToRoom;
    broadcastSystemNotification(notification: {
        title: string;
        message: string;
        type: 'info' | 'success' | 'warning' | 'error';
    }): void;
    getConnectedClients(): number;
    getRoomStats(): Record<string, number>;
}
