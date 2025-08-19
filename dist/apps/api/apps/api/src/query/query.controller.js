"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const query_service_1 = require("./query.service");
const query_dto_1 = require("./dto/query.dto");
let QueryController = class QueryController {
    constructor(queryService) {
        this.queryService = queryService;
    }
    async processQuery(queryDto) {
        return this.queryService.processQuery(queryDto);
    }
    async analyzeData(data) {
        return this.queryService.analyzeData(data);
    }
};
exports.QueryController = QueryController;
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Send AI query',
        description: 'Process AI query and return intelligent response. Supports Arabic and English.'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Query processed successfully',
        example: {
            success: true,
            query: 'ما هي أفضل الممارسات في البرمجة؟',
            response: 'بناءً على خبرتي في التطوير، أنصح باتباع أفضل الممارسات...',
            timestamp: '2025-01-09T14:30:00.000Z',
            processingTime: 1250,
            confidence: 85,
            context: 'development'
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid query format',
        example: {
            success: false,
            statusCode: 400,
            message: 'Validation failed',
            timestamp: '2025-01-09T14:30:00.000Z'
        }
    }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [query_dto_1.QueryDto]),
    tslib_1.__metadata("design:returntype", Promise)
], QueryController.prototype, "processQuery", null);
tslib_1.__decorate([
    (0, common_1.Post)('analyze'),
    (0, swagger_1.ApiOperation)({ summary: 'Analyze data with AI' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Analysis completed' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], QueryController.prototype, "analyzeData", null);
exports.QueryController = QueryController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)('AI Query'),
    (0, common_1.Controller)('query'),
    tslib_1.__metadata("design:paramtypes", [query_service_1.QueryService])
], QueryController);
//# sourceMappingURL=query.controller.js.map