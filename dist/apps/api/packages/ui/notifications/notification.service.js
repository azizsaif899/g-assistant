"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
class NotificationService {
    constructor() {
        this.notifications = new Map();
    }
    async sendNotification(userId, notification) {
        const newNotification = {
            id: `notif_${Date.now()}`,
            userId,
            read: false,
            createdAt: new Date(),
            ...notification
        };
        const userNotifications = this.notifications.get(userId) || [];
        userNotifications.push(newNotification);
        this.notifications.set(userId, userNotifications);
        console.log(`📢 Notification sent: ${notification.title}`);
    }
    async getNotifications(userId) {
        return this.notifications.get(userId) || [];
    }
    async markAsRead(userId, notificationId) {
        const userNotifications = this.notifications.get(userId) || [];
        const notification = userNotifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
        }
    }
}
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map