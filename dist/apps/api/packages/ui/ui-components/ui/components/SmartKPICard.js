"use strict";
/**
 * 📊 Smart KPI Cards - TASK-005
 * بطاقات المؤشرات الذكية مع Gemini AI
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartKPIGrid = exports.SmartKPICard = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const framer_motion_1 = require("framer-motion");
const animations_1 = require("../animations");
const event_bus_1 = require("../../../../packages/core-logic/src/event-bus");
const SmartKPICard = ({ data, onClick }) => {
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [currentValue, setCurrentValue] = (0, react_1.useState)(data.value);
    // حساب النسبة المئوية للتغيير
    const changePercent = data.previousValue > 0
        ? ((currentValue - data.previousValue) / data.previousValue) * 100
        : 0;
    // تحديث القيمة عند تغيير البيانات
    (0, react_1.useEffect)(() => {
        setCurrentValue(data.value);
    }, [data.value]);
    // الاستماع للتحديثات الفورية
    (0, react_1.useEffect)(() => {
        const handleKPIUpdate = (event) => {
            if (event.kpiId === data.id) {
                setCurrentValue(event.newValue);
            }
        };
        event_bus_1.eventBus.subscribe('kpi.updated', handleKPIUpdate);
        return () => event_bus_1.eventBus.unsubscribe('kpi.updated', handleKPIUpdate);
    }, [data.id]);
    // تحديث البيانات من Gemini AI
    const refreshInsight = async () => {
        setIsLoading(true);
        try {
            await event_bus_1.eventBus.publish({
                type: event_bus_1.EventTypes.AI_RECOMMENDATION,
                source: 'smart-kpi-card',
                data: { kpiId: data.id, action: 'refresh-insight' }
            });
        }
        finally {
            setIsLoading(false);
        }
    };
    const getTrendIcon = () => {
        switch (data.trend) {
            case 'up': return '📈';
            case 'down': return '📉';
            default: return '➡️';
        }
    };
    const getTrendColor = () => {
        switch (data.trend) {
            case 'up': return 'text-green-600';
            case 'down': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };
    return (<framer_motion_1.motion.div variants={animations_1.cardVariants} initial="hidden" animate="visible" whileHover="hover" whileTap="tap" className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer border-l-4 ${data.color}`} onClick={onClick}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="text-2xl">{data.icon}</span>
          <h3 className="font-semibold text-gray-800 text-sm">{data.title}</h3>
        </div>
        <button onClick={(e) => {
            e.stopPropagation();
            refreshInsight();
        }} disabled={isLoading} className="text-gray-400 hover:text-gray-600 transition-colors">
          {isLoading ? (<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>) : ('🔄')}
        </button>
      </div>

      {/* Value */}
      <div className="mb-4">
        <div className="flex items-baseline space-x-2 rtl:space-x-reverse">
          <framer_motion_1.motion.span className="text-3xl font-bold text-gray-900" key={currentValue} initial={{ scale: 1.2, color: data.color.replace('border-', 'text-') }} animate={{ scale: 1, color: '#111827' }} transition={{ duration: 0.3 }}>
            {currentValue.toLocaleString('ar-SA')}
          </framer_motion_1.motion.span>
          <span className="text-sm text-gray-500">{data.unit}</span>
        </div>

        {/* Trend */}
        <div className={`flex items-center space-x-1 rtl:space-x-reverse mt-2 ${getTrendColor()}`}>
          <span className="text-sm">{getTrendIcon()}</span>
          <span className="text-sm font-medium">
            {changePercent > 0 ? '+' : ''}{changePercent.toFixed(1)}%
          </span>
          <span className="text-xs text-gray-500">من الفترة السابقة</span>
        </div>
      </div>

      {/* AI Insight */}
      <div className="bg-gray-50 rounded-lg p-3">
        <div className="flex items-start space-x-2 rtl:space-x-reverse">
          <span className="text-sm">🧠</span>
          <p className="text-xs text-gray-700 leading-relaxed">
            {data.aiInsight}
          </p>
        </div>
      </div>
    </framer_motion_1.motion.div>);
};
exports.SmartKPICard = SmartKPICard;
// مجموعة بطاقات KPI
const SmartKPIGrid = () => {
    const [kpiData, setKpiData] = (0, react_1.useState)([
        {
            id: 'revenue',
            title: 'الإيرادات المتوقعة',
            value: 1200000,
            previousValue: 1040000,
            unit: 'ريال',
            icon: '💰',
            trend: 'up',
            aiInsight: 'أعلى بنسبة 15% من توقعات الأسبوع الماضي، مدفوعًا بتقدم صفقة شركة النور.',
            color: 'border-green-500'
        },
        {
            id: 'pipeline-velocity',
            title: 'سرعة خط الأنابيب',
            value: 25,
            previousValue: 22,
            unit: 'يوم',
            icon: '⚡',
            trend: 'down',
            aiInsight: 'أبطأ بـ 3 أيام عن الشهر الماضي. السبب الرئيسي: تأخير في مرحلة المفاوضة.',
            color: 'border-yellow-500'
        },
        {
            id: 'win-rate',
            title: 'معدل الفوز',
            value: 28,
            previousValue: 25,
            unit: '%',
            icon: '🎯',
            trend: 'up',
            aiInsight: 'فرصة للتحسين: معدل الفوز للصفقات من LinkedIn هو 45%. نقترح زيادة التركيز على هذه القناة.',
            color: 'border-blue-500'
        },
        {
            id: 'active-leads',
            title: 'العملاء المحتملون النشطون',
            value: 156,
            previousValue: 142,
            unit: 'عميل',
            icon: '👥',
            trend: 'up',
            aiInsight: 'زيادة 10% في العملاء الجدد هذا الأسبوع. 80% منهم من الحملات الرقمية.',
            color: 'border-purple-500'
        }
    ]);
    // تحديث البيانات كل 30 ثانية
    (0, react_1.useEffect)(() => {
        const interval = setInterval(async () => {
            // محاكاة تحديث البيانات
            setKpiData(prev => prev.map(kpi => ({
                ...kpi,
                value: kpi.value + Math.floor(Math.random() * 10) - 5
            })));
        }, 30000);
        return () => clearInterval(interval);
    }, []);
    return (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map((kpi, index) => (<framer_motion_1.motion.div key={kpi.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
          <exports.SmartKPICard data={kpi} onClick={() => {
                event_bus_1.eventBus.publish({
                    type: event_bus_1.EventTypes.USER_ACTION,
                    source: 'smart-kpi-card',
                    data: { action: 'kpi-clicked', kpiId: kpi.id }
                });
            }}/>
        </framer_motion_1.motion.div>))}
    </div>);
};
exports.SmartKPIGrid = SmartKPIGrid;
//# sourceMappingURL=SmartKPICard.js.map