"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationEntity = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let ConversationEntity = class ConversationEntity {
};
exports.ConversationEntity = ConversationEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], ConversationEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], ConversationEntity.prototype, "sessionId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('uuid'),
    tslib_1.__metadata("design:type", String)
], ConversationEntity.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('text'),
    tslib_1.__metadata("design:type", String)
], ConversationEntity.prototype, "userMessage", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('text'),
    tslib_1.__metadata("design:type", String)
], ConversationEntity.prototype, "aiResponse", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], ConversationEntity.prototype, "intent", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], ConversationEntity.prototype, "sentiment", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], ConversationEntity.prototype, "agent", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], ConversationEntity.prototype, "mode", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    tslib_1.__metadata("design:type", Object)
], ConversationEntity.prototype, "context", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    tslib_1.__metadata("design:type", Object)
], ConversationEntity.prototype, "metadata", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], ConversationEntity.prototype, "isArchived", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], ConversationEntity.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], ConversationEntity.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.conversations),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    tslib_1.__metadata("design:type", user_entity_1.UserEntity)
], ConversationEntity.prototype, "user", void 0);
exports.ConversationEntity = ConversationEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('conversations')
], ConversationEntity);
//# sourceMappingURL=conversation.entity.js.map