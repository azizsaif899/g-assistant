"use strict";
/**
 * 📰 Smart Activity Feed - TASK-007
 * موجز النشاط الذكي مع التجميع التلقائي
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartActivityFeed = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const framer_motion_1 = require("framer-motion");
const event_bus_1 = require("../../../../packages/core-logic/src/event-bus");
const SmartActivityFeed = () => {
    const [activities, setActivities] = (0, react_1.useState)([
        {
            id: '1',
            type: 'deal_won',
            title: 'صفقة مكتملة',
            description: 'أغلقت سارة صفقة شركة المستقبل بقيمة 200,000 ريال',
            icon: '🎉',
            timestamp: new Date(Date.now() - 5 * 60 * 1000),
            user: 'سارة أحمد',
            actionable: {
                label: 'إرسال تهنئة',
                action: () => console.log('Sending congratulations...')
            },
            priority: 'high'
        },
        {
            id: '2',
            type: 'email_received',
            title: 'رسائل جديدة',
            description: 'تم استلام 3 رسائل من شركة الأمل ولم يتم الرد عليها',
            icon: '📧',
            timestamp: new Date(Date.now() - 15 * 60 * 1000),
            user: 'النظام',
            actionable: {
                label: 'عرض الرسائل',
                action: () => console.log('Opening emails...')
            },
            priority: 'medium'
        },
        {
            id: '3',
            type: 'call_completed',
            title: 'مكالمة مكتملة',
            description: 'انتهت مكالمة مع خالد العتيبي - مدة 25 دقيقة',
            icon: '📞',
            timestamp: new Date(Date.now() - 30 * 60 * 1000),
            user: 'أحمد محمد',
            actionable: {
                label: 'عرض الملخص',
                action: () => console.log('Showing call summary...')
            },
            priority: 'medium'
        },
        {
            id: '4',
            type: 'lead_created',
            title: 'عميل محتمل جديد',
            description: 'تم إضافة عميل محتمل من موقع الويب',
            icon: '👤',
            timestamp: new Date(Date.now() - 45 * 60 * 1000),
            user: 'النظام',
            priority: 'low'
        },
        {
            id: '5',
            type: 'lead_created',
            title: 'عميل محتمل جديد',
            description: 'تم إضافة عميل محتمل من LinkedIn',
            icon: '👤',
            timestamp: new Date(Date.now() - 50 * 60 * 1000),
            user: 'النظام',
            priority: 'low'
        }
    ]);
    const [groupedActivities, setGroupedActivities] = (0, react_1.useState)([]);
    // تجميع الأنشطة المتشابهة
    const groupActivities = (activities) => {
        const grouped = {};
        const singles = [];
        activities.forEach(activity => {
            const key = `${activity.type}_${activity.user}`;
            if (!grouped[key]) {
                grouped[key] = [];
            }
            grouped[key].push(activity);
        });
        const result = [];
        Object.entries(grouped).forEach(([key, group]) => {
            if (group.length > 1 && group[0].type === 'lead_created') {
                // تجميع العملاء المحتملين الجدد
                result.push({
                    id: `group_${key}`,
                    type: 'grouped',
                    title: `${group.length} عملاء محتملين جدد`,
                    count: group.length,
                    activities: group,
                    timestamp: group[0].timestamp,
                    icon: '👥',
                    priority: 'medium'
                });
            }
            else {
                // إضافة الأنشطة الفردية
                group.forEach(activity => {
                    result.push({
                        id: activity.id,
                        type: 'single',
                        title: activity.title,
                        activities: [activity],
                        timestamp: activity.timestamp,
                        icon: activity.icon,
                        priority: activity.priority
                    });
                });
            }
        });
        return result.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    };
    // تحديث الأنشطة المجمعة
    (0, react_1.useEffect)(() => {
        setGroupedActivities(groupActivities(activities));
    }, [activities]);
    // الاستماع للأنشطة الجديدة
    (0, react_1.useEffect)(() => {
        const handleNewActivity = (event) => {
            const newActivity = {
                id: `activity_${Date.now()}`,
                type: event.type,
                title: getActivityTitle(event.type),
                description: event.data.description || 'نشاط جديد',
                icon: getActivityIcon(event.type),
                timestamp: new Date(),
                user: event.data.user || 'النظام',
                priority: event.data.priority || 'medium'
            };
            setActivities(prev => [newActivity, ...prev.slice(0, 19)]); // الاحتفاظ بآخر 20 نشاط
        };
        event_bus_1.eventBus.subscribeAll(handleNewActivity);
        return () => event_bus_1.eventBus.removeAllListeners();
    }, []);
    const getActivityTitle = (type) => {
        const titles = {
            'crm.lead.created': 'عميل محتمل جديد',
            'crm.opportunity.won': 'صفقة مكتملة',
            'whatsapp.message.received': 'رسالة WhatsApp',
            'user.login': 'تسجيل دخول',
            'ai.recommendation': 'توصية ذكية'
        };
        return titles[type] || 'نشاط جديد';
    };
    const getActivityIcon = (type) => {
        const icons = {
            'crm.lead.created': '👤',
            'crm.opportunity.won': '🎉',
            'whatsapp.message.received': '💬',
            'user.login': '🔐',
            'ai.recommendation': '🧠'
        };
        return icons[type] || '📋';
    };
    const getTimeAgo = (timestamp) => {
        const now = new Date();
        const diff = now.getTime() - timestamp.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        if (days > 0)
            return `منذ ${days} يوم`;
        if (hours > 0)
            return `منذ ${hours} ساعة`;
        if (minutes > 0)
            return `منذ ${minutes} دقيقة`;
        return 'الآن';
    };
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'border-r-red-500 bg-red-50';
            case 'medium': return 'border-r-yellow-500 bg-yellow-50';
            default: return 'border-r-gray-500 bg-gray-50';
        }
    };
    return (<div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">موجز النشاط</h3>
        <button className="text-sm text-blue-600 hover:text-blue-800">
          عرض الكل
        </button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        <framer_motion_1.AnimatePresence>
          {groupedActivities.map((group, index) => (<framer_motion_1.motion.div key={group.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ delay: index * 0.05 }} className={`border-r-4 rounded-lg p-4 ${getPriorityColor(group.priority)}`}>
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <span className="text-2xl">{group.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">
                      {group.title}
                      {group.count && (<span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {group.count}
                        </span>)}
                    </h4>
                    <span className="text-xs text-gray-500">
                      {getTimeAgo(group.timestamp)}
                    </span>
                  </div>

                  {group.type === 'single' && (<p className="text-sm text-gray-600 mt-1">
                      {group.activities[0].description}
                    </p>)}

                  {group.type === 'grouped' && (<div className="mt-2">
                      <p className="text-sm text-gray-600 mb-2">
                        تم إضافة {group.count} عملاء محتملين جدد
                      </p>
                      <button className="text-xs text-blue-600 hover:text-blue-800">
                        عرض التفاصيل
                      </button>
                    </div>)}

                  {group.activities[0].actionable && (<div className="mt-3">
                      <button onClick={group.activities[0].actionable.action} className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition-colors">
                        {group.activities[0].actionable.label}
                      </button>
                    </div>)}
                </div>
              </div>
            </framer_motion_1.motion.div>))}
        </framer_motion_1.AnimatePresence>
      </div>

      {groupedActivities.length === 0 && (<div className="text-center py-8 text-gray-500">
          <span className="text-4xl mb-4 block">📭</span>
          <p>لا توجد أنشطة حديثة</p>
        </div>)}
    </div>);
};
exports.SmartActivityFeed = SmartActivityFeed;
//# sourceMappingURL=SmartActivityFeed.js.map