"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const whatsapp_service_1 = require("./whatsapp.service");
let WhatsAppController = class WhatsAppController {
    constructor(whatsappService) {
        this.whatsappService = whatsappService;
    }
    verifyWebhook(mode, token, challenge) {
        const result = this.whatsappService.verifyWebhook(mode, token, challenge);
        if (!result) {
            throw new common_1.HttpException('Forbidden', common_1.HttpStatus.FORBIDDEN);
        }
        return result;
    }
    async handleWebhook(body, signature) {
        try {
            await this.whatsappService.processWebhook(body, signature);
            return { status: 'success' };
        }
        catch (error) {
            console.error('Webhook processing error:', error);
            throw new common_1.HttpException('Internal Server Error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.WhatsAppController = WhatsAppController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__param(0, (0, common_1.Query)('hub.mode')),
    tslib_1.__param(1, (0, common_1.Query)('hub.verify_token')),
    tslib_1.__param(2, (0, common_1.Query)('hub.challenge')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String]),
    tslib_1.__metadata("design:returntype", String)
], WhatsAppController.prototype, "verifyWebhook", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Headers)('x-hub-signature-256')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String]),
    tslib_1.__metadata("design:returntype", Promise)
], WhatsAppController.prototype, "handleWebhook", null);
exports.WhatsAppController = WhatsAppController = tslib_1.__decorate([
    (0, common_1.Controller)('webhook/whatsapp'),
    tslib_1.__metadata("design:paramtypes", [whatsapp_service_1.WhatsAppService])
], WhatsAppController);
//# sourceMappingURL=whatsapp.controller.js.map