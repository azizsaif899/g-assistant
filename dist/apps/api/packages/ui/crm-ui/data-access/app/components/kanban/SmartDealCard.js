'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartDealCard = SmartDealCard;
const react_1 = require("react");
const framer_motion_1 = require("framer-motion");
const DealCard_1 = require("./DealCard");
const NextActionSuggestion_1 = require("./NextActionSuggestion");
const useAISuggestions_1 = require("../../hooks/useAISuggestions");
function SmartDealCard({ deal, isDragging = false }) {
    const [showSuggestions, setShowSuggestions] = (0, react_1.useState)(false);
    const { suggestions, isLoading } = (0, useAISuggestions_1.useAISuggestions)(deal.id);
    const handleCardHover = () => {
        if (!isDragging) {
            setShowSuggestions(true);
        }
    };
    const handleCardLeave = () => {
        setShowSuggestions(false);
    };
    return (<div className="relative" onMouseEnter={handleCardHover} onMouseLeave={handleCardLeave}>
      <DealCard_1.DealCard deal={deal} isDragging={isDragging}/>
      
      <framer_motion_1.AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (<framer_motion_1.motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute top-full left-0 right-0 z-50 mt-2">
            <div className="bg-white rounded-lg shadow-lg border p-4 max-w-sm">
              <h5 className="font-semibold text-gray-900 mb-2 text-sm">
                💡 اقتراحات ذكية
              </h5>
              <div className="space-y-2">
                {suggestions.slice(0, 2).map(suggestion => (<NextActionSuggestion_1.NextActionSuggestion key={suggestion.id} suggestion={suggestion} compact/>))}
              </div>
            </div>
          </framer_motion_1.motion.div>)}
      </framer_motion_1.AnimatePresence>
    </div>);
}
//# sourceMappingURL=SmartDealCard.js.map