'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartBreadcrumb = SmartBreadcrumb;
const lucide_react_1 = require("lucide-react");
const framer_motion_1 = require("framer-motion");
function SmartBreadcrumb({ items, className = '' }) {
    return (<nav className={`flex items-center space-x-2 text-sm ${className}`}>
      <framer_motion_1.motion.a href="/" className="flex items-center text-gray-500 hover:text-gray-700 transition-colors" whileHover={{ scale: 1.05 }}>
        <lucide_react_1.Home className="w-4 h-4"/>
      </framer_motion_1.motion.a>
      
      {items.map((item, index) => (<div key={index} className="flex items-center space-x-2">
          <lucide_react_1.ChevronRight className="w-4 h-4 text-gray-400"/>
          <framer_motion_1.motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
            {item.href ? (<a href={item.href} className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors">
                {item.icon}
                <span>{item.label}</span>
              </a>) : (<span className="flex items-center space-x-1 text-gray-900 font-medium">
                {item.icon}
                <span>{item.label}</span>
              </span>)}
          </framer_motion_1.motion.div>
        </div>))}
    </nav>);
}
//# sourceMappingURL=SmartBreadcrumb.js.map