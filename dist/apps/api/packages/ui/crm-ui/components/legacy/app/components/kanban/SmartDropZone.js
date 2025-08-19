'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartDropZone = SmartDropZone;
const react_1 = require("react");
const core_1 = require("@dnd-kit/core");
const framer_motion_1 = require("framer-motion");
const lucide_react_1 = require("lucide-react");
function SmartDropZone({ stageId, children, onSmartAction, suggestion }) {
    const [showSuggestion, setShowSuggestion] = (0, react_1.useState)(false);
    const { setNodeRef, isOver } = (0, core_1.useDroppable)({
        id: stageId,
    });
    const handleDrop = () => {
        if (suggestion) {
            setShowSuggestion(true);
        }
    };
    const handleSuggestionAction = (action) => {
        setShowSuggestion(false);
        onSmartAction?.(action);
    };
    return (<div ref={setNodeRef} className="relative">
      <div className={`transition-all duration-200 ${isOver ? 'bg-blue-50 border-2 border-blue-300 border-dashed rounded-lg' : ''}`} onDrop={handleDrop}>
        {children}
      </div>

      <framer_motion_1.AnimatePresence>
        {showSuggestion && suggestion && (<framer_motion_1.motion.div initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }} className="absolute top-0 left-0 right-0 z-50 p-4 bg-white border-2 border-blue-300 rounded-lg shadow-lg">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm">🤖</span>
                </div>
              </div>
              
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2">
                  اقتراح ذكي
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  {suggestion}
                </p>
                
                <div className="flex space-x-3">
                  <button onClick={() => handleSuggestionAction('accept')} className="inline-flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
                    <lucide_react_1.CheckCircle className="w-4 h-4"/>
                    <span>نعم، افعل ذلك</span>
                  </button>
                  
                  <button onClick={() => handleSuggestionAction('decline')} className="inline-flex items-center space-x-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm">
                    <lucide_react_1.X className="w-4 h-4"/>
                    <span>لا، شكراً</span>
                  </button>
                </div>
              </div>
            </div>
          </framer_motion_1.motion.div>)}
      </framer_motion_1.AnimatePresence>
    </div>);
}
//# sourceMappingURL=SmartDropZone.js.map