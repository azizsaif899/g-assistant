"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartGeneratorTool = void 0;
class ChartGeneratorTool {
    constructor(sessionId) {
        this.sessionId = sessionId;
    }
    async generateChart(config) {
        console.log(`📊 Generating ${config.type} chart for session: ${this.sessionId}`);
        const chartData = {
            type: 'chart-update',
            payload: config.data,
            metadata: {
                chartType: config.type,
                title: config.title,
                timestamp: new Date().toISOString()
            }
        };
        this.broadcastChartUpdate(chartData);
    }
    async updateChart(data) {
        console.log(`🔄 Updating chart for session: ${this.sessionId}`);
        const updateData = {
            type: 'chart-update',
            payload: data,
            metadata: {
                timestamp: new Date().toISOString()
            }
        };
        this.broadcastChartUpdate(updateData);
    }
    broadcastChartUpdate(data) {
        console.log(`📡 Broadcasting chart update:`, data);
    }
    static async createFinancialChart(revenue, months) {
        return {
            type: 'bar',
            title: 'الإيرادات الشهرية',
            data: months.map((month, index) => ({
                label: month,
                value: revenue[index] || 0
            }))
        };
    }
}
exports.ChartGeneratorTool = ChartGeneratorTool;
//# sourceMappingURL=chart-generator.tool.js.map