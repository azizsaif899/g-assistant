'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartTooltip = SmartTooltip;
const react_1 = require("react");
const framer_motion_1 = require("framer-motion");
function SmartTooltip({ content, children, position = 'top', delay = 500 }) {
    const [isVisible, setIsVisible] = (0, react_1.useState)(false);
    let timeout;
    const showTooltip = () => {
        timeout = setTimeout(() => setIsVisible(true), delay);
    };
    const hideTooltip = () => {
        clearTimeout(timeout);
        setIsVisible(false);
    };
    return (<div className="relative inline-block" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      <framer_motion_1.AnimatePresence>
        {isVisible && (<framer_motion_1.motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className={`absolute z-50 px-2 py-1 text-sm bg-gray-900 text-white rounded shadow-lg whitespace-nowrap ${position === 'top' ? 'bottom-full mb-2 left-1/2 transform -translate-x-1/2' :
                position === 'bottom' ? 'top-full mt-2 left-1/2 transform -translate-x-1/2' :
                    position === 'left' ? 'right-full mr-2 top-1/2 transform -translate-y-1/2' :
                        'left-full ml-2 top-1/2 transform -translate-y-1/2'}`}>
            {content}
          </framer_motion_1.motion.div>)}
      </framer_motion_1.AnimatePresence>
    </div>);
}
//# sourceMappingURL=SmartTooltip.js.map