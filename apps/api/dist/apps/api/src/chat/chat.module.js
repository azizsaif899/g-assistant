"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const chat_gateway_1 = require("./chat.gateway");
const core_logic_1 = require("@g-assistant-nx/core-logic");
let ChatModule = class ChatModule {
};
exports.ChatModule = ChatModule;
exports.ChatModule = ChatModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [chat_gateway_1.ChatGateway, core_logic_1.AiCoreService, core_logic_1.GeminiClient],
    })
], ChatModule);
//# sourceMappingURL=chat.module.js.map