"use strict";
/**
 * ⚡ Optimistic Updates - TASK-008
 * التحديثات المتفائلة للاستجابة الفورية
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.optimisticHelpers = exports.optimisticManager = exports.OptimisticUpdateManager = void 0;
const event_bus_1 = require("./event-bus");
class OptimisticUpdateManager {
    constructor() {
        this.updates = new Map();
        this.callbacks = new Map();
    }
    /**
     * تطبيق تحديث متفائل
     */
    async applyUpdate(id, type, data, apiCall, rollback) {
        const update = {
            id,
            type,
            data,
            timestamp: new Date(),
            status: 'pending',
            rollback
        };
        // حفظ التحديث
        this.updates.set(id, update);
        // تطبيق التحديث فوراً في الواجهة
        this.notifyCallbacks(update);
        // إرسال الحدث للمكونات
        await event_bus_1.eventBus.publish({
            type: 'optimistic.update.applied',
            source: 'optimistic-manager',
            data: { updateId: id, type, data }
        });
        try {
            // تنفيذ API call في الخلفية
            const result = await apiCall();
            // تحديث الحالة للنجاح
            update.status = 'success';
            this.updates.set(id, update);
            // إشعار بالنجاح
            await event_bus_1.eventBus.publish({
                type: 'optimistic.update.success',
                source: 'optimistic-manager',
                data: { updateId: id, result }
            });
            // إزالة التحديث بعد 5 ثوان
            setTimeout(() => this.removeUpdate(id), 5000);
            return true;
        }
        catch (error) {
            // تحديث الحالة للفشل
            update.status = 'failed';
            this.updates.set(id, update);
            // تطبيق rollback إذا كان متاحاً
            if (rollback) {
                rollback();
            }
            // إشعار بالفشل
            await event_bus_1.eventBus.publish({
                type: 'optimistic.update.failed',
                source: 'optimistic-manager',
                data: { updateId: id, error: error.message }
            });
            console.error(`❌ Optimistic update failed: ${id}`, error);
            return false;
        }
    }
    /**
     * تسجيل callback للتحديثات
     */
    onUpdate(type, callback) {
        this.callbacks.set(type, callback);
    }
    /**
     * إلغاء تسجيل callback
     */
    offUpdate(type) {
        this.callbacks.delete(type);
    }
    /**
     * الحصول على تحديث معين
     */
    getUpdate(id) {
        return this.updates.get(id);
    }
    /**
     * الحصول على جميع التحديثات المعلقة
     */
    getPendingUpdates() {
        return Array.from(this.updates.values()).filter(u => u.status === 'pending');
    }
    /**
     * إزالة تحديث
     */
    removeUpdate(id) {
        this.updates.delete(id);
    }
    /**
     * إشعار المستمعين
     */
    notifyCallbacks(update) {
        const callback = this.callbacks.get(update.type);
        if (callback) {
            callback(update);
        }
    }
    /**
     * تنظيف التحديثات القديمة
     */
    cleanup() {
        const now = Date.now();
        const maxAge = 5 * 60 * 1000; // 5 دقائق
        for (const [id, update] of this.updates.entries()) {
            if (now - update.timestamp.getTime() > maxAge) {
                this.removeUpdate(id);
            }
        }
    }
}
exports.OptimisticUpdateManager = OptimisticUpdateManager;
// مدير التحديثات المتفائلة العام
exports.optimisticManager = new OptimisticUpdateManager();
// تنظيف دوري للتحديثات القديمة
setInterval(() => {
    exports.optimisticManager.cleanup();
}, 60000); // كل دقيقة
// Helper functions للاستخدام السهل
exports.optimisticHelpers = {
    /**
     * تحديث عميل محتمل
     */
    updateLead: async (leadId, updates, apiCall) => {
        return exports.optimisticManager.applyUpdate(`lead_${leadId}`, 'lead_update', { leadId, updates }, apiCall, () => {
            // rollback logic - إعادة القيم السابقة
            console.log(`Rolling back lead update: ${leadId}`);
        });
    },
    /**
     * إنشاء مهمة جديدة
     */
    createTask: async (taskData, apiCall) => {
        const tempId = `temp_${Date.now()}`;
        return exports.optimisticManager.applyUpdate(tempId, 'task_create', { ...taskData, id: tempId }, apiCall, () => {
            // rollback - إزالة المهمة من الواجهة
            console.log(`Rolling back task creation: ${tempId}`);
        });
    },
    /**
     * تحديث حالة صفقة
     */
    updateDealStage: async (dealId, newStage, apiCall) => {
        return exports.optimisticManager.applyUpdate(`deal_stage_${dealId}`, 'deal_stage_update', { dealId, newStage }, apiCall, () => {
            // rollback - إعادة الصفقة للمرحلة السابقة
            console.log(`Rolling back deal stage update: ${dealId}`);
        });
    },
    /**
     * إرسال رسالة
     */
    sendMessage: async (messageData, apiCall) => {
        const tempId = `msg_${Date.now()}`;
        return exports.optimisticManager.applyUpdate(tempId, 'message_send', { ...messageData, id: tempId, status: 'sending' }, apiCall, () => {
            // rollback - وضع علامة فشل على الرسالة
            console.log(`Rolling back message send: ${tempId}`);
        });
    }
};
//# sourceMappingURL=optimistic-updates.js.map