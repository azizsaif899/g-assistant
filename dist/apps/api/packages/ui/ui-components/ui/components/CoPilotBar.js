"use strict";
/**
 * 🎯 Co-pilot Bar حقيقي - TASK-002
 * شريط الأوامر الموحد مع Ctrl+K فعلي
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCoPilotBar = exports.CoPilotBar = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const framer_motion_1 = require("framer-motion");
const event_bus_1 = require("../../../packages/core-logic/src/event-bus");
const CoPilotBar = ({ isOpen, onClose }) => {
    const [query, setQuery] = (0, react_1.useState)('');
    const [selectedIndex, setSelectedIndex] = (0, react_1.useState)(0);
    const [filteredCommands, setFilteredCommands] = (0, react_1.useState)([]);
    const [isExecuting, setIsExecuting] = (0, react_1.useState)(false);
    const inputRef = (0, react_1.useRef)(null);
    // الأوامر المتاحة
    const commands = [
        {
            id: 'create-lead',
            title: 'إنشاء عميل محتمل جديد',
            description: 'إضافة عميل محتمل جديد إلى النظام',
            icon: '👤',
            category: 'CRM',
            action: async () => {
                await event_bus_1.eventBus.publish({
                    type: event_bus_1.EventTypes.USER_ACTION,
                    source: 'copilot-bar',
                    data: { action: 'create-lead' }
                });
                // فتح نموذج إنشاء عميل محتمل
                window.location.href = '/crm/leads/new';
            }
        },
        {
            id: 'view-pipeline',
            title: 'عرض خط أنابيب المبيعات',
            description: 'عرض جميع الفرص في مراحل مختلفة',
            icon: '📊',
            category: 'CRM',
            action: async () => {
                await event_bus_1.eventBus.publish({
                    type: event_bus_1.EventTypes.USER_ACTION,
                    source: 'copilot-bar',
                    data: { action: 'view-pipeline' }
                });
                window.location.href = '/crm/pipeline';
            }
        },
        {
            id: 'daily-summary',
            title: 'الملخص اليومي',
            description: 'عرض ملخص أنشطة اليوم والمهام المعلقة',
            icon: '📋',
            category: 'تقارير',
            action: async () => {
                await event_bus_1.eventBus.publish({
                    type: event_bus_1.EventTypes.AI_ANALYSIS_COMPLETE,
                    source: 'copilot-bar',
                    data: { type: 'daily-summary' }
                });
                // عرض الملخص اليومي
                alert('جاري إنشاء الملخص اليومي...');
            }
        },
        {
            id: 'send-whatsapp',
            title: 'إرسال رسالة WhatsApp',
            description: 'إرسال رسالة سريعة عبر WhatsApp',
            icon: '💬',
            category: 'تواصل',
            action: async () => {
                await event_bus_1.eventBus.publish({
                    type: event_bus_1.EventTypes.WHATSAPP_MESSAGE_SENT,
                    source: 'copilot-bar',
                    data: { action: 'compose-message' }
                });
                // فتح نافذة إرسال رسالة
                alert('فتح نافذة إرسال رسالة WhatsApp...');
            }
        },
        {
            id: 'ai-insights',
            title: 'رؤى الذكاء الاصطناعي',
            description: 'الحصول على رؤى ذكية حول الأداء',
            icon: '🧠',
            category: 'AI',
            action: async () => {
                await event_bus_1.eventBus.publish({
                    type: event_bus_1.EventTypes.AI_RECOMMENDATION,
                    source: 'copilot-bar',
                    data: { type: 'performance-insights' }
                });
                window.location.href = '/ai/insights';
            }
        },
        {
            id: 'schedule-meeting',
            title: 'جدولة اجتماع',
            description: 'جدولة اجتماع جديد مع العملاء',
            icon: '📅',
            category: 'مواعيد',
            action: async () => {
                await event_bus_1.eventBus.publish({
                    type: event_bus_1.EventTypes.USER_ACTION,
                    source: 'copilot-bar',
                    data: { action: 'schedule-meeting' }
                });
                alert('فتح تقويم الاجتماعات...');
            }
        }
    ];
    // تصفية الأوامر بناءً على الاستعلام
    (0, react_1.useEffect)(() => {
        if (!query.trim()) {
            setFilteredCommands(commands);
        }
        else {
            const filtered = commands.filter(cmd => cmd.title.toLowerCase().includes(query.toLowerCase()) ||
                cmd.description.toLowerCase().includes(query.toLowerCase()) ||
                cmd.category.toLowerCase().includes(query.toLowerCase()));
            setFilteredCommands(filtered);
        }
        setSelectedIndex(0);
    }, [query]);
    // التركيز على الإدخال عند الفتح
    (0, react_1.useEffect)(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);
    // معالجة اختصارات لوحة المفاتيح
    const handleKeyDown = async (e) => {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev => prev < filteredCommands.length - 1 ? prev + 1 : 0);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : filteredCommands.length - 1);
                break;
            case 'Enter':
                e.preventDefault();
                if (filteredCommands[selectedIndex] && !isExecuting) {
                    await executeCommand(filteredCommands[selectedIndex]);
                }
                break;
            case 'Escape':
                onClose();
                break;
        }
    };
    // تنفيذ الأمر
    const executeCommand = async (command) => {
        setIsExecuting(true);
        try {
            await command.action();
            // صوت تأكيد (سيتم إضافته في TASK-014)
            playSuccessSound();
            onClose();
        }
        catch (error) {
            console.error('❌ Failed to execute command:', error);
            // صوت خطأ
            playErrorSound();
        }
        finally {
            setIsExecuting(false);
        }
    };
    // أصوات مؤقتة (سيتم تحسينها في TASK-014)
    const playSuccessSound = () => {
        // مؤقت - سيتم استبداله بأصوات حقيقية
        console.log('🔊 Success sound');
    };
    const playErrorSound = () => {
        // مؤقت - سيتم استبداله بأصوات حقيقية
        console.log('🔊 Error sound');
    };
    if (!isOpen)
        return null;
    return (<framer_motion_1.AnimatePresence>
      <framer_motion_1.motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-start justify-center pt-32" onClick={onClose}>
        <framer_motion_1.motion.div initial={{ opacity: 0, scale: 0.95, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -20 }} transition={{ type: "spring", duration: 0.3 }} className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden" onClick={e => e.stopPropagation()}>
          {/* شريط البحث */}
          <div className="p-6 border-b border-gray-100">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-2xl">🎯</span>
              </div>
              <input ref={inputRef} type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown} placeholder="ابحث عن أمر أو اكتب ما تريد فعله..." className="w-full pl-12 pr-4 py-4 text-lg border-0 focus:outline-none focus:ring-0 bg-transparent" disabled={isExecuting}/>
            </div>
          </div>

          {/* قائمة الأوامر */}
          <div className="max-h-96 overflow-y-auto">
            {filteredCommands.length === 0 ? (<div className="p-8 text-center text-gray-500">
                <span className="text-4xl mb-4 block">🔍</span>
                <p>لم يتم العثور على أوامر مطابقة</p>
              </div>) : (filteredCommands.map((command, index) => (<framer_motion_1.motion.div key={command.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} className={`p-4 cursor-pointer transition-all duration-150 ${index === selectedIndex
                ? 'bg-blue-50 border-r-4 border-blue-500'
                : 'hover:bg-gray-50'} ${isExecuting ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => !isExecuting && executeCommand(command)}>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <span className="text-2xl">{command.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">
                          {command.title}
                        </h3>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                          {command.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {command.description}
                      </p>
                    </div>
                  </div>
                </framer_motion_1.motion.div>)))}
          </div>

          {/* شريط المساعدة */}
          <div className="p-4 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <span>↑↓ للتنقل</span>
                <span>Enter للتنفيذ</span>
                <span>Esc للإغلاق</span>
              </div>
              {isExecuting && (<div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                  <span>جاري التنفيذ...</span>
                </div>)}
            </div>
          </div>
        </framer_motion_1.motion.div>
      </framer_motion_1.motion.div>
    </framer_motion_1.AnimatePresence>);
};
exports.CoPilotBar = CoPilotBar;
// Hook لاستخدام Co-pilot Bar
const useCoPilotBar = () => {
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                setIsOpen(true);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);
    return {
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false)
    };
};
exports.useCoPilotBar = useCoPilotBar;
//# sourceMappingURL=CoPilotBar.js.map