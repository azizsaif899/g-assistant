"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
async function bootstrap() {
    const port = process.env.PORT || 3001;
    // Create Express app
    const app = (0, express_1.default)();
    // Create NestJS app
    const nestApp = await core_1.NestFactory.create(app_module_1.AppModule);
    // Enable CORS
    nestApp.enableCors();
    await nestApp.listen(port);
    console.log(`Gateway running on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map