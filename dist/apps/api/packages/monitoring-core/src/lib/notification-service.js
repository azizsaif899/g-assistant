"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
class NotificationService {
    constructor() {
        this.channels = new Map();
        this.rules = [];
    }
    addChannel(name, channel) {
        this.channels.set(name, channel);
    }
    addRule(rule) {
        this.rules.push(rule);
    }
    async sendAlert(alert) {
        const applicableRules = this.rules.filter(rule => rule.alertLevel === alert.level);
        for (const rule of applicableRules) {
            for (const channelName of rule.channels) {
                const channel = this.channels.get(channelName);
                if (channel?.enabled) {
                    await this.sendToChannel(channel, alert, rule.template);
                }
            }
        }
    }
    async sendToChannel(channel, alert, template) {
        const message = template ? this.formatMessage(template, alert) : alert.message;
        switch (channel.type) {
            case 'console':
                console.log(`🚨 ALERT [${alert.level.toUpperCase()}]: ${message}`);
                break;
            case 'webhook':
                await this.sendWebhook(channel.config.url, { alert, message });
                break;
            case 'email':
                console.log(`📧 EMAIL ALERT to ${channel.config.to}: ${message}`);
                break;
            case 'sms':
                console.log(`📱 SMS ALERT to ${channel.config.phone}: ${message}`);
                break;
        }
    }
    async sendWebhook(url, payload) {
        try {
            await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        }
        catch (error) {
            console.error('Webhook notification failed:', error);
        }
    }
    formatMessage(template, alert) {
        return template
            .replace('{level}', alert.level)
            .replace('{message}', alert.message)
            .replace('{timestamp}', alert.timestamp);
    }
}
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification-service.js.map