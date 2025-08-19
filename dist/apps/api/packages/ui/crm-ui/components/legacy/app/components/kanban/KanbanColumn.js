'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KanbanColumn = KanbanColumn;
const core_1 = require("@dnd-kit/core");
const DealCard_1 = require("./DealCard");
function KanbanColumn({ stage, deals }) {
    const { setNodeRef, isOver } = (0, core_1.useDroppable)({
        id: stage.id,
    });
    const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);
    return (<div className="flex-shrink-0 w-80">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className={`p-4 rounded-t-lg ${stage.color}`}>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">{stage.title}</h3>
            <span className="bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-700">
              {deals.length}
            </span>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            {totalValue.toLocaleString('ar-SA')} ريال
          </div>
        </div>

        <div ref={setNodeRef} className={`p-4 min-h-96 space-y-3 transition-colors ${isOver ? 'bg-blue-50' : ''}`}>
          {deals.map(deal => (<DealCard_1.DealCard key={deal.id} deal={deal}/>))}
          
          {deals.length === 0 && (<div className="text-center py-8 text-gray-400">
              <div className="text-4xl mb-2">📋</div>
              <p>لا توجد صفقات في هذه المرحلة</p>
            </div>)}
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=KanbanColumn.js.map