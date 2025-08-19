"use strict";
/**
 * 🔔 Smart Notification - TASK-013
 * إشعارات ذكية قابلة للتنفيذ
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSmartNotifications = exports.SmartNotificationSystem = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const framer_motion_1 = require("framer-motion");
const event_bus_1 = require("../../../../packages/core-logic/src/event-bus");
const SmartNotificationSystem = () => {
    const [notifications, setNotifications] = (0, react_1.useState)([]);
    // إضافة إشعار جديد
    const addNotification = (notification) => {
        const newNotification = {
            ...notification,
            id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        };
        setNotifications(prev => [newNotification, ...prev.slice(0, 4)]); // الاحتفاظ بآخر 5 إشعارات
        // إزالة تلقائية إذا لم يكن persistent
        if (!notification.persistent && notification.autoClose !== 0) {
            setTimeout(() => {
                removeNotification(newNotification.id);
            }, notification.autoClose || 5000);
        }
    };
    // إزالة إشعار
    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };
    // تنفيذ إجراء
    const executeAction = async (notificationId, action) => {
        try {
            await action.action();
            removeNotification(notificationId);
        }
        catch (error) {
            console.error('❌ Failed to execute notification action:', error);
        }
    };
    // الاستماع للأحداث وإنشاء إشعارات ذكية
    (0, react_1.useEffect)(() => {
        const handleEvent = (event) => {
            switch (event.type) {
                case event_bus_1.EventTypes.OPPORTUNITY_WON:
                    addNotification({
                        type: 'success',
                        title: 'صفقة مكتملة! 🎉',
                        message: `تم إغلاق صفقة ${event.data.dealName} بقيمة ${event.data.value?.toLocaleString('ar-SA')} ريال`,
                        icon: '🎉',
                        actions: [
                            {
                                id: 'send-congrats',
                                label: 'إرسال تهنئة للفريق',
                                action: async () => {
                                    await event_bus_1.eventBus.publish({
                                        type: event_bus_1.EventTypes.WHATSAPP_MESSAGE_SENT,
                                        source: 'smart-notification',
                                        data: { action: 'send-congratulations', dealId: event.data.dealId }
                                    });
                                },
                                style: 'primary'
                            },
                            {
                                id: 'view-deal',
                                label: 'عرض تفاصيل الصفقة',
                                action: async () => {
                                    window.location.href = `/crm/deals/${event.data.dealId}`;
                                },
                                style: 'secondary'
                            }
                        ]
                    });
                    break;
                case event_bus_1.EventTypes.LEAD_CREATED:
                    addNotification({
                        type: 'info',
                        title: 'عميل محتمل جديد',
                        message: `تم إضافة ${event.data.leadName} من ${event.data.source}`,
                        icon: '👤',
                        actions: [
                            {
                                id: 'qualify-lead',
                                label: 'تأهيل العميل',
                                action: async () => {
                                    await event_bus_1.eventBus.publish({
                                        type: event_bus_1.EventTypes.AI_RECOMMENDATION,
                                        source: 'smart-notification',
                                        data: { action: 'qualify-lead', leadId: event.data.leadId }
                                    });
                                },
                                style: 'primary'
                            }
                        ]
                    });
                    break;
                case event_bus_1.EventTypes.SYSTEM_ERROR:
                    addNotification({
                        type: 'error',
                        title: 'خطأ في النظام',
                        message: event.data.error || 'حدث خطأ غير متوقع',
                        icon: '⚠️',
                        persistent: true,
                        actions: [
                            {
                                id: 'retry',
                                label: 'إعادة المحاولة',
                                action: async () => {
                                    window.location.reload();
                                },
                                style: 'primary'
                            },
                            {
                                id: 'report',
                                label: 'إبلاغ عن المشكلة',
                                action: async () => {
                                    console.log('Reporting issue...');
                                },
                                style: 'secondary'
                            }
                        ]
                    });
                    break;
                case 'whatsapp.message.received':
                    addNotification({
                        type: 'info',
                        title: 'رسالة WhatsApp جديدة',
                        message: `رسالة من ${event.data.from}: ${event.data.preview}`,
                        icon: '💬',
                        actions: [
                            {
                                id: 'reply',
                                label: 'رد سريع',
                                action: async () => {
                                    window.open(`/whatsapp/chat/${event.data.from}`, '_blank');
                                },
                                style: 'primary'
                            }
                        ]
                    });
                    break;
            }
        };
        event_bus_1.eventBus.subscribeAll(handleEvent);
        return () => event_bus_1.eventBus.removeAllListeners();
    }, []);
    const getNotificationStyle = (type) => {
        const styles = {
            success: 'bg-green-50 border-green-200 text-green-800',
            warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
            error: 'bg-red-50 border-red-200 text-red-800',
            info: 'bg-blue-50 border-blue-200 text-blue-800'
        };
        return styles[type] || styles.info;
    };
    const getActionStyle = (style) => {
        const styles = {
            primary: 'bg-blue-600 text-white hover:bg-blue-700',
            secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
            danger: 'bg-red-600 text-white hover:bg-red-700'
        };
        return styles[style] || styles.secondary;
    };
    return (<div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm">
      <framer_motion_1.AnimatePresence>
        {notifications.map((notification) => (<framer_motion_1.motion.div key={notification.id} initial={{ opacity: 0, x: 300, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 300, scale: 0.8 }} transition={{ type: "spring", damping: 20, stiffness: 300 }} className={`border rounded-lg p-4 shadow-lg ${getNotificationStyle(notification.type)}`}>
            <div className="flex items-start space-x-3 rtl:space-x-reverse">
              <span className="text-2xl">{notification.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm">{notification.title}</h4>
                  <button onClick={() => removeNotification(notification.id)} className="text-gray-400 hover:text-gray-600 ml-2">
                    ✕
                  </button>
                </div>
                <p className="text-sm mt-1 opacity-90">{notification.message}</p>
                
                {notification.actions && notification.actions.length > 0 && (<div className="flex space-x-2 rtl:space-x-reverse mt-3">
                    {notification.actions.map((action) => (<button key={action.id} onClick={() => executeAction(notification.id, action)} className={`px-3 py-1 text-xs rounded-full transition-colors ${getActionStyle(action.style)}`}>
                        {action.label}
                      </button>))}
                  </div>)}
              </div>
            </div>
          </framer_motion_1.motion.div>))}
      </framer_motion_1.AnimatePresence>
    </div>);
};
exports.SmartNotificationSystem = SmartNotificationSystem;
// Hook لإضافة إشعارات من أي مكان
const useSmartNotifications = () => {
    const showNotification = (notification) => {
        // إرسال الإشعار عبر Event Bus
        event_bus_1.eventBus.publish({
            type: 'notification.show',
            source: 'notification-hook',
            data: notification
        });
    };
    return { showNotification };
};
exports.useSmartNotifications = useSmartNotifications;
//# sourceMappingURL=SmartNotification.js.map