"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitoringModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const monitoring_controller_1 = require("./monitoring.controller");
const monitoring_service_1 = require("./monitoring.service");
let MonitoringModule = class MonitoringModule {
};
exports.MonitoringModule = MonitoringModule;
exports.MonitoringModule = MonitoringModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [monitoring_controller_1.MonitoringController],
        providers: [monitoring_service_1.MonitoringService],
        exports: [monitoring_service_1.MonitoringService]
    })
], MonitoringModule);
//# sourceMappingURL=monitoring.module.js.map