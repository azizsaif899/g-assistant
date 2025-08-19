"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = require("path");
const url_1 = require("url");
const __filename = (0, url_1.fileURLToPath)(import.meta.url);
const __dirname = path_1.default.dirname(__filename);
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4201;
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
app.use('/', express_1.default.static(path_1.default.join(__dirname, '../../web-chatbot')));
app.use('/admin', express_1.default.static(path_1.default.join(__dirname, '../../admin-dashboard')));
app.use('/legacy', express_1.default.static(path_1.default.join(__dirname, '../../web-chatbot-legacy')));
app.get('/api/health', (req, res) => {
    res.json({
        status: 'online',
        service: 'AzizSys AI Assistant Gateway',
        version: '2.0',
        timestamp: new Date().toISOString(),
        interfaces: {
            main: 'NexusChat Pro',
            admin: 'Admin Dashboard',
            legacy: 'Legacy Chatbot'
        }
    });
});
app.listen(PORT, () => {
    console.log(`🚀 AzizSys Gateway Server running on http://localhost:${PORT}`);
    console.log(`📱 Main Interface (NexusChat Pro): http://localhost:${PORT}`);
    console.log(`⚙️  Admin Dashboard: http://localhost:${PORT}/admin`);
    console.log(`🔄 Legacy Chatbot: http://localhost:${PORT}/legacy`);
    console.log(`❤️  Health Check: http://localhost:${PORT}/api/health`);
});
exports.default = app;
//# sourceMappingURL=main.js.map