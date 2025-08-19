'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityFeed = ActivityFeed;
const framer_motion_1 = require("framer-motion");
const lucide_react_1 = require("lucide-react");
const activities = [
    {
        id: '1',
        type: 'deal',
        title: 'صفقة جديدة',
        description: 'تم إنشاء صفقة شركة النور',
        user: 'أحمد محمد',
        timestamp: new Date(),
        value: 150000
    },
    {
        id: '2',
        type: 'call',
        title: 'مكالمة مكتملة',
        description: 'مكالمة مع العميل سارة أحمد',
        user: 'خالد علي',
        timestamp: new Date(Date.now() - 300000)
    }
];
function ActivityFeed() {
    const getIcon = (type) => {
        switch (type) {
            case 'deal': return <lucide_react_1.DollarSign className="w-4 h-4 text-green-600"/>;
            case 'call': return <lucide_react_1.Phone className="w-4 h-4 text-blue-600"/>;
            case 'email': return <lucide_react_1.Mail className="w-4 h-4 text-purple-600"/>;
            default: return <lucide_react_1.User className="w-4 h-4 text-gray-600"/>;
        }
    };
    return (<div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold text-gray-900">النشاط المباشر</h3>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity, index) => (<framer_motion_1.motion.div key={activity.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                {getIcon(activity.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900">
                    {activity.title}
                  </h4>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <lucide_react_1.Clock className="w-3 h-3"/>
                    <span>{activity.timestamp.toLocaleTimeString('ar-SA')}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mt-1">
                  {activity.description}
                </p>
                
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">
                    بواسطة {activity.user}
                  </span>
                  {activity.value && (<span className="text-xs font-medium text-green-600">
                      {activity.value.toLocaleString('ar-SA')} ريال
                    </span>)}
                </div>
              </div>
            </framer_motion_1.motion.div>))}
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=ActivityFeed.js.map