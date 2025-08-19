'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardShell = DashboardShell;
const react_1 = require("react");
const framer_motion_1 = require("framer-motion");
const lucide_react_1 = require("lucide-react");
function DashboardShell({ children }) {
    const [sidebarOpen, setSidebarOpen] = (0, react_1.useState)(true);
    const navigation = [
        { name: 'الرئيسية', href: '/', icon: lucide_react_1.Home, current: true },
        { name: 'العملاء', href: '/customers', icon: lucide_react_1.Users, current: false },
        { name: 'التقارير', href: '/reports', icon: lucide_react_1.BarChart3, current: false },
        { name: 'الإعدادات', href: '/settings', icon: lucide_react_1.Settings, current: false },
    ];
    return (<div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <framer_motion_1.motion.div initial={false} animate={{ width: sidebarOpen ? 256 : 80 }} className="bg-white shadow-sm border-l flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <framer_motion_1.motion.div initial={false} animate={{ opacity: sidebarOpen ? 1 : 0 }} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            {sidebarOpen && (<span className="font-semibold text-gray-900">AzizSys CRM</span>)}
          </framer_motion_1.motion.div>
          
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 rounded-md hover:bg-gray-100">
            {sidebarOpen ? (<lucide_react_1.X className="w-5 h-5 text-gray-500"/>) : (<lucide_react_1.Menu className="w-5 h-5 text-gray-500"/>)}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (<a key={item.name} href={item.href} className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${item.current
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                <Icon className="w-5 h-5"/>
                {sidebarOpen && <span>{item.name}</span>}
              </a>);
        })}
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            {sidebarOpen && (<div>
                <div className="text-sm font-medium text-gray-900">أحمد محمد</div>
                <div className="text-xs text-gray-500">مدير المبيعات</div>
              </div>)}
          </div>
        </div>
      </framer_motion_1.motion.div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <lucide_react_1.Search className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                <input type="text" placeholder="البحث السريع..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-500">
                <lucide_react_1.Bell className="w-5 h-5"/>
                <span className="absolute top-0 left-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>);
}
//# sourceMappingURL=DashboardShell.js.map