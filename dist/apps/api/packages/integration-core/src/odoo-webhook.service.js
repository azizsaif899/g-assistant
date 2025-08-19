"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OdooWebhookService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const pubsub_1 = require("@google-cloud/pubsub");
let OdooWebhookService = class OdooWebhookService {
    constructor() {
        this.pubSubClient = new pubsub_1.PubSub();
    }
    async processWebhook(payload) {
        const topicName = 'odoo-updates';
        const dataBuffer = Buffer.from(JSON.stringify(payload));
        try {
            const messageId = await this.pubSubClient.topic(topicName).publishMessage({ data: dataBuffer });
            console.log(`Message ${messageId} published.`);
            return { success: true, messageId };
        }
        catch (error) {
            console.error(`Received error while publishing: ${error.message}`);
            return { success: false, error: error.message };
        }
    }
};
exports.OdooWebhookService = OdooWebhookService;
exports.OdooWebhookService = OdooWebhookService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], OdooWebhookService);
//# sourceMappingURL=odoo-webhook.service.js.map