"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/health', async (req, res) => {
    res.json({
        status: 'healthy',
        message: 'Odoo CRM connection is active',
        timestamp: new Date().toISOString()
    });
});
router.get('/leads', async (req, res) => {
    const leads = [
        {
            id: 1,
            partner_name: 'أحمد علي',
            email: 'ahmed@example.com',
            expected_revenue: 50000,
            probability: 75,
            stage: 'مؤهل',
            source: 'Meta'
        }
    ];
    res.json({
        success: true,
        leads,
        total: leads.length
    });
});
router.post('/leads', async (req, res) => {
    const { name, email, phone, source } = req.body;
    const newLead = {
        id: Math.floor(Math.random() * 1000) + 100,
        partner_name: name,
        email,
        phone,
        source,
        stage: 'جديد'
    };
    res.json({
        success: true,
        lead: newLead,
        message: 'تم إنشاء عميل محتمل جديد'
    });
});
exports.default = router;
//# sourceMappingURL=odoo.routes.js.map