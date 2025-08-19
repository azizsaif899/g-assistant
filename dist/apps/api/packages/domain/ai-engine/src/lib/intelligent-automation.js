"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntelligentAutomation = void 0;
class IntelligentAutomation {
    constructor() {
        this.rules = new Map();
        this.executions = [];
    }
    addRule(rule) {
        this.rules.set(rule.id, rule);
    }
    async executeRule(ruleId, context) {
        const rule = this.rules.get(ruleId);
        if (!rule || !rule.enabled) {
            throw new Error(`Rule ${ruleId} not found or disabled`);
        }
        const execution = {
            ruleId,
            triggeredAt: new Date(),
            status: 'pending'
        };
        try {
            // Check conditions
            const conditionsMet = this.evaluateConditions(rule.conditions, context);
            if (!conditionsMet) {
                execution.status = 'failed';
                execution.error = 'Conditions not met';
                return execution;
            }
            // Execute actions
            const results = [];
            for (const action of rule.actions) {
                const result = await this.executeAction(action, context);
                results.push(result);
            }
            execution.status = 'success';
            execution.result = results;
        }
        catch (error) {
            execution.status = 'failed';
            execution.error = error.message;
        }
        this.executions.push(execution);
        return execution;
    }
    evaluateConditions(conditions, context) {
        return conditions.every(condition => {
            const value = context[condition.field];
            switch (condition.operator) {
                case 'equals': return value === condition.value;
                case 'greater': return value > condition.value;
                case 'less': return value < condition.value;
                case 'contains': return String(value).includes(condition.value);
                default: return false;
            }
        });
    }
    async executeAction(action, context) {
        switch (action.type) {
            case 'notify':
                return this.sendNotification(action.config, context);
            case 'execute':
                return this.executeCommand(action.config, context);
            case 'update':
                return this.updateData(action.config, context);
            case 'create':
                return this.createResource(action.config, context);
            default:
                throw new Error(`Unknown action type: ${action.type}`);
        }
    }
    async sendNotification(config, context) {
        return { type: 'notification', message: config.message, sent: true };
    }
    async executeCommand(config, context) {
        return { type: 'command', command: config.command, executed: true };
    }
    async updateData(config, context) {
        return { type: 'update', target: config.target, updated: true };
    }
    async createResource(config, context) {
        return { type: 'create', resource: config.resource, created: true };
    }
    getExecutionHistory(ruleId) {
        let executions = this.executions;
        if (ruleId) {
            executions = executions.filter(e => e.ruleId === ruleId);
        }
        return executions.sort((a, b) => b.triggeredAt.getTime() - a.triggeredAt.getTime());
    }
}
exports.IntelligentAutomation = IntelligentAutomation;
//# sourceMappingURL=intelligent-automation.js.map