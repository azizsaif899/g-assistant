'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KanbanBoard = KanbanBoard;
const react_1 = require("react");
const core_1 = require("@dnd-kit/core");
const KanbanColumn_1 = require("./KanbanColumn");
const DealCard_1 = require("./DealCard");
const stages = [
    { id: 'new', title: 'جديد', color: 'bg-gray-100' },
    { id: 'qualified', title: 'مؤهل', color: 'bg-blue-100' },
    { id: 'proposal', title: 'عرض سعر', color: 'bg-yellow-100' },
    { id: 'negotiation', title: 'تفاوض', color: 'bg-orange-100' },
    { id: 'won', title: 'مكتمل', color: 'bg-green-100' },
    { id: 'lost', title: 'مفقود', color: 'bg-red-100' }
];
const mockDeals = [
    {
        id: '1',
        title: 'شركة النور للتقنية',
        value: 150000,
        stage: 'qualified',
        customer: 'أحمد محمد',
        heatLevel: 'hot',
        lastActivity: '2024-01-10',
        nextAction: 'إرسال عرض سعر مفصل'
    },
    {
        id: '2',
        title: 'مؤسسة الأمل التجارية',
        value: 85000,
        stage: 'proposal',
        customer: 'سارة أحمد',
        heatLevel: 'warm',
        lastActivity: '2024-01-09',
        nextAction: 'متابعة رد العميل'
    },
    {
        id: '3',
        title: 'شركة المستقبل الرقمي',
        value: 220000,
        stage: 'negotiation',
        customer: 'خالد عبدالله',
        heatLevel: 'cold',
        lastActivity: '2024-01-05',
        nextAction: 'جدولة اجتماع عاجل'
    }
];
function KanbanBoard() {
    const [deals, setDeals] = (0, react_1.useState)(mockDeals);
    const [activeId, setActiveId] = (0, react_1.useState)(null);
    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over)
            return;
        const dealId = active.id;
        const newStage = over.id;
        setDeals(prev => prev.map(deal => deal.id === dealId
            ? { ...deal, stage: newStage }
            : deal));
        setActiveId(null);
    };
    const getDealsByStage = (stageId) => {
        return deals.filter(deal => deal.stage === stageId);
    };
    const activeDeal = deals.find(deal => deal.id === activeId);
    return (<div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">خط أنابيب المبيعات</h2>
        <p className="text-gray-600">إدارة ذكية للصفقات والفرص</p>
      </div>

      <core_1.DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {stages.map(stage => (<KanbanColumn_1.KanbanColumn key={stage.id} stage={stage} deals={getDealsByStage(stage.id)}/>))}
        </div>

        <core_1.DragOverlay>
          {activeDeal && <DealCard_1.DealCard deal={activeDeal} isDragging/>}
        </core_1.DragOverlay>
      </core_1.DndContext>
    </div>);
}
//# sourceMappingURL=KanbanBoard.js.map