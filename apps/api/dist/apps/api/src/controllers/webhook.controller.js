"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookController = void 0;
const pubsub_1 = require("@google-cloud/pubsub");
const crypto_1 = require("crypto");
class WebhookController {
    constructor() {
        this.pubsub = new pubsub_1.PubSub();
        this.topicName = 'lead-events';
    }
    async handleWebhook(req, res) {
        const source = req.params.source;
        try {
            const isValid = await this.validateWebhook(source, req);
            if (!isValid) {
                return res.status(401).json({ error: 'Invalid webhook signature' });
            }
            const unifiedPayload = this.unifyPayload(source, req.body);
            await this.publishToQueue(unifiedPayload);
            res.status(200).json({ status: 'ok', processed: true });
        }
        catch (error) {
            console.error(`Webhook error for ${source}:`, error);
            res.status(500).json({ error: 'Processing failed' });
        }
    }
    async validateWebhook(source, req) {
        switch (source) {
            case 'meta':
                return this.validateMetaWebhook(req);
            case 'odoo':
                return this.validateOdooWebhook(req);
            default:
                return false;
        }
    }
    validateMetaWebhook(req) {
        const signature = req.headers['x-hub-signature-256'];
        const secret = process.env.META_WEBHOOK_SECRET;
        if (!signature || !secret)
            return false;
        const expectedSignature = crypto_1.default
            .createHmac('sha256', secret)
            .update(JSON.stringify(req.body))
            .digest('hex');
        return signature === `sha256=${expectedSignature}`;
    }
    validateOdooWebhook(req) {
        const signature = req.headers['x-g-assistant-signature'];
        const secret = process.env.ODOO_WEBHOOK_SECRET;
        if (!signature || !secret)
            return false;
        const expectedSignature = crypto_1.default
            .createHmac('sha256', secret)
            .update(JSON.stringify(req.body))
            .digest('hex');
        return signature === `sha256=${expectedSignature}`;
    }
    unifyPayload(source, payload) {
        const unified = {
            source,
            timestamp: new Date().toISOString(),
            event_type: this.getEventType(source, payload),
            data: this.extractLeadData(source, payload)
        };
        return unified;
    }
    getEventType(source, payload) {
        if (source === 'meta') {
            return payload.entry?.[0]?.changes?.[0]?.field === 'leadgen' ? 'lead_created' : 'unknown';
        }
        if (source === 'odoo') {
            return payload.event || 'lead_updated';
        }
        return 'unknown';
    }
    extractLeadData(source, payload) {
        if (source === 'meta') {
            const leadData = payload.entry?.[0]?.changes?.[0]?.value;
            return {
                leadgen_id: leadData?.leadgen_id,
                ad_id: leadData?.ad_id,
                form_id: leadData?.form_id,
                created_time: leadData?.created_time
            };
        }
        if (source === 'odoo') {
            return payload.data;
        }
        return payload;
    }
    async publishToQueue(payload) {
        const topic = this.pubsub.topic(this.topicName);
        const messageBuffer = Buffer.from(JSON.stringify(payload));
        await topic.publishMessage({
            data: messageBuffer,
            attributes: {
                source: payload.source,
                event_type: payload.event_type
            }
        });
    }
}
exports.WebhookController = WebhookController;
//# sourceMappingURL=webhook.controller.js.map