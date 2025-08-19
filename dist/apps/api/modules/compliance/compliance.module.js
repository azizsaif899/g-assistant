"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplianceModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const compliance_controller_1 = require("./compliance.controller");
const compliance_service_1 = require("./compliance.service");
let ComplianceModule = class ComplianceModule {
};
exports.ComplianceModule = ComplianceModule;
exports.ComplianceModule = ComplianceModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [compliance_controller_1.ComplianceController],
        providers: [compliance_service_1.ComplianceService],
        exports: [compliance_service_1.ComplianceService],
    })
], ComplianceModule);
//# sourceMappingURL=compliance.module.js.map