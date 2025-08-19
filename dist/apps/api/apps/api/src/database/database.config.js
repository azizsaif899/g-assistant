"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionPoolConfig = exports.databaseConfig = void 0;
const user_entity_1 = require("./user.entity");
const conversation_entity_1 = require("./conversation.entity");
const session_entity_1 = require("./session.entity");
exports.databaseConfig = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'azizsys',
    password: process.env.DB_PASSWORD || 'azizsys2025',
    database: process.env.DB_NAME || 'azizsys_db',
    entities: [user_entity_1.UserEntity, conversation_entity_1.ConversationEntity, session_entity_1.SessionEntity],
    migrations: ['dist/apps/api/src/database/migrations/*.js'],
    synchronize: process.env.NODE_ENV === 'development',
    logging: process.env.NODE_ENV === 'development',
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    extra: {
        connectionLimit: 20,
        acquireTimeout: 60000,
        timeout: 60000,
    },
};
exports.connectionPoolConfig = {
    max: 20,
    min: 5,
    acquire: 30000,
    idle: 10000,
    evict: 5000,
};
//# sourceMappingURL=database.config.js.map