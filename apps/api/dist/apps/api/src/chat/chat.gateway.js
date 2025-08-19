"use strict";
var ChatGateway_1;
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const tslib_1 = require("tslib");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const core_logic_1 = require("@g-assistant-nx/core-logic");
let ChatGateway = ChatGateway_1 = class ChatGateway {
    constructor(aiCoreService) {
        this.aiCoreService = aiCoreService;
        this.logger = new common_1.Logger(ChatGateway_1.name);
    }
    handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    async handleMessage(data, client) {
        client.emit('typing', { isTyping: true });
        try {
            const response = await this.aiCoreService.processQuery({
                prompt: data.message,
                context: data.context || 'chat',
                sessionId: client.id,
            });
            client.emit('messageResponse', {
                success: response.success,
                message: response.response,
                confidence: response.confidence,
                processingTime: response.processingTime,
                timestamp: response.timestamp,
            });
        }
        catch (error) {
            client.emit('messageResponse', {
                success: false,
                message: 'عذراً، حدث خطأ في معالجة رسالتك',
                error: error.message,
            });
        }
        finally {
            client.emit('typing', { isTyping: false });
        }
    }
};
exports.ChatGateway = ChatGateway;
tslib_1.__decorate([
    (0, websockets_1.WebSocketServer)(),
    tslib_1.__metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    tslib_1.__param(0, (0, websockets_1.MessageBody)()),
    tslib_1.__param(1, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    tslib_1.__metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleMessage", null);
exports.ChatGateway = ChatGateway = ChatGateway_1 = tslib_1.__decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: ['http://localhost:3000', 'http://localhost:4200'],
            credentials: true,
        },
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof core_logic_1.AiCoreService !== "undefined" && core_logic_1.AiCoreService) === "function" ? _a : Object])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map