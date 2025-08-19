import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AiCoreService } from '@g-assistant-nx/core-logic';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly aiCoreService;
    server: Server;
    private readonly logger;
    constructor(aiCoreService: AiCoreService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleMessage(data: {
        message: string;
        context?: string;
    }, client: Socket): Promise<void>;
}
