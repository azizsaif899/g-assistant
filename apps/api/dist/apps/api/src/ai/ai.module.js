"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const ai_controller_1 = require("./ai.controller");
const ai_service_1 = require("./ai.service");
let AIModule = class AIModule {
};
exports.AIModule = AIModule;
exports.AIModule = AIModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [ai_controller_1.AIController],
        providers: [ai_service_1.AIService],
        exports: [ai_service_1.AIService]
    })
], AIModule);
//# sourceMappingURL=ai.module.js.map