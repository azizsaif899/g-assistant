"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HomePage;
const PulseGrid_1 = require("./components/pulse/PulseGrid");
const CommandBar_1 = require("./components/ui/CommandBar");
const AdvancedCommandBar_1 = require("./components/ui/AdvancedCommandBar");
const HotkeyHelper_1 = require("./components/ui/HotkeyHelper");
const DashboardShell_1 = require("./components/layout/DashboardShell");
function HomePage() {
    return (<DashboardShell_1.DashboardShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              🚀 قمرة القيادة التفاعلية
            </h1>
            <p className="text-gray-600">
              لوحة تحكم ذكية لإدارة علاقات العملاء
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <kbd className="px-2 py-1 text-xs bg-gray-100 rounded">
              Ctrl + K
            </kbd>
            <span className="text-sm text-gray-500">للأوامر السريعة</span>
          </div>
        </div>
        
        <PulseGrid_1.PulseGrid />
      </div>
      
      <CommandBar_1.CommandBar />
      <AdvancedCommandBar_1.AdvancedCommandBar />
      <HotkeyHelper_1.HotkeyHelper />
    </DashboardShell_1.DashboardShell>);
}
//# sourceMappingURL=page.js.map