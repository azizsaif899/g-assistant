"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const whatsapp_core_1 = require("@azizsys/integrations/whatsapp-core");
let WhatsAppService = class WhatsAppService {
    constructor() {
        this.userManager = new whatsapp_core_1.UserManager();
        this.securityManager = new whatsapp_core_1.SecurityManager();
        const config = {
            verifyToken: process.env.WHATSAPP_VERIFY_TOKEN || '',
            accessToken: process.env.WHATSAPP_ACCESS_TOKEN || '',
            appSecret: process.env.WHATSAPP_APP_SECRET || '',
            phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || ''
        };
        this.whatsappCore = new whatsapp_core_1.WhatsAppCore(config);
    }
    verifyWebhook(mode, token, challenge) {
        return this.whatsappCore.verifyWebhook(mode, token, challenge);
    }
    async processWebhook(body, signature) {
        const responses = await this.whatsappCore.processWebhook(body, signature);
        for (const response of responses) {
            // تحقق من الأمان قبل الإرسال
            const userId = response.to;
            if (this.securityManager.checkRateLimit(userId)) {
                await this.whatsappCore.sendMessage(response);
            }
        }
    }
    async authenticateUser(whatsappId, systemUserId) {
        const user = await this.userManager.authenticateUser(whatsappId);
        if (systemUserId) {
            return await this.userManager.linkSystemUser(whatsappId, systemUserId);
        }
        return true;
    }
    isUserAuthenticated(whatsappId) {
        return this.userManager.isAuthenticated(whatsappId);
    }
};
exports.WhatsAppService = WhatsAppService;
exports.WhatsAppService = WhatsAppService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], WhatsAppService);
//# sourceMappingURL=whatsapp.service.js.map