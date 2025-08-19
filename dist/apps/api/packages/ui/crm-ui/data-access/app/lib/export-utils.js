"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportManager = void 0;
class ExportManager {
    static async exportData(data, options) {
        const { format, filename = 'export', includeHeaders = true } = options;
        switch (format) {
            case 'csv':
                await this.exportToCSV(data, filename, includeHeaders);
                break;
            case 'excel':
                await this.exportToExcel(data, filename, includeHeaders);
                break;
            case 'pdf':
                await this.exportToPDF(data, filename);
                break;
            case 'json':
                await this.exportToJSON(data, filename);
                break;
        }
    }
    static async exportToCSV(data, filename, includeHeaders) {
        if (data.length === 0)
            return;
        const headers = Object.keys(data[0]);
        let csvContent = '';
        if (includeHeaders) {
            csvContent += headers.join(',') + '\n';
        }
        data.forEach(row => {
            const values = headers.map(header => {
                const value = row[header];
                return typeof value === 'string' ? `"${value}"` : value;
            });
            csvContent += values.join(',') + '\n';
        });
        this.downloadFile(csvContent, `${filename}.csv`, 'text/csv');
    }
    static async exportToJSON(data, filename) {
        const jsonContent = JSON.stringify(data, null, 2);
        this.downloadFile(jsonContent, `${filename}.json`, 'application/json');
    }
    static async exportToExcel(data, filename, includeHeaders) {
        // محاكاة تصدير Excel - يحتاج مكتبة خارجية في التطبيق الحقيقي
        console.log('تصدير Excel:', { data, filename, includeHeaders });
    }
    static async exportToPDF(data, filename) {
        // محاكاة تصدير PDF - يحتاج مكتبة خارجية في التطبيق الحقيقي
        console.log('تصدير PDF:', { data, filename });
    }
    static downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
}
exports.ExportManager = ExportManager;
//# sourceMappingURL=export-utils.js.map