"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialSchema1704722400000 = void 0;
const typeorm_1 = require("typeorm");
class InitialSchema1704722400000 {
    constructor() {
        this.name = 'InitialSchema1704722400000';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'gen_random_uuid()',
                },
                {
                    name: 'username',
                    type: 'varchar',
                    length: '50',
                    isUnique: true,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '255',
                    isUnique: true,
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'role',
                    type: 'varchar',
                    length: '20',
                    default: "'user'",
                },
                {
                    name: 'preferences',
                    type: 'jsonb',
                    isNullable: true,
                },
                {
                    name: 'profile',
                    type: 'jsonb',
                    isNullable: true,
                },
                {
                    name: 'isActive',
                    type: 'boolean',
                    default: true,
                },
                {
                    name: 'lastLoginAt',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'lastLoginIp',
                    type: 'varchar',
                    length: '45',
                    isNullable: true,
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'conversations',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'gen_random_uuid()',
                },
                {
                    name: 'sessionId',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'userId',
                    type: 'uuid',
                },
                {
                    name: 'userMessage',
                    type: 'text',
                },
                {
                    name: 'aiResponse',
                    type: 'text',
                },
                {
                    name: 'intent',
                    type: 'varchar',
                    length: '50',
                    isNullable: true,
                },
                {
                    name: 'sentiment',
                    type: 'varchar',
                    length: '20',
                    isNullable: true,
                },
                {
                    name: 'agent',
                    type: 'varchar',
                    length: '50',
                    isNullable: true,
                },
                {
                    name: 'mode',
                    type: 'varchar',
                    length: '50',
                    isNullable: true,
                },
                {
                    name: 'context',
                    type: 'jsonb',
                    isNullable: true,
                },
                {
                    name: 'metadata',
                    type: 'jsonb',
                    isNullable: true,
                },
                {
                    name: 'isArchived',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
            foreignKeys: [
                {
                    columnNames: ['userId'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                },
            ],
        }), true);
        await queryRunner.createIndex('users', new typeorm_1.Index('IDX_users_email', ['email']));
        await queryRunner.createIndex('users', new typeorm_1.Index('IDX_users_username', ['username']));
        await queryRunner.createIndex('conversations', new typeorm_1.Index('IDX_conversations_userId', ['userId']));
        await queryRunner.createIndex('conversations', new typeorm_1.Index('IDX_conversations_sessionId', ['sessionId']));
        await queryRunner.createIndex('conversations', new typeorm_1.Index('IDX_conversations_createdAt', ['createdAt']));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('conversations');
        await queryRunner.dropTable('users');
    }
}
exports.InitialSchema1704722400000 = InitialSchema1704722400000;
//# sourceMappingURL=001-initial-schema.js.map