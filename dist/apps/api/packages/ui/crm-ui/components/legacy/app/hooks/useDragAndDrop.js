'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDragAndDrop = useDragAndDrop;
const react_1 = require("react");
function useDragAndDrop({ deals, onDealMove, onSmartSuggestion }) {
    const [activeId, setActiveId] = (0, react_1.useState)(null);
    const [draggedDeal, setDraggedDeal] = (0, react_1.useState)(null);
    const handleDragStart = (0, react_1.useCallback)((event) => {
        const dealId = event.active.id;
        const deal = deals.find(d => d.id === dealId);
        setActiveId(dealId);
        setDraggedDeal(deal || null);
    }, [deals]);
    const handleDragEnd = (0, react_1.useCallback)((event) => {
        const { active, over } = event;
        if (!over || !draggedDeal) {
            setActiveId(null);
            setDraggedDeal(null);
            return;
        }
        const dealId = active.id;
        const newStage = over.id;
        const oldStage = draggedDeal.stage;
        if (oldStage !== newStage) {
            onDealMove(dealId, newStage);
            // Trigger smart suggestions
            if (onSmartSuggestion) {
                onSmartSuggestion(dealId, oldStage, newStage);
            }
        }
        setActiveId(null);
        setDraggedDeal(null);
    }, [draggedDeal, onDealMove, onSmartSuggestion]);
    const getSmartDropSuggestion = (0, react_1.useCallback)((dealId, targetStage) => {
        const deal = deals.find(d => d.id === dealId);
        if (!deal)
            return null;
        const suggestions = {
            'qualified': 'هل تريد إنشاء عرض سعر تلقائي بناءً على المنتجات المناقشة؟',
            'proposal': 'هل تريد إرسال تذكير للعميل بمراجعة العرض؟',
            'negotiation': 'هل تريد جدولة مكالمة للمفاوضة النهائية؟',
            'won': 'تهانينا! هل تريد إرسال رسالة شكر وبدء عملية التسليم؟',
            'lost': 'هل تريد إرسال استبيان لمعرفة أسباب عدم إتمام الصفقة؟'
        };
        return suggestions[targetStage] || null;
    }, [deals]);
    return {
        activeId,
        draggedDeal,
        handleDragStart,
        handleDragEnd,
        getSmartDropSuggestion
    };
}
//# sourceMappingURL=useDragAndDrop.js.map