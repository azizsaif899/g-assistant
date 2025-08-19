"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptTemplateManager = void 0;
class PromptTemplateManager {
    constructor() {
        this.templates = new Map();
        this.initializeDefaultTemplates();
    }
    initializeDefaultTemplates() {
        const defaultTemplates = [
            {
                id: 'general-assistant',
                name: 'مساعد عام',
                category: 'general',
                template: `أنت مساعد ذكي ومفيد. أجب على السؤال التالي:

السؤال: {question}
السياق: {context}

أجب باللغة العربية بطريقة واضحة ومفيدة.`,
                variables: ['question', 'context'],
                description: 'قالب عام للإجابة على الأسئلة'
            },
            {
                id: 'technical-support',
                name: 'الدعم التقني',
                category: 'technical',
                template: `أنت خبير تقني. ساعد في حل المشكلة:

المشكلة: {problem}
النظام: {system}
التفاصيل: {details}

قدم حلاً خطوة بخطوة.`,
                variables: ['problem', 'system', 'details'],
                description: 'قالب لحل المشاكل التقنية'
            },
            {
                id: 'financial-analysis',
                name: 'التحليل المالي',
                category: 'financial',
                template: `أنت محلل مالي خبير. حلل البيانات:

البيانات: {financial_data}
الفترة: {time_period}
الهدف: {analysis_goal}

قدم تحليلاً شاملاً مع التوصيات.`,
                variables: ['financial_data', 'time_period', 'analysis_goal'],
                description: 'قالب لتحليل البيانات المالية'
            }
        ];
        defaultTemplates.forEach(template => {
            this.templates.set(template.id, template);
        });
    }
    getTemplate(id) {
        return this.templates.get(id) || null;
    }
    getAllTemplates() {
        return Array.from(this.templates.values());
    }
    renderTemplate(templateId, variables) {
        const template = this.getTemplate(templateId);
        if (!template) {
            throw new Error(`Template '${templateId}' not found`);
        }
        let rendered = template.template;
        template.variables.forEach(variable => {
            const value = variables[variable] || '';
            rendered = rendered.replace(new RegExp(`\\{${variable}\\}`, 'g'), value);
        });
        return rendered;
    }
    createGeneralQuery(question, context) {
        return this.renderTemplate('general-assistant', {
            question,
            context: context || 'لا يوجد سياق إضافي'
        });
    }
}
exports.PromptTemplateManager = PromptTemplateManager;
//# sourceMappingURL=prompt-templates.js.map