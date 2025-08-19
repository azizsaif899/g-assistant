"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRMDashboard = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const CRMDashboard = () => {
    const [leads, setLeads] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        loadCRMData();
    }, []);
    const loadCRMData = async () => {
        const mockLeads = [
            {
                id: 1,
                name: 'استفسار خدمات',
                partner_name: 'أحمد علي',
                email: 'ahmed@example.com',
                expected_revenue: 50000,
                probability: 75,
                stage: 'مؤهل',
                source: 'Meta'
            }
        ];
        setLeads(mockLeads);
        setLoading(false);
    };
    const syncWithMeta = async () => {
        await fetch('/api/crm/sync-meta', { method: 'POST' });
        loadCRMData();
    };
    return (<div style={{ padding: '20px' }}>
      <h2>🏢 لوحة تحكم CRM</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={syncWithMeta} style={{ marginRight: '10px' }}>
          🔄 مزامنة مع Meta
        </button>
        <button onClick={loadCRMData}>
          🔄 تحديث البيانات
        </button>
      </div>

      <div>
        <h3>العملاء المحتملين ({leads.length})</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>الاسم</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>البريد</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>المصدر</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>المرحلة</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>الإيرادات المتوقعة</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (<tr key={lead.id}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{lead.partner_name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{lead.email}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{lead.source}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{lead.stage}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>${lead.expected_revenue}</td>
              </tr>))}
          </tbody>
        </table>
      </div>
    </div>);
};
exports.CRMDashboard = CRMDashboard;
//# sourceMappingURL=CRMDashboard-v3.js.map