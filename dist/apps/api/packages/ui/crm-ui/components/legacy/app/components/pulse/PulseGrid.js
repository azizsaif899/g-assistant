'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PulseGrid = PulseGrid;
const SmartKPICard_1 = require("./SmartKPICard");
const lucide_react_1 = require("lucide-react");
const useRealtimeUpdates_1 = require("../../hooks/useRealtimeUpdates");
function PulseGrid() {
    const { data: pulseData, isLoading } = (0, useRealtimeUpdates_1.useRealtimeUpdates)();
    const kpiCards = [
        {
            title: 'الإيرادات المتوقعة لهذا الربع',
            value: '1.2M ريال',
            change: 15,
            changeType: 'increase',
            insight: '📈 أعلى بنسبة 15% من توقعات الأسبوع الماضي، مدفوعًا بتقدم صفقة "شركة النور".',
            icon: <lucide_react_1.DollarSign className="w-5 h-5"/>
        },
        {
            title: 'سرعة خط الأنابيب',
            value: '25 يوم',
            change: -12,
            changeType: 'decrease',
            insight: '⚠️ أبطأ بـ 3 أيام عن الشهر الماضي. السبب الرئيسي: تأخير في مرحلة "المفاوضة".',
            icon: <lucide_react_1.Clock className="w-5 h-5"/>
        },
        {
            title: 'معدل الفوز',
            value: '28%',
            change: 8,
            changeType: 'increase',
            insight: '💡 فرصة للتحسين: معدل الفوز للصفقات القادمة من "حملات LinkedIn" هو 45%. نقترح زيادة التركيز على هذه القناة.',
            icon: <lucide_react_1.TrendingUp className="w-5 h-5"/>
        },
        {
            title: 'العملاء المحتملين الجدد',
            value: '156',
            change: 23,
            changeType: 'increase',
            insight: '🎉 نمو ممتاز! 67% من العملاء الجدد جاءوا من التسويق الرقمي. استمر في هذا الاتجاه.',
            icon: <lucide_react_1.Users className="w-5 h-5"/>
        }
    ];
    return (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiCards.map((card, index) => (<SmartKPICard_1.SmartKPICard key={index} title={card.title} value={card.value} change={card.change} changeType={card.changeType} insight={card.insight} icon={card.icon} isLoading={isLoading}/>))}
    </div>);
}
//# sourceMappingURL=PulseGrid.js.map