"use strict";
/**
 * 🎨 Dynamic Workspace Hook - TASK-012
 * مساحة العمل التي تتكيف مع المستخدم
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDynamicWorkspace = void 0;
const react_1 = require("react");
const event_bus_1 = require("../../../../packages/core-logic/src/event-bus");
const useDynamicWorkspace = (userId) => {
    const [workspaceItems, setWorkspaceItems] = (0, react_1.useState)([
        {
            id: 'dashboard',
            title: 'لوحة التحكم',
            icon: '🏠',
            path: '/dashboard',
            category: 'main',
            usage: 0,
            lastUsed: new Date(),
            visible: true
        },
        {
            id: 'crm-leads',
            title: 'العملاء المحتملون',
            icon: '👥',
            path: '/crm/leads',
            category: 'crm',
            usage: 0,
            lastUsed: new Date(),
            visible: true
        },
        {
            id: 'crm-pipeline',
            title: 'خط الأنابيب',
            icon: '📊',
            path: '/crm/pipeline',
            category: 'crm',
            usage: 0,
            lastUsed: new Date(),
            visible: true
        },
        {
            id: 'accounting',
            title: 'المحاسبة',
            icon: '💰',
            path: '/accounting',
            category: 'finance',
            usage: 0,
            lastUsed: new Date(),
            visible: true
        },
        {
            id: 'sales-report',
            title: 'تقرير المبيعات',
            icon: '📈',
            path: '/reports/sales',
            category: 'reports',
            usage: 0,
            lastUsed: new Date(),
            visible: false
        },
        {
            id: 'ai-insights',
            title: 'رؤى الذكاء الاصطناعي',
            icon: '🧠',
            path: '/ai/insights',
            category: 'ai',
            usage: 0,
            lastUsed: new Date(),
            visible: false
        }
    ]);
    const [preferences, setPreferences] = (0, react_1.useState)({
        userId: userId || 'default',
        role: 'manager',
        frequentItems: [],
        hiddenItems: [],
        customOrder: []
    });
    const [isLearning, setIsLearning] = (0, react_1.useState)(true);
    // تتبع استخدام العناصر
    const trackUsage = async (itemId) => {
        setWorkspaceItems(prev => prev.map(item => item.id === itemId
            ? { ...item, usage: item.usage + 1, lastUsed: new Date() }
            : item));
        await event_bus_1.eventBus.publish({
            type: event_bus_1.EventTypes.USER_ACTION,
            source: 'dynamic-workspace',
            data: { action: 'item-used', itemId, userId }
        });
    };
    // تحليل أنماط الاستخدام وتكييف الواجهة
    const adaptWorkspace = () => {
        setWorkspaceItems(prev => {
            const updated = [...prev];
            // إظهار العناصر المستخدمة بكثرة
            updated.forEach(item => {
                if (item.usage >= 5 && !item.visible) {
                    item.visible = true;
                    console.log(`🎯 Showing frequently used item: ${item.title}`);
                }
                // إخفاء العناصر غير المستخدمة
                if (item.usage === 0 && item.category !== 'main') {
                    const daysSinceLastUse = (Date.now() - item.lastUsed.getTime()) / (1000 * 60 * 60 * 24);
                    if (daysSinceLastUse > 7) {
                        item.visible = false;
                        console.log(`📦 Hiding unused item: ${item.title}`);
                    }
                }
            });
            // ترتيب حسب الاستخدام
            return updated.sort((a, b) => {
                if (a.category === 'main')
                    return -1;
                if (b.category === 'main')
                    return 1;
                return b.usage - a.usage;
            });
        });
    };
    // تخصيص حسب الدور
    const customizeByRole = (role) => {
        const roleConfigs = {
            'sales-manager': {
                prioritize: ['crm-leads', 'crm-pipeline', 'sales-report'],
                hide: ['accounting']
            },
            'accountant': {
                prioritize: ['accounting', 'dashboard'],
                hide: ['crm-leads', 'crm-pipeline']
            },
            'ceo': {
                prioritize: ['dashboard', 'ai-insights', 'sales-report'],
                hide: []
            }
        };
        const config = roleConfigs[role];
        if (config) {
            setWorkspaceItems(prev => prev.map(item => ({
                ...item,
                visible: !config.hide.includes(item.id),
                usage: config.prioritize.includes(item.id) ? item.usage + 10 : item.usage
            })));
        }
    };
    // حفظ التفضيلات
    const savePreferences = async () => {
        const newPreferences = {
            ...preferences,
            frequentItems: workspaceItems
                .filter(item => item.usage >= 5)
                .map(item => item.id),
            hiddenItems: workspaceItems
                .filter(item => !item.visible)
                .map(item => item.id)
        };
        setPreferences(newPreferences);
        localStorage.setItem('workspace-preferences', JSON.stringify(newPreferences));
    };
    // تحميل التفضيلات المحفوظة
    const loadPreferences = () => {
        const saved = localStorage.getItem('workspace-preferences');
        if (saved) {
            const savedPrefs = JSON.parse(saved);
            setPreferences(savedPrefs);
            // تطبيق التفضيلات المحفوظة
            setWorkspaceItems(prev => prev.map(item => ({
                ...item,
                visible: !savedPrefs.hiddenItems.includes(item.id),
                usage: savedPrefs.frequentItems.includes(item.id) ? item.usage + 5 : item.usage
            })));
        }
    };
    // تشغيل التكيف التلقائي
    (0, react_1.useEffect)(() => {
        loadPreferences();
        const interval = setInterval(() => {
            if (isLearning) {
                adaptWorkspace();
                savePreferences();
            }
        }, 30000); // كل 30 ثانية
        return () => clearInterval(interval);
    }, [isLearning]);
    // الاستماع لتغييرات الدور
    (0, react_1.useEffect)(() => {
        const handleRoleChange = (event) => {
            if (event.data.role) {
                customizeByRole(event.data.role);
                setPreferences(prev => ({ ...prev, role: event.data.role }));
            }
        };
        event_bus_1.eventBus.subscribe('user.role.changed', handleRoleChange);
        return () => event_bus_1.eventBus.unsubscribe('user.role.changed', handleRoleChange);
    }, []);
    return {
        workspaceItems: workspaceItems.filter(item => item.visible),
        allItems: workspaceItems,
        preferences,
        isLearning,
        trackUsage,
        setLearning: setIsLearning,
        customizeByRole,
        resetWorkspace: () => {
            localStorage.removeItem('workspace-preferences');
            window.location.reload();
        }
    };
};
exports.useDynamicWorkspace = useDynamicWorkspace;
//# sourceMappingURL=useDynamicWorkspace.js.map