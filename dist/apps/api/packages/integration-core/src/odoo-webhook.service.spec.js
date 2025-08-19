"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const odoo_webhook_service_1 = require("./odoo-webhook.service");
describe('OdooWebhookService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [odoo_webhook_service_1.OdooWebhookService],
        }).compile();
        service = module.get(odoo_webhook_service_1.OdooWebhookService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should publish a message to Pub/Sub', async () => {
        const payload = { leadId: '123', status: 'created' };
        const result = await service.processWebhook(payload);
        expect(result.success).toBe(true);
        expect(result.messageId).toBeDefined();
    });
});
//# sourceMappingURL=odoo-webhook.service.spec.js.map