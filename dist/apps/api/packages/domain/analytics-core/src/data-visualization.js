"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataVisualization = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let DataVisualization = class DataVisualization {
    generateChart(type, data, options = {}) {
        return {
            type,
            data: this.processDataForChart(data, type),
            options: this.getDefaultOptions(type, options)
        };
    }
    createDashboard(title, charts) {
        return {
            id: `dashboard-${Date.now()}`,
            title,
            charts,
            filters: {}
        };
    }
    processDataForChart(data, type) {
        switch (type) {
            case 'line':
                return this.processLineData(data);
            case 'bar':
                return this.processBarData(data);
            case 'pie':
                return this.processPieData(data);
            case 'heatmap':
                return this.processHeatmapData(data);
            case 'funnel':
                return this.processFunnelData(data);
            default:
                return data;
        }
    }
    processLineData(data) {
        return data.map(item => ({
            x: item.date || item.time || item.period,
            y: item.value || item.count || item.metric
        }));
    }
    processBarData(data) {
        return data.map(item => ({
            label: item.category || item.name || item.label,
            value: item.value || item.count || item.total
        }));
    }
    processPieData(data) {
        const total = data.reduce((sum, item) => sum + (item.value || item.count || 0), 0);
        return data.map(item => ({
            label: item.category || item.name || item.label,
            value: item.value || item.count || 0,
            percentage: ((item.value || item.count || 0) / total * 100).toFixed(1)
        }));
    }
    processHeatmapData(data) {
        return data.map(item => ({
            x: item.x || item.hour || item.day,
            y: item.y || item.category || item.metric,
            value: item.value || item.intensity || item.count
        }));
    }
    processFunnelData(data) {
        return data.map((item, index) => ({
            step: item.step || item.name || `Step ${index + 1}`,
            value: item.value || item.users || item.count,
            conversion: item.conversion || item.rate || 0
        }));
    }
    getDefaultOptions(type, customOptions) {
        const defaults = {
            line: {
                responsive: true,
                scales: {
                    x: { type: 'time' },
                    y: { beginAtZero: true }
                },
                plugins: {
                    legend: { display: true },
                    tooltip: { enabled: true }
                }
            },
            bar: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                },
                plugins: {
                    legend: { display: false }
                }
            },
            pie: {
                responsive: true,
                plugins: {
                    legend: { position: 'right' },
                    tooltip: {
                        callbacks: {
                            label: (context) => `${context.label}: ${context.parsed}%`
                        }
                    }
                }
            },
            heatmap: {
                responsive: true,
                scales: {
                    x: { type: 'category' },
                    y: { type: 'category' }
                }
            },
            funnel: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                }
            }
        };
        return { ...defaults[type], ...customOptions };
    }
};
exports.DataVisualization = DataVisualization;
exports.DataVisualization = DataVisualization = tslib_1.__decorate([
    (0, common_1.Injectable)()
], DataVisualization);
//# sourceMappingURL=data-visualization.js.map