"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalAppController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let ExternalAppController = class ExternalAppController {
    async handleChat(body) {
        return {
            response: "Connected to AzizSys AI",
            timestamp: new Date().toISOString()
        };
    }
    async cfoAgent(body) {
        return { result: "CFO Agent Ready", data: body.query };
    }
    async developerAgent(body) {
        return { analysis: "Developer Agent Ready", code: body.code };
    }
    async health() {
        return { status: 'External API Ready', timestamp: new Date().toISOString() };
    }
};
exports.ExternalAppController = ExternalAppController;
tslib_1.__decorate([
    (0, common_1.Post)('chat'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ExternalAppController.prototype, "handleChat", null);
tslib_1.__decorate([
    (0, common_1.Post)('agents/cfo'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ExternalAppController.prototype, "cfoAgent", null);
tslib_1.__decorate([
    (0, common_1.Post)('agents/developer'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ExternalAppController.prototype, "developerAgent", null);
tslib_1.__decorate([
    (0, common_1.Get)('health'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ExternalAppController.prototype, "health", null);
exports.ExternalAppController = ExternalAppController = tslib_1.__decorate([
    (0, common_1.Controller)('external')
], ExternalAppController);
//# sourceMappingURL=external-app.controller.js.map