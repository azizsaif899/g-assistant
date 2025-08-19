"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let ConfigService = class ConfigService {
    constructor() {
        this.geminiReviewerConfig = {
            prompts: {
                default: 'Analyze the following code for issues.',
                update: 'Review the following code for an update request.',
                fix: 'Analyze the following code for a fix request.'
            },
            modelSettings: {
                temperature: 0.5,
                maxTokens: 1024
            }
        };
    }
    getGeminiReviewerConfig() {
        return this.geminiReviewerConfig;
    }
};
exports.ConfigService = ConfigService;
exports.ConfigService = ConfigService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], ConfigService);
//# sourceMappingURL=config.service.js.map