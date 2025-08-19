'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemStatus = SystemStatus;
const react_1 = require("react");
const framer_motion_1 = require("framer-motion");
const lucide_react_1 = require("lucide-react");
function SystemStatus() {
    const [metrics, setMetrics] = (0, react_1.useState)({
        servers: {
            api: { status: 'online', responseTime: 0, load: 0 },
            database: { status: 'online', connections: 0, queries: 0 },
            websocket: { status: 'online', connections: 0, messages: 0 }
        },
        resources: { cpu: 0, memory: 0, disk: 0, network: 0 }
    });
    (0, react_1.useEffect)(() => {
        const generateMetrics = () => ({
            servers: {
                api: {
                    status: Math.random() > 0.1 ? 'online' : 'warning',
                    responseTime: Math.random() * 200 + 50,
                    load: Math.random() * 80 + 10
                },
                database: {
                    status: Math.random() > 0.05 ? 'online' : 'warning',
                    connections: Math.floor(Math.random() * 100) + 20,
                    queries: Math.floor(Math.random() * 1000) + 500
                },
                websocket: {
                    status: Math.random() > 0.08 ? 'online' : 'warning',
                    connections: Math.floor(Math.random() * 50) + 10,
                    messages: Math.floor(Math.random() * 500) + 100
                }
            },
            resources: {
                cpu: Math.random() * 80 + 10,
                memory: Math.random() * 70 + 20,
                disk: Math.random() * 60 + 30,
                network: Math.random() * 90 + 5
            }
        });
        setMetrics(generateMetrics());
        const interval = setInterval(() => setMetrics(generateMetrics()), 3000);
        return () => clearInterval(interval);
    }, []);
    const getStatusColor = (status) => {
        switch (status) {
            case 'online': return 'text-green-600 bg-green-100';
            case 'warning': return 'text-yellow-600 bg-yellow-100';
            case 'offline': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };
    return (<div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <lucide_react_1.Activity className="w-6 h-6 text-blue-600"/>
          <h3 className="text-lg font-semibold text-gray-900">حالة النظام المباشرة</h3>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <framer_motion_1.motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <lucide_react_1.Server className="w-5 h-5 text-blue-600"/>
                <span className="font-medium">API Server</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metrics.servers.api.status)}`}>
                متصل
              </span>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div>زمن الاستجابة: {metrics.servers.api.responseTime.toFixed(0)}ms</div>
              <div>الحمولة: {metrics.servers.api.load.toFixed(1)}%</div>
            </div>
          </framer_motion_1.motion.div>

          <framer_motion_1.motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <lucide_react_1.Database className="w-5 h-5 text-green-600"/>
                <span className="font-medium">قاعدة البيانات</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metrics.servers.database.status)}`}>
                متصل
              </span>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div>الاتصالات: {metrics.servers.database.connections}</div>
              <div>الاستعلامات: {metrics.servers.database.queries}/ث</div>
            </div>
          </framer_motion_1.motion.div>

          <framer_motion_1.motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <lucide_react_1.Wifi className="w-5 h-5 text-purple-600"/>
                <span className="font-medium">WebSocket</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metrics.servers.websocket.status)}`}>
                متصل
              </span>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div>الاتصالات: {metrics.servers.websocket.connections}</div>
              <div>الرسائل: {metrics.servers.websocket.messages}/ث</div>
            </div>
          </framer_motion_1.motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'المعالج', value: metrics.resources.cpu, icon: lucide_react_1.Cpu },
            { label: 'الذاكرة', value: metrics.resources.memory, icon: lucide_react_1.HardDrive },
            { label: 'القرص', value: metrics.resources.disk, icon: lucide_react_1.HardDrive },
            { label: 'الشبكة', value: metrics.resources.network, icon: lucide_react_1.Wifi }
        ].map((resource, index) => (<framer_motion_1.motion.div key={resource.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="text-center">
              <resource.icon className="w-6 h-6 mx-auto mb-2 text-gray-600"/>
              <div className="text-lg font-semibold text-gray-900">
                {resource.value.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600 mb-2">{resource.label}</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <framer_motion_1.motion.div initial={{ width: 0 }} animate={{ width: `${resource.value}%` }} transition={{ duration: 1, delay: index * 0.1 }} className="h-2 rounded-full bg-blue-500"/>
              </div>
            </framer_motion_1.motion.div>))}
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=SystemStatus.js.map