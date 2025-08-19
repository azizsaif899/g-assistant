"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const query_controller_1 = require("./query.controller");
const query_service_1 = require("./query.service");
const core_logic_1 = require("@azizsys/core/core-logic");
let QueryModule = class QueryModule {
};
exports.QueryModule = QueryModule;
exports.QueryModule = QueryModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [query_controller_1.QueryController],
        providers: [query_service_1.QueryService, core_logic_1.AiCoreService, core_logic_1.GeminiClient],
        exports: [query_service_1.QueryService],
    })
], QueryModule);
//# sourceMappingURL=query.module.js.map