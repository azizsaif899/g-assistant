"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveGateway = void 0;
const tslib_1 = require("tslib");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let LiveGateway = class LiveGateway {
    constructor() {
        this.connectionCount = 0;
    }
    handleConnection(client, ...args) {
        this.connectionCount++;
        this.server.emit('metrics', { connectionCount: this.connectionCount });
        console.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        this.connectionCount--;
        this.server.emit('metrics', { connectionCount: this.connectionCount });
        console.log(`Client disconnected: ${client.id}`);
    }
    handleMessage(client, payload) {
        const startTime = Date.now();
        this.server.emit('message', payload);
        const endTime = Date.now();
        const latency = endTime - startTime;
        this.server.emit('metrics', { latency });
    }
};
exports.LiveGateway = LiveGateway;
tslib_1.__decorate([
    (0, websockets_1.WebSocketServer)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _a : Object)
], LiveGateway.prototype, "server", void 0);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _b : Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], LiveGateway.prototype, "handleMessage", null);
exports.LiveGateway = LiveGateway = tslib_1.__decorate([
    (0, websockets_1.WebSocketGateway)()
], LiveGateway);
//# sourceMappingURL=live.gateway.js.map