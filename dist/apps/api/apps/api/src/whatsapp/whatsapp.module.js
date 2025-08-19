"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const whatsapp_controller_1 = require("./whatsapp.controller");
const whatsapp_service_1 = require("./whatsapp.service");
let WhatsAppModule = class WhatsAppModule {
};
exports.WhatsAppModule = WhatsAppModule;
exports.WhatsAppModule = WhatsAppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [whatsapp_controller_1.WhatsAppController],
        providers: [whatsapp_service_1.WhatsAppService],
        exports: [whatsapp_service_1.WhatsAppService]
    })
], WhatsAppModule);
//# sourceMappingURL=whatsapp.module.js.map