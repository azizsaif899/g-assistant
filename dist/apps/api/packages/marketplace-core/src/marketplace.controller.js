"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketplaceController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const marketplace_service_1 = require("./marketplace.service");
let MarketplaceController = class MarketplaceController {
    constructor(marketplaceService) {
        this.marketplaceService = marketplaceService;
    }
    async submitApp(app) {
        return this.marketplaceService.submitApp(app);
    }
    async listApps() {
        return this.marketplaceService.listApps();
    }
};
exports.MarketplaceController = MarketplaceController;
tslib_1.__decorate([
    (0, common_1.Post)('apps'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MarketplaceController.prototype, "submitApp", null);
tslib_1.__decorate([
    (0, common_1.Get)('apps'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], MarketplaceController.prototype, "listApps", null);
exports.MarketplaceController = MarketplaceController = tslib_1.__decorate([
    (0, common_1.Controller)('marketplace'),
    tslib_1.__metadata("design:paramtypes", [marketplace_service_1.MarketplaceService])
], MarketplaceController);
//# sourceMappingURL=marketplace.controller.js.map