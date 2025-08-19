"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataExportService = void 0;
class DataExportService {
    constructor() {
        this.apiUrl = 'http://localhost:3333';
    }
    async exportUsers(format) {
        const response = await fetch(`${this.apiUrl}/api/admin/export/users?format=${format}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
        });
        return await response.json();
    }
    async exportConversations(format) {
        const response = await fetch(`${this.apiUrl}/api/admin/export/conversations?format=${format}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
        });
        return await response.json();
    }
    async importData(file, type) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', type);
        const response = await fetch(`${this.apiUrl}/api/admin/import`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` },
            body: formData
        });
        return await response.json();
    }
}
exports.DataExportService = DataExportService;
//# sourceMappingURL=data-export.service.js.map