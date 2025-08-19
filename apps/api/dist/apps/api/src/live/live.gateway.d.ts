export declare class LiveGateway {
    private clients;
    handleConnection(client: any): void;
    handleDisconnection(client: any): void;
    joinSession(clientId: string, sessionId: string): void;
    broadcastToSession(sessionId: string, event: string, data: any): void;
}
