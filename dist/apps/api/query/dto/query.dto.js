"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class QueryDto {
}
exports.QueryDto = QueryDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ما هي أفضل الممارسات لتطوير التطبيقات؟',
        description: 'The AI query prompt'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], QueryDto.prototype, "prompt", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'development',
        description: 'Context for the query',
        required: false
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], QueryDto.prototype, "context", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ar',
        description: 'Response language',
        required: false
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], QueryDto.prototype, "language", void 0);
//# sourceMappingURL=query.dto.js.map