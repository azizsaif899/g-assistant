"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketplaceService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let MarketplaceService = class MarketplaceService {
    constructor() {
        this.apps = []; // In-memory store for apps
    }
    async submitApp(app) {
        this.apps.push(app);
        return { success: true, app };
    }
    async listApps() {
        return this.apps;
    }
};
exports.MarketplaceService = MarketplaceService;
exports.MarketplaceService = MarketplaceService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], MarketplaceService);
//# sourceMappingURL=marketplace.service.js.map