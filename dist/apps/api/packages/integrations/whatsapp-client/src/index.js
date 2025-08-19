"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppClient = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
class WhatsAppClient {
    constructor(config) {
        this.baseUrl = 'https://graph.facebook.com/v18.0';
        this.accessToken = config.accessToken;
        this.phoneNumberId = config.phoneNumberId;
    }
    async sendMessage(to, message) {
        try {
            const response = await axios_1.default.post(`${this.baseUrl}/${this.phoneNumberId}/messages`, {
                messaging_product: 'whatsapp',
                to,
                text: { body: message }
            }, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            return {
                success: true,
                data: response.data
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.response?.data?.error?.message || error.message
            };
        }
    }
    parseWebhookData(webhookData) {
        const messages = [];
        webhookData.entry?.forEach(entry => {
            entry.changes?.forEach(change => {
                const { messages: incomingMessages, contacts } = change.value;
                incomingMessages?.forEach(msg => {
                    const contact = contacts?.find(c => c.wa_id === msg.from);
                    messages.push({
                        from: msg.from,
                        name: contact?.profile?.name || 'Unknown',
                        message: msg.message,
                        timestamp: new Date(parseInt(msg.timestamp) * 1000)
                    });
                });
            });
        });
        return messages;
    }
    async sendAutoReply(to) {
        const autoReplyMessage = 'شكراً لتواصلك معنا! سيتم الرد عليك في أقرب وقت ممكن.';
        return this.sendMessage(to, autoReplyMessage);
    }
}
exports.WhatsAppClient = WhatsAppClient;
//# sourceMappingURL=index.js.map