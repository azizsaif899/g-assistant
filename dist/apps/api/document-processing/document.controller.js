"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
let DocumentController = class DocumentController {
    async analyzeDocument(file, query) {
        return {
            success: true,
            analysis: `تحليل الملف: ${file.originalname}`,
            query: query || 'تحليل عام',
            fileSize: file.size,
            mimeType: file.mimetype
        };
    }
    async analyzeUrl(url, query) {
        return {
            success: true,
            analysis: `تحليل الرابط: ${url}`,
            query: query || 'تحليل عام'
        };
    }
};
exports.DocumentController = DocumentController;
tslib_1.__decorate([
    (0, common_1.Post)('analyze'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    tslib_1.__param(0, (0, common_1.UploadedFile)()),
    tslib_1.__param(1, (0, common_1.Body)('query')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String]),
    tslib_1.__metadata("design:returntype", Promise)
], DocumentController.prototype, "analyzeDocument", null);
tslib_1.__decorate([
    (0, common_1.Post)('analyze-url'),
    tslib_1.__param(0, (0, common_1.Body)('url')),
    tslib_1.__param(1, (0, common_1.Body)('query')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], DocumentController.prototype, "analyzeUrl", null);
exports.DocumentController = DocumentController = tslib_1.__decorate([
    (0, common_1.Controller)('api/v2/documents')
], DocumentController);
//# sourceMappingURL=document.controller.js.map