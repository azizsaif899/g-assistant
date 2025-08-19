"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const content_service_1 = require("./content.service");
const content_dto_1 = require("./dto/content.dto");
let ContentController = class ContentController {
    constructor(contentService) {
        this.contentService = contentService;
    }
    async create(createContentDto) {
        return this.contentService.create(createContentDto);
    }
    async findAll(query) {
        return this.contentService.findAll(query);
    }
    async findOne(id) {
        return this.contentService.findOne(id);
    }
    async update(id, updateContentDto) {
        return this.contentService.update(id, updateContentDto);
    }
    async remove(id) {
        return this.contentService.remove(id);
    }
    async publish(id) {
        return this.contentService.publish(id);
    }
    async search(query) {
        return this.contentService.search(query);
    }
    async findByCategory(category) {
        return this.contentService.findByCategory(category);
    }
    async findByTag(tag) {
        return this.contentService.findByTag(tag);
    }
};
exports.ContentController = ContentController;
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [content_dto_1.CreateContentDto]),
    tslib_1.__metadata("design:returntype", Promise)
], ContentController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [content_dto_1.ContentQueryDto]),
    tslib_1.__metadata("design:returntype", Promise)
], ContentController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ContentController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Put)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, content_dto_1.UpdateContentDto]),
    tslib_1.__metadata("design:returntype", Promise)
], ContentController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ContentController.prototype, "remove", null);
tslib_1.__decorate([
    (0, common_1.Post)(':id/publish'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ContentController.prototype, "publish", null);
tslib_1.__decorate([
    (0, common_1.Get)('search/:query'),
    tslib_1.__param(0, (0, common_1.Param)('query')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ContentController.prototype, "search", null);
tslib_1.__decorate([
    (0, common_1.Get)('category/:category'),
    tslib_1.__param(0, (0, common_1.Param)('category')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ContentController.prototype, "findByCategory", null);
tslib_1.__decorate([
    (0, common_1.Get)('tag/:tag'),
    tslib_1.__param(0, (0, common_1.Param)('tag')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ContentController.prototype, "findByTag", null);
exports.ContentController = ContentController = tslib_1.__decorate([
    (0, common_1.Controller)('content'),
    tslib_1.__metadata("design:paramtypes", [content_service_1.ContentService])
], ContentController);
//# sourceMappingURL=content.controller.js.map