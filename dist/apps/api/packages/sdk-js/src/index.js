"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GAssistantClient = void 0;
class GAssistantClient {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    async ask(question) {
        // Logic to send a question to the G-Assistant API
        console.log(`Asking question: ${question}`);
        return { answer: 'This is a mock answer.' };
    }
}
exports.GAssistantClient = GAssistantClient;
//# sourceMappingURL=index.js.map