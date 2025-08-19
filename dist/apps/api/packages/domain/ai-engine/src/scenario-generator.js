"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScenarioGenerator = void 0;
const generative_ai_1 = require("@google/generative-ai");
const core_logic_1 = require("@azizsys/core-logic");
class ScenarioGenerator {
    constructor() {
        this.genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        this.eventBus = core_logic_1.EventBus.getInstance();
    }
    async generateScenarios(context) {
        try {
            const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
            const prompt = `
        Generate 5 strategic business scenarios for a ${context.businessType} company.
        Current metrics: ${JSON.stringify(context.currentMetrics)}
        Goals: ${context.goals.join(', ')}
        Constraints: ${context.constraints.join(', ')}
        
        Return JSON array with scenarios including probability, impact, variables, and projected outcomes.
      `;
            const result = await model.generateContent(prompt);
            const scenarios = JSON.parse(result.response.text());
            this.eventBus.emit('scenarios:generated', { scenarios, context });
            return scenarios;
        }
        catch (error) {
            this.eventBus.emit('scenarios:error', { error: error.message });
            throw error;
        }
    }
    async generateWhatIfScenario(baseScenario, changes) {
        const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
        const prompt = `
      Modify this scenario based on variable changes:
      Base scenario: ${JSON.stringify(baseScenario)}
      Changes: ${JSON.stringify(changes)}
      
      Return updated scenario with new outcomes and probability.
    `;
        const result = await model.generateContent(prompt);
        return JSON.parse(result.response.text());
    }
    async assessScenarioRisk(scenario) {
        const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
        const prompt = `
      Assess risk for this scenario:
      ${JSON.stringify(scenario)}
      
      Return risk level, factors, and mitigation strategies.
    `;
        const result = await model.generateContent(prompt);
        return JSON.parse(result.response.text());
    }
}
exports.ScenarioGenerator = ScenarioGenerator;
//# sourceMappingURL=scenario-generator.js.map