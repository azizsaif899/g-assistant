"use strict";
/**
 * Odoo CRM Widget for Admin Dashboard
 * ويدجت CRM في لوحة الإدارة
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OdooCRMWidget = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const OdooCRMWidget = () => {
    const [stats, setStats] = (0, react_1.useState)({
        totalLeads: 0,
        totalCustomers: 0,
        conversionRate: 0,
        todayLeads: 0
    });
    (0, react_1.useEffect)(() => {
        fetchCRMStats();
    }, []);
    const fetchCRMStats = async () => {
        try {
            // استدعاء API للحصول على إحصائيات CRM
            const response = await fetch('/api/crm/stats');
            const data = await response.json();
            setStats(data);
        }
        catch (error) {
            console.error('خطأ في جلب إحصائيات CRM:', error);
        }
    };
    return (<div className="crm-widget">
      <h3>📊 إحصائيات CRM</h3>
      
      <div className="crm-stats-grid">
        <div className="stat-card">
          <h4>👥 العملاء المحتملين</h4>
          <p className="stat-value">{stats.totalLeads}</p>
        </div>
        
        <div className="stat-card">
          <h4>✅ العملاء الفعليين</h4>
          <p className="stat-value">{stats.totalCustomers}</p>
        </div>
        
        <div className="stat-card">
          <h4>📈 معدل التحويل</h4>
          <p className="stat-value">{stats.conversionRate}%</p>
        </div>
        
        <div className="stat-card">
          <h4>🆕 عملاء اليوم</h4>
          <p className="stat-value">{stats.todayLeads}</p>
        </div>
      </div>

      <div className="crm-actions">
        <button onClick={() => window.open('http://localhost:8070', '_blank')} className="btn-primary">
          🔗 فتح Odoo CRM
        </button>
        
        <button onClick={fetchCRMStats} className="btn-secondary">
          🔄 تحديث الإحصائيات
        </button>
      </div>
    </div>);
};
exports.OdooCRMWidget = OdooCRMWidget;
//# sourceMappingURL=OdooCRMWidget.js.map