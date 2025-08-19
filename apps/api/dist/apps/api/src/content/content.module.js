"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const content_controller_1 = require("./content.controller");
const content_service_1 = require("./content.service");
let ContentModule = class ContentModule {
};
exports.ContentModule = ContentModule;
exports.ContentModule = ContentModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [content_controller_1.ContentController],
        providers: [content_service_1.ContentService],
        exports: [content_service_1.ContentService],
    })
], ContentModule);
//# sourceMappingURL=content.module.js.map