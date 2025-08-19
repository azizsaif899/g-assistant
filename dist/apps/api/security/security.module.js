"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const security_controller_1 = require("./security.controller");
const security_service_1 = require("./security.service");
let SecurityModule = class SecurityModule {
};
exports.SecurityModule = SecurityModule;
exports.SecurityModule = SecurityModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [security_controller_1.SecurityController],
        providers: [security_service_1.SecurityService],
        exports: [security_service_1.SecurityService]
    })
], SecurityModule);
//# sourceMappingURL=security.module.js.map