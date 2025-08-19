"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertSystem = void 0;
class AlertSystem {
    constructor() {
        this.rules = [];
        this.alerts = [];
    }
    addRule(rule) {
        this.rules.push(rule);
    }
    checkAlerts(metrics) {
        const newAlerts = [];
        this.rules.forEach(rule => {
            if (this.evaluateRule(rule, metrics)) {
                const alert = {
                    id: this.generateId(),
                    ruleId: rule.id,
                    severity: rule.severity,
                    message: rule.message,
                    timestamp: new Date(),
                    status: 'active',
                    data: metrics
                };
                newAlerts.push(alert);
                this.alerts.push(alert);
                this.sendAlert(alert);
            }
        });
        return newAlerts;
    }
    evaluateRule(rule, metrics) {
        const value = this.getMetricValue(metrics, rule.metric);
        switch (rule.condition) {
            case 'greater_than':
                return value > rule.threshold;
            case 'less_than':
                return value < rule.threshold;
            case 'equals':
                return value === rule.threshold;
            default:
                return false;
        }
    }
    getMetricValue(metrics, metricPath) {
        return metricPath.split('.').reduce((obj, key) => obj?.[key], metrics) || 0;
    }
    sendAlert(alert) {
        console.log(`🚨 ALERT: ${alert.message}`);
        // في التطبيق الحقيقي، سيتم إرسال التنبيه عبر email/slack/etc
    }
    generateId() {
        return `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    getActiveAlerts() {
        return this.alerts.filter(alert => alert.status === 'active');
    }
    resolveAlert(alertId) {
        const alert = this.alerts.find(a => a.id === alertId);
        if (alert) {
            alert.status = 'resolved';
            alert.resolvedAt = new Date();
        }
    }
}
exports.AlertSystem = AlertSystem;
//# sourceMappingURL=alert-system.js.map