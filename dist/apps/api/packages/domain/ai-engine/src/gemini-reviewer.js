"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiReviewer = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const core_logic_1 = require("@g-assistant/core-logic");
let GeminiReviewer = class GeminiReviewer {
    constructor(configService) {
        this.configService = configService;
    }
    async reviewCode(code, requestType) {
        const config = this.configService.getGeminiReviewerConfig();
        const prompt = config.prompts[requestType] || config.prompts.default;
        // ... logic to interact with Gemini API
        return { review: 'This is a mock review.' };
    }
};
exports.GeminiReviewer = GeminiReviewer;
exports.GeminiReviewer = GeminiReviewer = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof core_logic_1.ConfigService !== "undefined" && core_logic_1.ConfigService) === "function" ? _a : Object])
], GeminiReviewer);
//# sourceMappingURL=gemini-reviewer.js.map