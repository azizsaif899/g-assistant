'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandBar = CommandBar;
const react_1 = require("react");
const framer_motion_1 = require("framer-motion");
const lucide_react_1 = require("lucide-react");
function CommandBar() {
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const [query, setQuery] = (0, react_1.useState)('');
    const commands = [
        {
            id: 'new-lead',
            title: 'إضافة عميل محتمل جديد',
            description: 'إنشاء فرصة بيع جديدة',
            action: () => console.log('New lead'),
            shortcut: 'N'
        },
        {
            id: 'view-pipeline',
            title: 'عرض خط الأنابيب',
            description: 'فتح لوحة كانبان للمبيعات',
            action: () => console.log('View pipeline'),
            shortcut: 'P'
        },
        {
            id: 'daily-report',
            title: 'التقرير اليومي',
            description: 'عرض ملخص أداء اليوم',
            action: () => console.log('Daily report'),
            shortcut: 'R'
        },
        {
            id: 'search-customer',
            title: 'البحث عن عميل',
            description: 'البحث في قاعدة بيانات العملاء',
            action: () => console.log('Search customer'),
            shortcut: 'S'
        }
    ];
    const filteredCommands = commands.filter(command => command.title.toLowerCase().includes(query.toLowerCase()) ||
        command.description.toLowerCase().includes(query.toLowerCase()));
    (0, react_1.useEffect)(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen(true);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
                setQuery('');
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);
    return (<framer_motion_1.AnimatePresence>
      {isOpen && (<>
          <framer_motion_1.motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50" onClick={() => setIsOpen(false)}/>
          
          <framer_motion_1.motion.div initial={{ opacity: 0, scale: 0.95, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -20 }} className="fixed top-1/4 left-1/2 transform -translate-x-1/2 z-50 command-bar">
            <div className="p-4">
              <div className="flex items-center space-x-3 mb-4">
                <lucide_react_1.Command className="w-5 h-5 text-gray-400"/>
                <input type="text" placeholder="ابحث عن أمر أو اكتب للبحث..." value={query} onChange={(e) => setQuery(e.target.value)} className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500" autoFocus/>
              </div>
              
              <div className="space-y-1 max-h-80 overflow-y-auto">
                {filteredCommands.map((command, index) => (<framer_motion_1.motion.div key={command.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} className="flex items-center justify-between p-3 rounded-md hover:bg-gray-100 cursor-pointer transition-colors" onClick={() => {
                    command.action();
                    setIsOpen(false);
                    setQuery('');
                }}>
                    <div>
                      <div className="font-medium text-gray-900">
                        {command.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {command.description}
                      </div>
                    </div>
                    {command.shortcut && (<kbd className="px-2 py-1 text-xs bg-gray-200 rounded">
                        {command.shortcut}
                      </kbd>)}
                  </framer_motion_1.motion.div>))}
                
                {filteredCommands.length === 0 && (<div className="p-4 text-center text-gray-500">
                    لا توجد نتائج للبحث "{query}"
                  </div>)}
              </div>
            </div>
          </framer_motion_1.motion.div>
        </>)}
    </framer_motion_1.AnimatePresence>);
}
//# sourceMappingURL=CommandBar.js.map