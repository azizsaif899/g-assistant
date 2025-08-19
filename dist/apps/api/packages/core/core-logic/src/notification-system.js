"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationSystem = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let NotificationSystem = class NotificationSystem {
    async sendNotification(type, message, recipients) {
        for (const recipient of recipients) {
            if (recipient.includes('@')) {
                await this.sendEmail(recipient, message);
            }
            else if (recipient.startsWith('slack:')) {
                await this.sendSlack(recipient, message);
            }
            else if (recipient.startsWith('whatsapp:')) {
                await this.sendWhatsApp(recipient, message);
            }
        }
    }
    async sendEmail(email, message) {
        // Email notification logic
    }
    async sendSlack(channel, message) {
        // Slack notification logic
    }
    async sendWhatsApp(number, message) {
        // WhatsApp notification logic
    }
};
exports.NotificationSystem = NotificationSystem;
exports.NotificationSystem = NotificationSystem = tslib_1.__decorate([
    (0, common_1.Injectable)()
], NotificationSystem);
//# sourceMappingURL=notification-system.js.map