"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const query_module_1 = require("./query/query.module");
const chat_module_1 = require("./chat/chat.module");
const users_module_1 = require("./users/users.module");
const whatsapp_module_1 = require("./whatsapp/whatsapp.module");
const monitoring_module_1 = require("./monitoring/monitoring.module");
const security_module_1 = require("./security/security.module");
const ai_module_1 = require("./ai/ai.module");
const global_exception_filter_1 = require("./common/filters/global-exception.filter");
const config_schema_1 = require("./config/config.schema");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['.env.local', '.env'],
                validationSchema: config_schema_1.configValidationSchema,
                validationOptions: {
                    allowUnknown: true,
                    abortEarly: false,
                },
            }),
            auth_module_1.AuthModule,
            query_module_1.QueryModule,
            chat_module_1.ChatModule,
            users_module_1.UsersModule,
            whatsapp_module_1.WhatsAppModule,
            monitoring_module_1.MonitoringModule,
            security_module_1.SecurityModule,
            ai_module_1.AIModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_FILTER,
                useClass: global_exception_filter_1.GlobalExceptionFilter,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map