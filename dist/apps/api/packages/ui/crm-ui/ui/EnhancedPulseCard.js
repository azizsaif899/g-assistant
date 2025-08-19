"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnhancedPulseCard = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const PulseCard_1 = require("./PulseCard");
const LiveSimulator_1 = require("./LiveSimulator");
const EnhancedPulseCard = ({ id, type, title, description, action, priority, baseMetrics, onActionClick, onSimulate }) => {
    const [showSimulator, setShowSimulator] = (0, react_1.useState)(false);
    const [isExecuting, setIsExecuting] = (0, react_1.useState)(false);
    const handleActionClick = async () => {
        setIsExecuting(true);
        try {
            // تنفيذ الإجراء في Odoo
            const response = await fetch('/api/pulse/execute-action', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cardId: id, action })
            });
            if (response.ok) {
                const result = await response.json();
                alert(`تم تنفيذ الإجراء: ${result.message}`);
                if (onActionClick)
                    onActionClick();
            }
        }
        catch (error) {
            console.error('Error executing action:', error);
            alert('حدث خطأ في تنفيذ الإجراء');
        }
        finally {
            setIsExecuting(false);
        }
    };
    return (<div className="enhanced-pulse-card">
      <PulseCard_1.PulseCard type={type} title={title} description={description} action={isExecuting ? 'جاري التنفيذ...' : action} priority={priority} onActionClick={handleActionClick}/>
      
      {/* أزرار إضافية */}
      <div style={{
            marginTop: '12px',
            display: 'flex',
            gap: '8px',
            justifyContent: 'space-between'
        }}>
        <button onClick={() => setShowSimulator(!showSimulator)} style={{
            padding: '6px 12px',
            background: '#f0f8ff',
            border: '1px solid #2196F3',
            borderRadius: '6px',
            fontSize: '12px',
            color: '#2196F3',
            cursor: 'pointer'
        }}>
          {showSimulator ? '🔼 إخفاء المحاكي' : '🔽 عرض المحاكي'}
        </button>

        <button onClick={() => {
            // فتح تفاصيل أكثر
            window.open(`/crm/pulse/${id}`, '_blank');
        }} style={{
            padding: '6px 12px',
            background: '#f5f5f5',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '12px',
            color: '#666',
            cursor: 'pointer'
        }}>
          📊 تفاصيل أكثر
        </button>
      </div>

      {/* المحاكي المدمج */}
      {showSimulator && (<LiveSimulator_1.LiveSimulator cardId={id} title={`محاكاة تأثير: ${title}`} description="اختبر تأثير تطبيق هذا الإجراء على مقاييس الأداء" baseMetrics={baseMetrics} onSimulate={onSimulate}/>)}
    </div>);
};
exports.EnhancedPulseCard = EnhancedPulseCard;
//# sourceMappingURL=EnhancedPulseCard.js.map