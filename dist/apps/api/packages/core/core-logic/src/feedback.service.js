"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let FeedbackService = class FeedbackService {
    async submitFeedback(feedback) {
        // Logic to store feedback in the database
        console.log('Feedback submitted:', feedback);
        return { success: true };
    }
};
exports.FeedbackService = FeedbackService;
exports.FeedbackService = FeedbackService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], FeedbackService);
//# sourceMappingURL=feedback.service.js.map