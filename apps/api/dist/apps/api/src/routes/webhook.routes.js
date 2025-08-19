"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const webhook_controller_1 = require("../controllers/webhook.controller");
const router = (0, express_1.Router)();
const webhookController = new webhook_controller_1.WebhookController();
router.post('/:source', async (req, res) => {
    await webhookController.handleWebhook(req, res);
});
router.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        message: 'Webhook service is running',
        timestamp: new Date().toISOString(),
        supported_sources: ['meta', 'odoo', 'whatsapp']
    });
});
router.post('/test/:source', async (req, res) => {
    const source = req.params.source;
    const testPayload = {
        test: true,
        source,
        timestamp: new Date().toISOString(),
        data: req.body
    };
    console.log(`Test webhook received from ${source}:`, testPayload);
    res.json({
        status: 'test_received',
        source,
        payload: testPayload
    });
});
exports.default = router;
//# sourceMappingURL=webhook.routes.js.map