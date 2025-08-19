"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = require("cors");
const helmet_1 = require("helmet");
const express_rate_limit_1 = require("express-rate-limit");
const odoo_routes_1 = require("./routes/odoo.routes");
const meta_routes_1 = require("./routes/meta.routes");
const webhook_routes_1 = require("./routes/webhook.routes");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:4200'],
    credentials: true
}));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP'
});
app.use('/api', limiter);
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: '2.0.0',
        services: {
            odoo: 'connected',
            meta: 'connected',
            webhooks: 'active'
        }
    });
});
app.use('/api/odoo', odoo_routes_1.default);
app.use('/api/meta', meta_routes_1.default);
app.use('/api/webhooks', webhook_routes_1.default);
app.use('/api/analytics', require('./routes/analytics.routes').default);
app.use('/api/customers', require('./routes/customer.routes').default);
app.use('/api/commands', require('./routes/commands.routes').default);
app.use('/api/pulse', require('./routes/pulse.routes').default);
app.use('/api/agents', require('./routes/agents.routes').default);
app.use((error, req, res, next) => {
    console.error('API Error:', error);
    res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Internal server error',
        timestamp: new Date().toISOString()
    });
});
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found',
        path: req.originalUrl
    });
});
app.listen(PORT, () => {
    console.log(`🚀 G-Assistant API Server running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`🔗 Odoo API: http://localhost:${PORT}/api/odoo`);
    console.log(`📱 Meta API: http://localhost:${PORT}/api/meta`);
    console.log(`🔔 Webhooks: http://localhost:${PORT}/api/webhooks`);
});
exports.default = app;
//# sourceMappingURL=main.js.map