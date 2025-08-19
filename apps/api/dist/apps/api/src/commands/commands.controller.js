"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandsController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const event_bus_1 = require("../../../../packages/core-logic/src/event-bus");
let CommandsController = class CommandsController {
    constructor() {
        this.commands = [
            {
                id: 'create-lead',
                title: 'إنشاء عميل محتمل جديد',
                description: 'إضافة عميل محتمل جديد إلى النظام',
                icon: '👤',
                category: 'CRM'
            },
            {
                id: 'view-pipeline',
                title: 'عرض خط أنابيب المبيعات',
                description: 'عرض جميع الفرص في مراحل مختلفة',
                icon: '📊',
                category: 'CRM'
            },
            {
                id: 'send-whatsapp',
                title: 'إرسال رسالة WhatsApp',
                description: 'إرسال رسالة سريعة عبر WhatsApp',
                icon: '💬',
                category: 'تواصل'
            },
            {
                id: 'ai-insights',
                title: 'رؤى الذكاء الاصطناعي',
                description: 'الحصول على رؤى ذكية حول الأداء',
                icon: '🧠',
                category: 'AI'
            }
        ];
    }
    async getContextualCommands(path) {
        await event_bus_1.eventBus.publish({
            type: event_bus_1.EventTypes.USER_ACTION,
            source: 'commands-api',
            data: { action: 'get-contextual-commands', path }
        });
        return { commands: this.commands };
    }
    async executeCommand(execution) {
        try {
            const result = await this.performCommand(execution.commandId, execution.parameters);
            await event_bus_1.eventBus.publish({
                type: event_bus_1.EventTypes.USER_ACTION,
                source: 'commands-api',
                data: { action: 'command-executed', commandId: execution.commandId }
            });
            return { success: true, result };
        }
        catch (error) {
            return { success: false, result: { error: error.message } };
        }
    }
    async executeSequence(executions) {
        const results = [];
        for (const execution of executions) {
            const result = await this.performCommand(execution.commandId, execution.parameters);
            results.push(result);
        }
        return { success: true, results };
    }
    async performCommand(commandId, params) {
        switch (commandId) {
            case 'create-lead':
                return { leadId: `lead_${Date.now()}`, status: 'created' };
            case 'view-pipeline':
                return { redirect: '/crm/pipeline' };
            case 'send-whatsapp':
                return { messageId: `msg_${Date.now()}`, status: 'sent' };
            case 'ai-insights':
                return { redirect: '/ai/insights' };
            default:
                throw new Error(`Unknown command: ${commandId}`);
        }
    }
};
exports.CommandsController = CommandsController;
tslib_1.__decorate([
    (0, common_1.Get)('context'),
    tslib_1.__param(0, (0, common_1.Query)('path')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], CommandsController.prototype, "getContextualCommands", null);
tslib_1.__decorate([
    (0, common_1.Post)('execute'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommandsController.prototype, "executeCommand", null);
tslib_1.__decorate([
    (0, common_1.Post)('execute-sequence'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], CommandsController.prototype, "executeSequence", null);
exports.CommandsController = CommandsController = tslib_1.__decorate([
    (0, common_1.Controller)('api/commands')
], CommandsController);
//# sourceMappingURL=commands.controller.js.map